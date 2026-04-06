import { createClient } from '@supabase/supabase-js';
import {
  FREE_LIMIT,
  PAYWALL_HTML,
  PROFILE_STORAGE_KEY,
  inferMaryanSituationMode,
  type MaryanProfile,
  type MaryanSituationMode
} from './config';
import { getCurrentSessionPlan } from '../../lib/client-plan';

const _supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string;
const _supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;
const _supabase = _supabaseUrl && _supabaseKey ? createClient(_supabaseUrl, _supabaseKey) : null;

type HistoryMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type SuggestedResource = {
  title: string;
  slug: string;
  promise: string;
};

type AssistantReply = {
  html: string;
  plainText: string;
  resources: SuggestedResource[];
  sessionId: string | null;
};

type DiagnosticAnswers = Record<string, string>;

const root = document.querySelector<HTMLElement>('[data-maryan-copilot-root]');

if (root) {
  initCopilot(root);
}

function initCopilot(rootElement: HTMLElement) {
  const upgradeUrl = rootElement.dataset.upgradeUrl || '/offres';
  const endpoint = rootElement.dataset.endpoint?.trim() || '/api/chat';

  const messages = rootElement.querySelector<HTMLElement>('[data-messages]')!;
  const chatThread = rootElement.querySelector<HTMLElement>('[data-chat-thread]')!;
  const input = rootElement.querySelector<HTMLTextAreaElement>('[data-user-input]')!;
  const sendBtn = rootElement.querySelector<HTMLButtonElement>('[data-send-btn]')!;
  const inputHint = rootElement.querySelector<HTMLElement>('[data-input-hint]')!;
  const headerCounter = rootElement.querySelector<HTMLElement>('[data-counter-label]');
  const counterDots = rootElement.querySelector<HTMLElement>('[data-counter-dots]');
  const suggestionStrip = rootElement.querySelector<HTMLElement>('[data-suggestions]');
  const introCard = rootElement.querySelector<HTMLElement>('[data-intro-card]');
  const suggestionButtons = Array.from(
    rootElement.querySelectorAll<HTMLButtonElement>('[data-suggestion]')
  );
  const modeBadge = rootElement.querySelector<HTMLElement>('[data-mode-badge]');
  const micBtn = rootElement.querySelector<HTMLButtonElement>('[data-mic-btn]');
  const attachBtn = rootElement.querySelector<HTMLButtonElement>('[data-attach-btn]');
  const attachInput = rootElement.querySelector<HTMLInputElement>('[data-attach-input]');
  const attachPreview = rootElement.querySelector<HTMLElement>('[data-attach-preview]');
  const attachFilename = rootElement.querySelector<HTMLElement>('[data-attach-filename]');
  const removeAttachBtn = rootElement.querySelector<HTMLButtonElement>('[data-remove-attach]');

  const drawer = rootElement.querySelector<HTMLElement>('[data-profile-drawer]');
  const overlay = rootElement.querySelector<HTMLElement>('[data-drawer-overlay]');
  const openDrawerBtn = rootElement.querySelector<HTMLButtonElement>('[data-open-drawer]');
  const closeDrawerBtn = rootElement.querySelector<HTMLButtonElement>('[data-close-drawer]');

  const profileFilled = rootElement.querySelector<HTMLElement>('[data-profile-filled]');
  const profileEmpty = rootElement.querySelector<HTMLElement>('[data-profile-empty]');
  const profileName = rootElement.querySelector<HTMLElement>('[data-profile-name]');
  const profileSummary = rootElement.querySelector<HTMLElement>('[data-profile-summary]');
  const profileTags = rootElement.querySelector<HTMLElement>('[data-profile-tags]');
  const profileStatus = rootElement.querySelector<HTMLElement>('[data-profile-status]');

  type PendingAttachment = { filename: string; description: string } | null;

  const state = {
    msgCount: 0,
    isBusy: false,
    isBlocked: false,
    paywallShown: false,
    isLoggedIn: false,
    hasPaidPlan: false,
    accessToken: null as string | null,
    sessionId: new URL(window.location.href).searchParams.get('session_id'),
    history: [] as HistoryMessage[],
    userProfile: loadProfile(),
    pendingAttachment: null as PendingAttachment
  };

  function hasUnlimitedAccess(): boolean {
    return state.hasPaidPlan || hasPlusAccess(state.userProfile);
  }

  void bootstrapAuthenticatedContext();

  renderProfile();
  renderCounter();
  toggleSuggestions();
  syncInputUi();
  hydratePrefill();

  bindSuggestions();
  bindDrawer();
  bindSpeechRecognition();
  bindAttachment();

  async function bootstrapAuthenticatedContext() {
    if (!_supabase) return;

    try {
      const { session, plan } = await getCurrentSessionPlan();
      if (!session) return;

      state.isLoggedIn = true;
      state.accessToken = session.access_token;

      if (plan === 'plus' || plan === 'admin') {
        state.hasPaidPlan = true;
        if (state.isBlocked) {
          state.isBlocked = false;
          state.paywallShown = false;
        }
        if (modeBadge) modeBadge.textContent = 'MARYAN · Accès illimité';
      }

      await syncProfileContext(session.access_token);

      if (state.sessionId) {
        await hydrateSavedSession(session.access_token, state.sessionId);
      }
    } catch {
      // non bloquant
    } finally {
      renderProfile();
      renderCounter();
      toggleSuggestions();
      syncInputUi();
    }
  }

  async function syncProfileContext(accessToken: string) {
    try {
      const response = await fetch('/api/profile-context', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!response.ok) return;

      const data = (await response.json()) as {
        profile?: { plan?: string | null };
        diagnosticState?: Record<string, unknown> | null;
        maryanProfile?: MaryanProfile | null;
      };

      if (data.profile?.plan === 'plus' || data.profile?.plan === 'admin') {
        state.hasPaidPlan = true;
      }

      if (data.diagnosticState) {
        localStorage.setItem('maryan_v4_diag', JSON.stringify(data.diagnosticState));
      }

      if (data.maryanProfile) {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data.maryanProfile));
        state.userProfile = data.maryanProfile;
      } else {
        state.userProfile = loadProfile();
      }
    } catch {
      // non bloquant
    }
  }

  async function hydrateSavedSession(accessToken: string, sessionId: string) {
    try {
      const response = await fetch(`/api/sessions?session_id=${encodeURIComponent(sessionId)}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!response.ok) return;

      const data = (await response.json()) as {
        session?: { id: string; messages?: HistoryMessage[] | null };
      };

      const storedMessages = Array.isArray(data.session?.messages)
        ? data.session.messages.filter(
            (message): message is HistoryMessage =>
              !!message &&
              (message.role === 'user' || message.role === 'assistant') &&
              typeof message.content === 'string'
          )
        : [];

      if (!storedMessages.length) return;

      state.sessionId = data.session?.id || sessionId;
      state.history = storedMessages;
      state.msgCount = storedMessages.filter((message) => message.role === 'user').length;
      messages.innerHTML = '';

      storedMessages.forEach((message) => {
        addMessage(
          message.role,
          message.role === 'assistant' ? formatAssistantReply(message.content) : escapeHtml(message.content),
          true
        );
      });
    } catch {
      // non bloquant
    }
  }

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  });

  input.addEventListener('input', () => {
    autoResize(input);
    syncInputUi();
  });

  sendBtn.addEventListener('click', () => {
    void sendMessage();
  });

  function hydratePrefill() {
    if (input.value.trim()) return;

    const prefill = sessionStorage.getItem('maryan_copilot_prefill');
    if (!prefill) return;

    sessionStorage.removeItem('maryan_copilot_prefill');
    input.value = prefill.trim();
    autoResize(input);
    syncInputUi();

    requestAnimationFrame(() => {
      input.focus();
      const end = input.value.length;
      input.setSelectionRange(end, end);
    });
  }

  function loadProfile(): MaryanProfile | null {
    try {
      const rawProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (rawProfile) {
        const parsed = JSON.parse(rawProfile) as Partial<MaryanProfile>;
        if (isValidProfile(parsed)) {
          return parsed as MaryanProfile;
        }
      }

      const rawDiagnostic = localStorage.getItem('maryan_v4_diag');
      if (!rawDiagnostic) return null;
      const answers = JSON.parse(rawDiagnostic) as DiagnosticAnswers;
      const derived = deriveProfileFromDiagnostic(answers);

      if (derived) {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(derived));
      }

      return derived;
    } catch {
      return null;
    }
  }

  // ─── ATTACHMENT ───────────────────────────────────────────────────────────

  function clearAttachment() {
    state.pendingAttachment = null;
    if (attachInput) attachInput.value = '';
    if (attachPreview) attachPreview.classList.add('hidden');
    if (attachBtn) attachBtn.classList.remove('active');
    syncInputUi();
  }

  function bindAttachment() {
    if (!attachBtn || !attachInput) return;

    attachBtn.addEventListener('click', () => attachInput.click());

    attachInput.addEventListener('change', async () => {
      const file = attachInput.files?.[0];
      if (!file) return;

      if (file.size > 10 * 1024 * 1024) {
        addMessage('assistant', '<p>⚠️ Fichier trop volumineux (max 10 Mo).</p>', true);
        return;
      }

      attachBtn.classList.add('active');
      if (attachPreview) attachPreview.classList.remove('hidden');
      if (attachFilename) attachFilename.textContent = `⏳ Analyse : ${file.name}`;

      try {
        const isPdf = file.type === 'application/pdf';
        const fileType = isPdf ? 'pdf' : 'image';
        const content = isPdf ? await extractPdfTextClient(file) : await resizeImageClient(file);

        const res = await fetch('/api/analyse-document', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileType, content, context: 'chat' })
        });
        const data = (await res.json()) as { description?: string; error?: string };

        if (data.error) throw new Error(data.error);

        state.pendingAttachment = { filename: file.name, description: data.description || '' };
        if (attachFilename) attachFilename.textContent = `📎 ${file.name}`;
        syncInputUi();
      } catch (e: any) {
        clearAttachment();
        addMessage('assistant', `<p>⚠️ Impossible d'analyser le fichier : ${escapeHtml(e.message || 'erreur inconnue')}</p>`, true);
      }
    });

    removeAttachBtn?.addEventListener('click', () => clearAttachment());
  }

  async function resizeImageClient(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, 1024 / Math.max(img.width, img.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = reject;
        img.src = (e.target as FileReader).result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function extractPdfTextClient(file: File): Promise<string> {
    await new Promise<void>((resolve, reject) => {
      if ((window as any).pdfjsLib) { resolve(); return; }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve();
      };
      script.onerror = () => reject(new Error('PDF.js non disponible'));
      document.head.appendChild(script);
    });
    const lib = (window as any).pdfjsLib;
    const buf = await file.arrayBuffer();
    const pdf = await lib.getDocument({ data: buf }).promise;
    let text = '';
    for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) {
      const page = await pdf.getPage(i);
      const c = await page.getTextContent();
      text += (c.items as any[]).map((item: any) => item.str).join(' ') + '\n';
    }
    return text.trim();
  }

  function bindSuggestions() {
    suggestionButtons.forEach((button) => {
      button.addEventListener('click', () => {
        input.value = button.dataset.suggestion || button.textContent?.trim() || '';
        input.focus();
        autoResize(input);
        syncInputUi();
      });
    });
  }

  function bindDrawer() {
    const toggleDrawer = (open: boolean) => {
      drawer?.classList.toggle('open', open);
      overlay?.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };

    openDrawerBtn?.addEventListener('click', () => toggleDrawer(true));
    closeDrawerBtn?.addEventListener('click', () => toggleDrawer(false));
    overlay?.addEventListener('click', () => toggleDrawer(false));

    let touchStartX = 0;
    document.addEventListener(
      'touchstart',
      (event) => {
        touchStartX = event.changedTouches[0]?.screenX || 0;
      },
      { passive: true }
    );
    document.addEventListener(
      'touchend',
      (event) => {
        const touchEndX = event.changedTouches[0]?.screenX || 0;
        if (touchEndX - touchStartX > 110) toggleDrawer(true);
        if (touchStartX - touchEndX > 110) toggleDrawer(false);
      },
      { passive: true }
    );
  }

  function bindSpeechRecognition() {
    const SpeechRecognition = (window as typeof window & {
      SpeechRecognition?: new () => SpeechRecognition;
      webkitSpeechRecognition?: new () => SpeechRecognition;
    }).SpeechRecognition || (window as typeof window & { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition;

    if (!SpeechRecognition || !micBtn) {
      if (micBtn) micBtn.hidden = true;
      return;
    }

    let isRecording = false;
    const recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      isRecording = true;
      micBtn.classList.add('recording');
      input.placeholder = 'Écoute en cours...';
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        if (event.results[index].isFinal) {
          const transcript = event.results[index][0]?.transcript?.trim();
          if (transcript) {
            input.value = `${input.value}${input.value ? ' ' : ''}${transcript}`;
          }
        }
      }

      autoResize(input);
      syncInputUi();
    };

    const stopRecording = () => {
      isRecording = false;
      micBtn.classList.remove('recording');
      input.placeholder = 'Décrivez votre situation...';
      try {
        recognition.stop();
      } catch {
        /* noop */
      }
    };

    recognition.onerror = stopRecording;
    recognition.onend = stopRecording;

    micBtn.addEventListener('click', () => {
      if (isRecording) {
        stopRecording();
        return;
      }

      try {
        recognition.start();
      } catch {
        stopRecording();
      }
    });
  }

  function renderProfile() {
    if (!profileFilled || !profileEmpty) return;

    if (!state.userProfile) {
      profileFilled.classList.add('hidden');
      profileEmpty.classList.remove('hidden');
      if (profileStatus) {
        profileStatus.textContent = 'Diagnostic recommandé pour personnaliser les réponses';
      }
      if (modeBadge) {
        modeBadge.textContent = 'Version libre';
      }
      return;
    }

    profileFilled.classList.remove('hidden');
    profileEmpty.classList.add('hidden');

    if (profileName) profileName.textContent = state.userProfile.title;
    if (profileSummary) profileSummary.textContent = state.userProfile.summary;
    if (profileTags) {
      profileTags.innerHTML = (state.userProfile.tags || [])
        .slice(0, 5)
        .map((tag) => `<span class="profile-tag">${escapeHtml(tag)}</span>`)
        .join('');
    }

    if (profileStatus) {
      profileStatus.textContent = hasUnlimitedAccess()
        ? 'Profil reconnu et mode personnalisé actif'
        : 'Profil reconnu : réponses contextualisées, limite gratuite conservée';
    }

    if (modeBadge) {
      modeBadge.textContent = hasUnlimitedAccess() ? 'MARYAN Plus' : 'Profil chargé';
    }
  }

  function renderCounter() {
    const unlimited = hasUnlimitedAccess();
    const remaining = Math.max(0, FREE_LIMIT - state.msgCount);

    if (headerCounter) {
      headerCounter.textContent = unlimited ? 'Illimité' : `${remaining}/${FREE_LIMIT}`;
    }

    if (!counterDots) return;

    if (unlimited) {
      counterDots.innerHTML = '<span class="counter-note">Accès illimité</span>';
      return;
    }

    counterDots.innerHTML = Array.from({ length: FREE_LIMIT }, (_, index) => {
      const classes = ['counter-dot'];
      if (index < state.msgCount) classes.push('used');
      return `<span class="${classes.join(' ')}" aria-hidden="true"></span>`;
    }).join('');
  }

  function syncInputUi() {
    const hasText = input.value.trim().length > 0;
    const hasAttachment = !!state.pendingAttachment;

    input.disabled = state.isBusy || state.isBlocked;
    sendBtn.disabled = state.isBusy || state.isBlocked || (!hasText && !hasAttachment);

    if (state.isBlocked) {
      input.placeholder = 'Passez à MARYAN Plus pour continuer...';
      inputHint.textContent = 'Session libre terminée';
      return;
    }

    input.placeholder = state.isBusy ? 'MARYAN vous répond...' : 'Décrivez votre situation...';

    if (hasUnlimitedAccess()) {
      inputHint.textContent = 'Profil personnalisé · accès illimité';
      return;
    }

    if (state.userProfile) {
      inputHint.textContent = `Profil chargé · ${Math.max(0, FREE_LIMIT - state.msgCount)} messages libres restants`;
      return;
    }

    inputHint.textContent = `Version libre · ${Math.max(0, FREE_LIMIT - state.msgCount)} messages restants`;
  }

  function toggleSuggestions() {
    const hasConversation = state.history.some((message) => message.role === 'user');
    if (suggestionStrip) {
      suggestionStrip.classList.toggle('hidden', hasConversation);
    }
    if (introCard) {
      introCard.classList.toggle('hidden', hasConversation);
    }
  }

  async function sendMessage() {
    const text = input.value.trim();
    const attachment = state.pendingAttachment;

    if ((!text && !attachment) || state.isBusy) return;

    if (!hasUnlimitedAccess() && state.msgCount >= FREE_LIMIT) {
      showPaywall();
      return;
    }

    input.value = '';
    autoResize(input);

    // Build display HTML and API message text
    let displayHtml: string;
    let apiText: string;

    if (attachment) {
      displayHtml = `<span class="msg-attachment-badge">📎 ${escapeHtml(attachment.filename)}</span>${text ? `<br><br>${escapeHtml(text)}` : ''}`;
      apiText = `[Document joint : ${attachment.filename}]\nContenu : ${attachment.description}${text ? '\n\n' + text : ''}`.trim();
      clearAttachment();
    } else {
      displayHtml = escapeHtml(text);
      apiText = text;
    }

    addMessage('user', displayHtml, true);
    state.history.push({ role: 'user', content: apiText });
    toggleSuggestions();

    if (!hasUnlimitedAccess()) {
      state.msgCount += 1;
      renderCounter();
    }

    state.isBusy = true;
    syncInputUi();
    const typing = addTyping();
    const mode = inferMaryanSituationMode(apiText, state.userProfile);

    try {
      const reply = await getAssistantReply({
        endpoint,
        profile: state.userProfile,
        history: state.history,
        message: apiText,
        mode,
        accessToken: state.accessToken,
        sessionId: state.sessionId
      });

      removeTyping(typing);
      addMessage('assistant', reply.html, true);
      state.history.push({ role: 'assistant', content: reply.plainText });

      if (reply.sessionId) {
        state.sessionId = reply.sessionId;
        syncSessionUrl(reply.sessionId);
      }

      if (!hasUnlimitedAccess() && state.msgCount >= FREE_LIMIT) {
        showPaywall();
      }
    } catch (error) {
      removeTyping(typing);
      if ((error as Error & { code?: string }).code === 'free_limit_reached') {
        showPaywall();
        return;
      }
      addMessage('assistant', formatAssistantReply(getErrorMessage(error)), true);
    } finally {
      state.isBusy = false;
      syncInputUi();
      input.focus();
    }
  }

  function addMessage(role: 'user' | 'assistant', content: string, isHtml: boolean) {
    const wrapper = document.createElement('article');
    wrapper.className = `msg ${role}`;

    if (role === 'assistant') {
      const sender = document.createElement('span');
      sender.className = 'msg-sender';
      sender.textContent = 'MARYAN';
      wrapper.appendChild(sender);
    }

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = isHtml ? content : `<p>${content}</p>`;

    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);
    chatThread.scrollTo({ top: chatThread.scrollHeight, behavior: 'smooth' });
  }

  function addTyping(): HTMLElement {
    const wrapper = document.createElement('article');
    wrapper.className = 'msg assistant';
    wrapper.innerHTML = `
      <span class="msg-sender">MARYAN</span>
      <div class="msg-bubble typing-indicator" aria-live="polite" aria-label="MARYAN écrit">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    `;
    messages.appendChild(wrapper);
    chatThread.scrollTo({ top: chatThread.scrollHeight, behavior: 'smooth' });
    return wrapper;
  }

  function removeTyping(element: HTMLElement) {
    element.remove();
  }

  function showPaywall() {
    if (state.paywallShown) return;

    state.isBlocked = true;
    state.paywallShown = true;

    const wrapper = document.createElement('article');
    wrapper.className = 'msg assistant';
    wrapper.innerHTML = `
      <span class="msg-sender">MARYAN</span>
      <div class="msg-bubble paywall-card">
        <div class="paywall-copy">
          <p>${PAYWALL_HTML}</p>
        </div>
        <a href="${upgradeUrl}" class="btn-primary-v3 paywall-cta">Découvrir MARYAN Plus</a>
      </div>
    `;

    messages.appendChild(wrapper);
    chatThread.scrollTo({ top: chatThread.scrollHeight, behavior: 'smooth' });
    syncInputUi();
  }

  function syncSessionUrl(sessionId: string) {
    const url = new URL(window.location.href);
    url.searchParams.set('session_id', sessionId);
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }
}

