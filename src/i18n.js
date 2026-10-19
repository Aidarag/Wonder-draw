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
    guidanceBoxTitle: "À découvrir",
    topicPlaceholderDesc: "Découvrez l'essentiel de ce sujet en un clin d'œil",
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
      'psychology-and-human-behavior': "Pourquoi ressentons-nous et réagissons-nous ainsi ? 🧠 Plongez dans les mystères, les réflexes et les secrets de l'esprit humain.",
      'data-and-analytics': "Comment les chiffres racontent-ils l'histoire du monde ? 📊 Explorez les graphiques et les indices qui transforment les données en révélations.",
      'artificial-intelligence': "Les lignes de code peuvent-elles vraiment apprendre et créer ? 🤖 Explorez la frontière passionnante où les machines s'éveillent.",
      'space-and-the-universe': "Qu'y a-t-il au-delà de notre petite planète bleue ? 🚀 Voyagez à travers les étoiles, les trous noirs et les merveilles du cosmos.",
      'religions': "Comment les récits sacrés et les rituels ont-ils guidé l'humanité à travers les âges ? 🕊️ Découvrez les sagesses et fois du monde.",
      'technology': "Comment un simple écran de verre dialogue-t-il à travers les océans ? ⚡ Découvrez les inventions géniales qui réinventent notre quotidien.",
      'finance': "Comment l'argent circule-t-il et fait-il tourner le monde ? 💰 Découvrez les secrets de l'épargne, de l'investissement et de la liberté.",
      'business-and-entrepreneurship': "Comment une simple idée devient-elle une entreprise qui change la vie de milliers de gens ? 🚀 Découvrez l'aventure entrepreneuriale.",
      'spirituality-and-philosophy': "Que signifie mener une vie pleine de sens et de paix ? 🌟 Explorez les grandes questions existentielles et la quête de sagesse.",
      'society-culture-and-identity': "Qu'est-ce qui rend chacun unique et nous rassemble tous ? 🌍 Explorez les identités, les traditions, les fêtes et le vivre-ensemble."
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
    guidanceBoxTitle: "At a Glance",
    topicPlaceholderDesc: "Discover the core of this topic at a glance",
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
      'psychology-and-human-behavior': "Why do we feel, react, and connect the way we do? 🧠 Dive into the fascinating quirks, habits, and secrets of the human mind.",
      'data-and-analytics': "How do hidden numbers tell the stories of our world? 📊 Explore the charts, trends, and clues that turn raw data into wisdom.",
      'artificial-intelligence': "Can silicon and code truly learn, dream, and create? 🤖 Step into the thrilling frontier where machines begin to think alongside us.",
      'space-and-the-universe': "What lies beyond the blue rim of our planet? 🚀 Journey across exploding stars, dark abysses, and cosmic wonders of the night sky.",
      'religions': "How have sacred stories, rituals, and music guided human hearts for millennia? 🕊️ Explore the beauty and faiths of world cultures.",
      'technology': "How do pocket-sized glass slabs talk across oceans in milliseconds? ⚡ Peek under the hood of the inventions reshaping daily life.",
      'finance': "How does money move, multiply, and shape civilization? 💰 Master compound growth, smart investing, and freedom without stress.",
      'business-and-entrepreneurship': "How does a tiny spark of an idea turn into a thriving business? 🚀 Explore the playbooks, bold moves, and grit behind great startups.",
      'spirituality-and-philosophy': "What does it mean to live a good, meaningful life? 🌟 Ponder the big questions, timeless wisdom, and peace within yourself.",
      'society-culture-and-identity': "What makes each of us unique, and what binds us together across continents? 🌍 Explore identity, belonging, food, and culture."
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

  getTopicDescription(topic) {
    if (!topic) return '';
    const lang = this.currentLang || 'fr';
    if (lang === 'fr') {
      return topic.description_fr || (topic.description && topic.description.fr) || topic.guidance_fr || topic.description || topic.guidance || this.getGuidance(topic.categoryId);
    }
    return (topic.description && typeof topic.description === 'object' ? topic.description.en : topic.description) || topic.guidance || topic.description_en || this.getGuidance(topic.categoryId);
  }

  getGuidance(catIdOrTopic, topicId) {
    if (typeof catIdOrTopic === 'object' && catIdOrTopic !== null) {
      return this.getTopicDescription(catIdOrTopic);
    }
    const dict = translations[this.currentLang] || translations.fr;
    return (dict.guidances && dict.guidances[catIdOrTopic]) || '';
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
