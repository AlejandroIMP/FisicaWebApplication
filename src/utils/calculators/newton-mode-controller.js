/**
 * Newton's Second Law Calculator Mode Controller
 * Handles mode switching between basic and multiple forces modes
 */

// Ensure this runs only in browser environment
if (typeof document === 'undefined') {
  throw new Error('This script requires a browser environment');
}

/**
 * Global state for the calculator mode
 */
window.currentCalculationMode = 'basic';

/**
 * Switch between basic and multiple forces calculation modes
 * @param {string} mode - The mode to switch to ('basic' or 'multipleForces')
 */
function switchCalculationMode(mode) {
  const currentMode = window.currentCalculationMode || 'basic';
  
  if (currentMode === mode) return;
  
  window.currentCalculationMode = mode;
  
  // Update mode buttons
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(mode === 'basic' ? 'basic-mode-btn' : 'multiple-mode-btn');
  if (activeBtn) activeBtn.classList.add('active');
  
  // Show/hide corresponding inputs
  document.querySelectorAll('.input-mode').forEach(el => el.classList.remove('active'));
  const activeInputs = document.getElementById(mode === 'basic' ? 'basic-inputs' : 'multiple-forces-inputs');
  if (activeInputs) activeInputs.classList.add('active');
  
  // Show/hide corresponding formulas
  document.querySelectorAll('.formulas-section').forEach(el => el.classList.remove('active'));
  const activeFormulas = document.getElementById(mode === 'basic' ? 'basic-formulas' : 'multiple-formulas');
  if (activeFormulas) activeFormulas.classList.add('active');
  
  // Clear previous results
  const resultContainer = document.querySelector('.result-container');
  if (resultContainer) {
    resultContainer.style.display = 'none';
    resultContainer.innerHTML = '';
  }
  
  // Update variable selector
  updateVariableSelector(mode);
  
  console.log(`Modo cambiado a: ${mode}`);
}

/**
 * Update the variable selector dropdown based on the current mode
 * @param {string} mode - The current calculation mode
 */
function updateVariableSelector(mode) {
  const selector = document.querySelector('#variable-selector select');
  if (!selector) return;
  
  // Clear current options
  selector.innerHTML = '';
  
  // Add options based on mode
  const options = mode === 'basic' 
    ? [
        { value: 'force', label: 'Fuerza (F)' },
        { value: 'mass', label: 'Masa (m)' },
        { value: 'acceleration', label: 'Aceleración (a)' }
      ]
    : [
        { value: 'netForce', label: 'Fuerza Neta (F_neta)' },
        { value: 'acceleration', label: 'Aceleración (a)' },
        { value: 'mass', label: 'Masa (m)' }
      ];
      
  options.forEach(option => {
    const optionEl = document.createElement('option');
    optionEl.value = option.value;
    optionEl.textContent = option.label;
    selector.appendChild(optionEl);
  });
  
  // Select first option by default
  if (selector.options && selector.options.length > 0) {
    selector.selectedIndex = 0;
  }
}

/**
 * Setup mode toggle event listeners
 */
function setupModeToggle() {
  // Configure event listeners for mode buttons
  const basicModeBtn = document.getElementById('basic-mode-btn');
  const multipleModeBtn = document.getElementById('multiple-mode-btn');
  
  if (basicModeBtn) {
    basicModeBtn.addEventListener('click', () => switchCalculationMode('basic'));
  }
  if (multipleModeBtn) {
    multipleModeBtn.addEventListener('click', () => switchCalculationMode('multipleForces'));
  }
}

/**
 * Setup example buttons functionality
 */
function setupExampleButtons() {
  // Configure the example button
  const loadExampleBtn = document.getElementById('load-example-btn');
  if (loadExampleBtn) {
    loadExampleBtn.addEventListener('click', function() {
      // Load perpendicular forces example
      const exampleForces = [
        { magnitude: 30, angle: 0, unit: 'N' },
        { magnitude: 40, angle: 90, unit: 'N' }
      ];
      
      if (typeof window.loadMultipleForceExample === 'function') {
        window.loadMultipleForceExample(exampleForces);
        
        // Set example mass
        const massInput = document.querySelector('#mass-multiple input');
        if (massInput) {
          massInput.value = '10';
        }
      }
    });
  }
}

/**
 * Setup calculator systems and initialize default state
 */
function setupCalculatorSystems() {
  // Initially show basic mode
  const basicInputs = document.getElementById('basic-inputs');
  const multipleInputs = document.getElementById('multiple-forces-inputs');
  const basicFormulas = document.getElementById('basic-formulas');
  const multipleFormulas = document.getElementById('multiple-formulas');
  
  if (basicInputs) basicInputs.classList.add('active');
  if (multipleInputs) multipleInputs.classList.remove('active');
  if (basicFormulas) basicFormulas.classList.add('active');
  if (multipleFormulas) multipleFormulas.classList.remove('active');
}

/**
 * Initialize the mode controller when DOM is loaded
 */
function initNewtonModeController() {
  document.addEventListener('DOMContentLoaded', function() {
    setupCalculatorSystems();
    setupModeToggle();
    setupExampleButtons();
    
    // Initialize basic mode by default
    window.currentCalculationMode = 'basic';
    
    console.log('Newton Mode Controller initialized');
  });
}

// Make functions globally available
window.switchCalculationMode = switchCalculationMode;
window.updateVariableSelector = updateVariableSelector;
window.setupModeToggle = setupModeToggle;
window.setupExampleButtons = setupExampleButtons;
window.setupCalculatorSystems = setupCalculatorSystems;

// Auto-initialize if the script is loaded directly
if (document.readyState === 'loading') {
  initNewtonModeController();
} else {
  // DOM already loaded
  setupCalculatorSystems();
  setupModeToggle();
  setupExampleButtons();
  window.currentCalculationMode = 'basic';
  console.log('Newton Mode Controller initialized (DOM already loaded)');
}

export { 
  switchCalculationMode, 
  updateVariableSelector, 
  setupModeToggle, 
  setupExampleButtons, 
  setupCalculatorSystems 
};
