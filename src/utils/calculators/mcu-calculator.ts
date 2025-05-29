import { MultiMethodCalculator, type CalculationMethod, type MultiMethodResult } from './multi-method-calculator';


import { type CalculationResult } from '../../types/calculator-controller-type';



const PI: number = Math.PI;

// Definir métodos para cada variable
const RADIUS_METHODS: CalculationMethod[] = [
  {
    id: 'radius_v_omega',
    requiredVariables: ['linearVelocity', 'angularVelocity'],
    formula: 'r = v / ω',
    description: 'Velocidad lineal y velocidad angular',
    priority: 1,
    calculate: (values) => values.linearVelocity / values.angularVelocity,
    validate: (values) => {
      if (values.angularVelocity === 0) {
        return {
          type: 'division_by_zero',
          message: 'Angular velocity cannot be zero',
          userMessage: 'La velocidad angular no puede ser cero',
          suggestions: [
            'Ingresa una velocidad angular diferente de cero',
            'Verifica que el valor sea correcto'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'radius_v_period',
    requiredVariables: ['linearVelocity', 'period'],
    formula: 'r = (v × T) / 2π',
    description: 'Velocidad lineal y período',
    priority: 2,
    calculate: (values) => (values.linearVelocity * values.period) / (2 * PI),
    validate: (values) => {
      if (values.period <= 0) {
        return {
          type: 'out_of_range',
          message: 'Period must be positive',
          userMessage: 'El período debe ser positivo',
          suggestions: [
            'El período debe ser mayor que cero',
            'Verifica que el valor sea correcto'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'radius_a_omega',
    requiredVariables: ['centripetalAcceleration', 'angularVelocity'],
    formula: 'r = a / ω²',
    description: 'Aceleración centrípeta y velocidad angular',
    priority: 3,
    calculate: (values) => values.centripetalAcceleration / (values.angularVelocity * values.angularVelocity),
    validate: (values) => {
      if (values.angularVelocity === 0) {
        return {
          type: 'division_by_zero',
          message: 'Angular velocity cannot be zero',
          userMessage: 'La velocidad angular no puede ser cero',
          suggestions: [
            'Ingresa una velocidad angular diferente de cero'
          ]
        };
      }
      if (values.centripetalAcceleration < 0) {
        return {
          type: 'out_of_range',
          message: 'Centripetal acceleration cannot be negative',
          userMessage: 'La aceleración centrípeta no puede ser negativa',
          suggestions: [
            'La aceleración centrípeta siempre apunta hacia el centro'
          ]
        };
      }
      return null;
    }
  }
];

const ANGULAR_VELOCITY_METHODS: CalculationMethod[] = [
  {
    id: 'omega_period',
    requiredVariables: ['period'],
    formula: 'ω = 2π / T',
    description: 'Período',
    priority: 1,
    calculate: (values) => (2 * PI) / values.period,
    validate: (values) => {
      if (values.period <= 0) {
        return {
          type: 'out_of_range',
          message: 'Period must be positive',
          userMessage: 'El período debe ser positivo',
          suggestions: ['El período debe ser mayor que cero']
        };
      }
      return null;
    }
  },
  {
    id: 'omega_frequency',
    requiredVariables: ['frequency'],
    formula: 'ω = 2π × f',
    description: 'Frecuencia',
    priority: 2,
    calculate: (values) => 2 * PI * values.frequency,
    validate: (values) => {
      if (values.frequency <= 0) {
        return {
          type: 'out_of_range',
          message: 'Frequency must be positive',
          userMessage: 'La frecuencia debe ser positiva',
          suggestions: ['La frecuencia debe ser mayor que cero']
        };
      }
      return null;
    }
  },
  {
    id: 'omega_v_r',
    requiredVariables: ['linearVelocity', 'radius'],
    formula: 'ω = v / r',
    description: 'Velocidad lineal y radio',
    priority: 3,
    calculate: (values) => values.linearVelocity / values.radius,
    validate: (values) => {
      if (values.radius <= 0) {
        return {
          type: 'out_of_range',
          message: 'Radius must be positive',
          userMessage: 'El radio debe ser positivo',
          suggestions: ['El radio debe ser mayor que cero']
        };
      }
      return null;
    }
  },
  {
    id: 'omega_theta_t',
    requiredVariables: ['angularDisplacement', 'time'],
    formula: 'ω = θ / t',
    description: 'Desplazamiento angular y tiempo',
    priority: 4,
    calculate: (values) => values.angularDisplacement / values.time,
    validate: (values) => {
      if (values.time <= 0) {
        return {
          type: 'out_of_range',
          message: 'Time must be positive',
          userMessage: 'El tiempo debe ser positivo',
          suggestions: ['El tiempo debe ser mayor que cero']
        };
      }
      return null;
    }
  },
  {
    id: 'omega_a_r',
    requiredVariables: ['centripetalAcceleration', 'radius'],
    formula: 'ω = √(a / r)',
    description: 'Aceleración centrípeta y radio',
    priority: 5,
    calculate: (values) => Math.sqrt(values.centripetalAcceleration / values.radius),
    validate: (values) => {
      if (values.radius <= 0) {
        return {
          type: 'out_of_range',
          message: 'Radius must be positive',
          userMessage: 'El radio debe ser positivo',
          suggestions: ['El radio debe ser mayor que cero']
        };
      }
      if (values.centripetalAcceleration < 0) {
        return {
          type: 'out_of_range',
          message: 'Centripetal acceleration cannot be negative',
          userMessage: 'La aceleración centrípeta no puede ser negativa',
          suggestions: ['La aceleración centrípeta debe ser positiva']
        };
      }
      return null;
    }
  }
];

// Continuar con otros métodos...
const LINEAR_VELOCITY_METHODS: CalculationMethod[] = [
  {
    id: 'v_omega_r',
    requiredVariables: ['angularVelocity', 'radius'],
    formula: 'v = ω × r',
    description: 'Velocidad angular y radio',
    priority: 1,
    calculate: (values) => values.angularVelocity * values.radius
  },
  {
    id: 'v_period_r',
    requiredVariables: ['period', 'radius'],
    formula: 'v = 2πr / T',
    description: 'Período y radio',
    priority: 2,
    calculate: (values) => (2 * PI * values.radius) / values.period
  },
  {
    id: 'v_frequency_r',
    requiredVariables: ['frequency', 'radius'],
    formula: 'v = 2πfr',
    description: 'Frecuencia y radio',
    priority: 3,
    calculate: (values) => 2 * PI * values.frequency * values.radius
  },
  {
    id: 'v_a_r',
    requiredVariables: ['centripetalAcceleration', 'radius'],
    formula: 'v = √(a × r)',
    description: 'Aceleración centrípeta y radio',
    priority: 4,
    calculate: (values) => Math.sqrt(values.centripetalAcceleration * values.radius)
  }
];

/**
 * Función principal de cálculo MCU con manejo de múltiples métodos
 */
export function calculateMCU(variableToSolve: string, values: Record<string, number>): CalculationResult {
  if (!values) {
    return { 
      value: null, 
      unit: '', 
      name: '', 
      formula: '',
      error: {
        type: 'missing_values',
        message: 'No values provided',
        userMessage: 'No se proporcionaron valores para el cálculo',
        suggestions: ['Ingresa al menos algunos valores para realizar el cálculo']
      }
    };
  }

  let multiResult: MultiMethodResult;

  switch (variableToSolve) {
    case 'radius':
      multiResult = MultiMethodCalculator.calculateWithMultipleMethods(
        'radius',
        RADIUS_METHODS,
        values,
        'm',
        'Radio (r)'
      );
      break;

    case 'angularVelocity':
      multiResult = MultiMethodCalculator.calculateWithMultipleMethods(
        'angularVelocity',
        ANGULAR_VELOCITY_METHODS,
        values,
        'rad/s',
        'Velocidad angular (ω)'
      );
      break;

    case 'linearVelocity':
      multiResult = MultiMethodCalculator.calculateWithMultipleMethods(
        'linearVelocity',
        LINEAR_VELOCITY_METHODS,
        values,
        'm/s',
        'Velocidad lineal (v)'
      );
      break;

    // Continuar con otros casos...
    
    default:
      return {
        value: null,
        unit: '',
        name: '',
        formula: '',
        error: {
          type: 'invalid_values',
          message: `Unknown variable: ${variableToSolve}`,
          userMessage: `Variable desconocida: ${variableToSolve}`,
          suggestions: ['Selecciona una variable válida para calcular']
        }
      };
  }

  // Convertir resultado de MultiMethod a CalculationResult
  return {
    value: multiResult.value,
    unit: multiResult.unit,
    name: multiResult.name,
    formula: multiResult.formula,
    error: multiResult.error,
    warnings: multiResult.warnings,
    methodUsed: multiResult.methodDescription,
    availableMethods: multiResult.availableMethods
  };
}
