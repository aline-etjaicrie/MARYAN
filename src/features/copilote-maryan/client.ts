import {
  FREE_LIMIT,
  PAYWALL_HTML,
  PROFILE_REQUIRED_HTML,
  PROFILE_STORAGE_KEY,
  type MaryanMode,
  type MaryanProfile
} from './config';
import { generateDemoReply } from './demo-replies';

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
  const welcomeTime = rootElement.querySelector<HTMLElement>('[data-welcome-time]')!;
  const input = rootElement.querySelector<HTMLTextAreaElement>('[data-user-input]')!;
  const sendBtn = rootElement.querySelector<HTMLButtonElement>('[data-send-btn]')!;
  const inputHint = rootElement.querySelector<HTMLElement>('[data-input-hint]')!;
  const counter = rootElement.querySelector<HTMLElement>('[data-msg-counter]')!;
  const counterText = rootElement.querySelector<HTMLElement>('[data-counter-text]')!;
  const counterDots = rootElement.querySelector<HTMLElement>('[data-counter-dots]')!;
  const profileBlock = rootElement.querySelector<HTMLElement>('[data-profile-block]')!;
  const profileFilled = rootElement.querySelector<HTMLElement>('[data-profile-filled]')!;
  const profileEmpty = rootElement.querySelector<HTMLElement>('[data-profile-empty]')!;
  const profileName = rootElement.querySelector<HTMLElement>('[data-profile-name]')!;
  const profileSummary = rootElement.querySelector<HTMLElement>('[data-profile-summary]')!;
  const profileTags = rootElement.querySelector<HTMLElement>('[data-profile-tags]')!;
  const modeButtons = Array.from(rootElement.querySelectorAll<HTMLButtonElement>('[data-mode]'));
  const suggestionButtons = Array.from(rootElement.querySelectorAll<HTMLButtonElement>('[data-suggestion]'));

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

  welcomeTime.textContent = formatTime(new Date());
  renderCounter();
  renderProfile();
  syncModeUi();
  syncInputUi();

  modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setMode((button.dataset.mode as MaryanMode) || 'libre');
    });
  });

  suggestionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      input.value = button.textContent?.trim() || '';
      autoResize(input);
      syncInputUi();
      input.focus();
    });
  });

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

  function loadProfile(): MaryanProfile | null {
    try {
      const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as MaryanProfile) : null;
    } catch {
      return null;
    }
  }

  function setMode(mode: MaryanMode) {
    state.mode = mode;
    syncModeUi();
    syncInputUi();

    if (mode === 'profil' && !state.userProfile) {
      showProfileRequiredNotice();
    }
  }

  function syncModeUi() {
    modeButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.mode === state.mode);
    });

    counter.classList.toggle('hidden', state.mode !== 'libre');
    profileBlock.classList.toggle('hidden', state.mode === 'libre');
  }

  function renderProfile() {
    if (!state.userProfile) {
      profileFilled.classList.add('hidden');
      profileEmpty.classList.remove('hidden');
      return;
    }

    profileFilled.classList.remove('hidden');
    profileEmpty.classList.add('hidden');
    profileName.textContent = state.userProfile.title;
    profileSummary.textContent = state.userProfile.summary;
    profileTags.innerHTML = state.userProfile.tags
      .map((tag) => `<span class="profile-tag">${escapeHtml(tag)}</span>`)
      .join('');
  }

  function renderCounter() {
    const remaining = Math.max(0, FREE_LIMIT - state.msgCount);
    counterText.textContent =
      state.msgCount === 0 ? `${FREE_LIMIT} messages disponibles` : `${remaining} message${remaining > 1 ? 's' : ''} restant${remaining > 1 ? 's' : ''}`;

    counterDots.innerHTML = '';
    for (let index = 0; index < FREE_LIMIT; index += 1) {
      const dot = document.createElement('span');
      dot.className = `counter-dot${index < state.msgCount ? ' used' : ''}`;
      counterDots.appendChild(dot);
    }
  }

  function syncInputUi() {
    const profileLocked = state.mode === 'profil' && !state.userProfile;
    const hasText = input.value.trim().length > 0;

    input.disabled = state.isBusy || state.isBlocked || profileLocked;
    sendBtn.disabled = state.isBusy || state.isBlocked || profileLocked || !hasText;

    if (state.isBlocked) {
      input.placeholder = 'Passez à MARYAN Plus pour continuer…';
      inputHint.textContent = 'Version libre terminée · découvrez MARYAN Plus';
      return;
    }

    if (profileLocked) {
      input.placeholder = 'Faites d’abord le diagnostic pour activer Mon profil.';
      inputHint.textContent = 'Version Mon profil · diagnostic requis';
      return;
    }

    input.placeholder = 'Posez votre question…';
    inputHint.textContent =
      state.mode === 'libre'
        ? `Version libre · ${Math.max(0, FREE_LIMIT - state.msgCount)} message${Math.max(0, FREE_LIMIT - state.msgCount) > 1 ? 's' : ''} restant${Math.max(0, FREE_LIMIT - state.msgCount) > 1 ? 's' : ''}`
        : 'Version Mon profil · réponses adaptées à votre situation';
  }

  async function sendMessage() {
    const text = input.value.trim();

    if (!text || state.isBusy) {
      return;
    }

    if (state.mode === 'profil' && !state.userProfile) {
      showProfileRequiredNotice();
      return;
    }

    if (state.mode === 'libre' && state.msgCount >= FREE_LIMIT) {
      showPaywall();
      return;
    }

    input.value = '';
    autoResize(input);
    addMessage('user', escapeHtml(text), false);
    state.history.push({ role: 'user', content: text });

    if (state.mode === 'libre') {
      state.msgCount += 1;
      renderCounter();
    }

    state.isBusy = true;
    syncInputUi();
    const typing = addTyping();

    try {
      const reply = await getAssistantReply({
        endpoint,
        profile: state.mode === 'profil' ? state.userProfile : null,
        history: state.history,
        message: text
      });

      removeTyping(typing);
      addMessage('assistant', reply.html, true);
      state.history.push({ role: 'assistant', content: reply.plainText });

      if (state.mode === 'libre' && state.msgCount >= FREE_LIMIT) {
        showPaywall();
      }
    } catch (error) {
      removeTyping(typing);
      const fallbackMessage =
        'Je rencontre un souci technique. Vous pouvez réessayer dans quelques instants.';
      const errorMessage = error instanceof Error && error.message ? error.message : fallbackMessage;
      addMessage(
        'assistant',
        escapeHtml(errorMessage),
        false
      );
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

    const time = document.createElement('span');
    time.className = 'msg-time';
    time.textContent = formatTime(new Date());

    wrapper.appendChild(bubble);
    wrapper.appendChild(time);
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
  }

  function addTyping(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'msg assistant typing-indicator';
    wrapper.innerHTML = `
      <div class="typing-bubble">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
    return wrapper;
  }

  function removeTyping(element: HTMLElement) {
    element.remove();
  }

  function showProfileRequiredNotice() {
    if (state.profileNoticeShown) {
      return;
    }

    state.profileNoticeShown = true;
    addMessage('assistant', PROFILE_REQUIRED_HTML, true);
  }

  function showPaywall() {
    if (state.paywallShown) {
      return;
    }

    state.isBlocked = true;
    state.paywallShown = true;

    const wrapper = document.createElement('div');
    wrapper.className = 'msg paywall-msg';
    wrapper.innerHTML = `
      <div class="paywall-bubble">
        <p>${PAYWALL_HTML}</p>
        <a class="paywall-cta" href="${upgradeUrl}">Découvrir MARYAN Plus</a>
      </div>
    `;

    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
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
  if (endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile,
        messages: history,
        message, // Ajout du message actuel
        mode: profile ? (profile as any).situation || (profile as any).key : null // On tente de récupérer le mode
      })
    });

    const data = (await response.json().catch(() => ({}))) as { reply?: string; error?: string };

    if (!response.ok) {
      throw new Error(data.error || 'Le copilote n’a pas pu répondre pour le moment.');
    }

    const reply = data.reply || 'Je n’ai pas pu générer de réponse.';
    return {
      html: formatAssistantReply(reply),
      plainText: reply
    };
  }

  const html = generateDemoReply({ message, profile });
  return {
    html,
    plainText: stripHtml(html)
  };
}

function formatAssistantReply(text: string): string {
  const escaped = escapeHtml(text);
  const blocks = escaped
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split('\n').map((line) => line.trim());
      const isList = lines.every((line) => line.startsWith('- '));

      if (isList) {
        return `<ul>${lines.map((line) => `<li>${line.slice(2)}</li>`).join('')}</ul>`;
      }

      return `<p>${block.replace(/\n/g, '<br />')}</p>`;
    });

  return blocks.join('');
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
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
  element.style.height = `${Math.min(element.scrollHeight, 140)}px`;
}

function formatTime(date: Date): string {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}