async function getAssistantReply({
  endpoint,
  profile,
  history,
  message,
  mode,
  accessToken,
  sessionId
}: {
  endpoint: string;
  profile: MaryanProfile | null;
  history: HistoryMessage[];
  message: string;
  mode: MaryanSituationMode;
  accessToken: string | null;
  sessionId: string | null;
}): Promise<AssistantReply> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
    },
    body: JSON.stringify({
      profile,
      messages: history,
      message,
      mode,
      session_id: sessionId
    })
  });

  const data = (await response.json().catch(() => ({}))) as {
    reply?: string;
    error?: string;
    message?: string;
    resources?: SuggestedResource[];
    sessionId?: string | null;
  };

  if (!response.ok) {
    const error = new Error(data.message || data.error || 'Le copilote ne répond pas pour le moment.') as Error & {
      code?: string;
    };
    if (data.error) error.code = data.error;
    throw error;
  }

  const reply = data.reply || "Je n’ai pas pu générer de réponse.";
  const resources = Array.isArray(data.resources) ? data.resources.slice(0, 2) : [];

  return {
    html: formatAssistantReply(reply, resources),
    plainText: reply,
    resources,
    sessionId: typeof data.sessionId === 'string' ? data.sessionId : null
  };
}

function formatAssistantReply(text: string, resources: SuggestedResource[] = []): string {
  const cleaned = text.replace(/\r\n/g, '\n').trim();
  if (!cleaned) {
    return '<p>Je n’ai pas pu formuler une réponse utile pour le moment.</p>';
  }

  const blocks = cleaned
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  const html: string[] = [];
  let currentSection: { title: string; blocks: string[] } | null = null;

  const flushSection = () => {
    if (!currentSection) return;
    html.push(
      `<section class="reply-section"><h3>${escapeHtml(
        currentSection.title
      )}</h3>${currentSection.blocks.join('')}</section>`
    );
    currentSection = null;
  };

  blocks.forEach((block, index) => {
    const sectionMatch = detectSection(block);
    if (sectionMatch) {
      flushSection();
      currentSection = { title: sectionMatch.title, blocks: [] };
      if (sectionMatch.remaining) {
        currentSection.blocks.push(renderReplyBlock(sectionMatch.remaining));
      }
      return;
    }

    if (currentSection) {
      currentSection.blocks.push(renderReplyBlock(block));
      return;
    }

    if (index === 0) {
      html.push(`<p class="reply-lead">${formatInline(block)}</p>`);
      return;
    }

    html.push(renderReplyBlock(block));
  });

  flushSection();
  if (resources.length) {
    html.push(renderResourceSuggestions(resources));
  }
  return html.join('');
}

