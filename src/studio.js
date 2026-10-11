import { TOPICS_DATA } from '../data/topics.js';
import { appState } from './state.js';
import { sound } from './audio.js';
import { fireConfetti } from './confetti.js';
import { icons } from './icons.js';
import { i18n } from './i18n.js';

export class ChallengeStudio {
  constructor(container, onTopicCompleted) {
    this.container = container;
    this.onTopicCompleted = onTopicCompleted;
    this.topic = null;
    
    // Active stage: 'research' (10 min) or 'video' (60s)
    this.currentPhase = 'research';

    // Phase 1: Research Timer (10 min = 600s)
    this.researchRemaining = 600;
    this.researchRunning = false;
    this.researchInterval = null;

    // Phase 2: Video Pitch Timer (60s)
    this.videoRemaining = 60;
    this.videoRunning = false;
    this.videoInterval = null;

    this.saveTimer = null;

    this.render();
    this.bindEvents();

    // Subscribe to language change
    this.unsubscribeLang = i18n.subscribe(() => {
      this.updateTexts();
      if (this.topic) {
        this.updateTopicHeader();
      }
    });
  }

  setTopic(topic, initialPhase = null) {
    this.topic = topic;
    this.currentPhase = initialPhase || (appState.isResearchDone(topic.id) ? 'video' : 'research');
    this.resetResearchTimer();
    this.resetVideoTimer();
    this.updateTopicHeader();
    this.loadSavedNotes();
    this.switchPhase(this.currentPhase);
  }

