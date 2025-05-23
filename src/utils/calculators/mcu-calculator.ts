// Estructura para los resultados de los cálculos
export interface CalculationResult {
  value: number | null;
  unit: string;
  name: string;
  formula: string;
}

/**
 * Calcula variables para el Movimiento Circular Uniforme (MCU)
 * @param variableToSolve La variable que se quiere calcular
 * @param values Los valores conocidos para otras variables
 * @returns Resultado del cálculo con valor, unidad, nombre y fórmula
 */
export function calculateMCU(variableToSolve: string, values: Record<string, number>): CalculationResult {
  // Verificar si values es indefinido o null y manejarlo apropiadamente
  if (!values) {
    return { value: null, unit: '', name: '', formula: '' };
  }

  const PI: number = Math.PI;
  let result: CalculationResult = { value: null, unit: '', name: '', formula: '' };
        
  switch (variableToSolve) {
    case 'radius':
      if (values.linearVelocity && values.angularVelocity) {
        result.value = values.linearVelocity / values.angularVelocity;
        result.unit = 'm';
        result.name = 'Radio (r)';
        result.formula = 'r = v / ω';
      } else if (values.linearVelocity && values.period) {
        result.value = (values.linearVelocity * values.period) / (2 * PI);
        result.unit = 'm';
        result.name = 'Radio (r)';
        result.formula = 'r = (v × T) / 2π';
      } else if (values.centripetalAcceleration && values.angularVelocity) {
        result.value = values.centripetalAcceleration / (values.angularVelocity * values.angularVelocity);
        result.unit = 'm';
        result.name = 'Radio (r)';
        result.formula = 'r = a / ω²';
      }
      break;
      
    case 'angularVelocity':
      if (values.period) {
        result.value = (2 * PI) / values.period;
        result.unit = 'rad/s';
        result.name = 'Velocidad angular (ω)';
        result.formula = 'ω = 2π / T';
      } else if (values.frequency) {
        result.value = 2 * PI * values.frequency;
        result.unit = 'rad/s';
        result.name = 'Velocidad angular (ω)';
        result.formula = 'ω = 2π × f';
      } else if (values.linearVelocity && values.radius) {
        result.value = values.linearVelocity / values.radius;
        result.unit = 'rad/s';
        result.name = 'Velocidad angular (ω)';
        result.formula = 'ω = v / r';
      } else if (values.angularDisplacement && values.time) {
        result.value = values.angularDisplacement / values.time;
        result.unit = 'rad/s';
        result.name = 'Velocidad angular (ω)';
        result.formula = 'ω = θ / t';
      } else if (values.centripetalAcceleration && values.radius) {
        result.value = Math.sqrt(values.centripetalAcceleration / values.radius);
        result.unit = 'rad/s';
        result.name = 'Velocidad angular (ω)';
        result.formula = 'ω = √(a / r)';
      }
      break;
      
    case 'linearVelocity':
      if (values.angularVelocity && values.radius) {
        result.value = values.angularVelocity * values.radius;
        result.unit = 'm/s';
        result.name = 'Velocidad lineal (v)';
        result.formula = 'v = ω × r';
      } else if (values.period && values.radius) {
        result.value = (2 * PI * values.radius) / values.period;
        result.unit = 'm/s';
        result.name = 'Velocidad lineal (v)';
        result.formula = 'v = 2πr / T';
      } else if (values.frequency && values.radius) {
        result.value = 2 * PI * values.frequency * values.radius;
        result.unit = 'm/s';
        result.name = 'Velocidad lineal (v)';
        result.formula = 'v = 2πfr';
      } else if (values.centripetalAcceleration && values.radius) {
        result.value = Math.sqrt(values.centripetalAcceleration * values.radius);
        result.unit = 'm/s';
        result.name = 'Velocidad lineal (v)';
        result.formula = 'v = √(a × r)';
      }
      break;
              
    case 'period':
      if (values.angularVelocity) {
        result.value = (2 * PI) / values.angularVelocity;
        result.unit = 's';
        result.name = 'Periodo (T)';
        result.formula = 'T = 2π / ω';
      } else if (values.frequency) {
        result.value = 1 / values.frequency;
        result.unit = 's';
        result.name = 'Periodo (T)';
        result.formula = 'T = 1 / f';
      } else if (values.linearVelocity && values.radius) {
        result.value = (2 * PI * values.radius) / values.linearVelocity;
        result.unit = 's';
        result.name = 'Periodo (T)';
        result.formula = 'T = 2πr / v';
      }
      break;
              
    case 'frequency':
      if (values.period) {
        result.value = 1 / values.period;
        result.unit = 'Hz';
        result.name = 'Frecuencia (f)';
        result.formula = 'f = 1 / T';
      } else if (values.angularVelocity) {
        result.value = values.angularVelocity / (2 * PI);
        result.unit = 'Hz';
        result.name = 'Frecuencia (f)';
        result.formula = 'f = ω / 2π';
      }
      break;
              
    case 'centripetalAcceleration':
      if (values.linearVelocity && values.radius) {
        result.value = (values.linearVelocity * values.linearVelocity) / values.radius;
        result.unit = 'm/s²';
        result.name = 'Aceleración centrípeta (a)';
        result.formula = 'a = v² / r';
      } else if (values.angularVelocity && values.radius) {
        result.value = values.angularVelocity * values.angularVelocity * values.radius;
        result.unit = 'm/s²';
        result.name = 'Aceleración centrípeta (a)';
        result.formula = 'a = ω² × r';
      }
      break;
              
    case 'angularDisplacement':
      if (values.angularVelocity && values.time) {
        result.value = values.angularVelocity * values.time;
        result.unit = 'rad';
        result.name = 'Desplazamiento angular (θ)';
        result.formula = 'θ = ω × t';
      }
      break;
              
    case 'time':
      if (values.angularVelocity && values.angularDisplacement) {
        result.value = values.angularDisplacement / values.angularVelocity;
        result.unit = 's';
        result.name = 'Tiempo (t)';
        result.formula = 't = θ / ω';
      }
      break;
  }
          
  return result;
}
