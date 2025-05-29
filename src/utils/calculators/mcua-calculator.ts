import { MultiMethodCalculator, type CalculationMethod, type MultiMethodResult } from './multi-method-calculator';

import { type CalculationResult } from '../../types/calculator-controller-type';


const PI: number = Math.PI;

const INITIAL_ANGULAR_VELOCITY_METHODS: CalculationMethod[] =[
   {
    id: 'initialAngularVelocity_wf_t',
    requiredVariables: ['finalAngularVelocity', 'angularAcceleration', 'time'],
    formula: 'ω₀ = ω - α × t',
    description: 'Velocidad angular final, aceleración angular y tiempo',
    priority: 1,
    calculate: (values) => values.finalAngularVelocity - (values.angularAcceleration * values.time),
    validate: (values) => {
      if (values.angularAcceleration === 0 && values.time === 0) {
        return {
          type: 'division_by_zero',
          message: 'Angular acceleration and time cannot both be zero',
          userMessage: 'La aceleración angular y el tiempo no pueden ser ambos cero',
          suggestions: [
            'Ingresa un valor diferente para la aceleración angular o el tiempo',
            'Verifica que los valores sean correctos'
          ]
        };
      }
      return null;
    }
   },
   {
    id: 'initialAngularVelocity_wf_theta_t',
    requiredVariables: ['angularDisplacement', 'angularAcceleration', 'time'],
    formula: 'ω₀ = (θ - 0.5 × α × t²) / t',
    description: 'Desplazamiento angular, aceleración angular y tiempo',
    priority: 2,
    calculate: (values) => (values.angularDisplacement - (0.5 * values.angularAcceleration * values.time * values.time)) / values.time,
    validate: (values) => {
      if (values.time === 0) {
        return {
          type: 'division_by_zero',
          message: 'Time cannot be zero',
          userMessage: 'El tiempo no puede ser cero',
          suggestions: [
            'Ingresa un valor diferente para el tiempo',
            'Verifica que el valor sea correcto'
          ]
        };
      }
      return null;
    }
   },
   {
    id: 'initialAngularVelocity_wf_theta_alpha',
    requiredVariables: ['angularDisplacement', 'angularAcceleration'],
    formula: 'ω₀ = √(ω² - 2 × α × θ)',
    description: 'Desplazamiento angular y aceleración angular',
    priority: 3,
    calculate: (values) => Math.sqrt(values.finalAngularVelocity * values.finalAngularVelocity - 2 * values.angularAcceleration * values.angularDisplacement),
    validate: (values) => {
      if (values.angularDisplacement < 0 || values.angularAcceleration < 0) {
        return {
          type: 'out_of_range',
          message: 'Angular displacement and acceleration must be non-negative',
          userMessage: 'El desplazamiento angular y la aceleración deben ser no negativos',
          suggestions: [
            'Ingresa valores positivos para el desplazamiento angular y la aceleración angular',
            'Verifica que los valores sean correctos'
          ]
        };
      }
      return null;
    }
   },
    {
      id: 'initialAngularVelocity_wf_tangentialAcceleration_radius',
      requiredVariables: ['tangentialAcceleration', 'radius'],
      formula: 'ω₀ = aₜ / r',
      description: 'Aceleración tangencial y radio',
      priority: 4,
      calculate: (values) => values.tangentialAcceleration / values.radius,
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
    }
]

