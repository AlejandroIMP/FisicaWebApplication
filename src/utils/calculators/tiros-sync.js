/**
 * Este script maneja la sincronización entre la interfaz moderna y 
 * los scripts originales de las calculadoras de tiros
 */

// Importamos la declaración de tipos para window.calcular
import "../../types/calculator-globals";

// Definir globalmente la función calcular para que esté disponible
// Esta función se redefine al cargar los scripts originales
if (typeof window !== 'undefined') {
  window.calcular = function() {
    console.log("La función calcular se está inicializando...");
  };
}

/**
 * Inicializa la calculadora de tiro vertical
 */
export function initTiroVertical() {
  // Asegurarse de que se ejecute solo en el navegador (no en SSR)
  if (typeof document === 'undefined') return;

  document.addEventListener('DOMContentLoaded', function() {
    // Elementos de la nueva interfaz
    const variableSelect = document.getElementById('variableSelect');
    const formulaSelect = document.getElementById('formulaSelect');
    const formulaSelector = document.getElementById('formulaSelector');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDisplay = document.getElementById('resultDisplay');
    const inputFieldsElement = document.getElementById('inputFields');
    
    // Verificamos que existan los elementos necesarios
    if (!variableSelect || !formulaSelect || !formulaSelector || !calculateBtn || !resultDisplay || !inputFieldsElement) {
      console.error("No se pudieron encontrar todos los elementos necesarios en la interfaz");
      return;
    }
    
    const inputFields = inputFieldsElement.querySelectorAll('.input-wrapper');
    
    // Conectamos con los selectores originales que usa el script mainvertical.js
    const originalVarSelect = document.createElement('select');
    originalVarSelect.id = 'selectVariable';
    originalVarSelect.style.display = 'none';
    document.body.appendChild(originalVarSelect);
    
    const originalFormSelect = document.createElement('select');
    originalFormSelect.id = 'selectFormula';
    originalFormSelect.style.display = 'none';
    document.body.appendChild(originalFormSelect);
    
    const originalInputs = document.createElement('div');
    originalInputs.id = 'inputs';
    originalInputs.style.display = 'none';
    originalInputs.className = 'tiro-inputs';
    document.body.appendChild(originalInputs);
    
    // Creamos los div contenedores para cada input original
    ['h', 'h0', 'h_max', 'v0', 'vt', 't', 'g'].forEach(key => {
      const div = document.createElement('div');
      div.setAttribute('data-key', key);
      div.className = 'tiro-input-group';
      div.style.display = 'none';
      
      const label = document.createElement('label');
      label.textContent = key + ':';
      
      const input = document.createElement('input');
      input.type = 'number';
      input.id = key;
      input.className = 'tiro-input';
      input.step = 'any';
      if (key === 'g') input.placeholder = '9.8';
      
      div.appendChild(label);
      div.appendChild(input);
      originalInputs.appendChild(div);
    });
    
    const originalResult = document.createElement('div');
    originalResult.id = 'resultado';
    originalResult.className = 'tiro-resultado';
    originalResult.style.display = 'none';
    document.body.appendChild(originalResult);
    
    // Cuando cambia el selector de variable
    variableSelect.addEventListener('change', function() {
      originalVarSelect.value = this.value;
      // Disparamos el evento change en el select original
      const event = new Event('change');
      originalVarSelect.dispatchEvent(event);
      
      // Actualizamos el selector de fórmulas
      setTimeout(() => {
        formulaSelect.innerHTML = '';
        const opts = originalFormSelect.querySelectorAll('option');
        opts.forEach(opt => {
          const newOpt = document.createElement('option');
          newOpt.value = opt.value;
          newOpt.textContent = opt.textContent || '';
          formulaSelect.appendChild(newOpt);
        });
        
        if (opts.length > 1) {
          formulaSelector.classList.remove('hidden-initially');
        } else {
          formulaSelector.classList.add('hidden-initially');
        }
      }, 100);
    });
    
    // Cuando cambia el selector de fórmulas
    formulaSelect.addEventListener('change', function() {
      originalFormSelect.value = this.value;
      // Disparamos el evento change en el select original
      const event = new Event('change');
      originalFormSelect.dispatchEvent(event);
      
      // Actualizamos la visibilidad de los campos
      setTimeout(() => {
        inputFields.forEach(field => {
          const key = field.getAttribute('data-key') || '';
          const originalField = originalInputs.querySelector(`[data-key="${key}"]`);
          if (originalField) {
            if (originalField.style.display === 'none') {
              field.classList.add('hidden-initially');
            } else {
              field.classList.remove('hidden-initially');
            }
          }
        });
      }, 50);
    });
    
    // Botón de calcular
    calculateBtn.addEventListener('click', function() {
      // Sincronizamos los valores de los inputs
      inputFields.forEach(field => {
        if (field.classList.contains('hidden-initially')) return;
        
        const key = field.getAttribute('data-key') || '';
        const input = field.querySelector('input');
        const originalInput = document.getElementById(key);
        
        if (input && originalInput) {
          originalInput.value = input.value;
        }
      });
      
      // Llamamos a la función calcular del script original
      if (typeof window.calcular === 'function') {
        window.calcular();
        
        // Mostramos el resultado en nuestra interfaz
        setTimeout(() => {
          if (originalResult.textContent && originalResult.textContent.trim() !== '') {
            resultDisplay.textContent = originalResult.textContent;
            resultDisplay.classList.remove('hidden-initially');
          }
        }, 100);
      } else {
        console.error('La función calcular no está disponible');
      }
    });
  });
}

