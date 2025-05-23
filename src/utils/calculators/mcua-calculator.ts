import { type CalculationResult } from './mcu-calculator';

/**
 * Calcula variables para el Movimiento Circular Uniformemente Acelerado (MCUA)
 * @param variableToSolve La variable que se quiere calcular
 * @param values Los valores conocidos para otras variables
 * @returns Resultado del cálculo con valor, unidad, nombre y fórmula
 */
export function calculateMCUA(variableToSolve: string, values: Record<string, number>): CalculationResult {
  // Verificar si values es indefinido o null y manejarlo apropiadamente
  if (!values) {
    return { value: null, unit: '', name: '', formula: '' };
  }
  
  let result: CalculationResult = { value: null, unit: '', name: '', formula: '' };
  
  switch (variableToSolve) {
    case 'initialAngularVelocity':
      if ('finalAngularVelocity' in values && values.angularAcceleration && values.time) {
        const w = values.finalAngularVelocity || 0;
        result.value = w - (values.angularAcceleration * values.time);
        result.unit = 'rad/s';
        result.name = 'Velocidad angular inicial (ω₀)';
        result.formula = 'ω₀ = ω - α × t';
      } else if (values.angularDisplacement && values.angularAcceleration && values.time) {
        result.value = (values.angularDisplacement - (0.5 * values.angularAcceleration * values.time * values.time)) / values.time;
        result.unit = 'rad/s';
        result.name = 'Velocidad angular inicial (ω₀)';
        result.formula = 'ω₀ = (θ - 0.5 × α × t²) / t';
      } else if ('finalAngularVelocity' in values && values.angularDisplacement && values.angularAcceleration) {
        const w = values.finalAngularVelocity || 0;
        result.value = Math.sqrt(w * w - 2 * values.angularAcceleration * values.angularDisplacement);
        result.unit = 'rad/s';
        result.name = 'Velocidad angular inicial (ω₀)';
        result.formula = 'ω₀ = √(ω² - 2 × α × θ)';
      }
      break;
      
    case 'finalAngularVelocity':
      if ('initialAngularVelocity' in values && values.angularAcceleration && values.time) {
        const w0 = values.initialAngularVelocity || 0;
        result.value = w0 + (values.angularAcceleration * values.time);
        result.unit = 'rad/s';
        result.name = 'Velocidad angular final (ω)';
        result.formula = 'ω = ω₀ + α × t';
      } else if ('initialAngularVelocity' in values && values.angularDisplacement && values.angularAcceleration) {
        const w0 = values.initialAngularVelocity || 0;
        result.value = Math.sqrt(w0 * w0 + 2 * values.angularAcceleration * values.angularDisplacement);
        result.unit = 'rad/s';
        result.name = 'Velocidad angular final (ω)';
        result.formula = 'ω = √(ω₀² + 2 × α × θ)';
      }
      break;
      
    case 'angularAcceleration':
      if ('initialAngularVelocity' in values && 'finalAngularVelocity' in values && values.time) {
        const w0 = values.initialAngularVelocity || 0;
        const w = values.finalAngularVelocity || 0;
        result.value = (w - w0) / values.time;
        result.unit = 'rad/s²';
        result.name = 'Aceleración angular (α)';
        result.formula = 'α = (ω - ω₀) / t';
      } else if ('initialAngularVelocity' in values && values.angularDisplacement && values.time) {
        const w0 = values.initialAngularVelocity || 0;
        result.value = 2 * (values.angularDisplacement - w0 * values.time) / (values.time * values.time);
        result.unit = 'rad/s²';
        result.name = 'Aceleración angular (α)';
        result.formula = 'α = 2 × (θ - ω₀ × t) / t²';
      } else if ('initialAngularVelocity' in values && 'finalAngularVelocity' in values && values.angularDisplacement) {
        const w0 = values.initialAngularVelocity || 0;
        const w = values.finalAngularVelocity || 0;
        result.value = (w * w - w0 * w0) / (2 * values.angularDisplacement);
        result.unit = 'rad/s²';
        result.name = 'Aceleración angular (α)';
        result.formula = 'α = (ω² - ω₀²) / (2 × θ)';
      } else if (values.radius && values.tangentialAcceleration) {
        result.value = values.tangentialAcceleration / values.radius;
        result.unit = 'rad/s²';
        result.name = 'Aceleración angular (α)';
        result.formula = 'α = aₜ / r';
      }
      break;
      
    case 'tangentialAcceleration':
      if (values.angularAcceleration && values.radius) {
        result.value = values.angularAcceleration * values.radius;
        result.unit = 'm/s²';
        result.name = 'Aceleración tangencial (aₜ)';
        result.formula = 'aₜ = α × r';
      }
      break;
      
    case 'time':
      if ('initialAngularVelocity' in values && 'finalAngularVelocity' in values && values.angularAcceleration) {
        const w0 = values.initialAngularVelocity || 0;
        const w = values.finalAngularVelocity || 0;
        result.value = (w - w0) / values.angularAcceleration;
        result.unit = 's';
        result.name = 'Tiempo (t)';
        result.formula = 't = (ω - ω₀) / α';
      } else if ('initialAngularVelocity' in values && values.angularDisplacement && values.angularAcceleration) {
        // Resolución de ecuación cuadrática: at² + 2ω₀t - 2θ = 0
        const a = values.angularAcceleration;
        // Usar 0 si initialAngularVelocity es 0
        const w0 = values.initialAngularVelocity || 0;
        const b = 2 * w0;
        const c = -2 * values.angularDisplacement;
        
        // Caso especial: si ω₀=0, entonces at² = 2θ
        if (w0 === 0) {
          result.value = Math.sqrt(2 * values.angularDisplacement / values.angularAcceleration);
          result.formula = 't = √(2θ / α)';
        } else {
          // Utilizamos la fórmula cuadrática, considerando solo el valor positivo
          result.value = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
          result.formula = 't = (-2ω₀ + √(4ω₀² + 8αθ)) / (2α)';
        }
        result.unit = 's';
        result.name = 'Tiempo (t)';
      }
      break;
      
    case 'angularDisplacement':
      // Usamos 'in' para verificar si la propiedad existe, independientemente de su valor
      if ('initialAngularVelocity' in values && values.time && values.angularAcceleration) {
        // Usamos valores por defecto con || para manejar caso cuando ω₀=0
        const w0 = values.initialAngularVelocity || 0;
        result.value = w0 * values.time + 0.5 * values.angularAcceleration * values.time * values.time;
        result.unit = 'rad';
        result.name = 'Desplazamiento angular (θ)';
        result.formula = 'θ = ω₀ × t + 0.5 × α × t²';
      } else if ('initialAngularVelocity' in values && 'finalAngularVelocity' in values && values.time) {
        // Manejar casos donde ω₀=0 o ω=0
        const w0 = values.initialAngularVelocity || 0;
        const w = values.finalAngularVelocity || 0;
        result.value = 0.5 * (w0 + w) * values.time;
        result.unit = 'rad';
        result.name = 'Desplazamiento angular (θ)';
        result.formula = 'θ = 0.5 × (ω₀ + ω) × t';
      } else if ('initialAngularVelocity' in values && 'finalAngularVelocity' in values && values.angularAcceleration) {
        // Manejar casos donde ω₀=0 o ω=0
        const w0 = values.initialAngularVelocity || 0;
        const w = values.finalAngularVelocity || 0;
        result.value = (w * w - w0 * w0) / (2 * values.angularAcceleration);
        result.unit = 'rad';
        result.name = 'Desplazamiento angular (θ)';
        result.formula = 'θ = (ω² - ω₀²) / (2 × α)';
      }
      break;
      
    case 'radius':
      if (values.tangentialAcceleration && values.angularAcceleration) {
        result.value = values.tangentialAcceleration / values.angularAcceleration;
        result.unit = 'm';
        result.name = 'Radio (r)';
        result.formula = 'r = aₜ / α';
      }
      break;
      
    case 'totalAcceleration':
      if (values.centripetalAcceleration && values.tangentialAcceleration) {
        result.value = Math.sqrt(values.centripetalAcceleration * values.centripetalAcceleration + values.tangentialAcceleration * values.tangentialAcceleration);
        result.unit = 'm/s²';
        result.name = 'Aceleración total (aₜₒₜₐₗ)';
        result.formula = 'aₜₒₜₐₗ = √(aₙ² + aₜ²)';
      }
      break;
      
    case 'centripetalAcceleration':
      if ('initialAngularVelocity' in values && values.radius) {
        const w0 = values.initialAngularVelocity || 0;
        result.value = w0 * w0 * values.radius;
        result.unit = 'm/s²';
        result.name = 'Aceleración centrípeta (aₙ)';
        result.formula = 'aₙ = ω₀² × r';
      } else if ('finalAngularVelocity' in values && values.radius) {
        const w = values.finalAngularVelocity || 0;
        result.value = w * w * values.radius;
        result.unit = 'm/s²';
        result.name = 'Aceleración centrípeta (aₙ)';
        result.formula = 'aₙ = ω² × r';
      }
      break;
  }
  
  return result;
}
