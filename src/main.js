import { TOPICS_DATA } from '../data/topics.js';
import { appState } from './state.js';
import { sound } from './audio.js';
import { icons } from './icons.js';
import { i18n } from './i18n.js';
import { DrawStudio } from './drawStudio.js';
import { ChallengeStudio } from './studio.js';
import { StatsDashboard } from './stats.js';

class WonderdrawApp {
  constructor() {
    this.activeTab = 'draw';
    this.initHeaderIcons();
    this.initViews();
    this.bindGlobalEvents();
    this.updateHeaderBadges();
    this.syncAudio();
    this.updateLocalizedUI();

    // Subscribe to language change
    i18n.subscribe(() => {
      this.updateLocalizedUI();
    });
  }

  initHeaderIcons() {
    // Brand Logo
    const brandLogo = document.getElementById('brandLogoContainer');
    if (brandLogo) brandLogo.innerHTML = icons.logo;

    // Tabs icons
    const iconDraw = document.getElementById('iconTabDraw');
    const iconStudio = document.getElementById('iconTabStudio');
    const iconStats = document.getElementById('iconTabStats');

    if (iconDraw) iconDraw.innerHTML = icons.draw;
    if (iconStudio) iconStudio.innerHTML = icons.timer;
    if (iconStats) iconStats.innerHTML = icons.stats;

    // Deck badge
    const deckIcon = document.getElementById('deckBadgeIcon');
    if (deckIcon) deckIcon.innerHTML = icons.cards;

    const closeThemeBtn = document.getElementById('closeThemeModalBtn');
    if (closeThemeBtn) closeThemeBtn.innerHTML = icons.close;
  }

  updateLocalizedUI() {
    const lang = i18n.getLang();

    // Language button text: shows the OTHER language so user knows what clicking it does
    const langBtnLabel = document.getElementById('langBtnLabel');
    const langToggleBtn = document.getElementById('langToggleBtn');
    if (langBtnLabel) {
      langBtnLabel.textContent = lang === 'fr' ? 'EN' : 'FR';
    }
    if (langToggleBtn) {
      langToggleBtn.title = i18n.t('switchLang');
    }

    // Header Nav Tabs
    const labelDraw = document.getElementById('labelTabDraw');
    const labelStudio = document.getElementById('labelTabStudio');
    const labelStats = document.getElementById('labelTabStats');

    if (labelDraw) labelDraw.textContent = i18n.t('tabDraw');
    if (labelStudio) labelStudio.textContent = i18n.t('tabStudio');
    if (labelStats) labelStats.textContent = i18n.t('tabStats');

    // Tooltips
    const deckBadge = document.getElementById('headerDeckBadge');
    const audioBtn = document.getElementById('audioToggleBtn');

    if (deckBadge) deckBadge.title = i18n.t('deckBadgeTitle');
    if (audioBtn) audioBtn.title = i18n.t('toggleAudio');

    // Theme Modal Text
    const themeModalTitle = document.getElementById('themeModalTitle');
    const themeModalSub = document.getElementById('themeModalSub');
    if (themeModalTitle) themeModalTitle.textContent = i18n.t('themeFilterTitle');
    if (themeModalSub) themeModalSub.textContent = i18n.t('themeFilterSub');
  }

  initViews() {
    // 1. Draw Studio
    const drawContainer = document.getElementById('drawView');
    this.drawStudio = new DrawStudio(drawContainer, (topic, phase) => {
      this.openStudioWithTopic(topic, phase);
    });

    // 2. 60s Rehearsal Timer Studio
    const studioContainer = document.getElementById('studioView');
    this.challengeStudio = new ChallengeStudio(studioContainer, () => {
      this.updateHeaderBadges();
      this.statsDashboard.render();
    });

    // Load initial active topic in studio if available, or default to #1
    const initialTopic = TOPICS_DATA.topics.find(t => t.id === appState.state.activeTopicId) || TOPICS_DATA.topics[0];
    this.challengeStudio.setTopic(initialTopic);

    // 3. Stats Dashboard
    const statsContainer = document.getElementById('statsView');
    this.statsDashboard = new StatsDashboard(statsContainer, (topic) => {
      this.openStudioWithTopic(topic);
    });
  }

  switchTab(tabName) {
    if (this.activeTab === tabName) return;
    this.activeTab = tabName;
    sound.playClick();

    // Update nav pills
    document.querySelectorAll('.nav-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    // Update views
    const viewMap = {
      draw: 'drawView',
      studio: 'studioView',
      stats: 'statsView'
    };

    Object.entries(viewMap).forEach(([key, id]) => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.toggle('active', key === tabName);
      }
    });

    // Refresh components on view enter
    if (tabName === 'stats') {
      this.statsDashboard.render();
    } else if (tabName === 'draw') {
      this.drawStudio.updatePoolCounter();
    }

    this.updateHeaderBadges();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openStudioWithTopic(topic, initialPhase = null) {
    this.challengeStudio.setTopic(topic, initialPhase);
    this.switchTab('studio');
  }

  updateHeaderBadges() {
    const total = TOPICS_DATA.topics.length;
    const drawn = appState.state.drawnSet.size;
    const remaining = total - drawn;

    const countEl = document.getElementById('headerDeckCount');
    if (countEl) {
      countEl.textContent = `${remaining}/${total}`;
    }
  }

  syncAudio() {
    const audioBtn = document.getElementById('audioToggleBtn');
    if (audioBtn) {
      audioBtn.innerHTML = sound.isMuted() ? icons.soundOff : icons.soundOn;
    }
  }

  bindGlobalEvents() {
    // Tab buttons
    document.querySelectorAll('.nav-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchTab(e.currentTarget.dataset.tab);
      });
    });

    // Brand logo returns to Draw tab
    const brandBtn = document.getElementById('brandHomeBtn');
    if (brandBtn) {
      brandBtn.addEventListener('click', () => {
        this.switchTab('draw');
      });
    }

    // Language toggle button
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        sound.playClick();
        i18n.toggleLang();
      });
    }

    // Audio toggle
    const audioBtn = document.getElementById('audioToggleBtn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const isMuted = sound.toggleMute();
        audioBtn.innerHTML = isMuted ? icons.soundOff : icons.soundOn;
        if (!isMuted) sound.playClick();
      });
    }

    // Close modal on Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
      }
    });

    // Subscribe to state changes to update header
    appState.subscribe(() => {
      this.updateHeaderBadges();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.wonderdraw = new WonderdrawApp();
});
