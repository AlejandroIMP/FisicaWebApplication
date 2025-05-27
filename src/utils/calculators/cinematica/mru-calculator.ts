import { type CalculationResult } from "../mcu-calculator";

export function calculateMRU(variableToSolve: string, values: Record<string, number>): CalculationResult {
  // Verificar si values es indefinido o null y manejarlo apropiadamente
  if (!values) {
    return { value: null, unit: '', name: '', formula: '' };
  }
  let result: CalculationResult = { value: null, unit: '', name: '', formula: '' };
        
  switch (variableToSolve) {
    case 'distance':
      if (values.velocity && values.time) {
        result.value = values.velocity * values.time;
        result.unit = 'm';
        result.name = 'Distancia (d)';
        result.formula = 'd = v × t';
      }
      break;
      
    case 'velocity':
      if (values.distance && values.time) {
        result.value = values.distance / values.time;
        result.unit = 'm/s';
        result.name = 'Velocidad (v)';
        result.formula = 'v = d / t';
      }
      break;
      
              
    case 'time':
      if (values.velocity && values.distance) {
        result.value = values.distance / values.velocity;
        result.unit = 's';
        result.name = 'Tiempo (t)';
        result.formula = 't = d / v';
      }
      break;
  }
          
  return result;
}