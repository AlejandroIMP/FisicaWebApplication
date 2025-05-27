import { type UnitType } from '../../types';
import { convertToBaseUnit, convertFromBaseUnit } from '../unit-converter/unit-converter';
import { type CalculationResult } from './mcu-calculator';

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
    
    for (const key in inputs) {
      if (Object.prototype.hasOwnProperty.call(inputs, key) && 
          key !== variableToSolve &&
          !inputGroups[key].style.display.includes('none')) {
        
        const inputValue = parseFloat(inputs[key].value);
        const unitSelected = unitSelectors[key].value;
        
        // Incluir valores no válidos (NaN) para que las calculadoras los procesen
        // y manejen internamente, permitiendo pruebas más robustas
        if (inputs[key].value.trim() !== '') {
          selectedUnits[key] = unitSelected;
          values[key] = isNaN(inputValue) ? NaN : convertToBaseUnit(inputValue, key as UnitType, unitSelected);
        }
      }
    }
    
    const result = config.calculateFunction(variableToSolve, values);
    
    // Guardar el resultado para análisis detallado
    (window as any).lastCalculationResult = result;
    
    // Mostrar el resultado
    if (result.value !== null && !isNaN(result.value) && isFinite(result.value)) {
      const resultUnitSelected = variableToSolve in unitSelectors ? 
                               unitSelectors[variableToSolve].value : 
                               result.unit;
 
      const displayValue = variableToSolve in unitSelectors ? 
                          convertFromBaseUnit(result.value, variableToSolve as UnitType, resultUnitSelected) :
                          result.value;
                          
      resultDiv.innerHTML = `${result.name} = <strong>${displayValue.toFixed(4)} ${resultUnitSelected}</strong>`;
      formulaUsedDiv.innerHTML = `Fórmula: ${result.formula}`;
    } else {
      resultDiv.innerHTML = 'No se pudo calcular. Por favor, revisa los datos ingresados.';
      formulaUsedDiv.innerHTML = '';
    }
  });
  
  // Inicializar los campos visibles
  updateVisibleFields();
}