  render() {
    this.container.innerHTML = `
      <div class="studio-layout">
        <!-- Top Banner: Topic & Guidance -->
        <div class="studio-topic-card" id="studioTopicCard">
          <div class="studio-topic-left">
            <div class="studio-topic-meta">
              <span class="topic-category-badge" id="studioCatBadge">Catégorie</span>
              <span class="topic-id-pill" id="studioTopicId">#1 (1/100)</span>
            </div>
            <h2 class="studio-topic-title" id="studioTitle">Titre du Sujet</h2>
            <div class="studio-topic-rule-badge" id="studioRuleBox">
              <span style="color:var(--accent-purple);">${icons.info}</span>
              <span id="studioRuleText">${i18n.t('guidanceBoxTitle')}</span>
            </div>
          </div>
          <div class="studio-topic-actions">
            <button class="card-btn" id="studioFavBtn">
              <span class="fav-icon-slot">${icons.heartOutline}</span> <span id="studioFavLabel">${i18n.t('btnFavorite')}</span>
            </button>
          </div>
        </div>

        <!-- Left Column: Guidance, Links & Teleprompter -->
        <div class="pitch-framework-panel">
          <div class="panel-header-title">
            <h3 id="pitchOutlineHeading">${i18n.t('pitchOutlineTitle')}</h3>
            <span style="font-size:0.78rem; color:var(--text-muted);" id="pitchOutlineSub">${i18n.t('pitchOutlineSub')}</span>
          </div>

          <!-- Quick Research Links (Step 1 Focus) -->
          <div class="teleprompter-box">
            <div class="teleprompter-label">
              <span id="researchResLabel">${i18n.t('researchResourcesTitle')}</span>
            </div>
            <div class="quick-research-links" id="researchLinksContainer">
              <!-- Injected dynamically -->
            </div>
          </div>

          <!-- Pitch Structure Outline (Step 2 Focus) -->
          <div class="pitch-steps-guide">
            <div class="pitch-step-item" style="border-left-color: #8B5CF6;">
              <div class="pitch-step-time" id="step1TimeLabel">${i18n.t('step1Time')}</div>
              <div class="pitch-step-content">
                <strong id="step1TitleLabel">${i18n.t('step1Title')}</strong>
                <p id="step1DescLabel">${i18n.t('step1Desc')}</p>
              </div>
            </div>

            <div class="pitch-step-item" style="border-left-color: #3B82F6;">
              <div class="pitch-step-time" id="step2TimeLabel">${i18n.t('step2Time')}</div>
              <div class="pitch-step-content">
                <strong id="step2TitleLabel">${i18n.t('step2Title')}</strong>
                <p id="step2DescLabel">${i18n.t('step2Desc')}</p>
              </div>
            </div>

            <div class="pitch-step-item" style="border-left-color: #10B981;">
              <div class="pitch-step-time" id="step3TimeLabel">${i18n.t('step3Time')}</div>
              <div class="pitch-step-content">
                <strong id="step3TitleLabel">${i18n.t('step3Title')}</strong>
                <p id="step3DescLabel">${i18n.t('step3Desc')}</p>
              </div>
            </div>
          </div>

          <!-- Notes / Teleprompter -->
          <div class="teleprompter-box">
            <div class="teleprompter-label">
              <span id="notesHeadingLabel">${i18n.t('notesLabel')}</span>
              <span id="notesSavedIndicator" style="font-size:0.75rem; color:var(--accent-emerald); opacity:0; transition:opacity 200ms;">${i18n.t('notesSaved')}</span>
            </div>
            <textarea class="teleprompter-textarea" id="studioNotesTextarea" placeholder="${i18n.t('notesPlaceholder')}"></textarea>
          </div>
        </div>

        <!-- Right Column: Dual Chronometer Stage (10 min & 60s) -->
        <div class="recorder-panel">
          <!-- Phase Segmented Switcher -->
          <div class="draw-mode-segmented" style="width:100%; justify-content:center;">
            <button class="mode-segment-btn active" id="phaseBtnResearch" data-phase="research">
              ${icons.timer} <span id="phaseBtnResearchLabel">${i18n.t('phaseResearchBtn')}</span>
            </button>
            <button class="mode-segment-btn" id="phaseBtnVideo" data-phase="video">
              ${icons.play} <span id="phaseBtnVideoLabel">${i18n.t('phaseVideoBtn')}</span>
            </button>
          </div>

          <!-- Chrono 1: 10-Minute Research Timer -->
          <div id="chronoStageResearch" style="width:100%; display:flex; flex-direction:column; align-items:center; gap:1.25rem;">
            <div style="text-align:center;">
              <h3 style="font-family:var(--font-display); font-size:1.3rem; font-weight:400; text-transform:uppercase; letter-spacing:-0.02em; line-height:1;" id="researchHeadLabel">${i18n.t('researchHeading')}</h3>
              <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.2rem;" id="researchSubLabel">
                ${i18n.t('researchSub')}
              </p>
            </div>

            <!-- 10-Min Circular Progress Ring -->
            <div class="timer-radial-stage">
              <svg class="timer-svg" viewBox="0 0 170 170">
                <circle class="timer-circle-bg" cx="85" cy="85" r="70"></circle>
                <circle class="timer-circle-progress" id="researchProgressCircle" cx="85" cy="85" r="70"></circle>
              </svg>
              <div class="timer-digits-center">
                <span class="timer-number" id="researchTimeDisplay" style="font-size:2.8rem; line-height: 0.88;">10:00</span>
                <span class="timer-unit-label" id="researchUnitText">${i18n.t('researchUnitLabel')}</span>
              </div>
            </div>

            <!-- Controls: Start / Pause / Reset -->
            <div class="recorder-actions-row">
              <button class="record-main-btn" id="researchToggleBtn" style="background:var(--accent-blue); box-shadow: 0 4px 18px rgba(59, 130, 246, 0.4);">
                <span class="timer-ctrl-icon" id="researchToggleIcon">${icons.play}</span>
                <span id="researchBtnLabel">${i18n.t('btnStartResearch')}</span>
              </button>
              <button class="card-btn" id="researchResetBtn" title="${i18n.t('btnReset')}">
                ${icons.reset} <span id="researchResetLabel">${i18n.t('btnReset')}</span>
              </button>
            </div>

            <!-- Next Step Prompt -->
            <div style="width:100%; margin-top:0.5rem; text-align:center;">
              <button class="card-btn" id="skipToVideoBtn" style="display:inline-flex; align-items:center; gap:0.45rem; padding:0.6rem 1.1rem; font-size:0.82rem;">
                <span id="skipToVideoLabel">${i18n.t('btnSkipToVideo')}</span> ${icons.arrowRight}
              </button>
            </div>
          </div>

          <!-- Chrono 2: 60-Second Video Pitch Timer -->
          <div id="chronoStageVideo" style="width:100%; display:none; flex-direction:column; align-items:center; gap:1.25rem;">
            <div style="text-align:center;">
              <h3 style="font-family:var(--font-display); font-size:1.3rem; font-weight:400; text-transform:uppercase; letter-spacing:-0.02em; line-height:1;" id="videoHeadLabel">${i18n.t('videoHeading')}</h3>
              <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.2rem;" id="videoSubLabel">
                ${i18n.t('videoSub')}
              </p>
            </div>

            <!-- 60-Sec Circular Progress Ring -->
            <div class="timer-radial-stage">
              <svg class="timer-svg" viewBox="0 0 170 170">
                <circle class="timer-circle-bg" cx="85" cy="85" r="70"></circle>
                <circle class="timer-circle-progress" id="videoProgressCircle" cx="85" cy="85" r="70"></circle>
              </svg>
              <div class="timer-digits-center">
                <span class="timer-number" id="videoTimeDisplay">60</span>
                <span class="timer-unit-label" id="videoUnitText">${i18n.t('videoUnitLabel')}</span>
              </div>
            </div>

            <!-- Controls: Start / Pause / Reset -->
            <div class="recorder-actions-row">
              <button class="record-main-btn" id="videoToggleBtn" style="background:var(--accent-purple); box-shadow: 0 4px 18px rgba(139, 92, 246, 0.4);">
                <span class="timer-ctrl-icon" id="videoToggleIcon">${icons.play}</span>
                <span id="videoBtnLabel">${i18n.t('btnStartVideo')}</span>
              </button>
              <button class="card-btn" id="videoResetBtn" title="${i18n.t('btnReset')}">
                ${icons.reset} <span id="videoResetLabel">${i18n.t('btnReset')}</span>
              </button>
            </div>

            <!-- Mark as Completed Action -->
            <div style="width:100%; margin-top:0.5rem; padding-top:1.2rem; border-top:1px solid var(--border-subtle); display:flex; flex-direction:column; gap:0.75rem;">
              <button class="card-btn" id="markDoneBtn" style="justify-content:center; padding:0.85rem; font-weight:700; background:var(--bg-surface-elevated); border-color:var(--border-medium);">
                ${icons.check} <span id="markDoneBtnLabel">${i18n.t('btnMarkDone')}</span>
              </button>
              <span style="text-align:center; font-size:0.78rem; color:var(--text-muted);" id="markDoneSubLabel">
                ${i18n.t('markDoneSub')}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  updateTexts() {
    const favLabel = this.container.querySelector('#studioFavLabel');
    const copyLabel = this.container.querySelector('#studioCopyLabel');
    const outlineHeading = this.container.querySelector('#pitchOutlineHeading');
    const outlineSub = this.container.querySelector('#pitchOutlineSub');
    const resResLabel = this.container.querySelector('#researchResLabel');
    const step1Title = this.container.querySelector('#step1TitleLabel');
    const step1Desc = this.container.querySelector('#step1DescLabel');
    const step2Title = this.container.querySelector('#step2TitleLabel');
    const step2Desc = this.container.querySelector('#step2DescLabel');
    const step3Title = this.container.querySelector('#step3TitleLabel');
    const step3Desc = this.container.querySelector('#step3DescLabel');
    const notesHeading = this.container.querySelector('#notesHeadingLabel');
    const notesPlaceholder = this.container.querySelector('#studioNotesTextarea');
    const btnResPhase = this.container.querySelector('#phaseBtnResearchLabel');
    const btnVidPhase = this.container.querySelector('#phaseBtnVideoLabel');
    const resHead = this.container.querySelector('#researchHeadLabel');
    const resSub = this.container.querySelector('#researchSubLabel');
    const resUnit = this.container.querySelector('#researchUnitText');
    const resBtn = this.container.querySelector('#researchBtnLabel');
    const resReset = this.container.querySelector('#researchResetLabel');
    const skipBtn = this.container.querySelector('#skipToVideoLabel');
    const vidHead = this.container.querySelector('#videoHeadLabel');
    const vidSub = this.container.querySelector('#videoSubLabel');
    const vidUnit = this.container.querySelector('#videoUnitText');
    const vidBtn = this.container.querySelector('#videoBtnLabel');
    const vidReset = this.container.querySelector('#videoResetLabel');
    const markDone = this.container.querySelector('#markDoneBtnLabel');
    const markDoneSub = this.container.querySelector('#markDoneSubLabel');

    if (favLabel) favLabel.textContent = i18n.t('btnFavorite');
    if (outlineHeading) outlineHeading.textContent = i18n.t('pitchOutlineTitle');
    if (outlineSub) outlineSub.textContent = i18n.t('pitchOutlineSub');
    if (resResLabel) resResLabel.textContent = i18n.t('researchResourcesTitle');
    if (step1Title) step1Title.textContent = i18n.t('step1Title');
    if (step1Desc) step1Desc.textContent = i18n.t('step1Desc');
    if (step2Title) step2Title.textContent = i18n.t('step2Title');
    if (step2Desc) step2Desc.textContent = i18n.t('step2Desc');
    if (step3Title) step3Title.textContent = i18n.t('step3Title');
    if (step3Desc) step3Desc.textContent = i18n.t('step3Desc');
    if (notesHeading) notesHeading.textContent = i18n.t('notesLabel');
    if (notesPlaceholder) notesPlaceholder.placeholder = i18n.t('notesPlaceholder');
    if (btnResPhase) btnResPhase.textContent = i18n.t('phaseResearchBtn');
    if (btnVidPhase) btnVidPhase.textContent = i18n.t('phaseVideoBtn');
    if (resHead) resHead.textContent = i18n.t('researchHeading');
    if (resSub) resSub.textContent = i18n.t('researchSub');
    if (resUnit) resUnit.textContent = i18n.t('researchUnitLabel');
    if (resBtn && !this.researchRunning) resBtn.textContent = i18n.t('btnStartResearch');
    if (resReset) resReset.textContent = i18n.t('btnReset');
    if (skipBtn) skipBtn.textContent = i18n.t('btnSkipToVideo');
    if (vidHead) vidHead.textContent = i18n.t('videoHeading');
    if (vidSub) vidSub.textContent = i18n.t('videoSub');
    if (vidUnit) vidUnit.textContent = i18n.t('videoUnitLabel');
    if (vidBtn && !this.videoRunning) vidBtn.textContent = i18n.t('btnStartVideo');
    if (vidReset) vidReset.textContent = i18n.t('btnReset');
    if (markDone) markDone.textContent = i18n.t('btnMarkDone');
    if (markDoneSub) markDoneSub.textContent = i18n.t('markDoneSub');
  }

  bindEvents() {
    // Phase tabs
    const phaseResearchBtn = this.container.querySelector('#phaseBtnResearch');
    const phaseVideoBtn = this.container.querySelector('#phaseBtnVideo');
    const skipBtn = this.container.querySelector('#skipToVideoBtn');

    phaseResearchBtn.addEventListener('click', () => {
      sound.playClick();
      this.switchPhase('research');
    });

    phaseVideoBtn.addEventListener('click', () => {
      sound.playClick();
      this.switchPhase('video');
    });

    skipBtn.addEventListener('click', () => {
      sound.playClick();
      if (this.topic) {
        appState.markResearchDone(this.topic.id);
      }
      this.switchPhase('video');
    });

    // Research Timer Controls
    const resToggleBtn = this.container.querySelector('#researchToggleBtn');
    resToggleBtn.addEventListener('click', () => {
      sound.playClick();
      if (this.researchRunning) {
        this.pauseResearchTimer();
      } else {
        this.startResearchTimer();
      }
    });

    const resResetBtn = this.container.querySelector('#researchResetBtn');
    resResetBtn.addEventListener('click', () => {
      sound.playClick();
      this.resetResearchTimer();
    });

    // Video Timer Controls
    const vidToggleBtn = this.container.querySelector('#videoToggleBtn');
    vidToggleBtn.addEventListener('click', () => {
      sound.playClick();
      if (this.videoRunning) {
        this.pauseVideoTimer();
      } else {
        this.startVideoTimer();
      }
    });

    const vidResetBtn = this.container.querySelector('#videoResetBtn');
    vidResetBtn.addEventListener('click', () => {
      sound.playClick();
      this.resetVideoTimer();
    });

    // Notes auto-save
    const notesTextarea = this.container.querySelector('#studioNotesTextarea');
    notesTextarea.addEventListener('input', (e) => {
      if (this.topic) {
        appState.saveNotes(this.topic.id, e.target.value);
        const indicator = this.container.querySelector('#notesSavedIndicator');
        indicator.textContent = i18n.t('notesSaved');
        indicator.style.opacity = '1';
        clearTimeout(this.saveTimer);
        this.saveTimer = setTimeout(() => {
          indicator.style.opacity = '0';
        }, 1200);
      }
    });

    // Favorite button
    const favBtn = this.container.querySelector('#studioFavBtn');
    favBtn.addEventListener('click', () => {
      if (!this.topic) return;
      sound.playClick();
      const isFav = appState.toggleFavorite(this.topic.id);
      this.updateFavButton(isFav);
    });

    // Mark as Completed Button
    const markDoneBtn = this.container.querySelector('#markDoneBtn');
    markDoneBtn.addEventListener('click', () => {
      if (!this.topic) return;
      sound.playSuccess();
      fireConfetti();
      appState.markCompleted(this.topic.id, { duration: 60 - this.videoRemaining });
      markDoneBtn.innerHTML = `${icons.check} <span>${i18n.t('btnMarkDoneFeedback')}</span>`;
      markDoneBtn.style.background = 'rgba(16, 185, 129, 0.15)';
      markDoneBtn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      markDoneBtn.style.color = 'var(--accent-emerald)';
      if (this.onTopicCompleted) {
        this.onTopicCompleted(this.topic);
      }
    });
  }

  switchPhase(phase) {
    this.currentPhase = phase;
    const btnRes = this.container.querySelector('#phaseBtnResearch');
    const btnVid = this.container.querySelector('#phaseBtnVideo');
    const stageRes = this.container.querySelector('#chronoStageResearch');
    const stageVid = this.container.querySelector('#chronoStageVideo');

    if (phase === 'research') {
      btnRes.classList.add('active');
      btnVid.classList.remove('active');
      stageRes.style.display = 'flex';
      stageVid.style.display = 'none';
    } else {
      btnRes.classList.remove('active');
      btnVid.classList.add('active');
      stageRes.style.display = 'none';
      stageVid.style.display = 'flex';
    }
  }

  updateTopicHeader() {
    if (!this.topic) return;

    const catBadge = this.container.querySelector('#studioCatBadge');
    const topicId = this.container.querySelector('#studioTopicId');
    const title = this.container.querySelector('#studioTitle');
    const ruleText = this.container.querySelector('#studioRuleText');
    const researchLinks = this.container.querySelector('#researchLinksContainer');
    const card = this.container.querySelector('#studioTopicCard');

    const localizedCategory = i18n.getCategoryName(this.topic.categoryId);
    const localizedGuidance = i18n.getGuidance(this.topic.categoryId) || this.topic.guidance;

    catBadge.textContent = localizedCategory;
    catBadge.style.background = this.topic.colors.gradient;
    topicId.textContent = `#${this.topic.id} (${this.topic.topicNumber}/100)`;
    title.textContent = this.topic.title;

    // Apply length-based responsive sizing class for Anton uppercase title
    title.classList.remove('title-medium', 'title-long', 'title-xlarge');
    if (this.topic.title.length > 40) {
      title.classList.add('title-long');
    } else if (this.topic.title.length > 22) {
      title.classList.add('title-medium');
    } else {
      title.classList.add('title-xlarge');
    }

    ruleText.textContent = localizedGuidance;
    card.style.borderColor = `${this.topic.colors.primary}55`;

    this.updateFavButton(appState.isFavorite(this.topic.id));

    const q = encodeURIComponent(this.topic.title);
    const wikiDomain = i18n.getLang() === 'fr' ? 'fr.wikipedia.org' : 'en.wikipedia.org';
    researchLinks.innerHTML = `
      <a href="https://www.google.com/search?q=${q}" target="_blank" class="research-link-chip">
        ${icons.search} <span>Google</span>
      </a>
      <a href="https://scholar.google.com/scholar?q=${q}" target="_blank" class="research-link-chip">
        ${icons.external} <span>Google Scholar</span>
      </a>
      <a href="https://${wikiDomain}/wiki/Special:Search?search=${q}" target="_blank" class="research-link-chip">
        ${icons.external} <span>${i18n.getLang() === 'fr' ? 'Wikipédia' : 'Wikipedia'}</span>
      </a>
      <a href="https://www.youtube.com/results?search_query=${q}" target="_blank" class="research-link-chip">
        ${icons.external} <span>YouTube</span>
      </a>
    `;

    const markDoneBtn = this.container.querySelector('#markDoneBtn');
    if (appState.isCompleted(this.topic.id)) {
      markDoneBtn.innerHTML = `${icons.check} <span>${i18n.t('btnAlreadyDone')}</span>`;
      markDoneBtn.style.background = 'rgba(16, 185, 129, 0.1)';
      markDoneBtn.style.color = 'var(--accent-emerald)';
    } else {
      markDoneBtn.innerHTML = `${icons.check} <span>${i18n.t('btnMarkDone')}</span>`;
      markDoneBtn.style.background = 'var(--bg-surface-elevated)';
      markDoneBtn.style.color = 'var(--text-primary)';
      markDoneBtn.style.borderColor = 'var(--border-medium)';
    }
  }

