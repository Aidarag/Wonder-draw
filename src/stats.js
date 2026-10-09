import { TOPICS_DATA } from '../data/topics.js';
import { appState } from './state.js';
import { i18n } from './i18n.js';

export class StatsDashboard {
  constructor(container, onSelectTopic) {
    this.container = container;
    this.onSelectTopic = onSelectTopic;

    this.render();

    // Subscribe to language change
    this.unsubscribeLang = i18n.subscribe(() => {
      this.render();
    });
  }

  render() {
    const totalTopics = TOPICS_DATA.topics.length;
    const completedCount = Object.keys(appState.state.completed).length;
    const drawnCount = appState.state.drawnSet.size;
    const favCount = appState.state.favorites.size;
    const remainingCount = totalTopics - drawnCount;
    const completionPercent = ((completedCount / totalTopics) * 100).toFixed(1);

    this.container.innerHTML = `
      <!-- 4 Key Metrics -->
      <div class="analytics-dashboard-grid">
        <div class="metric-card">
          <span class="metric-card-label">${i18n.t('metricCompletedLabel')}</span>
          <div class="metric-card-number" style="color:var(--accent-emerald);">
            ${completedCount} <span style="font-size:1.1rem; color:var(--text-muted);">/ ${totalTopics}</span>
          </div>
          <span class="metric-card-desc">${completionPercent}% ${i18n.t('metricCompletedSub')}</span>
        </div>

        <div class="metric-card">
          <span class="metric-card-label">${i18n.t('metricDrawnLabel')}</span>
          <div class="metric-card-number" style="color:var(--accent-blue);">
            ${drawnCount}
          </div>
          <span class="metric-card-desc">${i18n.t('metricDrawnSub')}</span>
        </div>

        <div class="metric-card">
          <span class="metric-card-label">${i18n.t('metricFavLabel')}</span>
          <div class="metric-card-number" style="color:#EF4444;">
            ${favCount}
          </div>
          <span class="metric-card-desc">${i18n.t('metricFavSub')}</span>
        </div>

        <div class="metric-card">
          <span class="metric-card-label">${i18n.t('metricRemainingLabel')}</span>
          <div class="metric-card-number" style="color:var(--accent-purple);">
            ${remainingCount}
          </div>
          <span class="metric-card-desc">${i18n.t('metricRemainingSub')}</span>
        </div>
      </div>

      <!-- Category Breakdown Section -->
      <div class="category-breakdown-section">
        <div class="panel-header-title" style="margin-bottom: 1.5rem;">
          <h3>${i18n.t('categoryProgressHeading')}</h3>
        </div>

        <div class="category-bars-list">
          ${TOPICS_DATA.categories.map(cat => {
            const catTopics = TOPICS_DATA.topics.filter(t => t.categoryId === cat.id);
            const done = catTopics.filter(t => appState.isCompleted(t.id)).length;
            const drawn = catTopics.filter(t => appState.isDrawn(t.id)).length;
            const pct = done; // out of 100
            const localizedCatName = i18n.getCategoryName(cat.id);
            const statusText = i18n.t('categoryProgressStatus', { drawn });

            return `
              <div class="cat-breakdown-item">
                <div class="cat-breakdown-labels">
                  <span style="display:inline-flex; align-items:center; gap:0.5rem;">
                    <span style="width:8px; height:8px; border-radius:50%; background:${cat.colors.primary};"></span>
                    <strong>${localizedCatName}</strong>
                  </span>
                  <span style="color:var(--text-muted); font-size:0.8rem;">
                    ${done} ${statusText}
                  </span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill" style="width: ${pct}%; background: ${cat.colors.gradient};"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
}
