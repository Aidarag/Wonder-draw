// Internationalization (i18n) Engine for Wonderdraw (English / Français)

export const translations = {
  fr: {
    // Header & Meta
    appTitle: "Wonderdraw",
    tabDraw: "Tirage",
    tabStudio: "Chronos",
    tabStats: "Progression",
    deckBadgeTitle: "Sujets disponibles dans la pioche",
    toggleAudio: "Activer / Couper les effets sonores",
    switchLang: "Passer en Anglais (Switch to English)",

    // Draw Studio
    deckCoverTitle: "Wonderdraw Lottery",
    deckCoverDesc: "Piochez un sujet parmi les 1 000 thèmes répertoriés.",
    btnDraw: "Tirer un Sujet",
    btnDrawing: "Tirage en cours...",
    optExcludeDrawn: "Exclure les sujets déjà tirés",
    topicsRemaining: "sujets restants",
    btnResetDeck: "Réinitialiser la pioche",
    btnFavorite: "Favori",
    btnThemes: "Thèmes",
    btnExplore: "Explorer",
    btnGoToStudio: "Recherche 10 min",
    btnResearchPhase: "Recherche 10 min",
    btnTalkPhase: "Parler 1 min",
    themeFilterTitle: "Filtrer par Thème",
    themeFilterSub: "Choisissez une catégorie spécifique pour le tirage ou sélectionnez tous les thèmes.",
    themeAllOption: "Tous les thèmes (Global)",
    themeFilterActive: "Thème : {name}",
    alertPoolEmpty: "Toutes les cartes ont été tirées ! Cliquez sur \"Réinitialiser la pioche\" pour recommencer.",

    // Studio (10m Research & 60s Video)
    guidanceBoxTitle: "Conseil méthodologique",
    pitchOutlineTitle: "Cadrage & Notes de Recherche",
    pitchOutlineSub: "Préparation en 10 minutes",
    researchResourcesTitle: "Ressources de recherche en 1 clic",
    
    // Pitch Steps
    step1Time: "00:00 - 00:10",
    step1Title: "1. L'Accroche (The Hook)",
    step1Desc: "Pourquoi ce sujet est-il contre-intuitif ou crucial ? Posez une question percutante.",
    step2Time: "00:10 - 00:45",
    step2Title: "2. Le Mécanisme & 1 Exemple Clé",
    step2Desc: "Resserrez le sujet sur UNE seule expérience, une étude ou une métaphore concrète.",
    step3Time: "00:45 - 01:00",
    step3Title: "3. Le Déclic / L'Action",
    step3Desc: "Que doit retenir ou faire l'auditeur immédiatement après votre prise de parole ?",

    // Notes
    notesLabel: "Vos Pense-bêtes / Téléprompteur",
    notesPlaceholder: "Notez ici les points clés de votre recherche et vos arguments pour la vidéo (sauvegarde automatique)...",
    notesSaved: "Enregistré",

    // Dual Chronometers
    phaseResearchBtn: "1. Recherche (10 min)",
    phaseVideoBtn: "2. Parler (1 min)",

    researchHeading: "Temps de Recherche & Synthèse",
    researchSub: "Explorez le sujet, choisissez un angle précis et préparez vos notes.",
    researchUnitLabel: "Recherche",
    btnStartResearch: "Lancer la Recherche (10m)",
    btnPause: "Mettre en Pause",
    btnResumeResearch: "Reprendre la Recherche",
    btnReset: "Réinitialiser",
    researchFinishedLabel: "Recherche Terminée (10m)",
    btnSkipToVideo: "Recherche prête ? Passer à : Parler 1 min",

    videoHeading: "Chronomètre Expression (1 Minute)",
    videoSub: "Délivrez votre prise de parole en 1 minute chrono.",
    videoUnitLabel: "Secondes",
    btnStartVideo: "Démarrer (1 min)",
    btnResumeVideo: "Reprendre (1 min)",
    videoFinishedLabel: "Prise de parole terminée (1 min)",
    btnMarkDone: "Marquer ce sujet comme Traité",
    btnAlreadyDone: "Déjà Traité (Re-valider)",
    btnMarkDoneFeedback: "Sujet Validé et Enregistré dans l'Historique",
    markDoneSub: "Comptabilise ce sujet dans vos statistiques de progression.",

    // Stats
    metricCompletedLabel: "Sujets Traités",
    metricCompletedSub: "des sujets préparés",
    metricDrawnLabel: "Sujets Tirés",
    metricDrawnSub: "Sujets explorés dans la loterie",
    metricFavLabel: "Favoris",
    metricFavSub: "Sujets mis en favoris",
    metricRemainingLabel: "Pioche Restante",
    metricRemainingSub: "Sujets disponibles",
    categoryProgressHeading: "Progression par Catégorie (100 sujets chacune)",
    categoryProgressStatus: "traités • {drawn} tirés / 100",

    // Category names in French
    categories: {
      'psychology-and-human-behavior': "Psychologie et comportement humain",
      'data-and-analytics': "Données et analyse",
      'artificial-intelligence': "Intelligence artificielle",
      'space-and-the-universe': "Espace et univers",
      'religions': "Religions et croyances",
      'technology': "Technologies",
      'finance': "Finance et économie",
      'business-and-entrepreneurship': "Entrepreneuriat et affaires",
      'spirituality-and-philosophy': "Spiritualité et philosophie",
      'society-culture-and-identity': "Société, culture et identité"
    },

    // Category guidances in French
    guidances: {
      'psychology-and-human-behavior': "Distinguer les résultats scientifiquement validés des croyances populaires. Mettre en avant une étude ou expérience concrète.",
      'data-and-analytics': "Ancrer votre explication dans un jeu de données réel, un indicateur concret ou un piège classique (ex: paradoxe de Simpson).",
      'artificial-intelligence': "Distinguer les capacités algorithmiques réelles des fantasmes de science-fiction et du battage médiatique.",
      'space-and-the-universe': "Mettre l'accent sur les échelles, les principes physiques et la méthode de détection du phénomène.",
      'religions': "Distinguer les faits historiques, l'interprétation théologique et la croyance personnelle. Rester nuancé et objectif.",
      'technology': "Expliquer le mécanisme d'ingénierie sous-jacent, pourquoi les solutions antérieures étaient insuffisantes et les perspectives.",
      'finance': "Illustrer le compromis risque/rendement, les flux de capitaux ou la structure d'incitation du marché.",
      'business-and-entrepreneurship': "Cibler l'économie unitaire, les barrières à l'entrée (moats) ou une étude de cas emblématique.",
      'spirituality-and-philosophy': "Distinguer l'argument rationnel, l'introspection et les dogmes. Relier à un questionnement éthique ou existentiel.",
      'society-culture-and-identity': "Examiner les structures sociales, le contexte historique et la diversité des vécus sans simplification excessive."
    }
  },

  en: {
    // Header & Meta
    appTitle: "Wonderdraw",
    tabDraw: "Draw",
    tabStudio: "Timers",
    tabStats: "Progress",
    deckBadgeTitle: "Subjects available in deck",
    toggleAudio: "Toggle sound effects",
    switchLang: "Passer en Français (Switch to French)",

    // Draw Studio
    deckCoverTitle: "Wonderdraw Lottery",
    deckCoverDesc: "Draw a subject from 1,000 curated topics.",
    btnDraw: "Draw a Subject",
    btnDrawing: "Drawing Subject...",
    optExcludeDrawn: "Exclude previously drawn subjects",
    topicsRemaining: "topics remaining",
    btnResetDeck: "Reset deck",
    btnFavorite: "Favorite",
    btnThemes: "Themes",
    btnExplore: "Explore",
    btnGoToStudio: "Research 10min",
    btnResearchPhase: "Research 10min",
    btnTalkPhase: "Talk 1min",
    themeFilterTitle: "Filter by Theme",
    themeFilterSub: "Select a specific category to focus your draws, or choose all themes.",
    themeAllOption: "All Themes (Global)",
    themeFilterActive: "Theme: {name}",
    alertPoolEmpty: "All cards in this deck have been drawn! Click 'Reset deck' to shuffle again.",

    // Studio (10m Research & 60s Video)
    guidanceBoxTitle: "Methodological Guidance",
    pitchOutlineTitle: "Pitch Framework & Research Notes",
    pitchOutlineSub: "10-minute preparation",
    researchResourcesTitle: "1-Click Research Shortcuts",

    // Pitch Steps
    step1Time: "00:00 - 00:10",
    step1Title: "1. The Hook",
    step1Desc: "Why is this counter-intuitive or crucial? Ask a compelling, provocative question.",
    step2Time: "00:10 - 00:45",
    step2Title: "2. The Mechanism & 1 Key Example",
    step2Desc: "Narrow down to ONE concrete study, experiment, or clear real-world metaphor.",
    step3Time: "00:45 - 01:00",
    step3Title: "3. The Takeaway",
    step3Desc: "What should the viewer remember, rethink, or apply immediately after your pitch?",

    // Notes
    notesLabel: "Your Notes & Teleprompter",
    notesPlaceholder: "Jot down your key research findings, data points, and video speaking points (auto-saved)...",
    notesSaved: "Saved",

    // Dual Chronometers
    phaseResearchBtn: "1. Research (10 min)",
    phaseVideoBtn: "2. Talk (1 min)",

    researchHeading: "Research & Synthesis Timer",
    researchSub: "Explore the subject independently, pick your angle, and outline your talking points.",
    researchUnitLabel: "Research",
    btnStartResearch: "Start Research (10m)",
    btnPause: "Pause",
    btnResumeResearch: "Resume Research",
    btnReset: "Reset",
    researchFinishedLabel: "Research Complete (10m)",
    btnSkipToVideo: "Research ready? Switch to Talk 1min",

    videoHeading: "Talk Timer (1 Minute)",
    videoSub: "Deliver your clear, engaging 1-minute talk.",
    videoUnitLabel: "Seconds",
    btnStartVideo: "Start Talk (1m)",
    btnResumeVideo: "Resume Talk (1m)",
    videoFinishedLabel: "Talk Complete (1m)",
    btnMarkDone: "Mark Topic as Completed",
    btnAlreadyDone: "Already Completed (Re-verify)",
    btnMarkDoneFeedback: "Topic Completed & Saved in History",
    markDoneSub: "Counts towards your overall progress and category stats.",

    // Stats
    metricCompletedLabel: "Completed Topics",
    metricCompletedSub: "of total challenge finished",
    metricDrawnLabel: "Drawn Topics",
    metricDrawnSub: "Subjects drawn in the lottery",
    metricFavLabel: "Favorites",
    metricFavSub: "Bookmarked subjects",
    metricRemainingLabel: "Deck Remaining",
    metricRemainingSub: "Topics available to draw",
    categoryProgressHeading: "Progress by Category (100 subjects each)",
    categoryProgressStatus: "completed • {drawn} drawn / 100",

    // Category names in English
    categories: {
      'psychology-and-human-behavior': "Psychology and human behavior",
      'data-and-analytics': "Data and analytics",
      'artificial-intelligence': "Artificial intelligence",
      'space-and-the-universe': "Space and the universe",
      'religions': "Religions",
      'technology': "Technology",
      'finance': "Finance",
      'business-and-entrepreneurship': "Business and entrepreneurship",
      'spirituality-and-philosophy': "Spirituality and philosophy",
      'society-culture-and-identity': "Society culture and identity"
    },

    // Category guidances in English
    guidances: {
      'psychology-and-human-behavior': "Distinguish supported scientific findings from popular claims. Highlight one study or experiment.",
      'data-and-analytics': "Anchor your explanation in a concrete real-world dataset, metric, or common analytical pitfall (e.g. Simpson's paradox).",
      'artificial-intelligence': "Distinguish current algorithmic capability and practical application from speculative science fiction and marketing hype.",
      'space-and-the-universe': "Focus on scale, physical principles, and how humanity detected or verified this astronomical phenomenon.",
      'religions': "Distinguish historical evidence, theological interpretation, and spiritual belief. Remain objective and nuanced.",
      'technology': "Explain the underlying protocol or engineering mechanism, why previous solutions were insufficient, and future trajectory.",
      'finance': "Illustrate the risk vs. reward tradeoff, capital flow, or the market incentive structure in action.",
      'business-and-entrepreneurship': "Focus on unit economics, competitive moats, customer psychology, or an iconic business case study.",
      'spirituality-and-philosophy': "Distinguish rational argument, experiential introspection, and dogmatic assertion. Ground in an ethical or existential question.",
      'society-culture-and-identity': "Examine social structures, historical context, systemic dynamics, and diverse lived experiences without oversimplifying."
    }
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('wonderdraw_lang') || 'fr';
    if (!translations[this.currentLang]) {
      this.currentLang = 'fr';
    }
    this.listeners = new Set();
  }

  getLang() {
    return this.currentLang;
  }

  setLang(lang) {
    if (translations[lang] && lang !== this.currentLang) {
      this.currentLang = lang;
      localStorage.setItem('wonderdraw_lang', lang);
      document.documentElement.setAttribute('lang', lang);
      this.notify();
    }
  }

  toggleLang() {
    const next = this.currentLang === 'fr' ? 'en' : 'fr';
    this.setLang(next);
    return next;
  }

  t(key, params = {}) {
    const dict = translations[this.currentLang] || translations.fr;
    let text = dict[key] || translations.fr[key] || key;
    if (typeof text === 'string') {
      Object.entries(params).forEach(([pKey, pVal]) => {
        text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), pVal);
      });
    }
    return text;
  }

  getCategoryName(catId) {
    const dict = translations[this.currentLang] || translations.fr;
    return (dict.categories && dict.categories[catId]) || catId;
  }

  getGuidance(catId) {
    const dict = translations[this.currentLang] || translations.fr;
    return (dict.guidances && dict.guidances[catId]) || '';
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.currentLang);
    }
  }
}

export const i18n = new I18nManager();
