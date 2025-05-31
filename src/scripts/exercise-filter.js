/**
 * Script para filtrar y ordenar ejercicios de física mecánica
 */

document.addEventListener('DOMContentLoaded', () => {
  initializeFilters();
});

/**
 * Inicializa los filtros y eventos para el listado de ejercicios
 */
function initializeFilters() {
  // Referencias a los elementos del DOM
  const filterForm = document.getElementById('filter-form');
  const topicSelect = document.getElementById('topic-filter');
  const difficultySelect = document.getElementById('difficulty-filter');
  const typeSelect = document.getElementById('type-filter');
  const educationLevelSelect = document.getElementById('education-level-filter');
  const sortSelect = document.getElementById('sort-option');
  const exerciseList = document.getElementById('exercise-list');
  const exerciseItems = document.querySelectorAll('.exercise-item');
  const resetButton = document.getElementById('reset-filters');
  const searchInput = document.getElementById('search-exercises');

  // Si no existe algún elemento, terminar la ejecución
  if (!filterForm || !exerciseList || !exerciseItems.length) return;

  // Manejar eventos de filtrado
  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    applyFilters();
  });

  // Filtrado en tiempo real (mientras se cambian los filtros)
  if (topicSelect) topicSelect.addEventListener('change', applyFilters);
  if (difficultySelect) difficultySelect.addEventListener('change', applyFilters);
  if (typeSelect) typeSelect.addEventListener('change', applyFilters);
  if (educationLevelSelect) educationLevelSelect.addEventListener('change', applyFilters);
  if (sortSelect) sortSelect.addEventListener('change', applyFilters);
  if (searchInput) searchInput.addEventListener('input', applyFilters);
  
  // Resetear filtros
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      filterForm.reset();
      applyFilters();
    });
  }

  /**
   * Aplica los filtros seleccionados a la lista de ejercicios
   */
  function applyFilters() {
    const topic = topicSelect ? topicSelect.value : '';
    const difficulty = difficultySelect ? difficultySelect.value : '';
    const type = typeSelect ? typeSelect.value : '';
    const educationLevel = educationLevelSelect ? educationLevelSelect.value : '';
    const sortBy = sortSelect ? sortSelect.value : 'date-desc';
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    // Filtrar los elementos
    let filteredItems = Array.from(exerciseItems);
    
    // Aplicar filtros solo si hay un valor seleccionado
    if (topic) {
      filteredItems = filteredItems.filter(item => 
        item.dataset.topic === topic
      );
    }
    
    if (difficulty) {
      filteredItems = filteredItems.filter(item => 
        item.dataset.difficulty === difficulty
      );
    }
    
    if (type) {
      filteredItems = filteredItems.filter(item => 
        item.dataset.type === type
      );
    }
    
    if (educationLevel) {
      filteredItems = filteredItems.filter(item => 
        item.dataset.educationLevel === educationLevel
      );
    }
    
    // Filtrar por términos de búsqueda
    if (searchTerm) {
      filteredItems = filteredItems.filter(item => {
        const title = item.querySelector('.title').textContent.toLowerCase();
        const description = item.dataset.description ? item.dataset.description.toLowerCase() : '';
        return title.includes(searchTerm) || description.includes(searchTerm);
      });
    }

    // Ordenar los elementos filtrados
    filteredItems.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.dataset.date) - new Date(b.dataset.date);
        case 'date-desc':
          return new Date(b.dataset.date) - new Date(a.dataset.date);
        case 'title-asc':
          return a.querySelector('.title').textContent.localeCompare(b.querySelector('.title').textContent);
        case 'title-desc':
          return b.querySelector('.title').textContent.localeCompare(a.querySelector('.title').textContent);
        default:
          return 0;
      }
    });

    // Mostrar mensaje si no hay resultados
    const noResultsMessage = document.getElementById('no-results');
    if (filteredItems.length === 0) {
      if (!noResultsMessage) {
        const message = document.createElement('p');
        message.id = 'no-results';
        message.className = 'no-results';
        message.textContent = 'No se encontraron ejercicios que coincidan con los filtros seleccionados.';
        exerciseList.appendChild(message);
      }
    } else if (noResultsMessage) {
      noResultsMessage.remove();
    }

    // Ocultar todos los elementos
    exerciseItems.forEach(item => {
      item.style.display = 'none';
    });

    // Mostrar solo los elementos filtrados
    filteredItems.forEach(item => {
      item.style.display = '';
    });

    // Actualizar contadores
    updateCounters(filteredItems.length, exerciseItems.length);
  }

  /**
   * Actualiza los contadores de ejercicios mostrados
   */
  function updateCounters(filtered, total) {
    const counterElement = document.getElementById('exercise-counter');
    if (counterElement) {
      counterElement.textContent = `Mostrando ${filtered} de ${total} ejercicios`;
    }
  }

  // Aplicar filtros iniciales
  applyFilters();
}
