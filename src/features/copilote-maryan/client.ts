import {
  FREE_LIMIT,
  PAYWALL_HTML,
  PROFILE_STORAGE_KEY,
  inferMaryanSituationMode,
  type MaryanProfile,
  type MaryanSituationMode
} from './config';

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
};

type DiagnosticAnswers = Record<string, string>;

// --- Session limit helpers (sessionStorage + signed token) ---
const SESSION_KEY = 'maryan_session_v1';

function getSessionToken(): string | null {
  try { return sessionStorage.getItem(SESSION_KEY); }
  catch { return null; }
}

function setSessionToken(token: string): void {
  try { sessionStorage.setItem(SESSION_KEY, token); }
  catch {}
}

function getSessionCount(): number {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return 0;
    const obj = JSON.parse(atob(raw)) as Record<string, unknown>;
    return typeof obj.count === 'number' ? obj.count : 0;
  } catch { return 0; }
}
// ---

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

  const state = {
    msgCount: getSessionCount(),
    isBusy: false,
    isBlocked: getSessionCount() >= FREE_LIMIT,
    paywallShown: false,
    history: [] as HistoryMessage[],
    userProfile: loadProfile()
  };

  renderProfile();
  renderCounter();
  toggleSuggestions();
  syncInputUi();
  hydratePrefill();

  bindSuggestions();
  bindDrawer();
  bindSpeechRecognition();

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
    let profile: MaryanProfile | null = null;
    try {
      const rawProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (rawProfile) {
        const parsed = JSON.parse(rawProfile) as Partial<MaryanProfile>;
        if (isValidProfile(parsed)) {
          profile = parsed as MaryanProfile;
        }
      }

      if (!profile) {
        const rawDiagnostic = localStorage.getItem('maryan_v4_diag');
        if (rawDiagnostic) {
          const answers = JSON.parse(rawDiagnostic) as DiagnosticAnswers;
          const derived = deriveProfileFromDiagnostic(answers);
          if (derived) {
            localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(derived));
            profile = derived;
          }
        }
      }

      if (profile) {
        // Enlacement CHANTIER 2 : on ajoute les infos complémentaires venant de user_data 
        const userDataRaw = localStorage.getItem('user_data');
        if (userDataRaw) {
           const user = JSON.parse(userDataRaw);
           profile.tailleCt = user.taille_ct;
           profile.typeCt = user.type_ct;
           profile.metierHorsMandat = user.metier_hors_mandat;
           // Le rôle (targetRoles) + mandat principal
           if (user.mandat_principal) {
               profile.title = user.mandat_principal;
           }
        }
      }

      return profile;
    } catch {
      return null;
    }
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
      profileStatus.textContent = hasPlusAccess(state.userProfile)
        ? 'Profil reconnu et mode personnalisé actif'
        : 'Profil reconnu : réponses contextualisées, limite gratuite conservée';
    }

    if (modeBadge) {
      modeBadge.textContent = hasPlusAccess(state.userProfile) ? 'MARYAN Plus' : 'Profil chargé';
    }
  }

  function renderCounter() {
    const unlimited = hasPlusAccess(state.userProfile);
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

    input.disabled = state.isBusy || state.isBlocked;
    sendBtn.disabled = state.isBusy || state.isBlocked || !hasText;

    if (state.isBlocked) {
      input.placeholder = 'Passez à MARYAN Plus pour continuer...';
      inputHint.textContent = 'Session libre terminée';
      return;
    }

    input.placeholder = state.isBusy ? 'MARYAN vous répond...' : 'Décrivez votre situation...';

    if (hasPlusAccess(state.userProfile)) {
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

    if (!text || state.isBusy) return;

    if (!hasPlusAccess(state.userProfile) && state.msgCount >= FREE_LIMIT) {
      showPaywall();
      return;
    }

    input.value = '';
    autoResize(input);

    addMessage('user', escapeHtml(text), false);
    state.history.push({ role: 'user', content: text });
    toggleSuggestions();

    if (!hasPlusAccess(state.userProfile)) {
      state.msgCount += 1;
      renderCounter();
    }

    state.isBusy = true;
    syncInputUi();
    const typing = addTyping();
    const mode = inferMaryanSituationMode(text, state.userProfile);

    try {
      const reply = await getAssistantReply({
        endpoint,
        profile: state.userProfile,
        history: state.history,
        message: text,
        mode,
        sessionToken: getSessionToken()
      });

      removeTyping(typing);
      addMessage('assistant', reply.html, true);
      state.history.push({ role: 'assistant', content: reply.plainText });

      if (!hasPlusAccess(state.userProfile) && state.msgCount >= FREE_LIMIT) {
        showPaywall();
      }
    } catch (error) {
      removeTyping(typing);
      if (error instanceof Error && error.message === '__PAYWALL__') {
        showPaywall();
      } else {
        addMessage('assistant', formatAssistantReply(getErrorMessage(error)), true);
      }
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
}

async function getAssistantReply({
  endpoint,
  profile,
  history,
  message,
  mode,
  sessionToken
}: {
  endpoint: string;
  profile: MaryanProfile | null;
  history: HistoryMessage[];
  message: string;
  mode: MaryanSituationMode;
  sessionToken: string | null;
}): Promise<AssistantReply> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      profile,
      messages: history,
      message,
      mode,
      ...(sessionToken ? { sessionToken } : {})
    })
  });

  const data = (await response.json().catch(() => ({}))) as {
    reply?: string;
    error?: string;
    resources?: SuggestedResource[];
    sessionToken?: string;
    paywallTriggered?: boolean;
  };

  if (response.status === 402 || data.paywallTriggered) {
    throw new Error('__PAYWALL__');
  }

  if (!response.ok) {
    throw new Error(data.error || 'Le copilote ne répond pas pour le moment.');
  }

  if (typeof data.sessionToken === 'string') {
    setSessionToken(data.sessionToken);
  }

  const reply = data.reply || "Je n'ai pas pu générer de réponse.";
  const resources = Array.isArray(data.resources) ? data.resources.slice(0, 2) : [];

  return {
    html: formatAssistantReply(reply, resources),
    plainText: reply,
    resources
  };
}