const FINAL_ANGULAR_VELOCITY_METHODS: CalculationMethod[] = [
  {
    id: 'finalAngularVelocity_w0_alpha_t',
    requiredVariables: ['initialAngularVelocity', 'angularAcceleration', 'time'],
    formula: 'ω = ω₀ + α × t',
    description: 'Velocidad angular inicial, aceleración angular y tiempo',
    priority: 1,
    calculate: (values) => values.initialAngularVelocity + (values.angularAcceleration * values.time),
    validate: (values) => {
      if (values.angularAcceleration === 0 && values.time === 0) {
        return {
          type: 'division_by_zero',
          message: 'Angular acceleration and time cannot both be zero',
          userMessage: 'La aceleración angular y el tiempo no pueden ser ambos cero',
          suggestions: [
            'Ingresa un valor diferente para la aceleración angular o el tiempo',
            'Verifica que los valores sean correctos'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'finalAngularVelocity_w0_theta_alpha',
    requiredVariables: ['initialAngularVelocity', 'angularDisplacement', 'angularAcceleration'],
    formula: 'ω = √(ω₀² + 2 × α × θ)',
    description: 'Velocidad angular inicial, desplazamiento angular y aceleración angular',
    priority: 2,
    calculate: (values) => Math.sqrt(values.initialAngularVelocity * values.initialAngularVelocity + 2 * values.angularAcceleration * values.angularDisplacement),
    validate: (values) => {
      if (values.angularDisplacement < 0 || values.angularAcceleration < 0) {
        return {
          type: 'out_of_range',
          message: 'Angular displacement and acceleration must be non-negative',
          userMessage: 'El desplazamiento angular y la aceleración deben ser no negativos',
          suggestions: [
            'Ingresa valores positivos para el desplazamiento angular y la aceleración angular',
            'Verifica que los valores sean correctos'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'finalAngularVelocity_w0_tangentialAcceleration_radius',
    requiredVariables: ['tangentialAcceleration', 'radius'],
    formula: 'ω = aₜ / r',
    description: 'Aceleración tangencial y radio',
    priority: 3,
    calculate: (values) => values.tangentialAcceleration / values.radius,
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
    id: 'finalAngularVelocity_wf_t',
    requiredVariables: ['initialAngularVelocity', 'time', 'angularAcceleration'],
    formula: 'ω = ω₀ + α × t',
    description: 'Velocidad angular inicial, aceleración angular y tiempo',
    priority: 4,
    calculate: (values) => values.initialAngularVelocity + (values.angularAcceleration * values.time),
    validate: (values) => {
      if (values.angularAcceleration === 0 && values.time === 0) {
        return {
          type: 'division_by_zero',
          message: 'Angular acceleration and time cannot both be zero',
          userMessage: 'La aceleración angular y el tiempo no pueden ser ambos cero',
          suggestions: [
            'Ingresa un valor diferente para la aceleración angular o el tiempo',
            'Verifica que los valores sean correctos'
          ]
        };
      }
      return null;
    }
  },

]

const ANGULAR_ACCELERATION_METHODS: CalculationMethod[] = [
  {
    id: 'angularAcceleration_w0_wf_t',
    requiredVariables: ['initialAngularVelocity', 'finalAngularVelocity', 'time'],
    formula: 'α = (ω - ω₀) / t',
    description: 'Velocidad angular inicial, velocidad angular final y tiempo',
    priority: 1,
    calculate: (values) => (values.finalAngularVelocity - values.initialAngularVelocity) / values.time,
    validate: (values) => {
      if (values.time === 0) {
        return {
          type: 'division_by_zero',
          message: 'Time cannot be zero',
          userMessage: 'El tiempo no puede ser cero',
          suggestions: [
            'Ingresa un valor diferente para el tiempo',
            'Verifica que el valor sea correcto'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'angularAcceleration_w0_theta_t',
    requiredVariables: ['initialAngularVelocity', 'angularDisplacement', 'time'],
    formula: 'α = 2 × (θ - ω₀ × t) / t²',
    description: 'Velocidad angular inicial, desplazamiento angular y tiempo',
    priority: 2,
    calculate: (values) => 2 * (values.angularDisplacement - values.initialAngularVelocity * values.time) / (values.time * values.time),
    validate: (values) => {
      if (values.time === 0) {
        return {
          type: 'division_by_zero',
          message: 'Time cannot be zero',
          userMessage: 'El tiempo no puede ser cero',
          suggestions: [
            'Ingresa un valor diferente para el tiempo',
            'Verifica que el valor sea correcto'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'angularAcceleration_w0_wf_theta',
    requiredVariables: ['initialAngularVelocity', 'finalAngularVelocity', 'angularDisplacement'],
    formula: 'α = (ω² - ω₀²) / (2 × θ)',
    description: 'Velocidad angular inicial, velocidad angular final y desplazamiento angular',
    priority: 3,
    calculate: (values) => (values.finalAngularVelocity * values.finalAngularVelocity - values.initialAngularVelocity * values.initialAngularVelocity) / (2 * values.angularDisplacement),
    validate: (values) => {
      if (values.angularDisplacement <= 0) {
        return {
          type: 'out_of_range',
          message: 'Angular displacement must be positive',
          userMessage: 'El desplazamiento angular debe ser positivo',
          suggestions: [
            'Ingresa un valor positivo para el desplazamiento angular',
            'Verifica que el valor sea correcto'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'angularAcceleration_radius_tangentialAcceleration',
    requiredVariables: ['radius', 'tangentialAcceleration'],
    formula: 'α = aₜ / r',
    description: 'Aceleración tangencial y radio',
    priority: 4,
    calculate: (values) => values.tangentialAcceleration / values.radius,
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
  }
];

const ANGULAR_DISPLACEMENT_METHODS: CalculationMethod[] = [
  {
    id: 'angularDisplacement_w0_t_alpha',
    requiredVariables: ['initialAngularVelocity', 'time', 'angularAcceleration'],
    formula: 'θ = ω₀ × t + 0.5 × α × t²',
    description: 'Velocidad angular inicial, tiempo y aceleración angular',
    priority: 1,
    calculate: (values) => values.initialAngularVelocity * values.time + 0.5 * values.angularAcceleration * values.time * values.time,
    validate: (values) => {
      if (values.time < 0) {
        return {
          type: 'out_of_range',
          message: 'Time cannot be negative',
          userMessage: 'El tiempo no puede ser negativo',
          suggestions: [
            'Ingresa un valor positivo para el tiempo',
            'Verifica que el valor sea correcto'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'angularDisplacement_w0_wf_t',
    requiredVariables: ['initialAngularVelocity', 'finalAngularVelocity', 'time'],
    formula: 'θ = 0.5 × (ω₀ + ω) × t',
    description: 'Velocidad angular inicial, velocidad angular final y tiempo',
    priority: 2,
    calculate: (values) => 0.5 * (values.initialAngularVelocity + values.finalAngularVelocity) * values.time,
    validate: (values) => {
      if (values.time < 0) {
        return {
          type: 'out_of_range',
          message: 'Time cannot be negative',
          userMessage: 'El tiempo no puede ser negativo',
          suggestions: [
            'Ingresa un valor positivo para el tiempo',
            'Verifica que el valor sea correcto'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'angularDisplacement_w0_wf_alpha',
    requiredVariables: ['initialAngularVelocity', 'finalAngularVelocity', 'angularAcceleration'],
    formula: 'θ = (ω² - ω₀²) / (2 × α)',
    description: 'Velocidad angular inicial, velocidad angular final y aceleración angular',
    priority: 3,
    calculate: (values) => (values.finalAngularVelocity * values.finalAngularVelocity - values.initialAngularVelocity * values.initialAngularVelocity) / (2 * values.angularAcceleration),
    validate: (values) => {
      if (values.angularAcceleration <= 0) {
        return {
          type: 'out_of_range',
          message: 'Angular acceleration must be positive',
          userMessage: 'La aceleración angular debe ser positiva',
          suggestions: [
            'Ingresa un valor positivo para la aceleración angular',
            'Verifica que el valor sea correcto'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'angularDisplacement_wf_tangentialAcceleration_radius',
    requiredVariables: ['tangentialAcceleration', 'radius'],
    formula: 'θ = aₜ / r',
    description: 'Aceleración tangencial y radio',
    priority: 4,
    calculate: (values) => values.tangentialAcceleration / values.radius,
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
  }
];


const TIME_METHODS: CalculationMethod[] = [
  {
    id: 'time_w0_wf_alpha',
    requiredVariables: ['initialAngularVelocity', 'finalAngularVelocity', 'angularAcceleration'],
    formula: 't = (ω - ω₀) / α',
    description: 'Velocidad angular inicial, velocidad angular final y aceleración angular',
    priority: 1,
    calculate: (values) => (values.finalAngularVelocity - values.initialAngularVelocity) / values.angularAcceleration,
    validate: (values) => {
      if (values.angularAcceleration === 0) {
        return {
          type: 'division_by_zero',
          message: 'Angular acceleration cannot be zero',
          userMessage: 'La aceleración angular no puede ser cero',
          suggestions: [
            'Ingresa un valor diferente para la aceleración angular',
            'Verifica que el valor sea correcto'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'time_w0_theta_alpha',
    requiredVariables: ['initialAngularVelocity', 'angularDisplacement', 'angularAcceleration'],
    formula: 't = (-2ω₀ + √(4ω₀² + 8αθ)) / (2α)',
    description: 'Velocidad angular inicial, desplazamiento angular y aceleración angular',
    priority: 2,
    calculate: (values) => {
      const a = values.angularAcceleration;
      const w0 = values.initialAngularVelocity || 0;
      const b = 2 * w0;
      const c = -2 * values.angularDisplacement;
      
      // Caso especial cuando ω₀=0
      if (w0 === 0) {
        return Math.sqrt(2 * values.angularDisplacement / a);
      } else {
        return (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
      }
    },
    validate: (values) => {
      if (values.angularAcceleration === 0) {
        return {
          type: 'division_by_zero',
          message: 'Angular acceleration cannot be zero',
          userMessage: 'La aceleración angular no puede ser cero',
          suggestions: [
            'Ingresa un valor diferente para la aceleración angular',
            'Verifica que el valor sea correcto'
          ]
        };
      }
      return null;
    }
  }
];

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
            'Ingresa una velocidad angular diferente de cero',
            'Verifica que el valor sea correcto'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'radius_a_tangentialAcceleration',
    requiredVariables: ['tangentialAcceleration', 'angularAcceleration'],
    formula: 'r = aₜ / α',
    description: 'Aceleración tangencial y aceleración angular',
    priority: 4,
    calculate: (values) => values.tangentialAcceleration / values.angularAcceleration,
    validate: (values) => {
      if (values.angularAcceleration === 0) {
        return {
          type: 'division_by_zero',
          message: 'Angular acceleration cannot be zero',
          userMessage: 'La aceleración angular no puede ser cero',
          suggestions: [
            'Ingresa un valor diferente para la aceleración angular',
            'Verifica que el valor sea correcto'
          ]
        };
      }
      return null;
    }
  }
];

const TANGENTIAL_ACCELERATION_METHODS: CalculationMethod[] = [
  {
    id: 'tangentialAcceleration_alpha_radius',
    requiredVariables: ['angularAcceleration', 'radius'],
    formula: 'aₜ = α × r',
    description: 'Aceleración angular y radio',
    priority: 1,
    calculate: (values) => values.angularAcceleration * values.radius,
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
    id: 'tangentialAcceleration_wf_radius',
    requiredVariables: ['finalAngularVelocity', 'radius'],
    formula: 'aₜ = ω × r',
    description: 'Velocidad angular final y radio',
    priority: 2,
    calculate: (values) => values.finalAngularVelocity * values.radius,
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
  }
];

const CENTRIPETAL_ACCELERATION_METHODS: CalculationMethod[] = [
  {
    id: 'centripetalAcceleration_v_radius',
    requiredVariables: ['linearVelocity', 'radius'],
    formula: 'a_c = v² / r',
    description: 'Velocidad lineal y radio',
    priority: 1,
    calculate: (values) => (values.linearVelocity * values.linearVelocity) / values.radius,
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
    id: 'centripetalAcceleration_w_radius',
    requiredVariables: ['angularVelocity', 'radius'],
    formula: 'a_c = ω² × r',
    description: 'Velocidad angular y radio',
    priority: 2,
    calculate: (values) => (values.angularVelocity * values.angularVelocity) * values.radius,
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
  }
];

const TOTAL_ACCELERATION_METHODS: CalculationMethod[] = [
  {
    id: 'totalAcceleration_wf_radius',
    requiredVariables: ['finalAngularVelocity', 'radius'],
    formula: 'a_t = ω × r',
    description: 'Velocidad angular final y radio',
    priority: 1,
    calculate: (values) => values.finalAngularVelocity * values.radius,
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
  }
];

/**
 * Calcula variables para el Movimiento Circular Uniformemente Acelerado (MCUA)
 * @param variableToSolve La variable que se quiere calcular
 * @param values Los valores conocidos para otras variables
 * @returns Resultado del cálculo con valor, unidad, nombre y fórmula
 */
export function calculateMCUA(variableToSolve: string, values: Record<string, number>): CalculationResult {
  if(!values){
    return {
      value: null,
      unit: '',
      name: variableToSolve,
      formula: '',
      error: {
        type: 'missing_values',
        message: 'No values provided for calculation',
        userMessage: 'No se proporcionaron valores para el cálculo',
        suggestions: ['Por favor, ingresa los valores necesarios para realizar el cálculo']
      }
    };
  }
  let multiResult: MultiMethodResult;

  switch (variableToSolve) {
    case 'initialAngularVelocity':
      multiResult = MultiMethodCalculator.calculateWithMultipleMethods(
        variableToSolve,
        INITIAL_ANGULAR_VELOCITY_METHODS,
        values,
        'rad/s',
        'Velocidad Angular Inicial'
      );
      break;
    case 'finalAngularVelocity':
      multiResult = MultiMethodCalculator.calculateWithMultipleMethods(
        variableToSolve,
        FINAL_ANGULAR_VELOCITY_METHODS,
        values,
        'rad/s',
        'Velocidad Angular Final'
      );
      break;
    case 'angularAcceleration':
      multiResult = MultiMethodCalculator.calculateWithMultipleMethods(
        variableToSolve,
        ANGULAR_ACCELERATION_METHODS,
        values,
        'rad/s²',
        'Aceleración Angular'
      );
      break;
    case 'angularDisplacement':
      multiResult = MultiMethodCalculator.calculateWithMultipleMethods(
        variableToSolve,
        ANGULAR_DISPLACEMENT_METHODS,
        values,
        'rad',
        'Desplazamiento Angular'
      );
      break;
    case 'time':
      multiResult = MultiMethodCalculator.calculateWithMultipleMethods(
        variableToSolve,
        TIME_METHODS,
        values,
        's',
        'Tiempo'
      );
      break;
    case 'radius':
      multiResult = MultiMethodCalculator.calculateWithMultipleMethods(
        variableToSolve,
        RADIUS_METHODS,
        values,
        'm',
        'Radio'
      );
      break;
    case 'tangentialAcceleration':
      multiResult = MultiMethodCalculator.calculateWithMultipleMethods(
        variableToSolve,
        TANGENTIAL_ACCELERATION_METHODS,
        values,
        'm/s²',
        'Aceleración Tangencial'
      );
      break;
    case 'centripetalAcceleration':
      multiResult = MultiMethodCalculator.calculateWithMultipleMethods(
        variableToSolve,
        CENTRIPETAL_ACCELERATION_METHODS,
        values,
        'm/s²',
        'Aceleración Centrípeta'
      );
      break;
    case 'totalAcceleration':
      multiResult = MultiMethodCalculator.calculateWithMultipleMethods(
        variableToSolve,
        TOTAL_ACCELERATION_METHODS,
        values,
        'm/s²',
        'Aceleración Total'
      );
      break;
    default:
      return {
        value: null,
        unit: '',
        name: variableToSolve,  
        formula: '',
        error: {
          type: 'invalid_values',
          message: `Unknown variable: ${variableToSolve}`,
          userMessage: `Variable desconocida: ${variableToSolve}`,
          suggestions: ['Selecciona una variable válida para calcular']
        }
      };
  }

  return {
    value: multiResult.value,
    unit: multiResult.unit,
    name: multiResult.name,
    formula: multiResult.formula,
    error: multiResult.error,
    warnings: multiResult.warnings,
    methodUsed: multiResult.methodDescription,
    availableMethods: multiResult.availableMethods
  }
}
