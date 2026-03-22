import {
  FREE_LIMIT,
  PAYWALL_HTML,
  PROFILE_REQUIRED_HTML,
  PROFILE_STORAGE_KEY,
  type MaryanMode,
  type MaryanProfile
} from './config';

type HistoryMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type AssistantReply = {
  html: string;
  plainText: string;
};

const root = document.querySelector<HTMLElement>('[data-maryan-copilot-root]');

if (root) {
  initCopilot(root);
}

function initCopilot(rootElement: HTMLElement) {
  const upgradeUrl = rootElement.dataset.upgradeUrl || '/offres';
  const endpoint = rootElement.dataset.endpoint?.trim() || '';

  const messages = rootElement.querySelector<HTMLElement>('[data-messages]')!;
  const input = rootElement.querySelector<HTMLTextAreaElement>('[data-user-input]')!;
  const sendBtn = rootElement.querySelector<HTMLButtonElement>('[data-send-btn]')!;
  const inputHint = rootElement.querySelector<HTMLElement>('#inputHint')!;
  const headerCounter = document.getElementById('headerCounter');
  const micBtn = document.getElementById('micBtn');

  // Drawer Elements
  const profileFilled = document.getElementById('drawerProfileFilled');
  const profileEmpty = document.getElementById('drawerProfileEmpty');
  const profileName = document.getElementById('drawerProfileName');
  const profileSummary = document.getElementById('drawerProfileSummary');
  const profileTags = document.getElementById('drawerProfileTags');

  const state = {
    mode: 'libre' as MaryanMode,
    msgCount: 0,
    isBusy: false,
    isBlocked: false,
    paywallShown: false,
    profileNoticeShown: false,
    history: [] as HistoryMessage[],
    userProfile: loadProfile()
  };

  renderCounter();
  renderProfile();
  syncInputUi();

  // --- SPEECH RECOGNITION (STT) ---
  let recognition: any = null;
  let isRecording = false;

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (SpeechRecognition && micBtn) {
    recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      isRecording = true;
      micBtn.classList.add('recording');
      input.placeholder = "Écoute en cours...";
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          input.value += (input.value ? ' ' : '') + transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      input.dispatchEvent(new Event('input')); // Trigger auto-resize
    };

    recognition.onerror = () => stopRecording();
    recognition.onend = () => stopRecording();

    micBtn.addEventListener('click', () => {
      if (isRecording) stopRecording();
      else startRecording();
    });
  } else if (micBtn) {
    micBtn.style.display = 'none'; // Hide if not supported
  }

  function startRecording() {
    try { recognition?.start(); } catch(e) { }
  }

  function stopRecording() {
    isRecording = false;
    micBtn?.classList.remove('recording');
    input.placeholder = "Écrivez ou dictez...";
    recognition?.stop();
  }
  // --- END STT ---

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  });

  input.addEventListener('input', () => {
    syncInputUi();
  });

  sendBtn.addEventListener('click', () => {
    void sendMessage();
  });

  function loadProfile(): MaryanProfile | null {
    try {
      const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as MaryanProfile) : null;
    } catch {
      return null;
    }
  }

  function renderProfile() {
    if (!state.userProfile || !profileFilled || !profileEmpty) return;

    profileFilled.classList.remove('hidden');
    profileEmpty.classList.add('hidden');
    if(profileName) profileName.textContent = state.userProfile.title;
    if(profileSummary) profileSummary.textContent = state.userProfile.summary;
    if(profileTags) {
        profileTags.innerHTML = state.userProfile.tags
        .map((tag) => `<span class="profile-tag">${escapeHtml(tag)}</span>`)
        .join('');
    }
  }

  function renderCounter() {
    const remaining = Math.max(0, FREE_LIMIT - state.msgCount);
    if (headerCounter) {
        headerCounter.textContent = `${remaining}/${FREE_LIMIT}`;
    }
  }

  function syncInputUi() {
    const hasText = input.value.trim().length > 0;

    input.disabled = state.isBusy || state.isBlocked;
    sendBtn.disabled = state.isBusy || state.isBlocked || !hasText;

    if (state.isBlocked) {
      input.placeholder = 'MARYAN Plus requis…';
      inputHint.textContent = 'Version libre terminée · découvrez MARYAN Plus';
      return;
    }

    inputHint.textContent = state.userProfile 
        ? `Mode Personnalisé · ${state.userProfile.title}`
        : `Mode Libre · ${Math.max(0, FREE_LIMIT - state.msgCount)} messages restants`;
  }

  async function sendMessage() {
    const text = input.value.trim();

    if (!text || state.isBusy) return;

    if (state.msgCount >= FREE_LIMIT && !state.userProfile?.plan?.includes("Plus")) {
      showPaywall();
      return;
    }

    input.value = '';
    // Auto-reset height
    input.style.height = 'auto';
    
    addMessage('user', escapeHtml(text), false);
    state.history.push({ role: 'user', content: text });

    if (!state.userProfile?.plan?.includes("Plus")) {
      state.msgCount += 1;
      renderCounter();
    }

    state.isBusy = true;
    syncInputUi();
    const typing = addTyping();

    try {
      const reply = await getAssistantReply({
        endpoint,
        profile: state.userProfile,
        history: state.history,
        message: text
      });

      removeTyping(typing);
      addMessage('assistant', reply.html, true);
      state.history.push({ role: 'assistant', content: reply.plainText });

      if (state.msgCount >= FREE_LIMIT && !state.userProfile?.plan?.includes("Plus")) {
        showPaywall();
      }
    } catch (error) {
      removeTyping(typing);
      addMessage('assistant', 'Souci technique. Réessayez dans un instant.', false);
    } finally {
      state.isBusy = false;
      syncInputUi();
      input.focus();
    }
  }

  function addMessage(role: 'user' | 'assistant', content: string, isHtml: boolean) {
    const wrapper = document.createElement('div');
    wrapper.className = `msg ${role}`;

    if (role === 'assistant') {
      const sender = document.createElement('span');
      sender.className = 'msg-sender';
      sender.textContent = 'MARYAN';
      wrapper.appendChild(sender);
    }

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    if (isHtml) {
      bubble.innerHTML = content;
    } else {
      bubble.innerHTML = `<p>${content}</p>`;
    }

    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);
    messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
  }

  function addTyping(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'msg assistant';
    wrapper.innerHTML = `
      <div class="msg-bubble typing-indicator">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    `;
    messages.appendChild(wrapper);
    messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
    return wrapper;
  }

  function removeTyping(element: HTMLElement) {
    element.remove();
  }

  function showPaywall() {
    state.isBlocked = true;
    state.paywallShown = true;

    const wrapper = document.createElement('div');
    wrapper.className = 'msg assistant';
    wrapper.innerHTML = `
      <div class="msg-bubble" style="background: var(--deep) !important; color: white !important; border: none;">
        <p><strong>Limite atteinte.</strong> Votre session libre est terminée. Pour continuer à profiter de l'expertise de MARYAN sans limite, découvrez nos offres.</p>
        <a href="${upgradeUrl}" class="btn-primary-v3" style="display:block; margin-top:1rem; text-align:center; background:var(--neon); color:var(--deep);">Voir les offres</a>
      </div>
    `;

    messages.appendChild(wrapper);
    messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
    syncInputUi();
  }
}

async function getAssistantReply({
  endpoint,
  profile,
  history,
  message
}: {
  endpoint: string;
  profile: MaryanProfile | null;
  history: HistoryMessage[];
  message: string;
}): Promise<AssistantReply> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      profile,
      messages: history,
      message
    })
  });

  const data = (await response.json().catch(() => ({}))) as { reply?: string; error?: string };

  if (!response.ok) {
    throw new Error(data.error || 'Erreur API Mistral.');
  }

  const reply = data.reply || '...';
  return {
    html: formatAssistantReply(reply),
    plainText: reply
  };
}

function formatAssistantReply(text: string): string {
  const escaped = escapeHtml(text).replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br />');
  return `<p>${escaped}</p>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
