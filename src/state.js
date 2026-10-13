// Wonderdraw LocalStorage State Manager
class StateManager {
  constructor() {
    this.storageKey = 'wonderdraw_state_v1';
    this.state = this.loadState();
    this.listeners = new Set();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          drawnHistory: parsed.drawnHistory || [],
          drawnSet: new Set(parsed.drawnSet || []),
          completed: parsed.completed || {},
          favorites: new Set(parsed.favorites || []),
          notes: parsed.notes || {},
          selectedCategory: parsed.selectedCategory || 'all',
          excludeDrawn: parsed.excludeDrawn !== undefined ? parsed.excludeDrawn : true,
          drawMode: parsed.drawMode || 'single',
          activeTopicId: parsed.activeTopicId || null,
          researchDone: parsed.researchDone || {}
        };
      }
    } catch (e) {
      console.warn('Failed to load saved state, initializing fresh state', e);
    }

    return {
      drawnHistory: [],
      drawnSet: new Set(),
      completed: {},
      favorites: new Set(),
      notes: {},
      selectedCategory: 'all',
      excludeDrawn: true,
      drawMode: 'single',
      activeTopicId: null,
      researchDone: {}
    };
  }

  saveState() {
    try {
      const serializable = {
        drawnHistory: this.state.drawnHistory,
        drawnSet: Array.from(this.state.drawnSet),
        completed: this.state.completed,
        favorites: Array.from(this.state.favorites),
        notes: this.state.notes,
        selectedCategory: this.state.selectedCategory,
        excludeDrawn: this.state.excludeDrawn,
        drawMode: this.state.drawMode,
        activeTopicId: this.state.activeTopicId,
        researchDone: this.state.researchDone || {}
      };
      localStorage.setItem(this.storageKey, JSON.stringify(serializable));
    } catch (e) {
      console.warn('Failed to persist state to localStorage', e);
    }
    this.notify();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  markDrawn(topic) {
    this.state.drawnHistory.unshift({
      id: topic.id,
      title: topic.title,
      category: topic.categoryName,
      drawnAt: new Date().toISOString()
    });
    this.state.drawnSet.add(topic.id);
    this.state.activeTopicId = topic.id;
    this.saveState();
  }

  toggleFavorite(topicId) {
    if (this.state.favorites.has(topicId)) {
      this.state.favorites.delete(topicId);
    } else {
      this.state.favorites.add(topicId);
    }
    this.saveState();
    return this.state.favorites.has(topicId);
  }

  isFavorite(topicId) {
    return this.state.favorites.has(topicId);
  }

  isDrawn(topicId) {
    return this.state.drawnSet.has(topicId);
  }

  isCompleted(topicId) {
    return !!this.state.completed[topicId];
  }

  markCompleted(topicId, info = {}) {
    this.state.completed[topicId] = {
      completedAt: new Date().toISOString(),
      duration: info.duration || 60,
      hasVideo: !!info.hasVideo
    };
    this.saveState();
  }

  isResearchDone(topicId) {
    return !!(this.state.researchDone && this.state.researchDone[topicId]);
  }

  markResearchDone(topicId) {
    if (!this.state.researchDone) this.state.researchDone = {};
    this.state.researchDone[topicId] = true;
    this.saveState();
  }

  resetResearchDone(topicId) {
    if (this.state.researchDone && this.state.researchDone[topicId]) {
      delete this.state.researchDone[topicId];
      this.saveState();
    }
  }

  saveNotes(topicId, noteText) {
    this.state.notes[topicId] = noteText;
    this.saveState();
  }

  getNotes(topicId) {
    return this.state.notes[topicId] || '';
  }

  setCategory(categoryId) {
    this.state.selectedCategory = categoryId;
    this.saveState();
  }

  setDrawMode(mode) {
    this.state.drawMode = mode;
    this.saveState();
  }

  setExcludeDrawn(val) {
    this.state.excludeDrawn = !!val;
    this.saveState();
  }

  resetDeck() {
    this.state.drawnSet.clear();
    this.saveState();
  }

  resetAllProgress() {
    this.state.drawnHistory = [];
    this.state.drawnSet.clear();
    this.state.completed = {};
    this.state.favorites.clear();
    this.state.notes = {};
    this.state.activeTopicId = null;
    this.state.researchDone = {};
    this.saveState();
  }

  exportJson() {
    return JSON.stringify({
      version: '1.0',
      exportedAt: new Date().toISOString(),
      drawnHistory: this.state.drawnHistory,
      completed: this.state.completed,
      favorites: Array.from(this.state.favorites),
      notes: this.state.notes
    }, null, 2);
  }

  importJson(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.drawnHistory) this.state.drawnHistory = data.drawnHistory;
      if (data.drawnHistory) this.state.drawnSet = new Set(data.drawnHistory.map(d => d.id));
      if (data.completed) this.state.completed = data.completed;
      if (data.favorites) this.state.favorites = new Set(data.favorites);
      if (data.notes) this.state.notes = data.notes;
      this.saveState();
      return true;
    } catch (e) {
      console.error('Failed to parse import JSON', e);
      return false;
    }
  }
}

export const appState = new StateManager();