/**
 * Inicializa la calculadora de tiro parabólico
 */
export function initTiroParabolico() {
  // Asegurarse de que se ejecute solo en el navegador (no en SSR)
  if (typeof document === 'undefined') return;
  
  document.addEventListener('DOMContentLoaded', function() {
    // Elementos de la nueva interfaz
    const variableSelect = document.getElementById('variableSelect');
    const formulaSelect = document.getElementById('formulaSelect');
    const formulaSelector = document.getElementById('formulaSelector');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDisplay = document.getElementById('resultDisplay');
    const inputFieldsElement = document.getElementById('inputFields');
    
    // Verificamos que existan los elementos necesarios
    if (!variableSelect || !formulaSelect || !formulaSelector || !calculateBtn || !resultDisplay || !inputFieldsElement) {
      console.error("No se pudieron encontrar todos los elementos necesarios en la interfaz");
      return;
    }
    
    const inputFields = inputFieldsElement.querySelectorAll('.input-wrapper');
    
    // Conectamos con los selectores originales que usa el script mainparabolico.js
    const originalVarSelect = document.createElement('select');
    originalVarSelect.id = 'selectVariable';
    originalVarSelect.style.display = 'none';
    document.body.appendChild(originalVarSelect);
    
    const originalFormSelect = document.createElement('select');
    originalFormSelect.id = 'selectFormula';
    originalFormSelect.style.display = 'none';
    document.body.appendChild(originalFormSelect);
    
    const originalInputs = document.createElement('div');
    originalInputs.id = 'inputs';
    originalInputs.style.display = 'none';
    originalInputs.className = 'tiro-inputs';
    document.body.appendChild(originalInputs);
    
    // Creamos los div contenedores para cada input original
    ['x', 'y', 'v0', 'vx', 'vy', 'v0x', 'v0y', 'theta', 't', 'g'].forEach(key => {
      const div = document.createElement('div');
      div.setAttribute('data-key', key);
      div.className = 'tiro-input-group';
      div.style.display = 'none';
      
      const label = document.createElement('label');
      label.textContent = key + ':';
      
      const input = document.createElement('input');
      input.type = 'number';
      input.id = key;
      input.className = 'tiro-input';
      input.step = 'any';
      if (key === 'g') input.placeholder = '9.8';
      
      div.appendChild(label);
      div.appendChild(input);
      originalInputs.appendChild(div);
    });
    
    const originalResult = document.createElement('div');
    originalResult.id = 'resultado';
    originalResult.className = 'tiro-resultado';
    originalResult.style.display = 'none';
    document.body.appendChild(originalResult);
    
    // Cuando cambia el selector de variable
    variableSelect.addEventListener('change', function() {
      originalVarSelect.value = this.value;
      // Disparamos el evento change en el select original
      const event = new Event('change');
      originalVarSelect.dispatchEvent(event);
      
      // Actualizamos el selector de fórmulas
      setTimeout(() => {
        formulaSelect.innerHTML = '';
        const opts = originalFormSelect.querySelectorAll('option');
        opts.forEach(opt => {
          const newOpt = document.createElement('option');
          newOpt.value = opt.value;
          newOpt.textContent = opt.textContent || '';
          formulaSelect.appendChild(newOpt);
        });
        
        if (opts.length > 1) {
          formulaSelector.classList.remove('hidden-initially');
        } else {
          formulaSelector.classList.add('hidden-initially');
        }
      }, 100);
    });
    
    // Cuando cambia el selector de fórmulas
    formulaSelect.addEventListener('change', function() {
      originalFormSelect.value = this.value;
      // Disparamos el evento change en el select original
      const event = new Event('change');
      originalFormSelect.dispatchEvent(event);
      
      // Actualizamos la visibilidad de los campos
      setTimeout(() => {
        inputFields.forEach(field => {
          const key = field.getAttribute('data-key') || '';
          const originalField = originalInputs.querySelector(`[data-key="${key}"]`);
          if (originalField) {
            if (originalField.style.display === 'none') {
              field.classList.add('hidden-initially');
            } else {
              field.classList.remove('hidden-initially');
            }
          }
        });
      }, 50);
    });
    
    // Botón de calcular
    calculateBtn.addEventListener('click', function() {
      // Sincronizamos los valores de los inputs
      inputFields.forEach(field => {
        if (field.classList.contains('hidden-initially')) return;
        
        const key = field.getAttribute('data-key') || '';
        const input = field.querySelector('input');
        const originalInput = document.getElementById(key);
        
        if (input && originalInput) {
          originalInput.value = input.value;
        }
      });
      
      // Llamamos a la función calcular del script original
      if (typeof window.calcular === 'function') {
        window.calcular();
        
        // Mostramos el resultado en nuestra interfaz
        setTimeout(() => {
          if (originalResult.textContent && originalResult.textContent.trim() !== '') {
            resultDisplay.textContent = originalResult.textContent;
            resultDisplay.classList.remove('hidden-initially');
          }
        }, 100);
      } else {
        console.error('La función calcular no está disponible');
      }
    });
  });
}
