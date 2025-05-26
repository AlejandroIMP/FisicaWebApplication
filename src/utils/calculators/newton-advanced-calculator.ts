// filepath: /home/alejandrotsx/work/university/physica-platform/src/utils/calculators/newton-advanced-calculator.ts

// Interfaces para compatibilidad con el sistema existente
export interface CalculationResult {
  success: boolean;
  result: number | null;
  error?: string;
  formula?: string;
  explanation?: string;
}

export interface CalculationInput {
  variable: string;
  value: string | number;
  unit: string;
}

// Constante gravitacional estándar (9.81 m/s²)
const GRAVITY = 9.81;

/**
 * Calculadora avanzada de la Segunda Ley de Newton
 * Maneja casos complejos con fuerzas múltiples, componentes 2D y fricción
 */
export function calculateNewtonAdvanced(
  selectedVariable: string,
  inputs: CalculationInput[]
): CalculationResult {
  try {
    // Validación de entrada
    if (!selectedVariable || !inputs || inputs.length === 0) {
      return {
        success: false,
        error: 'Faltan datos de entrada. Selecciona una variable y proporciona valores.',
        result: null
      };
    }

    // Convertir todas las entradas a unidades SI
    const convertedInputs: { [key: string]: number } = {};
    
    for (const input of inputs) {
      if (input.value !== null && input.value !== undefined && input.value !== '') {
        const numValue = parseFloat(input.value.toString());
        if (isNaN(numValue)) {
          return {
            success: false,
            error: `El valor para ${input.variable} no es un número válido: ${input.value}`,
            result: null
          };
        }
        
        // Convertir a unidades SI
        const convertedValue = convertToSIUnit(input.variable, numValue, input.unit);
        convertedInputs[input.variable] = convertedValue;
      }
    }

    // Realizar el cálculo según la variable seleccionada
    switch (selectedVariable) {
      case 'force':
        return calculateResultantForce(convertedInputs);
      case 'forceX':
        return calculateForceX(convertedInputs);
      case 'forceY':
        return calculateForceY(convertedInputs);
      case 'acceleration':
        return calculateResultantAcceleration(convertedInputs);
      case 'accelerationX':
        return calculateAccelerationX(convertedInputs);
      case 'accelerationY':
        return calculateAccelerationY(convertedInputs);
      case 'angle':
        return calculateAngle(convertedInputs);
      case 'mass':
        return calculateMass(convertedInputs);
      case 'appliedForce':
        return calculateAppliedForce(convertedInputs);
      case 'frictionForce':
        return calculateFrictionForce(convertedInputs);
      case 'normalForce':
        return calculateNormalForce(convertedInputs);
      case 'frictionCoefficient':
        return calculateFrictionCoefficient(convertedInputs);
      default:
        return {
          success: false,
          error: `Variable no reconocida: ${selectedVariable}`,
          result: null
        };
    }
  } catch (error) {
    return {
      success: false,
      error: `Error en el cálculo: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      result: null
    };
  }
}

// Funciones de cálculo específicas

function calculateResultantForce(inputs: { [key: string]: number }): CalculationResult {
  const { mass, acceleration, forceX, forceY } = inputs;

  if (mass !== undefined && acceleration !== undefined) {
    // F = m × a
    const force = mass * acceleration;
    return {
      success: true,
      result: force,
      formula: 'F = m × a',
      explanation: `Fuerza resultante = ${mass} kg × ${acceleration} m/s² = ${force} N`
    };
  }

  if (forceX !== undefined && forceY !== undefined) {
    // F = √(Fx² + Fy²)
    const force = Math.sqrt(forceX * forceX + forceY * forceY);
    return {
      success: true,
      result: force,
      formula: 'F = √(Fx² + Fy²)',
      explanation: `Fuerza resultante = √(${forceX}² + ${forceY}²) = ${force.toFixed(3)} N`
    };
  }

  return {
    success: false,
    error: 'Datos insuficientes. Se necesita: (masa y aceleración) o (componentes Fx y Fy)',
    result: null
  };
}

function calculateForceX(inputs: { [key: string]: number }): CalculationResult {
  const { force, angle, mass, accelerationX } = inputs;

  if (force !== undefined && angle !== undefined) {
    // Fx = F × cos(θ)
    const angleRad = angle * Math.PI / 180; // Convertir a radianes
    const forceX = force * Math.cos(angleRad);
    return {
      success: true,
      result: forceX,
      formula: 'Fx = F × cos(θ)',
      explanation: `Componente X = ${force} N × cos(${angle}°) = ${forceX.toFixed(3)} N`
    };
  }

  if (mass !== undefined && accelerationX !== undefined) {
    // Fx = m × ax
    const forceX = mass * accelerationX;
    return {
      success: true,
      result: forceX,
      formula: 'Fx = m × ax',
      explanation: `Componente X = ${mass} kg × ${accelerationX} m/s² = ${forceX} N`
    };
  }

  return {
    success: false,
    error: 'Datos insuficientes. Se necesita: (fuerza y ángulo) o (masa y aceleración en X)',
    result: null
  };
}

function calculateForceY(inputs: { [key: string]: number }): CalculationResult {
  const { force, angle, mass, accelerationY } = inputs;

  if (force !== undefined && angle !== undefined) {
    // Fy = F × sin(θ)
    const angleRad = angle * Math.PI / 180; // Convertir a radianes
    const forceY = force * Math.sin(angleRad);
    return {
      success: true,
      result: forceY,
      formula: 'Fy = F × sin(θ)',
      explanation: `Componente Y = ${force} N × sin(${angle}°) = ${forceY.toFixed(3)} N`
    };
  }

  if (mass !== undefined && accelerationY !== undefined) {
    // Fy = m × ay
    const forceY = mass * accelerationY;
    return {
      success: true,
      result: forceY,
      formula: 'Fy = m × ay',
      explanation: `Componente Y = ${mass} kg × ${accelerationY} m/s² = ${forceY} N`
    };
  }

  return {
    success: false,
    error: 'Datos insuficientes. Se necesita: (fuerza y ángulo) o (masa y aceleración en Y)',
    result: null
  };
}

function calculateResultantAcceleration(inputs: { [key: string]: number }): CalculationResult {
  const { force, mass, accelerationX, accelerationY } = inputs;

  if (force !== undefined && mass !== undefined) {
    // a = F / m
    if (mass === 0) {
      return {
        success: false,
        error: 'La masa no puede ser cero',
        result: null
      };
    }
    const acceleration = force / mass;
    return {
      success: true,
      result: acceleration,
      formula: 'a = F / m',
      explanation: `Aceleración = ${force} N / ${mass} kg = ${acceleration.toFixed(3)} m/s²`
    };
  }

  if (accelerationX !== undefined && accelerationY !== undefined) {
    // a = √(ax² + ay²)
    const acceleration = Math.sqrt(accelerationX * accelerationX + accelerationY * accelerationY);
    return {
      success: true,
      result: acceleration,
      formula: 'a = √(ax² + ay²)',
      explanation: `Aceleración = √(${accelerationX}² + ${accelerationY}²) = ${acceleration.toFixed(3)} m/s²`
    };
  }

  return {
    success: false,
    error: 'Datos insuficientes. Se necesita: (fuerza y masa) o (componentes ax y ay)',
    result: null
  };
}

function calculateAccelerationX(inputs: { [key: string]: number }): CalculationResult {
  const { forceX, mass } = inputs;

  if (forceX !== undefined && mass !== undefined) {
    if (mass === 0) {
      return {
        success: false,
        error: 'La masa no puede ser cero',
        result: null
      };
    }
    // ax = Fx / m
    const accelerationX = forceX / mass;
    return {
      success: true,
      result: accelerationX,
      formula: 'ax = Fx / m',
      explanation: `Aceleración X = ${forceX} N / ${mass} kg = ${accelerationX.toFixed(3)} m/s²`
    };
  }

  return {
    success: false,
    error: 'Se necesita la fuerza en X y la masa',
    result: null
  };
}

function calculateAccelerationY(inputs: { [key: string]: number }): CalculationResult {
  const { forceY, mass } = inputs;

  if (forceY !== undefined && mass !== undefined) {
    if (mass === 0) {
      return {
        success: false,
        error: 'La masa no puede ser cero',
        result: null
      };
    }
    // ay = Fy / m
    const accelerationY = forceY / mass;
    return {
      success: true,
      result: accelerationY,
      formula: 'ay = Fy / m',
      explanation: `Aceleración Y = ${forceY} N / ${mass} kg = ${accelerationY.toFixed(3)} m/s²`
    };
  }

  return {
    success: false,
    error: 'Se necesita la fuerza en Y y la masa',
    result: null
  };
}

function calculateAngle(inputs: { [key: string]: number }): CalculationResult {
  const { forceX, forceY } = inputs;

  if (forceX !== undefined && forceY !== undefined) {
    if (forceX === 0) {
      return {
        success: false,
        error: 'La componente X no puede ser cero para calcular el ángulo',
        result: null
      };
    }
    // θ = arctan(Fy / Fx)
    const angleRad = Math.atan(forceY / forceX);
    const angleDeg = angleRad * 180 / Math.PI;
    return {
      success: true,
      result: angleDeg,
      formula: 'θ = arctan(Fy / Fx)',
      explanation: `Ángulo = arctan(${forceY} / ${forceX}) = ${angleDeg.toFixed(2)}°`
    };
  }

  return {
    success: false,
    error: 'Se necesitan las componentes Fx y Fy',
    result: null
  };
}

function calculateMass(inputs: { [key: string]: number }): CalculationResult {
  const { force, acceleration } = inputs;

  if (force !== undefined && acceleration !== undefined) {
    if (acceleration === 0) {
      return {
        success: false,
        error: 'La aceleración no puede ser cero',
        result: null
      };
    }
    // m = F / a
    const mass = force / acceleration;
    return {
      success: true,
      result: mass,
      formula: 'm = F / a',
      explanation: `Masa = ${force} N / ${acceleration} m/s² = ${mass.toFixed(3)} kg`
    };
  }

  return {
    success: false,
    error: 'Se necesita la fuerza y la aceleración',
    result: null
  };
}

function calculateAppliedForce(inputs: { [key: string]: number }): CalculationResult {
  const { frictionForce, mass, acceleration } = inputs;

  if (frictionForce !== undefined && mass !== undefined && acceleration !== undefined) {
    // Fap = F_net + Ff = m*a + Ff
    const appliedForce = mass * acceleration + frictionForce;
    return {
      success: true,
      result: appliedForce,
      formula: 'Fap = m × a + Ff',
      explanation: `Fuerza aplicada = ${mass} kg × ${acceleration} m/s² + ${frictionForce} N = ${appliedForce.toFixed(3)} N`
    };
  }

  return {
    success: false,
    error: 'Se necesita la fuerza de fricción, masa y aceleración',
    result: null
  };
}

function calculateFrictionForce(inputs: { [key: string]: number }): CalculationResult {
  const { frictionCoefficient, normalForce, appliedForce, mass, acceleration } = inputs;

  if (frictionCoefficient !== undefined && normalForce !== undefined) {
    // Ff = μ × N
    const frictionForce = frictionCoefficient * normalForce;
    return {
      success: true,
      result: frictionForce,
      formula: 'Ff = μ × N',
      explanation: `Fuerza de fricción = ${frictionCoefficient} × ${normalForce} N = ${frictionForce.toFixed(3)} N`
    };
  }

  if (appliedForce !== undefined && mass !== undefined && acceleration !== undefined) {
    // Ff = Fap - m*a
    const frictionForce = appliedForce - (mass * acceleration);
    return {
      success: true,
      result: frictionForce,
      formula: 'Ff = Fap - m × a',
      explanation: `Fuerza de fricción = ${appliedForce} N - (${mass} kg × ${acceleration} m/s²) = ${frictionForce.toFixed(3)} N`
    };
  }

  return {
    success: false,
    error: 'Se necesita: (coeficiente y fuerza normal) o (fuerza aplicada, masa y aceleración)',
    result: null
  };
}

function calculateNormalForce(inputs: { [key: string]: number }): CalculationResult {
  const { mass, angle } = inputs;

  if (mass !== undefined) {
    if (angle !== undefined) {
      // N = m × g × cos(θ) - para plano inclinado
      const angleRad = angle * Math.PI / 180;
      const normalForce = mass * GRAVITY * Math.cos(angleRad);
      return {
        success: true,
        result: normalForce,
        formula: 'N = m × g × cos(θ)',
        explanation: `Fuerza normal = ${mass} kg × ${GRAVITY} m/s² × cos(${angle}°) = ${normalForce.toFixed(3)} N`
      };
    } else {
      // N = m × g - para superficie horizontal
      const normalForce = mass * GRAVITY;
      return {
        success: true,
        result: normalForce,
        formula: 'N = m × g',
        explanation: `Fuerza normal = ${mass} kg × ${GRAVITY} m/s² = ${normalForce.toFixed(3)} N`
      };
    }
  }

  return {
    success: false,
    error: 'Se necesita la masa (y opcionalmente el ángulo para plano inclinado)',
    result: null
  };
}

function calculateFrictionCoefficient(inputs: { [key: string]: number }): CalculationResult {
  const { frictionForce, normalForce } = inputs;

  if (frictionForce !== undefined && normalForce !== undefined) {
    if (normalForce === 0) {
      return {
        success: false,
        error: 'La fuerza normal no puede ser cero',
        result: null
      };
    }
    // μ = Ff / N
    const coefficient = frictionForce / normalForce;
    return {
      success: true,
      result: coefficient,
      formula: 'μ = Ff / N',
      explanation: `Coeficiente de fricción = ${frictionForce} N / ${normalForce} N = ${coefficient.toFixed(4)} (sin unidad)`
    };
  }

  return {
    success: false,
    error: 'Se necesita la fuerza de fricción y la fuerza normal',
    result: null
  };
}

// Función auxiliar para convertir a unidades SI
function convertToSIUnit(variable: string, value: number, unit: string): number {
  const conversionMap: { [key: string]: { [unit: string]: number } } = {
    force: {
      'N': 1,
      'kN': 1000,
      'dyn': 1e-5,
      'lbf': 4.448222
    },
    mass: {
      'kg': 1,
      'g': 0.001,
      'lb': 0.453592,
      't': 1000
    },
    acceleration: {
      'm/s²': 1,
      'cm/s²': 0.01,
      'ft/s²': 0.3048,
      'g': 9.80665
    },
    angle: {
      'deg': 1,
      'rad': 180 / Math.PI
    }
  };

  // Variables que usan las mismas unidades que otras
  const aliasMap: { [key: string]: string } = {
    forceX: 'force',
    forceY: 'force',
    appliedForce: 'force',
    frictionForce: 'force',
    normalForce: 'force',
    accelerationX: 'acceleration',
    accelerationY: 'acceleration'
  };

  const targetVariable = aliasMap[variable] || variable;
  const conversions = conversionMap[targetVariable];
  
  if (!conversions || !(unit in conversions)) {
    return value; // Si no hay conversión definida, retornar el valor original
  }
  
  return value * conversions[unit];
}