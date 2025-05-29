import { type UnitType } from '../../types';
import { convertToBaseUnit, convertFromBaseUnit } from '../unit-converter/unit-converter';
import { type CalculationResult } from '../../types/calculator-controller-type';
import { CalculationErrorHandler } from '../Handlers/calculator-error-handler';




/**
 * Retrieves a DOM element by its ID and ensures it exists.
 * 
 * @template T - The type of HTMLElement to return.
 * @param {string} id - The ID of the element to retrieve.
 * @returns {T} - The element with the specified ID cast to type T.
 * @throws {Error} - Throws an error if no element with the specified ID is found.
 * 
 * @example
 * // Get an input element
 * const inputElement = getElementByIdStrict<HTMLInputElement>("myInput");
 * // Now inputElement has all HTMLInputElement methods and properties
 */
export function getElementByIdStrict<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with id ${id} not found`);
  }
  return element as T;
}
/**
 * Tipo para la configuración del calculador
 */
export interface CalculatorConfig {
  // Función que realiza el cálculo específico
  calculateFunction: (variableToSolve: string, values: Record<string, number>) => CalculationResult;
  
  // Agrupaciones de variables que deben mostrarse juntas
  variableGroups: Record<string, string[]>;
}

/**
 * Configuración para inicializar una calculadora genérica
 * @param config Configuración específica para la calculadora
 */
export function setupCalculator(config: CalculatorConfig): void {
  const variableToSolveSelect = getElementByIdStrict<HTMLSelectElement>('variable-to-solve');
  const calculateBtn = getElementByIdStrict<HTMLButtonElement>('calculate-btn');
  const resultDiv = getElementByIdStrict<HTMLDivElement>('result');
  const formulaUsedDiv = getElementByIdStrict<HTMLDivElement>('formula-used');
  
  const inputGroups: Record<string, HTMLDivElement> = {};
  const inputs: Record<string, HTMLInputElement> = {};
  const unitSelectors: Record<string, HTMLSelectElement> = {};
  
  document.querySelectorAll('.input-group').forEach(group => {
    const id = group.id.replace('-group', '');
    
    const camelCaseId = id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    
    inputGroups[camelCaseId] = group as HTMLDivElement;
    
    const inputElement = getElementByIdStrict<HTMLInputElement>(id);
    const unitElement = getElementByIdStrict<HTMLSelectElement>(`${id}-unit`);
    
    if (inputElement) inputs[camelCaseId] = inputElement;
    if (unitElement) unitSelectors[camelCaseId] = unitElement;
  });
  
  /**
   * Actualiza los campos visibles según la variable a resolver seleccionada
   */
  function updateVisibleFields(): void {
    const variableToSolve = variableToSolveSelect.value;
    
    for (const key in inputGroups) {
      if (Object.prototype.hasOwnProperty.call(inputGroups, key)) {
        inputGroups[key].style.display = 'block';
      }
    }
    
    if (variableToSolve in inputGroups) {
      inputGroups[variableToSolve].style.display = 'none';
    }
    
    if (!config.variableGroups || !config.variableGroups[variableToSolve]) return;
    
    for (const key in inputGroups) {
      if (Object.prototype.hasOwnProperty.call(inputGroups, key) && 
          key !== variableToSolve && 
          !config.variableGroups[variableToSolve].includes(key)) {
        inputGroups[key].style.display = 'none';
      }
    }
  }
  
  // Agregar listeners de eventos
  variableToSolveSelect.addEventListener('change', updateVisibleFields);
  
  calculateBtn.addEventListener('click', function() {
    const variableToSolve = variableToSolveSelect.value;
    const values: Record<string, number> = {};
    const selectedUnits: Record<string, string> = {};
    
    // Recopilar valores como antes
    for (const key in inputs) {
      if (Object.prototype.hasOwnProperty.call(inputs, key) && 
          key !== variableToSolve &&
          !inputGroups[key].style.display.includes('none')) {
        
        const inputValue = parseFloat(inputs[key].value);
        const unitSelected = unitSelectors[key].value;
        
        if (inputs[key].value.trim() !== '') {
          selectedUnits[key] = unitSelected;
          values[key] = isNaN(inputValue) ? NaN : convertToBaseUnit(inputValue, key as UnitType, unitSelected);
        }
      }
    }
    
    // Determinar campos requeridos según la variable a resolver
    const requiredFields = config.variableGroups[variableToSolve] || [];
    
    // Crear mapeo de etiquetas para campos
    const fieldLabels: Record<string, string> = {};
    Object.keys(inputs).forEach(key => {
      const label = inputs[key].closest('.input-group')?.querySelector('label')?.textContent || key;
      fieldLabels[key] = label;
    });
    
    // Validar entradas
    const validation = CalculationErrorHandler.validateInputs(
      variableToSolve, 
      values, 
      requiredFields, 
      fieldLabels
    );
    
    if (!validation.isValid && validation.error) {
      // Mostrar error de validación
      resultDiv.innerHTML = `
        <div class="error-container">
          <div class="error-icon">❌</div>
          <div class="error-content">
            <h4>Error en los datos de entrada</h4>
            <p>${validation.error.userMessage}</p>
            ${validation.error.missingFields ? 
              `<div class="missing-fields">
                <strong>Campos requeridos:</strong> ${validation.error.missingFields.join(', ')}
              </div>` : ''
            }
            ${validation.error.invalidFields ? 
              `<div class="invalid-fields">
                <strong>Valores inválidos:</strong> ${validation.error.invalidFields.join(', ')}
              </div>` : ''
            }
            <div class="suggestions">
              <strong>Sugerencias:</strong>
              <ul>
                ${validation.error.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
      formulaUsedDiv.innerHTML = '';
      return;
    }
    
    try {
      // Realizar el cálculo con valores validados
      const result = config.calculateFunction(variableToSolve, validation.processedValues!);
      
      // Guardar resultado para análisis
      (window as any).lastCalculationResult = result;
      
      // Verificar si el resultado contiene un error
      if (result.error) {
        resultDiv.innerHTML = `
          <div class="error-container">
            <div class="error-icon">⚠️</div>
            <div class="error-content">
              <h4>Error en el cálculo</h4>
              <p>${result.error.userMessage}</p>
              <div class="suggestions">
                <strong>Sugerencias:</strong>
                <ul>
                  ${result.error.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                </ul>
              </div>
              ${result.error.technicalDetails ? 
                `<details class="technical-details">
                  <summary>Detalles técnicos</summary>
                  <p>${result.error.technicalDetails}</p>
                </details>` : ''
              }
            </div>
          </div>
        `;
        formulaUsedDiv.innerHTML = '';
        return;
      }
      
      // Mostrar resultado exitoso
      if (result.value !== null && !isNaN(result.value) && isFinite(result.value)) {
        const resultUnitSelected = variableToSolve in unitSelectors ? 
                                 unitSelectors[variableToSolve].value : 
                                 result.unit;
   
        const displayValue = variableToSolve in unitSelectors ? 
                            convertFromBaseUnit(result.value, variableToSolve as UnitType, resultUnitSelected) :
                            result.value;
                            
        resultDiv.innerHTML = `
          <div class="success-container">
            <div class="result-main">
              ${result.name} = <strong>${displayValue.toFixed(4)} ${resultUnitSelected}</strong>
            </div>
            ${result.warnings ? 
              `<div class="warnings">
                ${result.warnings.map(warning => `<div class="warning">⚠️ ${warning}</div>`).join('')}
              </div>` : ''
            }
          </div>
        `;
        formulaUsedDiv.innerHTML = `Fórmula: ${result.formula}`;
      } else {
        // Error genérico en el resultado
        resultDiv.innerHTML = `
          <div class="error-container">
            <div class="error-icon">❌</div>
            <div class="error-content">
              <h4>Resultado inválido</h4>
              <p>El cálculo produjo un resultado no válido. Por favor, revisa los datos ingresados.</p>
              <div class="suggestions">
                <strong>Sugerencias:</strong>
                <ul>
                  <li>Verifica que todos los valores sean correctos</li>
                  <li>Asegúrate de usar las unidades apropiadas</li>
                  <li>Revisa que los valores estén en rangos físicamente posibles</li>
                </ul>
              </div>
            </div>
          </div>
        `;
        formulaUsedDiv.innerHTML = '';
      }
      
    } catch (error) {
      // Manejar errores de cálculo
      const calcError = CalculationErrorHandler.handleCalculationError(error, variableToSolve);
      resultDiv.innerHTML = `
        <div class="error-container">
          <div class="error-icon">💥</div>
          <div class="error-content">
            <h4>Error inesperado</h4>
            <p>${calcError.userMessage}</p>
            <div class="suggestions">
              <strong>Sugerencias:</strong>
              <ul>
                ${calcError.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
              </ul>
            </div>
            <details class="technical-details">
              <summary>Información técnica</summary>
              <p>${calcError.technicalDetails}</p>
            </details>
          </div>
        </div>
      `;
      formulaUsedDiv.innerHTML = '';
      
      // Log para desarrollo
      console.error('Calculation error:', error);
    }
  });
  
  // Inicializar los campos visibles
  updateVisibleFields();
}
