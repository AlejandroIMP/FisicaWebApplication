import { type UnitType } from '../types';

export const conversionFactors = {
  radius: {
    'm': 1,
    'cm': 0.01,
    'km': 1000
  },
  angularVelocity: {
    'rad/s': 1,
    'deg/s': Math.PI / 180,  // grados a radianes
    'rpm': Math.PI / 30      // 1 rpm = 2π/60 rad/s
  },
  linearVelocity: {
    'm/s': 1,
    'km/h': 1/3.6,           // 1 km/h = 0.2777... m/s
    'cm/s': 0.01
  },
  period: {
    's': 1,
    'min': 60,
    'h': 3600
  },
  frequency: {
    'Hz': 1,
    'kHz': 1000,
    'rpm': 1/60              // 1 rpm = 1/60 Hz
  },
  centripetalAcceleration: {
    'm/s²': 1,
    'g': 9.8,                // 1g = 9.8 m/s²
    'cm/s²': 0.01
  },
  time: {
    's': 1,
    'min': 60,
    'h': 3600
  },
  angularDisplacement: {
    'rad': 1,
    'deg': Math.PI / 180,    // grados a radianes
    'rev': 2 * Math.PI       // 1 vuelta = 2π rad
  }
}

export function convertToBaseUnit(value: number, type: UnitType, unitSelected: string): number {
  if (!unitSelected || !conversionFactors[type] || !(unitSelected in conversionFactors[type])) {
    return value;  // Si no hay conversión definida, devolver el valor original
  }
  return value * conversionFactors[type][unitSelected as keyof typeof conversionFactors[typeof type]];
}
      
      // Convertir valor de unidad base (SI) a unidad seleccionada
export function convertFromBaseUnit(value: number, type: UnitType, unitSelected: string): number {
  if (!unitSelected || !conversionFactors[type] || !(unitSelected in conversionFactors[type])) {
    return value;  // Si no hay conversión definida, devolver el valor original
  }
  return value / conversionFactors[type][unitSelected as keyof typeof conversionFactors[typeof type]];
}

export function calculate(variableToSolve: string, values: Record<string, number>) {
  const PI = Math.PI;
  type Result = {
    value: number | null;
    unit: string;
    name: string;
    formula: string;
  };
  let result:Result = { value: null , unit: '', name: '', formula: '' };
        
        // El código de cálculo existente se mantiene igual, ya que ahora 
        // todos los valores de entrada ya están en unidades base
        
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