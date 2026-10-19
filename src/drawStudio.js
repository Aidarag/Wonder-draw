import { TOPICS_DATA } from '../data/topics.js';
import { appState } from './state.js';
import { sound } from './audio.js';
import { fireConfetti } from './confetti.js';
import { icons } from './icons.js';
import { i18n } from './i18n.js';

export class DrawStudio {
  constructor(container, onEnterStudio) {
    this.container = container;
    this.onEnterStudio = onEnterStudio;
    this.currentTopic = null;
    this.isDrawing = false;

    this.render();
    this.bindEvents();
    this.setupCardTilt();

    // Subscribe to language change
    this.unsubscribeLang = i18n.subscribe(() => {
      this.updateTexts();
      if (this.currentTopic) {
        this.displaySingleTopic(this.currentTopic, false);
      }
    });

    // Subscribe to state change (e.g. research timer completion)
    this.unsubscribeState = appState.subscribe(() => {
      this.updateStudioButtonState();
    });

    // If there is an active topic from state, show it
    if (appState.state.activeTopicId) {
      const saved = TOPICS_DATA.topics.find(t => t.id === appState.state.activeTopicId);
      if (saved) {
        this.displaySingleTopic(saved, false);
      }
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="draw-studio-layout">
        <!-- Single Card Stage -->
        <div id="singleCardStage" class="card-stage-container">
          <div class="interactive-3d-card" id="main3dCard">
            <!-- Card Front (Deck Face) -->
            <div class="card-face card-front">
              <div class="card-front-pattern"></div>
              <div class="card-front-orb">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <circle cx="8" cy="8" r="1.5" fill="#FFFFFF"></circle>
                  <circle cx="16" cy="16" r="1.5" fill="#FFFFFF"></circle>
                  <circle cx="12" cy="12" r="1.5" fill="#FFFFFF"></circle>
                  <circle cx="16" cy="8" r="1.5" fill="#FFFFFF"></circle>
                  <circle cx="8" cy="16" r="1.5" fill="#FFFFFF"></circle>
                </svg>
              </div>
              <h2 id="deckFrontTitle">${i18n.t('deckCoverTitle')}</h2>
              <p id="deckFrontDesc">${i18n.t('deckCoverDesc')}</p>
            </div>

            <!-- Card Back (Revealed Topic) -->
            <div class="card-face card-back" id="cardBackFace">
              <div class="card-back-header">
                <span class="topic-category-badge" id="cardCategoryBadge">Catégorie</span>
                <span class="topic-id-pill" id="cardTopicId">#000</span>
              </div>

              <div class="card-back-body">
                <h2 class="topic-reveal-title" id="cardTopicTitle">Titre du Sujet</h2>
                <div class="topic-guidance-callout" id="cardGuidanceBox">
                  <span class="guidance-icon">${icons.info}</span>
                  <span id="cardGuidanceText">${i18n.t('topicPlaceholderDesc')}</span>
                </div>
              </div>

              <div class="card-back-footer">
                <div class="card-back-actions">
                  <button class="card-btn" id="cardFavBtn" title="Favori">
                    <span class="fav-icon-slot">${icons.heartOutline}</span> <span id="favBtnLabel">${i18n.t('btnFavorite')}</span>
                  </button>
                  <button class="card-btn" id="cardThemeBtn" title="${i18n.t('themeFilterTitle')}">
                    <span class="theme-icon-slot">${icons.collection}</span> <span id="themeBtnLabel">${i18n.t('btnThemes')}</span>
                  </button>
                  <a href="#" target="_blank" class="card-btn" id="cardSearchLink" title="Explorer">
                    ${icons.search} <span id="exploreBtnLabel">${i18n.t('btnExplore')}</span>
                  </a>
                </div>
                <button class="primary-enter-studio-btn" id="cardEnterStudioBtn">
                  <span class="enter-studio-icon" id="enterStudioBtnIcon">${icons.timer}</span>
                  <span id="enterStudioBtnLabel">${i18n.t('btnResearchPhase')}</span>
                  ${icons.arrowRight}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Global Draw Controls Bar -->
        <div class="draw-controls-bar">
          <button class="big-draw-button" id="primaryDrawBtn">
            <span class="draw-btn-icon">${icons.draw}</span>
            <span id="primaryDrawBtnLabel">${i18n.t('btnDraw')}</span>
          </button>

          <div class="draw-options-row">
            <label class="draw-checkbox-label">
              <input type="checkbox" id="excludeDrawnCheck" ${appState.state.excludeDrawn ? 'checked' : ''}>
              <span id="excludeDrawnLabel">${i18n.t('optExcludeDrawn')}</span>
            </label>
            <span style="opacity: 0.3;">•</span>
            <button class="theme-filter-pill" id="quickThemeFilterBtn" title="${i18n.t('themeFilterTitle')}">
              ${icons.collection} <span id="activeThemePillLabel">${this.getActiveThemeSummary()}</span>
            </button>
            <span style="opacity: 0.3;">•</span>
            <span id="poolCounterText" style="font-weight: 600;">1 000 ${i18n.t('topicsRemaining')}</span>
            <span style="opacity: 0.3;">•</span>
            <a href="#" id="resetPoolLink" style="color: var(--accent-purple); text-decoration: none; font-size: 0.8rem;">${i18n.t('btnResetDeck')}</a>
          </div>
        </div>
      </div>
    `;

    this.updatePoolCounter();
  }

  updateTexts() {
    const frontTitle = this.container.querySelector('#deckFrontTitle');
    const frontDesc = this.container.querySelector('#deckFrontDesc');
    const drawLabel = this.container.querySelector('#primaryDrawBtnLabel');
    const excludeLabel = this.container.querySelector('#excludeDrawnLabel');
    const resetLink = this.container.querySelector('#resetPoolLink');
    const favLabel = this.container.querySelector('#favBtnLabel');
    const exploreLabel = this.container.querySelector('#exploreBtnLabel');
    const studioLabel = this.container.querySelector('#enterStudioBtnLabel');

    if (frontTitle) frontTitle.textContent = i18n.t('deckCoverTitle');
    if (frontDesc) frontDesc.textContent = i18n.t('deckCoverDesc');
    if (drawLabel) drawLabel.textContent = i18n.t('btnDraw');
    if (excludeLabel) excludeLabel.textContent = i18n.t('optExcludeDrawn');
    if (resetLink) resetLink.textContent = i18n.t('btnResetDeck');
    if (favLabel) favLabel.textContent = i18n.t('btnFavorite');
    if (exploreLabel) exploreLabel.textContent = i18n.t('btnExplore');
    
    const themeLabel = this.container.querySelector('#themeBtnLabel');
    if (themeLabel) themeLabel.textContent = i18n.t('btnThemes');
    const cardThemeBtn = this.container.querySelector('#cardThemeBtn');
    if (cardThemeBtn) cardThemeBtn.title = i18n.t('themeFilterTitle');
    const quickThemeBtn = this.container.querySelector('#quickThemeFilterBtn');
    if (quickThemeBtn) quickThemeBtn.title = i18n.t('themeFilterTitle');

    this.updateStudioButtonState();
    this.updatePoolCounter();

    if (this.currentTopic) {
      this.populateTopicData(this.currentTopic);
    }
  }

  bindEvents() {
    // Primary draw button
    const drawBtn = this.container.querySelector('#primaryDrawBtn');
    drawBtn.addEventListener('click', () => {
      this.handleDraw();
    });

    // Exclude drawn checkbox
    const excludeCheck = this.container.querySelector('#excludeDrawnCheck');
    excludeCheck.addEventListener('change', (e) => {
      sound.playClick();
      appState.setExcludeDrawn(e.target.checked);
      this.updatePoolCounter();
    });

    // Reset pool link
    const resetLink = this.container.querySelector('#resetPoolLink');
    resetLink.addEventListener('click', (e) => {
      e.preventDefault();
      sound.playClick();
      appState.resetDeck();
      this.updatePoolCounter();
    });

    // Card Favorite Button
    const favBtn = this.container.querySelector('#cardFavBtn');
    favBtn.addEventListener('click', () => {
      if (!this.currentTopic) return;
      sound.playClick();
      const isFav = appState.toggleFavorite(this.currentTopic.id);
      this.updateFavButtonState(isFav);
    });

    // Card Theme Filter Button (between Favorite and Explore)
    const cardThemeBtn = this.container.querySelector('#cardThemeBtn');
    if (cardThemeBtn) {
      cardThemeBtn.addEventListener('click', () => {
        sound.playClick();
        this.openThemeModal();
      });
    }

    // Quick Theme Filter Pill in Controls Bar
    const quickThemeBtn = this.container.querySelector('#quickThemeFilterBtn');
    if (quickThemeBtn) {
      quickThemeBtn.addEventListener('click', () => {
        sound.playClick();
        this.openThemeModal();
      });
    }

    // Close Theme Modal Handlers
    const closeThemeBtn = document.getElementById('closeThemeModalBtn');
    if (closeThemeBtn) {
      closeThemeBtn.addEventListener('click', () => {
        sound.playClick();
        this.closeThemeModal();
      });
    }
    const themeModal = document.getElementById('themeModal');
    if (themeModal) {
      themeModal.addEventListener('click', (e) => {
        if (e.target === themeModal) {
          this.closeThemeModal();
        }
      });
    }

    // Enter Studio CTA Button
    const enterStudioBtn = this.container.querySelector('#cardEnterStudioBtn');
    enterStudioBtn.addEventListener('click', () => {
      if (!this.currentTopic) return;
      sound.playClick();
      const isResearchDone = appState.isResearchDone(this.currentTopic.id);
      const targetPhase = isResearchDone ? 'video' : 'research';
      if (this.onEnterStudio) {
        this.onEnterStudio(this.currentTopic, targetPhase);
      }
    });

    // Click directly on the 3D card to trigger draw
    const card = this.container.querySelector('#main3dCard');
    if (card) {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-btn') || e.target.closest('.primary-enter-studio-btn') || e.target.closest('a')) {
          return;
        }
        if (!this.isDrawing) {
          this.handleDraw();
        }
      });
    }
  }

  updateStudioButtonState() {
    const btn = this.container.querySelector('#cardEnterStudioBtn');
    const label = this.container.querySelector('#enterStudioBtnLabel');
    const iconSlot = this.container.querySelector('#enterStudioBtnIcon');
    if (!btn || !label) return;

    const isResearchDone = this.currentTopic && appState.isResearchDone(this.currentTopic.id);
    if (isResearchDone) {
      label.textContent = i18n.t('btnTalkPhase');
      if (iconSlot) iconSlot.innerHTML = icons.mic;
      btn.classList.add('talk-phase-ready');
      btn.title = i18n.t('btnTalkPhase');
    } else {
      label.textContent = i18n.t('btnResearchPhase');
      if (iconSlot) iconSlot.innerHTML = icons.timer;
      btn.classList.remove('talk-phase-ready');
      btn.title = i18n.t('btnResearchPhase');
    }
  }

  getEligibleTopics() {
    let pool = TOPICS_DATA.topics;

    // Filter by selected category (if not 'all')
    const selectedCategory = appState.state.selectedCategory;
    if (selectedCategory && selectedCategory !== 'all') {
      pool = pool.filter(t => t.categoryId === selectedCategory);
    }

    if (appState.state.excludeDrawn) {
      pool = pool.filter(t => !appState.isDrawn(t.id));
    }

    return pool;
  }

  getActiveThemeSummary() {
    const selected = appState.state.selectedCategory;
    if (!selected || selected === 'all') {
      return i18n.t('themeAllOption');
    }
    return i18n.getCategoryName(selected);
  }

  updatePoolCounter() {
    const pool = this.getEligibleTopics();
    const counter = this.container.querySelector('#poolCounterText');
    const quickPillLabel = this.container.querySelector('#activeThemePillLabel');
    const quickPillBtn = this.container.querySelector('#quickThemeFilterBtn');

    if (quickPillLabel) {
      quickPillLabel.textContent = this.getActiveThemeSummary();
    }
    if (quickPillBtn) {
      quickPillBtn.classList.toggle('active-filtered', !!(appState.state.selectedCategory && appState.state.selectedCategory !== 'all'));
    }

    if (counter) {
      const selectedCategory = appState.state.selectedCategory;
      if (selectedCategory && selectedCategory !== 'all') {
        const catName = i18n.getCategoryName(selectedCategory);
        counter.textContent = `${pool.length} ${i18n.t('topicsRemaining')} (${catName})`;
      } else {
        counter.textContent = `${pool.length} ${i18n.t('topicsRemaining')}`;
      }
    }
  }

  openThemeModal() {
    this.renderThemeOptions();
    const modal = document.getElementById('themeModal');
    if (modal) modal.classList.add('open');
  }

  closeThemeModal() {
    const modal = document.getElementById('themeModal');
    if (modal) modal.classList.remove('open');
  }

  renderThemeOptions() {
    const container = document.getElementById('themeOptionsContainer');
    if (!container) return;

    const selected = appState.state.selectedCategory || 'all';

    // 1. All Themes (Global) Option
    let html = `
      <button class="theme-option-card ${selected === 'all' ? 'selected' : ''}" data-category="all">
        <div class="theme-option-left">
          <div class="theme-color-dot" style="background: var(--gradient-brand); color: #3670FF;"></div>
          <div class="theme-option-title">${i18n.t('themeAllOption')}</div>
        </div>
        <div class="theme-option-check">${icons.check}</div>
      </button>
    `;

    // 2. Each of the 10 Categories
    for (const cat of TOPICS_DATA.categories) {
      const catName = i18n.getCategoryName(cat.id);
      const isSelected = selected === cat.id;

      html += `
        <button class="theme-option-card ${isSelected ? 'selected' : ''}" data-category="${cat.id}">
          <div class="theme-option-left">
            <div class="theme-color-dot" style="background: ${cat.colors.primary}; color: ${cat.colors.primary};"></div>
            <div class="theme-option-title">${catName}</div>
          </div>
          <div class="theme-option-check">${icons.check}</div>
        </button>
      `;
    }

    container.innerHTML = html;

    container.querySelectorAll('.theme-option-card').forEach(card => {
      card.addEventListener('click', () => {
        const catId = card.dataset.category;
        sound.playClick();
        appState.setCategory(catId);
        this.closeThemeModal();
        this.updatePoolCounter();
      });
    });
  }

  handleDraw() {
    if (this.isDrawing) return;

    const pool = this.getEligibleTopics();
    if (pool.length === 0) {
      alert(i18n.t('alertPoolEmpty'));
      return;
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    const pickedTopic = pool[randomIndex];

    this.isDrawing = true;
    sound.playShuffle();

    const drawBtn = this.container.querySelector('#primaryDrawBtn');
    const drawLabel = this.container.querySelector('#primaryDrawBtnLabel');
    if (drawBtn) {
      drawBtn.classList.add('drawing-active');
      drawBtn.disabled = true;
    }
    if (drawLabel) {
      drawLabel.textContent = i18n.t('btnDrawing') || 'Tirage en cours...';
    }

    const card = this.container.querySelector('#main3dCard');
    if (!card) return;

    if (this.drawAnimId) {
      cancelAnimationFrame(this.drawAnimId);
      this.drawAnimId = null;
    }

    const isInitiallyFlipped = card.classList.contains('flipped');
    const startAngle = isInitiallyFlipped ? 180 : 0;
    // 5 full 360° revolutions + land on 180° back face (total 1980°)
    const targetAngle = 1980;

    card.classList.add('is-shuffling');

    const DURATION = 3000; // 3 seconds flipping animation as requested
    const startTime = performance.now();
    let lastTickTime = 0;
    let lastShuffleTime = 0;

    const easeLotterySpin = (p) => {
      if (p <= 0) return 0;
      if (p >= 1) return 1;
      if (p < 0.15) {
        return (p / 0.15) * (p / 0.15) * 0.15;
      }
      const t = (p - 0.15) / 0.85;
      const decel = 1 - Math.pow(1 - t, 2.7);
      return 0.15 + 0.85 * decel;
    };

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = easeLotterySpin(progress);
      const currentAngle = startAngle + (targetAngle - startAngle) * eased;

      const lift = Math.sin(progress * Math.PI) * -24;
      const scale = 1 + Math.sin(progress * Math.PI) * 0.05;

      card.style.transform = `translateY(${lift}px) scale(${scale}) rotateY(${currentAngle}deg)`;

      // Dynamic procedural ticks that decelerate as spin slows down
      const tickDelay = progress < 0.6 ? 75 : 75 + Math.pow((progress - 0.6) / 0.4, 2) * 220;
      if (now - lastTickTime >= tickDelay) {
        sound.playTick();
        lastTickTime = now;

        if (progress < 0.85) {
          const previewTopic = pool[Math.floor(Math.random() * pool.length)];
          this.populateTopicPreview(previewTopic);
        }
      }

      if (progress > 0.4 && now - lastShuffleTime > 1200) {
        sound.playShuffle();
        lastShuffleTime = now;
      }

      if (progress >= 0.85 && this.currentTopic !== pickedTopic) {
        this.populateTopicData(pickedTopic);
      }

      if (progress < 1) {
        this.drawAnimId = requestAnimationFrame(step);
      } else {
        this.drawAnimId = null;
        card.classList.remove('is-shuffling');
        card.style.transform = '';
        card.classList.add('flipped');

        this.populateTopicData(pickedTopic);
        appState.markDrawn(pickedTopic);

        sound.playFlip();
        sound.playReveal();

        fireConfetti({
          colors: [pickedTopic.colors.primary, pickedTopic.colors.secondary, '#3670FF', '#EFEFEF', '#FFFFFF']
        });

        if (drawBtn) {
          drawBtn.classList.remove('drawing-active');
          drawBtn.disabled = false;
        }
        if (drawLabel) {
          drawLabel.textContent = i18n.t('btnDraw');
        }

        this.updatePoolCounter();
        this.isDrawing = false;
      }
    };

    this.drawAnimId = requestAnimationFrame(step);
  }

  populateTopicPreview(topic) {
    const badge = this.container.querySelector('#cardCategoryBadge');
    const topicId = this.container.querySelector('#cardTopicId');
    const title = this.container.querySelector('#cardTopicTitle');
    const cardBackFace = this.container.querySelector('#cardBackFace');

    if (!badge || !title) return;

    badge.textContent = i18n.getCategoryName(topic.categoryId);
    badge.style.background = topic.colors.gradient;
    topicId.textContent = `#${topic.id} (${topic.topicNumber}/100)`;
    title.textContent = topic.title;

    title.classList.remove('title-medium', 'title-long', 'title-xlarge');
    if (topic.title.length > 40) {
      title.classList.add('title-long');
    } else if (topic.title.length > 22) {
      title.classList.add('title-medium');
    } else {
      title.classList.add('title-xlarge');
    }

    if (cardBackFace) {
      cardBackFace.style.borderColor = topic.colors.primary;
    }
  }

  populateTopicData(topic) {
    this.currentTopic = topic;

    const badge = this.container.querySelector('#cardCategoryBadge');
    const topicId = this.container.querySelector('#cardTopicId');
    const title = this.container.querySelector('#cardTopicTitle');
    const guidanceText = this.container.querySelector('#cardGuidanceText');
    const searchLink = this.container.querySelector('#cardSearchLink');
    const cardBackFace = this.container.querySelector('#cardBackFace');

    if (!badge || !title) return;

    const localizedCategory = i18n.getCategoryName(topic.categoryId);
    const localizedGuidance = i18n.getTopicDescription(topic);

    badge.textContent = localizedCategory;
    badge.style.background = topic.colors.gradient;
    topicId.textContent = `#${topic.id} (${topic.topicNumber}/100)`;
    title.textContent = topic.title;

    title.classList.remove('title-medium', 'title-long', 'title-xlarge');
    if (topic.title.length > 40) {
      title.classList.add('title-long');
    } else if (topic.title.length > 22) {
      title.classList.add('title-medium');
    } else {
      title.classList.add('title-xlarge');
    }

    if (guidanceText) guidanceText.textContent = localizedGuidance;
    if (searchLink) searchLink.href = `https://www.google.com/search?q=${encodeURIComponent(topic.title)}`;

    if (cardBackFace) {
      cardBackFace.style.borderColor = topic.colors.primary;
      cardBackFace.style.boxShadow = `0 0 40px ${topic.colors.primary}33, var(--shadow-lg)`;
    }

    this.updateFavButtonState(appState.isFavorite(topic.id));
    this.updateStudioButtonState();
  }

  displaySingleTopic(topic, isNewDraw = false) {
    const card = this.container.querySelector('#main3dCard');
    this.populateTopicData(topic);
    if (card) {
      card.classList.add('flipped');
      card.style.transform = '';
    }
    if (isNewDraw) {
      appState.markDrawn(topic);
    }
    this.updatePoolCounter();
  }

  updateFavButtonState(isFav) {
    const favBtn = this.container.querySelector('#cardFavBtn');
    if (!favBtn) return;
    const slot = favBtn.querySelector('.fav-icon-slot');
    if (isFav) {
      favBtn.classList.add('active-favorite');
      slot.innerHTML = icons.heartFill;
    } else {
      favBtn.classList.remove('active-favorite');
      slot.innerHTML = icons.heartOutline;
    }
  }

  setupCardTilt() {
    const card = this.container.querySelector('#main3dCard');
    const stage = this.container.querySelector('#singleCardStage');

    if (!card || !stage) return;

    stage.addEventListener('mousemove', (e) => {
      if (this.isDrawing || card.classList.contains('flipped')) return;
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    stage.addEventListener('mouseleave', () => {
      if (this.isDrawing) return;
      card.style.transform = '';
    });
  }
}