function detectSection(block: string): { title: string; remaining: string } | null {
  const lines = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) return null;

  const firstLine = normalizeLabel(lines[0].replace(/[:.]\s*$/, ''));
  const labelMap: Record<string, string> = {
    'a retenir': 'À retenir',
    'ce qu il faut comprendre': 'À retenir',
    'ce que vous devez retenir': 'À retenir',
    'faites maintenant': 'Faites maintenant',
    'ce que je te conseille maintenant': 'Faites maintenant',
    'ce que je vous conseille maintenant': 'Faites maintenant',
    'concretement': 'Faites maintenant',
    'bon reflexe': 'Bon réflexe',
    'le bon reflexe': 'Bon réflexe',
    'a verifier': 'À vérifier',
    'trame prete a l emploi': "Trame prête à l'emploi"
  };

  const title = labelMap[firstLine];
  if (title) {
    return {
      title,
      remaining: lines.slice(1).join('\n').trim()
    };
  }

  const colonMatch = lines[0].match(/^([^:]+)\s*:\s*(.+)$/);
  if (!colonMatch) return null;

  const inlineTitle = labelMap[normalizeLabel(colonMatch[1])];
  if (!inlineTitle) return null;

  const remainingLines = [colonMatch[2], ...lines.slice(1)].filter(Boolean);
  return {
    title: inlineTitle,
    remaining: remainingLines.join('\n').trim()
  };
}