  updateFavButton(isFav) {
    const favBtn = this.container.querySelector('#studioFavBtn');
    if (!favBtn) return;
    const slot = favBtn.querySelector('.fav-icon-slot');
    const label = this.container.querySelector('#studioFavLabel');
    if (label) label.textContent = i18n.t('btnFavorite');
    if (isFav) {
      favBtn.classList.add('active-favorite');
      slot.innerHTML = icons.heartFill;
    } else {
      favBtn.classList.remove('active-favorite');
      slot.innerHTML = icons.heartOutline;
    }
  }

  loadSavedNotes() {
    if (!this.topic) return;
    const textarea = this.container.querySelector('#studioNotesTextarea');
    textarea.value = appState.getNotes(this.topic.id);
  }

  // --- Phase 1: 10-Minute Research Timer Logic ---
  startResearchTimer() {
    this.researchRunning = true;
    sound.init();

    const label = this.container.querySelector('#researchBtnLabel');
    const iconSlot = this.container.querySelector('#researchToggleIcon');
    label.textContent = i18n.t('btnPause');
    iconSlot.innerHTML = icons.pause;

    this.researchInterval = setInterval(() => {
      this.researchRemaining--;
      this.updateResearchDisplay();

      if (this.researchRemaining === 60) {
        sound.playWarning();
      }

      if (this.researchRemaining <= 0) {
        this.finishResearchTimer();
      }
    }, 1000);
  }