function formatAssistantReply(text: string, resources: SuggestedResource[] = []): string {
  const cleaned = text.replace(/\r\n/g, '\n').trim();
  if (!cleaned) {
    return "<p>Je n'ai pas pu formuler une réponse utile pour le moment.</p>";
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

    const resourceMatch = detectResourceBlock(block);
    if (resourceMatch) {
      flushSection();
      html.push(renderResourceBlock(resourceMatch));
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

function detectResourceBlock(block: string): { title: string; reason: string; slug: string } | null {
  const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
  if (!lines.length || !lines[0].startsWith('📎')) return null;

  const title = lines[0].replace(/^📎\s*/, '').trim();
  const linkLine = lines.find((l) => l.includes('Lire la fiche') && l.includes('/ressources/'));
  if (!linkLine) return null;

  const slugMatch = linkLine.match(/\/ressources\/([^/\s]+)/);
  if (!slugMatch) return null;

  const slug = slugMatch[1];
  const reason = lines.filter((l) => l !== lines[0] && l !== linkLine).join(' ').trim();
  return { title, reason, slug };
}

function renderResourceBlock(resource: { title: string; reason: string; slug: string }): string {
  const reasonHtml = resource.reason
    ? `<span class="reply-resource-promise">${escapeHtml(trimParagraph(resource.reason))}</span>`
    : '';
  return `<section class="reply-section"><ul class="reply-resource-list"><li><a class="reply-resource-link" href="/ressources/${encodeURIComponent(resource.slug)}/">${escapeHtml(resource.title)}</a>${reasonHtml}</li></ul></section>`;
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
