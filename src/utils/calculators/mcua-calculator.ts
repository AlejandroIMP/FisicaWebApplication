import { type CalculationResult } from './mcu-calculator';

/**
 * Calcula variables para el Movimiento Circular Uniformemente Acelerado (MCUA)
 * @param variableToSolve La variable que se quiere calcular
 * @param values Los valores conocidos para otras variables
 * @returns Resultado del cálculo con valor, unidad, nombre y fórmula
 */
export function calculateMCUA(variableToSolve: string, values: Record<string, number>): CalculationResult {
  let result: CalculationResult = { value: null, unit: '', name: '', formula: '' };
  
  switch (variableToSolve) {
    case 'initialAngularVelocity':
      if (values.finalAngularVelocity && values.angularAcceleration && values.time) {
        result.value = values.finalAngularVelocity - (values.angularAcceleration * values.time);
        result.unit = 'rad/s';
        result.name = 'Velocidad angular inicial (ω₀)';
        result.formula = 'ω₀ = ω - α × t';
      } else if (values.angularDisplacement && values.angularAcceleration && values.time) {
        result.value = (values.angularDisplacement - (0.5 * values.angularAcceleration * values.time * values.time)) / values.time;
        result.unit = 'rad/s';
        result.name = 'Velocidad angular inicial (ω₀)';
        result.formula = 'ω₀ = (θ - 0.5 × α × t²) / t';
      } else if (values.finalAngularVelocity && values.angularDisplacement && values.angularAcceleration) {
        result.value = Math.sqrt(values.finalAngularVelocity * values.finalAngularVelocity - 2 * values.angularAcceleration * values.angularDisplacement);
        result.unit = 'rad/s';
        result.name = 'Velocidad angular inicial (ω₀)';
        result.formula = 'ω₀ = √(ω² - 2 × α × θ)';
      }
      break;
      
    case 'finalAngularVelocity':
      if (values.initialAngularVelocity && values.angularAcceleration && values.time) {
        result.value = values.initialAngularVelocity + (values.angularAcceleration * values.time);
        result.unit = 'rad/s';
        result.name = 'Velocidad angular final (ω)';
        result.formula = 'ω = ω₀ + α × t';
      } else if (values.initialAngularVelocity && values.angularDisplacement && values.angularAcceleration) {
        result.value = Math.sqrt(values.initialAngularVelocity * values.initialAngularVelocity + 2 * values.angularAcceleration * values.angularDisplacement);
        result.unit = 'rad/s';
        result.name = 'Velocidad angular final (ω)';
        result.formula = 'ω = √(ω₀² + 2 × α × θ)';
      }
      break;
      
    case 'angularAcceleration':
      if (values.initialAngularVelocity && values.finalAngularVelocity && values.time) {
        result.value = (values.finalAngularVelocity - values.initialAngularVelocity) / values.time;
        result.unit = 'rad/s²';
        result.name = 'Aceleración angular (α)';
        result.formula = 'α = (ω - ω₀) / t';
      } else if (values.initialAngularVelocity && values.angularDisplacement && values.time) {
        result.value = 2 * (values.angularDisplacement - values.initialAngularVelocity * values.time) / (values.time * values.time);
        result.unit = 'rad/s²';
        result.name = 'Aceleración angular (α)';
        result.formula = 'α = 2 × (θ - ω₀ × t) / t²';
      } else if (values.initialAngularVelocity && values.finalAngularVelocity && values.angularDisplacement) {
        result.value = (values.finalAngularVelocity * values.finalAngularVelocity - values.initialAngularVelocity * values.initialAngularVelocity) / (2 * values.angularDisplacement);
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
      if (values.initialAngularVelocity && values.finalAngularVelocity && values.angularAcceleration) {
        result.value = (values.finalAngularVelocity - values.initialAngularVelocity) / values.angularAcceleration;
        result.unit = 's';
        result.name = 'Tiempo (t)';
        result.formula = 't = (ω - ω₀) / α';
      } else if (values.initialAngularVelocity && values.angularDisplacement && values.angularAcceleration) {
        // Resolución de ecuación cuadrática: at² + 2ω₀t - 2θ = 0
        const a = values.angularAcceleration;
        const b = 2 * values.initialAngularVelocity;
        const c = -2 * values.angularDisplacement;
        
        // Utilizamos la fórmula cuadrática, considerando solo el valor positivo
        result.value = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        result.unit = 's';
        result.name = 'Tiempo (t)';
        result.formula = 't = (-2ω₀ + √(4ω₀² + 8αθ)) / (2α)';
      }
      break;
      
    case 'angularDisplacement':
      if (values.initialAngularVelocity && values.time && values.angularAcceleration) {
        result.value = values.initialAngularVelocity * values.time + 0.5 * values.angularAcceleration * values.time * values.time;
        result.unit = 'rad';
        result.name = 'Desplazamiento angular (θ)';
        result.formula = 'θ = ω₀ × t + 0.5 × α × t²';
      } else if (values.initialAngularVelocity && values.finalAngularVelocity && values.time) {
        result.value = 0.5 * (values.initialAngularVelocity + values.finalAngularVelocity) * values.time;
        result.unit = 'rad';
        result.name = 'Desplazamiento angular (θ)';
        result.formula = 'θ = 0.5 × (ω₀ + ω) × t';
      } else if (values.initialAngularVelocity && values.finalAngularVelocity && values.angularAcceleration) {
        result.value = (values.finalAngularVelocity * values.finalAngularVelocity - values.initialAngularVelocity * values.initialAngularVelocity) / (2 * values.angularAcceleration);
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
      if (values.initialAngularVelocity && values.radius) {
        result.value = values.initialAngularVelocity * values.initialAngularVelocity * values.radius;
        result.unit = 'm/s²';
        result.name = 'Aceleración centrípeta (aₙ)';
        result.formula = 'aₙ = ω₀² × r';
      } else if (values.finalAngularVelocity && values.radius) {
        result.value = values.finalAngularVelocity * values.finalAngularVelocity * values.radius;
        result.unit = 'm/s²';
        result.name = 'Aceleración centrípeta (aₙ)';
        result.formula = 'aₙ = ω² × r';
      }
      break;
  }
  
  return result;
}