  pauseResearchTimer() {
    this.researchRunning = false;
    clearInterval(this.researchInterval);

    const label = this.container.querySelector('#researchBtnLabel');
    const iconSlot = this.container.querySelector('#researchToggleIcon');
    label.textContent = i18n.t('btnResumeResearch');
    iconSlot.innerHTML = icons.play;
  }

  finishResearchTimer() {
    this.pauseResearchTimer();
    this.researchRemaining = 0;
    this.updateResearchDisplay();

    if (this.topic) {
      appState.markResearchDone(this.topic.id);
    }

    sound.playGong();
    sound.playSuccess();
    fireConfetti();

    const label = this.container.querySelector('#researchBtnLabel');
    label.textContent = i18n.t('researchFinishedLabel');

    setTimeout(() => {
      this.switchPhase('video');
    }, 1200);
  }

  updateResearchDisplay() {
    const display = this.container.querySelector('#researchTimeDisplay');
    const circle = this.container.querySelector('#researchProgressCircle');

    const mins = Math.floor(this.researchRemaining / 60);
    const secs = this.researchRemaining % 60;
    display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    const circumference = 440;
    const offset = circumference - (this.researchRemaining / 600) * circumference;
    circle.style.strokeDashoffset = offset;

    if (this.researchRemaining <= 60) {
      circle.classList.add('warning');
    } else {
      circle.classList.remove('warning');
    }
  }

