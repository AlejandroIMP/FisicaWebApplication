import { type UnitType } from '../types';
import { conversionFactors } from './unit-converter/conversion-factors';
/**
 * Converts a numerical value from a specified unit to its base unit using conversion factors.
 * 
 * @param value - The numerical value to be converted
 * @param type - The category of unit (e.g., length, mass, time)
 * @param unitSelected - The specific unit the value is currently expressed in
 * @returns The value converted to the base unit for the given unit type, or the original value if no conversion is defined
 * 
 * @example
 * // Convert 100 centimeters to meters (assuming 'length' is the UnitType and base unit is meters)
 * const baseValue = convertToBaseUnit(100, 'length', 'cm');
 */
export function convertToBaseUnit(value: number, type: UnitType, unitSelected: string): number {
  if (!unitSelected || !conversionFactors[type] || !(unitSelected in conversionFactors[type])) {
    return value;  // Si no hay conversión definida, devolver el valor original
  }
  return value * conversionFactors[type][unitSelected as keyof typeof conversionFactors[typeof type]];
}
      
      // Convertir valor de unidad base (SI) a unidad seleccionada
/**
 * Converts a value from its base unit to another unit of the same type.
 * 
 * @param value - The numeric value to be converted from base unit
 * @param type - The type of unit (e.g., length, mass, temperature)
 * @param unitSelected - The target unit to convert to
 * @returns The converted value in the selected unit, or the original value if no valid conversion exists
 * 
 * @example
 * // Convert 1000 meters to kilometers
 * convertFromBaseUnit(1000, 'length', 'km');
 * // Returns 1
 */
export function convertFromBaseUnit(value: number, type: UnitType, unitSelected: string): number {
  if (!unitSelected || !conversionFactors[type] || !(unitSelected in conversionFactors[type])) {
    return value;  // Si no hay conversión definida, devolver el valor original
  }
  return value / conversionFactors[type][unitSelected as keyof typeof conversionFactors[typeof type]];
}

/**
 * Calculates uniform circular motion (MCU) variables based on known values.
 * This function determines a requested circular motion variable using available inputs.
 *
 * @param variableToSolve - The name of the variable to calculate.
 * Possible values: 'radius', 'angularVelocity', 'linearVelocity', 'period',
 * 'frequency', 'centripetalAcceleration', 'angularDisplacement', 'time'
 * 
 * @param values - Object containing known variables and their values.
 * Possible properties:
 *   - radius: Radius of the circular path (m)
 *   - angularVelocity: Angular velocity (rad/s)
 *   - linearVelocity: Linear/tangential velocity (m/s)
 *   - period: Time to complete one revolution (s)
 *   - frequency: Number of revolutions per second (Hz)
 *   - centripetalAcceleration: Centripetal acceleration (m/s²)
 *   - angularDisplacement: Angular displacement (rad)
 *   - time: Time elapsed (s)
 *
 * @returns An object containing the calculated result:
 *   - value: The calculated value (null if calculation not possible)
 *   - unit: The unit of the calculated value
 *   - name: The display name of the calculated variable
 *   - formula: The formula used for calculation
 *
 * @example
 * // Calculate radius from linear velocity and angular velocity
 * const result = calculate('radius', { linearVelocity: 10, angularVelocity: 2 });
 * // Returns: { value: 5, unit: 'm', name: 'Radio (r)', formula: 'r = v / ω' }
 */
export function calculate(variableToSolve: string, values: Record<string, number>) {
  const PI = Math.PI;
  type Result = {
    value: number | null;
    unit: string;
    name: string;
    formula: string;
  };
  let result:Result = { value: null , unit: '', name: '', formula: '' };
        
        
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

/**
 * Calculates variables for Uniformly Accelerated Circular Motion (MCUA).
 * 
 * This function solves equations related to angular kinematics based on the variable
 * that needs to be calculated and the provided known values.
 * 
 * @param variableToSolve - The variable to calculate. Possible values are:
 *   'initialAngularVelocity', 'finalAngularVelocity', 'angularAcceleration',
 *   'tangentialAcceleration', 'time', 'angularDisplacement', 'radius',
 *   'totalAcceleration', 'centripetalAcceleration'
 * @param values - An object containing known values for the calculation.
 *   Depending on the variable to solve, different combinations of the following
 *   values may be required:
 *   - initialAngularVelocity: Initial angular velocity (rad/s)
 *   - finalAngularVelocity: Final angular velocity (rad/s)
 *   - angularAcceleration: Angular acceleration (rad/s²)
 *   - tangentialAcceleration: Tangential acceleration (m/s²)
 *   - time: Time (s)
 *   - angularDisplacement: Angular displacement (rad)
 *   - radius: Radius (m)
 *   - centripetalAcceleration: Centripetal acceleration (m/s²)
 * 
 * @returns An object containing:
 *   - value: The calculated result or null if it couldn't be calculated
 *   - unit: The unit of measurement for the result
 *   - name: The descriptive name of the calculated variable
 *   - formula: The formula used in the calculation
 * 
 * @example
 * // Calculate final angular velocity
 * calculateMCUA('finalAngularVelocity', {
 *   initialAngularVelocity: 2,
 *   angularAcceleration: 0.5,
 *   time: 10
 * });
 * // Returns: { value: 7, unit: 'rad/s', name: 'Velocidad angular final (ω)', formula: 'ω = ω₀ + α × t' }
 */
export function calculateMCUA(variableToSolve: string, values: Record<string, number>) {
  const PI = Math.PI;
  type Result = {
    value: number | null;
    unit: string;
    name: string;
    formula: string;
  };
  let result:Result = { value: null , unit: '', name: '', formula: '' };
  
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
