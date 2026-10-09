import { TOPICS_DATA } from '../data/topics.js';
import { appState } from './state.js';
import { sound } from './audio.js';
import { icons } from './icons.js';

export class CollectionExplorer {
  constructor(container, onSelectTopic) {
    this.container = container;
    this.onSelectTopic = onSelectTopic;
    this.searchQuery = '';
    this.categoryFilter = 'all';
    this.statusFilter = 'all'; // 'all' | 'fav' | 'drawn' | 'completed'
    this.currentPage = 1;
    this.itemsPerPage = 24;

    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="collection-view-header">
        <div class="search-filters-row">
          <div class="search-input-wrapper">
            <span class="search-input-icon">${icons.search}</span>
            <input type="text" id="collectionSearchInput" class="collection-search-input" placeholder="Rechercher parmi les 1 000 sujets (ex: biais, mémoire, quantique, sql)...">
          </div>

          <div class="status-filter-pills">
            <button class="status-pill active" data-status="all">Tous (1 000)</button>
            <button class="status-pill" data-status="fav">Favoris</button>
            <button class="status-pill" data-status="drawn">Tirés</button>
            <button class="status-pill" data-status="completed">Traités</button>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem; color:var(--text-muted);">
          <span id="collectionMatchCount">1 000 sujets répertoriés</span>
          <span style="font-size:0.78rem;">Cliquez sur une carte pour lancer son chronomètre ou sa recherche</span>
        </div>
      </div>

      <!-- Topics Grid -->
      <div class="collection-topics-grid" id="topicsGrid">
        <!-- Injected dynamically -->
      </div>

      <!-- Pagination -->
      <div class="pagination-controls" id="paginationControls">
        <!-- Injected dynamically -->
      </div>
    `;

    this.updateGrid();
  }

  bindEvents() {
    // Search input with debounce
    const searchInput = this.container.querySelector('#collectionSearchInput');
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.currentPage = 1;
        this.updateGrid();
      }, 150);
    });

    // Status filter pills
    this.container.querySelectorAll('.status-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        sound.playClick();
        this.container.querySelectorAll('.status-pill').forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.statusFilter = e.currentTarget.dataset.status;
        this.currentPage = 1;
        this.updateGrid();
      });
    });
  }

  setCategory(categoryId) {
    this.categoryFilter = categoryId;
    this.currentPage = 1;
    this.updateGrid();
  }

  getFilteredTopics() {
    return TOPICS_DATA.topics.filter(topic => {
      // Category filter
      if (this.categoryFilter !== 'all' && topic.categoryId !== this.categoryFilter) {
        return false;
      }

      // Status filter
      if (this.statusFilter === 'fav' && !appState.isFavorite(topic.id)) {
        return false;
      }
      if (this.statusFilter === 'drawn' && !appState.isDrawn(topic.id)) {
        return false;
      }
      if (this.statusFilter === 'completed' && !appState.isCompleted(topic.id)) {
        return false;
      }

      // Search query
      if (this.searchQuery) {
        const titleMatch = topic.title.toLowerCase().includes(this.searchQuery);
        const catMatch = topic.categoryName.toLowerCase().includes(this.searchQuery);
        const idMatch = topic.id.toString() === this.searchQuery;
        if (!titleMatch && !catMatch && !idMatch) {
          return false;
        }
      }

      return true;
    });
  }

  updateGrid() {
    const filtered = this.getFilteredTopics();
    const countEl = this.container.querySelector('#collectionMatchCount');
    countEl.textContent = `${filtered.length} sujet${filtered.length > 1 ? 's' : ''} trouvé${filtered.length > 1 ? 's' : ''}`;

    const totalPages = Math.ceil(filtered.length / this.itemsPerPage) || 1;
    if (this.currentPage > totalPages) this.currentPage = 1;

    const startIdx = (this.currentPage - 1) * this.itemsPerPage;
    const pageItems = filtered.slice(startIdx, startIdx + this.itemsPerPage);

    const grid = this.container.querySelector('#topicsGrid');
    if (pageItems.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <div style="margin-bottom: 1rem; color:var(--text-muted);">${icons.search}</div>
          <h3>Aucun sujet trouvé pour cette recherche</h3>
          <p style="font-size: 0.9rem; margin-top: 0.5rem;">Essayez un autre mot-clé ou réinitialisez les filtres.</p>
        </div>
      `;
    } else {
      grid.innerHTML = pageItems.map(topic => {
        const isFav = appState.isFavorite(topic.id);
        const isDrawn = appState.isDrawn(topic.id);
        const isDone = appState.isCompleted(topic.id);

        return `
          <div class="collection-topic-card" data-topic-id="${topic.id}">
            <div class="collection-card-top">
              <span class="collection-cat-tag" style="background:${topic.colors.gradient};">
                ${topic.categoryName}
              </span>
              <span class="collection-id-num">#${topic.id}</span>
            </div>

            <h3 class="collection-topic-title">${topic.title}</h3>

            <div class="collection-card-bottom">
              <div class="card-status-badges">
                ${isDone ? '<span class="status-chip-dot status-chip-completed">Traité</span>' : ''}
                ${isDrawn ? '<span class="status-chip-dot status-chip-drawn">Tiré</span>' : ''}
              </div>
              <div style="display:flex; align-items:center; gap:0.35rem;">
                <button class="card-btn col-fav-btn ${isFav ? 'active-favorite' : ''}" data-id="${topic.id}" title="Favori" style="padding:0.35rem 0.6rem;">
                  ${isFav ? icons.heartFill : icons.heartOutline}
                </button>
                <button class="card-btn col-launch-btn" data-id="${topic.id}" style="padding:0.35rem 0.75rem; font-size:0.75rem;">
                  ${icons.timer} <span>Chrono</span>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    // Bind card actions
    grid.querySelectorAll('.collection-topic-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-btn')) return;
        const tid = parseInt(card.dataset.topicId, 10);
        const topic = TOPICS_DATA.topics.find(t => t.id === tid);
        if (topic && this.onSelectTopic) {
          sound.playClick();
          this.onSelectTopic(topic);
        }
      });
    });

    grid.querySelectorAll('.col-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playClick();
        const tid = parseInt(btn.dataset.id, 10);
        appState.toggleFavorite(tid);
        this.updateGrid();
      });
    });

    grid.querySelectorAll('.col-launch-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playClick();
        const tid = parseInt(btn.dataset.id, 10);
        const topic = TOPICS_DATA.topics.find(t => t.id === tid);
        if (topic && this.onSelectTopic) {
          this.onSelectTopic(topic);
        }
      });
    });

    this.renderPagination(totalPages);
  }

  renderPagination(totalPages) {
    const controls = this.container.querySelector('#paginationControls');
    if (totalPages <= 1) {
      controls.innerHTML = '';
      return;
    }

    let buttonsHtml = `
      <button class="page-btn" id="prevPageBtn" ${this.currentPage === 1 ? 'disabled' : ''}>← Précédent</button>
    `;

    const maxVisible = 5;
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let p = startPage; p <= endPage; p++) {
      buttonsHtml += `
        <button class="page-btn ${p === this.currentPage ? 'active' : ''}" data-page="${p}">${p}</button>
      `;
    }

    buttonsHtml += `
      <button class="page-btn" id="nextPageBtn" ${this.currentPage === totalPages ? 'disabled' : ''}>Suivant →</button>
    `;

    controls.innerHTML = buttonsHtml;

    controls.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sound.playClick();
        this.currentPage = parseInt(e.currentTarget.dataset.page, 10);
        this.updateGrid();
        window.scrollTo({ top: 350, behavior: 'smooth' });
      });
    });

    const prevBtn = controls.querySelector('#prevPageBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentPage > 1) {
          sound.playClick();
          this.currentPage--;
          this.updateGrid();
        }
      });
    }

    const nextBtn = controls.querySelector('#nextPageBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentPage < totalPages) {
          sound.playClick();
          this.currentPage++;
          this.updateGrid();
        }
      });
    }
  }
}