  resetResearchTimer() {
    clearInterval(this.researchInterval);
    this.researchRunning = false;
    this.researchRemaining = 600;
    this.updateResearchDisplay();

    const label = this.container.querySelector('#researchBtnLabel');
    const iconSlot = this.container.querySelector('#researchToggleIcon');
    if (label) label.textContent = i18n.t('btnStartResearch');
    if (iconSlot) iconSlot.innerHTML = icons.play;
  }

  // --- Phase 2: 60-Second Video Pitch Timer Logic ---
  startVideoTimer() {
    this.videoRunning = true;
    sound.init();

    const label = this.container.querySelector('#videoBtnLabel');
    const iconSlot = this.container.querySelector('#videoToggleIcon');
    label.textContent = i18n.t('btnPause');
    iconSlot.innerHTML = icons.pause;

    this.videoInterval = setInterval(() => {
      this.videoRemaining--;
      this.updateVideoDisplay();

      if (this.videoRemaining === 15) {
        sound.playWarning();
      }

      if (this.videoRemaining <= 0) {
        this.finishVideoTimer();
      }
    }, 1000);
  }

  pauseVideoTimer() {
    this.videoRunning = false;
    clearInterval(this.videoInterval);

    const label = this.container.querySelector('#videoBtnLabel');
    const iconSlot = this.container.querySelector('#videoToggleIcon');
    label.textContent = i18n.t('btnResumeVideo');
    iconSlot.innerHTML = icons.play;
  }