function renderReplyBlock(block: string): string {
  const lines = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) return '';

  const listItems = lines
    .filter((line) => isListLine(line))
    .map((line) => line.replace(/^[-*•]\s+/, '').replace(/^\d+\.\s+/, '').trim())
    .slice(0, 3);

  if (listItems.length === lines.length) {
    return `<ul class="reply-list">${listItems.map((item) => `<li>${formatInline(item)}</li>`).join('')}</ul>`;
  }

  if (listItems.length >= 2) {
    const intro = lines.filter((line) => !isListLine(line)).join(' ');
    return `${intro ? `<p>${formatInline(intro)}</p>` : ''}<ul class="reply-list">${listItems
      .map((item) => `<li>${formatInline(item)}</li>`)
      .join('')}</ul>`;
  }

  return `<p>${formatInline(trimParagraph(lines.join(' ')))}</p>`;
}

function renderResourceSuggestions(resources: SuggestedResource[]): string {
  const items = resources
    .map(
      (resource) => `
        <li>
          <a class="reply-resource-link" href="/ressources/${encodeURIComponent(resource.slug)}/">${escapeHtml(
            resource.title
          )}</a>
          <span class="reply-resource-promise">${escapeHtml(trimParagraph(resource.promise))}</span>
        </li>
      `
    )
    .join('');

  return `<section class="reply-section"><h3>Ressources à lire</h3><ul class="reply-resource-list">${items}</ul></section>`;
}

