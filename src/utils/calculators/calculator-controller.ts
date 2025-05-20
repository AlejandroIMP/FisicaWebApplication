import { type UnitType } from '../../types';
import { convertToBaseUnit, convertFromBaseUnit } from '../unit-converter/unit-converter';
import { type CalculationResult } from './mcu-calculator';

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
  const variableToSolveSelect = document.getElementById('variable-to-solve') as HTMLSelectElement;
  const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;
  const resultDiv = document.getElementById('result') as HTMLDivElement;
  const formulaUsedDiv = document.getElementById('formula-used') as HTMLDivElement;
  
  // Buscar todos los grupos de entrada en la página
  const inputGroups: Record<string, HTMLDivElement> = {};
  const inputs: Record<string, HTMLInputElement> = {};
  const unitSelectors: Record<string, HTMLSelectElement> = {};
  
  // Inicializar las colecciones de elementos del DOM
  document.querySelectorAll('.input-group').forEach(group => {
    const id = group.id.replace('-group', '');
    
    // Normalizar los IDs (convertir dash-case a camelCase)
    const camelCaseId = id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    
    inputGroups[camelCaseId] = group as HTMLDivElement;
    
    const inputElement = document.getElementById(id) as HTMLInputElement;
    const unitElement = document.getElementById(`${id}-unit`) as HTMLSelectElement;
    
    if (inputElement) inputs[camelCaseId] = inputElement;
    if (unitElement) unitSelectors[camelCaseId] = unitElement;
  });
  
  /**
   * Actualiza los campos visibles según la variable a resolver seleccionada
   */
  function updateVisibleFields(): void {
    const variableToSolve = variableToSolveSelect.value;
    
    // Por defecto, mostrar todos los grupos
    for (const key in inputGroups) {
      if (Object.prototype.hasOwnProperty.call(inputGroups, key)) {
        inputGroups[key].style.display = 'block';
      }
    }
    
    // Ocultar el grupo de la variable a resolver
    if (variableToSolve in inputGroups) {
      inputGroups[variableToSolve].style.display = 'none';
    }
    
    // Si no hay grupos de variables configurados, mostrar todo
    if (!config.variableGroups || !config.variableGroups[variableToSolve]) return;
    
    // Ocultar todos los grupos excepto los relacionados con la variable a resolver
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
    
    // Recoger valores y unidades seleccionadas de los campos visibles
    for (const key in inputs) {
      if (Object.prototype.hasOwnProperty.call(inputs, key) && 
          key !== variableToSolve && 
          !inputGroups[key].style.display.includes('none')) {
        
        const inputValue = parseFloat(inputs[key].value);
        const unitSelected = unitSelectors[key].value;
        
        if (!isNaN(inputValue) && inputValue !== 0) {
          // Guardar la unidad seleccionada para mostrarla en el resultado
          selectedUnits[key] = unitSelected;
          
          // Convertir a unidad base (SI) para cálculos
          values[key] = convertToBaseUnit(inputValue, key as UnitType, unitSelected);
          // console.log(`Convertido ${key}: ${inputValue} ${unitSelected} → ${values[key]} (unidad base)`);
        }
      }
    }
    
    // Realizar el cálculo usando la función específica de la calculadora
    const result = config.calculateFunction(variableToSolve, values);
    
    // Mostrar el resultado
    if (result.value !== null) {
      // Obtener la unidad seleccionada para el resultado
      const resultUnitSelected = variableToSolve in unitSelectors ? 
                               unitSelectors[variableToSolve].value : 
                               result.unit;
      
      // Convertir el resultado de unidad base a unidad seleccionada
      const displayValue = variableToSolve in unitSelectors ? 
                          convertFromBaseUnit(result.value, variableToSolve as UnitType, resultUnitSelected) :
                          result.value;
                          
      //console.log(`Resultado convertido: ${result.value} (unidad base) → ${displayValue} ${resultUnitSelected}`);
      
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