  finishVideoTimer() {
    this.pauseVideoTimer();
    this.videoRemaining = 0;
    this.updateVideoDisplay();

    sound.playGong();
    sound.playSuccess();
    fireConfetti();

    const label = this.container.querySelector('#videoBtnLabel');
    label.textContent = i18n.t('videoFinishedLabel');
  }

  updateVideoDisplay() {
    const display = this.container.querySelector('#videoTimeDisplay');
    const circle = this.container.querySelector('#videoProgressCircle');

    display.textContent = this.videoRemaining < 10 ? `0${this.videoRemaining}` : this.videoRemaining;

    const circumference = 440;
    const offset = circumference - (this.videoRemaining / 60) * circumference;
    circle.style.strokeDashoffset = offset;

    if (this.videoRemaining <= 15) {
      circle.classList.add('warning');
    } else {
      circle.classList.remove('warning');
    }
  }

  resetVideoTimer() {
    clearInterval(this.videoInterval);
    this.videoRunning = false;
    this.videoRemaining = 60;
    this.updateVideoDisplay();

    const label = this.container.querySelector('#videoBtnLabel');
    const iconSlot = this.container.querySelector('#videoToggleIcon');
    if (label) label.textContent = i18n.t('btnStartVideo');
    if (iconSlot) iconSlot.innerHTML = icons.play;
  }
}