function isListLine(line: string): boolean {
  return /^[-*•]\s+/.test(line) || /^\d+\.\s+/.test(line);
}

function formatInline(value: string): string {
  let escaped = escapeHtml(value);
  escaped = escaped.replace(/^-{3,}$/gm, '');
  escaped = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  escaped = escaped.replace(/\*(.+?)\*/g, '<em>$1</em>');
  return escaped;
}

function trimParagraph(value: string): string {
  const cleaned = value.replace(/^-{3,}$/gm, '').trim();
  if (cleaned.length <= 220) return cleaned;
  const sentences = cleaned.match(/[^.!?]+[.!?]?/g) || [cleaned];
  return sentences.slice(0, 2).join(' ').trim();
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function autoResize(element: HTMLTextAreaElement) {
  element.style.height = 'auto';
  element.style.height = `${Math.min(element.scrollHeight, 180)}px`;
}

function hasPlusAccess(profile: MaryanProfile | null): boolean {
  if (!profile) return false;
  const plan = normalizeLabel(profile.plan || '');
  return plan.includes('plus');
}

function isValidProfile(value: Partial<MaryanProfile> | null | undefined): value is MaryanProfile {
  return !!(
    value &&
    typeof value.title === 'string' &&
    typeof value.summary === 'string' &&
    typeof value.theme === 'string' &&
    typeof value.themeLabel === 'string' &&
    typeof value.offerLevel === 'number' &&
    typeof value.offerName === 'string' &&
    Array.isArray(value.tags)
  );
}

function deriveProfileFromDiagnostic(answers: DiagnosticAnswers): MaryanProfile | null {
  if (!answers || !Object.keys(answers).length) return null;

  const roleMap: Record<string, { title: string; theme: string; themeLabel: string }> = {
    maire: { title: 'Maire', theme: 'gouvernance', themeLabel: 'Gouvernance et arbitrage' },
    adjoint: { title: 'Adjoint·e municipal·e', theme: 'delegation', themeLabel: 'Délégation et mise en œuvre' },
    majorite: { title: 'Élu·e de majorité', theme: 'mandat', themeLabel: 'Conduite du mandat' },
    opposition: { title: "Élu·e d'opposition", theme: 'positionnement', themeLabel: 'Positionnement politique' },
    interco: { title: 'Élu·e intercommunal·e', theme: 'coordination', themeLabel: 'Coordination territoriale' }
  };

  const role = roleMap[answers.role] || {
    title: 'Élu·e local·e',
    theme: 'mandat',
    themeLabel: 'Conduite du mandat'
  };

  const summary = buildDiagnosticSummary(answers);
  const offerName = mapOfferName(answers);
  const offerLevel = offerName === 'MARYAN Plus' ? 2 : 1;

  return {
    key: `${answers.role || 'elu'}-${answers.tension || answers.feeling || 'mandat'}`,
    title: role.title,
    summary,
    theme: role.theme,
    themeLabel: role.themeLabel,
    offerLevel,
    offerName,
    tags: buildDiagnosticTags(answers),
    source: 'derived'
  };
}

function buildDiagnosticSummary(answers: DiagnosticAnswers): string {
  if (answers.seniority === 'moins1an' || answers.feeling === 'seul') {
    return "Vous semblez avoir surtout besoin de repères stables, de clarté et d'un appui proportionné.";
  }

  if (answers.feeling === 'surcharge' || answers.lack === 'priorites') {
    return "Votre point de tension principal semble être la surcharge et le besoin de remettre de l'ordre dans les priorités.";
  }

  if (answers.tension === 'conflit' || answers.tension === 'exposition') {
    return 'Votre situation appelle surtout du cadrage, de la justesse de parole et un bon tempo.';
  }

  if (answers.tension === 'flou' || answers.lack === 'cadre') {
    return "Vous avez probablement besoin d'un cadre plus solide pour arbitrer sans subir le flou.";
  }

  return 'Votre diagnostic fait ressortir un besoin de clarté, de méthode et de discernement dans la conduite du mandat.';
}

function buildDiagnosticTags(answers: DiagnosticAnswers): string[] {
  const tags: string[] = [];

  if (answers.seniority === 'moins1an') tags.push('début de mandat');
  if (answers.feeling === 'seul') tags.push('isolement');
  if (answers.feeling === 'surcharge') tags.push('surcharge');
  if (answers.tension === 'conflit') tags.push('tension');
  if (answers.tension === 'exposition') tags.push('exposition');
  if (answers.tension === 'flou') tags.push('arbitrage dans le flou');
  if (answers.lack === 'cadre') tags.push('besoin de cadre');
  if (answers.lack === 'recul') tags.push('besoin de recul');
  if (answers.vigilance === 'parole') tags.push('prise de parole');
  if (answers.vigilance === 'relation') tags.push('relation avec les acteurs');

  return tags.length ? tags : ['mandat local'];
}

function mapOfferName(answers: DiagnosticAnswers): string {
  if (answers.seniority === 'moins1an' || answers.vigilance === 'relation') {
    return 'Formation / Appui IRL';
  }

  if (answers.role === 'interco' || answers.vigilance === 'impact') {
    return 'Offre collectivité';
  }

  if (answers.tension === 'conflit' || answers.tension === 'duree' || answers.lack === 'cadre') {
    return 'Offre individuelle';
  }

  return 'Copilote';
}

function normalizeLabel(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9'\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message.trim();
  }

  return 'Souci technique. Réessayez dans un instant.';
}
