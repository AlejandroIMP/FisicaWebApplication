import { MultiMethodCalculator, type CalculationMethod, type MultiMethodResult  } from '../../multi-method-calculator'

import { type CalculationResult } from '../../../../types/calculator-controller-type';

const FORCE_METHODS: CalculationMethod[] = [
  {
    id: 'force_mass_acceleration',
    requiredVariables: ['mass', 'acceleration'],
    formula: 'F = m × a',
    description: 'Calcula la fuerza usando masa y aceleración',
    priority: 1,
    calculate: (values) => values.mass * values.acceleration,
    validate: (values) => {
      if (values.mass <= 0 || values.acceleration <= 0) {
        return {
          type: 'out_of_range',
          message: 'Mass and acceleration must be positive',
          userMessage: 'La masa y la aceleración deben ser positivas',
          suggestions: [
            'Asegúrate de que ambos valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'force_weight_gravity',
    requiredVariables: ['weight', 'gravity'],
    formula: 'F = P = m × g',
    description: 'Calcula la fuerza usando peso y gravedad',
    priority: 2,
    calculate: (values) => values.weight,
    validate: (values) => {
      if (values.weight <= 0 || values.gravity <= 0) {
        return {
          type: 'out_of_range',
          message: 'Weight and gravity must be positive',
          userMessage: 'El peso y la gravedad deben ser positivos',
          suggestions: [
            'Asegúrate de que ambos valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  },
];

const MASS_METHODS: CalculationMethod[] = [
  {
    id: 'mass_force_acceleration',
    requiredVariables: ['force', 'acceleration'],
    formula: 'm = F / a',
    description: 'Calcula la masa usando fuerza y aceleración',
    priority: 1,
    calculate: (values) => {
      if (values.acceleration === 0) {
        throw new Error('Acceleration cannot be zero');
      }
      return values.force / values.acceleration;
    },
    validate: (values) => {
      if (values.force <= 0 || values.acceleration <= 0) {
        return {
          type: 'out_of_range',
          message: 'Force and acceleration must be positive',
          userMessage: 'La fuerza y la aceleración deben ser positivas',
          suggestions: [
            'Asegúrate de que ambos valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      if (values.acceleration === 0) {
        return {
          type: 'division_by_zero',
          message: 'Cannot divide by zero acceleration',
          userMessage: 'No se puede calcular la masa con aceleración cero',
          suggestions: [
            'Ingresa una aceleración diferente de cero',
            'Verifica que el valor de aceleración sea correcto'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'mass_weight_gravity',
    requiredVariables: ['weight', 'gravity'],
    formula: 'm = P / g',
    description: 'Calcula la masa usando peso y gravedad',
    priority: 2,
    calculate: (values) => {
      if (values.gravity === 0) {
        throw new Error('Gravity cannot be zero');
      }
      return values.weight / values.gravity;
    },
    validate: (values) => {
      if (values.weight <= 0 || values.gravity <= 0) {
        return {
          type: 'out_of_range',
          message: 'Weight and gravity must be positive',
          userMessage: 'El peso y la gravedad deben ser positivos',
          suggestions: [
            'Asegúrate de que ambos valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      if (values.gravity === 0) {
        return {
          type: 'division_by_zero',
          message: 'Cannot divide by zero gravity',
          userMessage: 'No se puede calcular la masa con gravedad cero',
          suggestions: [
            'Ingresa una gravedad diferente de cero',
            'Verifica que el valor de gravedad sea correcto'
          ]
        };
      }
      return null;
    }
  },
];

const ACCELERATION_METHODS: CalculationMethod[] = [
  {
    id: 'acceleration_force_mass',
    requiredVariables: ['force', 'mass'],
    formula: 'a = F / m',
    description: 'Calcula la aceleración usando fuerza y masa',
    priority: 1,
    calculate: (values) => {
      if (values.mass === 0) {
        throw new Error('Mass cannot be zero');
      }
      return values.force / values.mass;
    },
    validate: (values) => {
      if (values.force <= 0 || values.mass <= 0) {
        return {
          type: 'out_of_range',
          message: 'Force and mass must be positive',
          userMessage: 'La fuerza y la masa deben ser positivas',
          suggestions: [
            'Asegúrate de que ambos valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      if (values.mass === 0) {
        return {
          type: 'division_by_zero',
          message: 'Cannot divide by zero mass',
          userMessage: 'No se puede calcular la aceleración con masa cero',
          suggestions: [
            'Ingresa una masa diferente de cero',
            'Verifica que el valor de masa sea correcto'
          ]
        };
      }
      return null;
    }
  }
];

const SYSTEM_ACCELERATION_METHODS: CalculationMethod[] = [
  {
    id: 'system_acceleration_two_masses',
    requiredVariables: ['mass1', 'mass2', 'angle1', 'angle2', 'gravity'],
    formula: 'a = |m₂gsinθ₂ - m₁gsinθ₁| / (m₁ + m₂)',
    description: 'Calcula la aceleración de un sistema de dos masas en planos inclinados con polea',
    priority: 1,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = values.gravity;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      const frictionCoefficient1 = values.frictionCoefficient1 || 0;
      const frictionCoefficient2 = values.frictionCoefficient2 || 0;

      // Fuerzas paralelas
      const F1_parallel = m1 * g * Math.sin(theta1Rad) - frictionCoefficient1 * m1 * g * Math.cos(theta1Rad);
      const F2_parallel = m2 * g * Math.sin(theta2Rad) - frictionCoefficient2 * m2 * g * Math.cos(theta2Rad);
      // Fuerza neta
      const F_net = F2_parallel - F1_parallel;
      // Aceleración
      const totalMass = m1 + m2;
      if (totalMass === 0) {
        throw new Error('Total mass cannot be zero');
      }
      const acceleration = F_net / totalMass;
      if (isNaN(acceleration)) {
        throw new Error('Invalid calculation resulting in NaN');
      }
      return Math.abs(acceleration); // Aceleración en m/s²
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0 || values.gravity <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses and gravity must be positive',
          userMessage: 'Las masas y la gravedad deben ser positivas',
          suggestions: [
            'Asegúrate de que todos los valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    } 
  },
  {
    id: 'system_acceleration_two_masses_simplified',
    requiredVariables: ['mass1', 'mass2', 'angle1', 'angle2'],
    formula: 'a = |m₂gsinθ₂ - m₁gsinθ₁| / (m₁ + m₂) (g = 9.807 m/s²)',
    description: 'Calcula la aceleración de un sistema de dos masas en planos inclinados con gravedad estándar',
    priority: 2,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = 9.087;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      const frictionCoefficient1 = values.frictionCoefficient1 || 0;
      const frictionCoefficient2 = values.frictionCoefficient2 || 0;

      // Fuerzas paralelas
      const F1_parallel = m1 * g * Math.sin(theta1Rad) - frictionCoefficient1 * m1 * g * Math.cos(theta1Rad);
      const F2_parallel = m2 * g * Math.sin(theta2Rad) - frictionCoefficient2 * m2 * g * Math.cos(theta2Rad);
      // Fuerza neta
      const F_net = F2_parallel - F1_parallel;
      // Aceleración
      const totalMass = m1 + m2;
      if (totalMass === 0) {
        throw new Error('Total mass cannot be zero');
      }
      const acceleration = F_net / totalMass;
      if (isNaN(acceleration)) {
        throw new Error('Invalid calculation resulting in NaN');
      }
      return Math.abs(acceleration); // Aceleración en m/s²
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses must be positive',
          userMessage: 'Las masas deben ser positivas',
          suggestions: [
            'Asegúrate de que ambos valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'system_acceleration_two_masses_with_friction',
    requiredVariables: ['mass1', 'mass2', 'angle1', 'angle2', 'gravity', 'frictionCoefficient1', 'frictionCoefficient2'],
    formula: 'a = |m₂gsinθ₂ - m₁gsinθ₁ - μ₁m₁gcosθ₁ - μ₂m₂gcosθ₂| / (m₁ + m₂)',
    description: 'Calcula la aceleración de un sistema de dos masas en planos inclinados con polea y fricción',
    priority: 3,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = values.gravity;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;

      const F1_parallel = m1 * g * Math.sin(theta1Rad);
      const F2_parallel = m2 * g * Math.sin(theta2Rad);

      const N1 = m1 * g * Math.cos(theta1Rad);
      const N2 = m2 * g * Math.cos(theta2Rad);

      const f1 = values.frictionCoefficient1 * N1;
      const f2 = values.frictionCoefficient2 * N2;

      const netForce = F2_parallel - F1_parallel - f1 - f2;
      const totalMass = m1 + m2;
      return netForce / totalMass;
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0 || values.gravity <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses and gravity must be positive',
          userMessage: 'Las masas y la gravedad deben ser positivas',
          suggestions: [
            'Asegúrate de que todos los valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  }
];

const SYSTEM_TENSION_METHODS: CalculationMethod[] = [
  {
    id: 'system_tension_two_masses_basic',
    requiredVariables: ['mass1', 'mass2', 'angle1', 'angle2'],
    formula: 'T = (m₁m₂g(sinθ₂ + sinθ₁)) / (m₁ + m₂)',
    description: 'Calcula la tensión en un sistema de dos masas en planos inclinados con polea (caso básico)',
    priority: 1,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = values.gravity || 9.807;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;

      // Fórmula correcta para tensión en sistema de polea
      const numerator = m1 * m2 * g * (Math.sin(theta2Rad) + Math.sin(theta1Rad));
      const denominator = m1 + m2;
      
      return numerator / denominator;
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses must be positive',
          userMessage: 'Las masas deben ser positivas',
          suggestions: [
            'Asegúrate de que todos los valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'system_tension_with_gravity',
    requiredVariables: ['mass1', 'mass2', 'angle1', 'angle2', 'gravity'],
    formula: 'T = (m₁m₂g(sinθ₂ + sinθ₁)) / (m₁ + m₂)',
    description: 'Calcula la tensión en un sistema de dos masas con gravedad específica',
    priority: 2,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = values.gravity;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;

      const numerator = m1 * m2 * g * (Math.sin(theta2Rad) + Math.sin(theta1Rad));
      const denominator = m1 + m2;
      
      return numerator / denominator;
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0 || values.gravity <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses and gravity must be positive',
          userMessage: 'Las masas y la gravedad deben ser positivas',
          suggestions: [
            'Asegúrate de que todos los valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'system_tension_with_friction',
    requiredVariables: ['mass1', 'mass2', 'angle1', 'angle2', 'gravity', 'frictionCoefficient1', 'frictionCoefficient2'],
    formula: 'T = (m₁m₂g(sinθ₂ + sinθ₁ - μ₁cosθ₁ - μ₂cosθ₂)) / (m₁ + m₂)',
    description: 'Calcula la tensión en un sistema con fricción en ambos planos inclinados',
    priority: 3,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = values.gravity;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      const mu1 = values.frictionCoefficient1;
      const mu2 = values.frictionCoefficient2;

      const sin1 = Math.sin(theta1Rad);
      const sin2 = Math.sin(theta2Rad);
      const cos1 = Math.cos(theta1Rad);
      const cos2 = Math.cos(theta2Rad);

      // Considerando fricción en ambas superficies
      const effectiveForce = sin2 + sin1 - mu1 * cos1 - mu2 * cos2;
      const numerator = m1 * m2 * g * effectiveForce;
      const denominator = m1 + m2;
      
      return Math.abs(numerator / denominator);
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0 || values.gravity <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses and gravity must be positive',
          userMessage: 'Las masas y la gravedad deben ser positivas',
          suggestions: [
            'Asegúrate de que todos los valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      if (values.frictionCoefficient1 < 0 || values.frictionCoefficient2 < 0) {
        return {
          type: 'out_of_range',
          message: 'Friction coefficients must be non-negative',
          userMessage: 'Los coeficientes de fricción deben ser no negativos',
          suggestions: [
            'Ingresa valores de fricción válidos (≥ 0)',
            'Verifica que los coeficientes sean correctos'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'system_tension_horizontal_vertical',
    requiredVariables: ['mass1', 'mass2'],
    formula: 'T = (m₁m₂g) / (m₁ + m₂)',
    description: 'Calcula la tensión en un sistema con una masa horizontal y otra colgando verticalmente',
    priority: 4,
    calculate: (values) => {
      const m1 = values.mass1; // masa horizontal
      const m2 = values.mass2; // masa vertical
      const g = values.gravity || 9.807;

      // Sistema clásico de Atwood modificado
      return (m1 * m2 * g) / (m1 + m2);
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses must be positive',
          userMessage: 'Las masas deben ser positivas',
          suggestions: [
            'Asegúrate de que ambas masas sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'system_tension_atwood_machine',
    requiredVariables: ['mass1', 'mass2', 'gravity'],
    formula: 'T = (2m₁m₂g) / (m₁ + m₂)',
    description: 'Calcula la tensión en una máquina de Atwood (dos masas colgando)',
    priority: 5,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = values.gravity;

      // Máquina de Atwood clásica
      return (2 * m1 * m2 * g) / (m1 + m2);
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0 || values.gravity <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses and gravity must be positive',
          userMessage: 'Las masas y la gravedad deben ser positivas',
          suggestions: [
            'Asegúrate de que todos los valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'system_tension_with_acceleration',
    requiredVariables: ['mass1', 'mass2', 'acceleration'],
    formula: 'T = m₁(g + a) o T = m₂(g - a)',
    description: 'Calcula la tensión cuando se conoce la aceleración del sistema',
    priority: 6,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const a = values.acceleration;
      const g = values.gravity || 9.807;

      // Asumiendo que m2 > m1 y m2 baja
      // Para m1: T = m1(g + a)
      // Para m2: T = m2(g - a)
      // Usamos el promedio para mayor precisión
      const T1 = m1 * (g + a);
      const T2 = m2 * (g - a);
      
      return (T1 + T2) / 2;
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses must be positive',
          userMessage: 'Las masas deben ser positivas',
          suggestions: [
            'Asegúrate de que ambas masas sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'system_tension_inclined_one_angle',
    requiredVariables: ['mass1', 'mass2', 'angle1'],
    formula: 'T = (m₁m₂g(1 + sinθ₁)) / (m₁ + m₂)',
    description: 'Calcula la tensión con una masa en plano inclinado y otra colgando',
    priority: 7,
    calculate: (values) => {
      const m1 = values.mass1; // masa en plano inclinado
      const m2 = values.mass2; // masa colgando
      const g = values.gravity || 9.807;
      const theta1Rad = (values.angle1 * Math.PI) / 180;

      // Una masa en plano inclinado, otra colgando verticalmente
      const numerator = m1 * m2 * g * (1 + Math.sin(theta1Rad));
      const denominator = m1 + m2;
      
      return numerator / denominator;
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses must be positive',
          userMessage: 'Las masas deben ser positivas',
          suggestions: [
            'Asegúrate de que ambas masas sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      if (values.angle1 < 0 || values.angle1 > 90) {
        return {
          type: 'out_of_range',
          message: 'Angle must be between 0 and 90 degrees',
          userMessage: 'El ángulo debe estar entre 0 y 90 grados',
          suggestions: [
            'Ingresa un ángulo válido para el plano inclinado',
            'Verifica que el ángulo sea físicamente posible'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'system_tension_with_external_force',
    requiredVariables: ['mass1', 'mass2', 'externalForce'],
    formula: 'T = (m₁m₂g + F_ext × m₁) / (m₁ + m₂)',
    description: 'Calcula la tensión cuando hay una fuerza externa aplicada',
    priority: 8,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const F_ext = values.externalForce;
      const g = values.gravity || 9.807;

      // Fuerza externa aplicada en dirección del movimiento
      const numerator = m1 * m2 * g + F_ext * m1;
      const denominator = m1 + m2;
      
      return numerator / denominator;
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses must be positive',
          userMessage: 'Las masas deben ser positivas',
          suggestions: [
            'Asegúrate de que ambas masas sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'system_tension_from_forces',
    requiredVariables: ['force1', 'force2'],
    formula: 'T = (F₁ + F₂) / 2',
    description: 'Calcula la tensión promedio cuando se conocen las fuerzas en cada masa',
    priority: 9,
    calculate: (values) => {
      const F1 = values.force1;
      const F2 = values.force2;

      // Tensión como promedio de las fuerzas
      return (F1 + F2) / 2;
    },
    validate: (values) => {
      if (values.force1 <= 0 || values.force2 <= 0) {
        return {
          type: 'out_of_range',
          message: 'Forces must be positive',
          userMessage: 'Las fuerzas deben ser positivas',
          suggestions: [
            'Asegúrate de que ambas fuerzas sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'system_tension_pulley_efficiency',
    requiredVariables: ['mass1', 'mass2', 'angle1', 'angle2', 'efficiency'],
    formula: 'T = η × (m₁m₂g(sinθ₂ + sinθ₁)) / (m₁ + m₂)',
    description: 'Calcula la tensión considerando la eficiencia de la polea',
    priority: 10,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = values.gravity || 9.807;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      const efficiency = values.efficiency;

      const idealTension = (m1 * m2 * g * (Math.sin(theta2Rad) + Math.sin(theta1Rad))) / (m1 + m2);
      
      return efficiency * idealTension;
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses must be positive',
          userMessage: 'Las masas deben ser positivas',
          suggestions: [
            'Asegúrate de que ambas masas sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      if (values.efficiency <= 0 || values.efficiency > 1) {
        return {
          type: 'out_of_range',
          message: 'Efficiency must be between 0 and 1',
          userMessage: 'La eficiencia debe estar entre 0 y 1',
          suggestions: [
            'Ingresa una eficiencia válida (0 < η ≤ 1)',
            'Verifica que el valor de eficiencia sea correcto'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'system_tension_variable_gravity',
    requiredVariables: ['mass1', 'mass2', 'angle1', 'angle2', 'altitude'],
    formula: 'T = (m₁m₂g(h)(sinθ₂ + sinθ₁)) / (m₁ + m₂)',
    description: 'Calcula la tensión considerando variación de gravedad con la altitud',
    priority: 11,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const h = values.altitude; // altitud en metros
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;

      // Variación de gravedad con altitud: g(h) = g₀(1 - 2h/R)
      const g0 = 9.807; // gravedad al nivel del mar
      const R = 6.371e6; // radio terrestre en metros
      const g_h = g0 * (1 - 2 * h / R);

      const numerator = m1 * m2 * g_h * (Math.sin(theta2Rad) + Math.sin(theta1Rad));
      const denominator = m1 + m2;
      
      return numerator / denominator;
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses must be positive',
          userMessage: 'Las masas deben ser positivas',
          suggestions: [
            'Asegúrate de que ambas masas sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      if (values.altitude < 0 || values.altitude > 100000) {
        return {
          type: 'out_of_range',
          message: 'Altitude must be between 0 and 100km',
          userMessage: 'La altitud debe estar entre 0 y 100km',
          suggestions: [
            'Ingresa una altitud válida',
            'Para altitudes mayores, usa fórmulas de gravitación universal'
          ]
        };
      }
      return null;
    }
  }
];

const MASS1_METHODS: CalculationMethod[] = [
  {
    id: 'mass1_system_acceleration',
    requiredVariables: ['mass2', 'angle1', 'angle2', 'gravity'],
    formula: 'm₁ = (m₂gsinθ₂ - a(m₂ + m₁)) / (gsinθ₁ - a)',
    description: 'Calcula la masa 1 en un sistema de dos masas en planos inclinados con polea',
    priority: 1,
    calculate: (values) => {
      const m2 = values.mass2;
      const g = values.gravity;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      const a = values.acceleration;

      const F2_parallel = m2 * g * Math.sin(theta2Rad);
      const F1_parallel = g * Math.sin(theta1Rad);

      const m1 = (F2_parallel - a * m2) / (F1_parallel - a);

      return m1;
    },
    validate: (values) => {
      if (values.mass2 <= 0 || values.gravity <= 0 || values.acceleration <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses, gravity and acceleration must be positive',
          userMessage: 'Las masas, la gravedad y la aceleración deben ser positivas',
          suggestions: [
            'Asegúrate de que todos los valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  }
];

const MASS2_METHODS: CalculationMethod[] = [
  {
    id: 'mass2_system_acceleration',
    requiredVariables: ['mass1', 'angle1', 'angle2', 'gravity'],
    formula: 'm₂ = (a(m₁ + m₂) + m₁gsinθ₁) / gsinθ₂',
    description: 'Calcula la masa 2 en un sistema de dos masas en planos inclinados con polea',
    priority: 1,
    calculate: (values) => {
      const m1 = values.mass1;
      const g = values.gravity;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      const a = values.acceleration;

      const F1_parallel = m1 * g * Math.sin(theta1Rad);
      const F2_parallel = g * Math.sin(theta2Rad);

      // Rearranging: m₂gsinθ₂ = a(m₁ + m₂) + m₁gsinθ₁
      // m₂gsinθ₂ = am₁ + am₂ + m₁gsinθ₁
      // m₂gsinθ₂ - am₂ = am₁ + m₁gsinθ₁
      // m₂(gsinθ₂ - a) = am₁ + m₁gsinθ₁
      const m2 = (a * m1 + F1_parallel) / (F2_parallel - a);

      return m2;
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.gravity <= 0 || values.acceleration <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses, gravity and acceleration must be positive',
          userMessage: 'Las masas, la gravedad y la aceleración deben ser positivas',
          suggestions: [
            'Asegúrate de que todos los valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  }
];

const ANGLE_METHODS: CalculationMethod[] = [
  {
    id: 'angle_force_components',
    requiredVariables: ['forceX', 'forceY'],
    formula: 'θ = arctan(Fy / Fx)',
    description: 'Calcula el ángulo de una fuerza a partir de sus componentes X e Y',
    priority: 1,
    calculate: (values) => {
      const fx = values.forceX;
      const fy = values.forceY;
      return Math.atan2(fy, fx) * (180 / Math.PI); // Convertir a grados
    },
    validate: (values) => {
      if (values.forceX === 0 && values.forceY === 0) {
        return {
          type: 'invalid_values',
          message: 'Force components cannot both be zero',
          userMessage: 'Las componentes de la fuerza no pueden ser ambas cero',
          suggestions: [
            'Ingresa al menos una componente diferente de cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  }
];

const ANGLE1_METHODS: CalculationMethod[] = [
  {
    id: 'angle1_system_acceleration',
    requiredVariables: ['mass1', 'mass2', 'angle2', 'gravity'],
    formula: 'θ₁ = arcsin((m₂gsinθ₂ - a(m₁ + m₂)) / (m₁g))',
    description: 'Calcula el ángulo 1 en un sistema de dos masas en planos inclinados con polea',
    priority: 1,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = values.gravity;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      const a = values.acceleration;

      const F2_parallel = m2 * g * Math.sin(theta2Rad);
      const numerator = F2_parallel - a * (m1 + m2);
      const denominator = m1 * g;

      if (denominator === 0) {
        throw new Error('Cannot calculate angle with zero mass');
      }

      return Math.asin(numerator / denominator) * (180 / Math.PI); // Convertir a grados
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0 || values.gravity <= 0 || values.acceleration <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses, gravity and acceleration must be positive',
          userMessage: 'Las masas, la gravedad y la aceleración deben ser positivas',
          suggestions: [
            'Asegúrate de que todos los valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  }
];

const ANGLE2_METHODS: CalculationMethod[] = [
  {
    id: 'angle2_system_acceleration',
    requiredVariables: ['mass1', 'mass2', 'angle1', 'gravity'],
    formula: 'θ₂ = arcsin((a(m₁ + m₂) + m₁gcosθ₁) / (m₂g))',
    description: 'Calcula el ángulo 2 en un sistema de dos masas en planos inclinados con polea',
    priority: 1,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = values.gravity;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const a = values.acceleration;

      const F1_parallel = m1 * g * Math.sin(theta1Rad);
      const numerator = a * (m1 + m2) + F1_parallel;
      const denominator = m2 * g;

      if (denominator === 0) {
        throw new Error('Cannot calculate angle with zero mass');
      }

      return Math.asin(numerator / denominator) * (180 / Math.PI); // Convertir a grados
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0 || values.gravity <= 0 || values.acceleration <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses, gravity and acceleration must be positive',
          userMessage: 'Las masas, la gravedad y la aceleración deben ser positivas',
          suggestions: [
            'Asegúrate de que todos los valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  }
];

const FRICTION_COEFFICIENT1_METHODS: CalculationMethod[] = [
  {
    id: 'friction_coefficient1_system_acceleration',
    requiredVariables: ['mass1', 'mass2', 'angle1', 'angle2', 'gravity', 'acceleration'],
    formula: 'μ₁ = (m₂gsinθ₂ - a(m₁ + m₂) - m₁gcosθ₁) / (m₁gcosθ₁)',
    description: 'Calcula el coeficiente de fricción 1 en un sistema de dos masas en planos inclinados con polea',
    priority: 1,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = values.gravity;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      const a = values.acceleration;

      const F2_parallel = m2 * g * Math.sin(theta2Rad);
      const F1_normal = m1 * g * Math.cos(theta1Rad);

      if (F1_normal === 0) {
        throw new Error('Cannot calculate friction coefficient with zero normal force');
      }

      return (F2_parallel - a * (m1 + m2) - F1_normal) / F1_normal;
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0 || values.gravity <= 0 || values.acceleration <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses, gravity and acceleration must be positive',
          userMessage: 'Las masas, la gravedad y la aceleración deben ser positivas',
          suggestions: [
            'Asegúrate de que todos los valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  }
];

const FRICTION_COEFFICIENT2_METHODS: CalculationMethod[] = [
  {
    id: 'friction_coefficient2_system_acceleration',
    requiredVariables: ['mass1', 'mass2', 'angle1', 'angle2', 'gravity', 'acceleration'],
    formula: 'μ₂ = (a(m₁ + m₂) + m₁gcosθ₁ - m₂gsinθ₂) / (m₂gcosθ₂)',
    description: 'Calcula el coeficiente de fricción 2 en un sistema de dos masas en planos inclinados con polea',
    priority: 1,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = values.gravity;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      const a = values.acceleration;

      const F1_normal = m1 * g * Math.cos(theta1Rad);
      const F2_normal = m2 * g * Math.cos(theta2Rad);

      if (F2_normal === 0) {
        throw new Error('Cannot calculate friction coefficient with zero normal force');
      }

      return (a * (m1 + m2) + F1_normal - m2 * g * Math.sin(theta2Rad)) / F2_normal;
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0 || values.gravity <= 0 || values.acceleration <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses, gravity and acceleration must be positive',
          userMessage: 'Las masas, la gravedad y la aceleración deben ser positivas',
          suggestions: [
            'Asegúrate de que todos los valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  }
];

const PARALLEL_FORCE_METHODS: CalculationMethod[] = [
  {
    id: 'parallel_force_system_acceleration',
    requiredVariables: ['mass1', 'mass2', 'angle1', 'angle2', 'gravity'],
    formula: 'F_parallel = |m₂gsinθ₂ - m₁gsinθ₁|',
    description: 'Calcula la fuerza paralela en un sistema de dos masas en planos inclinados con polea',
    priority: 1,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = values.gravity;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      const F1_parallel = m1 * g * Math.sin(theta1Rad);
      const F2_parallel = m2 * g * Math.sin(theta2Rad);
      return Math.abs(F2_parallel - F1_parallel);
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0 || values.gravity <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses and gravity must be positive',
          userMessage: 'Las masas y la gravedad deben ser positivas',
          suggestions: [
            'Asegúrate de que todos los valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'parallel_force_only_mass1',
    requiredVariables: ['mass1', 'angle1', 'gravity'],
    formula: 'F_parallel = m₁gsinθ₁',
    description: 'Calcula la fuerza paralela solo con la masa 1 en un plano inclinado',
    priority: 2,
    calculate: (values) => {
      const m1 = values.mass1;
      const g = values.gravity;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      return m1 * g * Math.sin(theta1Rad);
    }
    ,
    validate: (values) => {
      if (values.mass1 <= 0 || values.gravity <= 0) {
        return {
          type: 'out_of_range',
          message: 'Mass and gravity must be positive',
          userMessage: 'La masa y la gravedad deben ser positivas',
          suggestions: [
            'Asegúrate de que ambos valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
    return null;
    }
  },
  {
    id: 'parallel_force_only_mass2',
    requiredVariables: ['mass2', 'angle2', 'gravity'],
    formula: 'F_parallel = m₂gsinθ₂',
    description: 'Calcula la fuerza paralela solo con la masa 2 en un plano inclinado',
    priority: 3,
    calculate: (values) => {
      const m2 = values.mass2;
      const g = values.gravity;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      return m2 * g * Math.sin(theta2Rad);
    },
    validate: (values) => {
      if (values.mass2 <= 0 || values.gravity <= 0) {
        return {
          type: 'out_of_range',
          message: 'Mass and gravity must be positive',
          userMessage: 'La masa y la gravedad deben ser positivas',
          suggestions: [
            'Asegúrate de que ambos valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  }
];

const PLANET_GRAVITY_METHODS: CalculationMethod[] = [
  {
    id: 'planet_gravity',
    requiredVariables: ['mass', 'radius'],
    formula: 'g = G × (m / r²)',
    description: 'Calcula la gravedad de un planeta usando su masa y radio',
    priority: 1,
    calculate: (values) => {
      const G = 6.67430e-11; // Constante de gravitación universal en m³/(kg·s²)
      const m = values.mass; // Masa del planeta en kg
      const r = values.radius; // Radio del planeta en metros
      if (r === 0) {
        throw new Error('Radius cannot be zero');
      }
      return G * (m / (r * r)); // Gravedad en m/s²
    },
    validate: (values) => {
      if (values.mass <= 0 || values.radius <= 0) {
        return {
          type: 'out_of_range',
          message: 'Mass and radius must be positive',
          userMessage: 'La masa y el radio deben ser positivos',
          suggestions: [
            'Asegúrate de que ambos valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      if (values.radius === 0) {
        return {
          type: 'division_by_zero',
          message: 'Cannot divide by zero radius',
          userMessage: 'No se puede calcular la gravedad con radio cero',
          suggestions: [
            'Ingresa un radio diferente de cero',
            'Verifica que el valor de radio sea correcto'
          ]
        };
      }
      return null;
    }
  }
];

const NET_FORCE_METHODS: CalculationMethod[] = [
  {
    id: 'net_force',
    requiredVariables: ['forceX', 'forceY'],
    formula: 'F_net = √(Fx² + Fy²)',
    description: 'Calcula la fuerza neta a partir de sus componentes X e Y',
    priority: 1,
    calculate: (values) => {
      const fx = values.forceX;
      const fy = values.forceY;
      return Math.sqrt(fx * fx + fy * fy); // Fuerza neta en N
    },
    validate: (values) => {
      if (values.forceX === 0 && values.forceY === 0) {
        return {
          type: 'invalid_values',
          message: 'Force components cannot both be zero',
          userMessage: 'Las componentes de la fuerza no pueden ser ambas cero',
          suggestions: [
            'Ingresa al menos una componente diferente de cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  },
  {
    id: 'net_force_with_angle',
    requiredVariables: ['force', 'angle'],
    formula: 'F_net = F × cos(θ)',
    description: 'Calcula la fuerza neta a partir de una fuerza y un ángulo',
    priority: 2,
    calculate: (values) => {
      const force = values.force;
      const angleRad = (values.angle * Math.PI) / 180; // Convertir a radianes
      return force * Math.cos(angleRad); // Fuerza neta en N
    },
    validate: (values) => {
      if (values.force <= 0 || values.angle < 0 || values.angle > 360) {
        return {
          type: 'out_of_range',
          message: 'Force must be positive and angle must be between 0 and 360 degrees',
          userMessage: 'La fuerza debe ser positiva y el ángulo entre 0 y 360 grados',
          suggestions: [
            'Asegúrate de que la fuerza sea mayor que cero',
            'Verifica que el ángulo esté dentro del rango permitido'
          ]
        };
      }
      return null;
    }
  },
];

const NET_FORCE_INCLINED_METHODS: CalculationMethod[] = [
  {
    id: 'net_force_inclined',
    requiredVariables: ['force', 'angle'],
    formula: 'F_net = F × sin(θ)',
    description: 'Calcula la fuerza neta en un plano inclinado a partir de una fuerza y un ángulo',
    priority: 1,
    calculate: (values) => {
      const force = values.force;
      const angleRad = (values.angle * Math.PI) / 180; // Convertir a radianes
      return force * Math.sin(angleRad); // Fuerza neta en N
    },
    validate: (values) => {
      if (values.force <= 0 || values.angle < 0 || values.angle > 360) {
        return {
          type: 'out_of_range',
          message: 'Force must be positive and angle must be between 0 and 360 degrees',
          userMessage: 'La fuerza debe ser positiva y el ángulo entre 0 y 360 grados',
          suggestions: [
            'Asegúrate de que la fuerza sea mayor que cero',
            'Verifica que el ángulo esté dentro del rango permitido'
          ]
        };
      }
      return null;
    }
  },
];

const MAX_STATIC_FRICTION_METHODS: CalculationMethod[] = [
  {
    id: 'max_static_friction',
    requiredVariables: ['normalForce', 'frictionCoefficient'],
    formula: 'F_friction_max = μ_s × N',
    description: 'Calcula la máxima fuerza de fricción estática a partir de la fuerza normal y el coeficiente de fricción estática',
    priority: 1,
    calculate: (values) => {
      const normalForce = values.normalForce; // Fuerza normal en N
      const frictionCoefficient = values.frictionCoefficient; // Coeficiente de fricción estática
      return frictionCoefficient * normalForce; // Fuerza de fricción máxima en N
    },
    validate: (values) => {
      if (values.normalForce <= 0 || values.frictionCoefficient <= 0) {
        return {
          type: 'out_of_range',
          message: 'Normal force and friction coefficient must be positive',
          userMessage: 'La fuerza normal y el coeficiente de fricción deben ser positivos',
          suggestions: [
            'Asegúrate de que ambos valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    }
  }
];

const MOMENTUM_CHANGE_METHODS: CalculationMethod[] = [
  {
    id: 'momentum_change',
    requiredVariables: ['mass', 'initialVelocity', 'finalVelocity'],
    formula: 'Δp = m × (v_f - v_i)',
    description: 'Calcula el cambio de momento lineal a partir de la masa y las velocidades inicial y final',
    priority: 1,
    calculate: (values) => {
      const mass = values.mass; // Masa en kg
      const initialVelocity = values.initialVelocity; // Velocidad inicial en m/s
      const finalVelocity = values.finalVelocity; // Velocidad final en m/s
      return mass * (finalVelocity - initialVelocity); // Cambio de momento lineal en kg·m/s
    },
    validate: (values) => {
      if (values.mass <= 0 || values.initialVelocity === undefined || values.finalVelocity === undefined) {
        return {
          type: 'out_of_range',
          message: 'Mass must be positive and velocities must be defined',
          userMessage: 'La masa debe ser positiva y las velocidades deben estar definidas',
          suggestions: [
            'Asegúrate de que la masa sea mayor que cero',
            'Verifica que las velocidades inicial y final estén definidas'
          ]
        };
      }
      return null;
    }
  }
];

const APPLIED_FORCE_WITH_FRICTION_METHODS: CalculationMethod[] = [
  {
    id: 'applied_force_with_friction',
    requiredVariables: ['force', 'frictionCoefficient', 'normalForce'],
    formula: 'F_applied = F - (μ_k × N)',
    description: 'Calcula la fuerza aplicada considerando la fricción cinética',
    priority: 1,
    calculate: (values) => {
      const force = values.force; // Fuerza aplicada en N
      const frictionCoefficient = values.frictionCoefficient; // Coeficiente de fricción cinética
      const normalForce = values.normalForce; // Fuerza normal en N
      return force - (frictionCoefficient * normalForce); // Fuerza aplicada en N
    },
    validate: (values) => {
      if (values.force <= 0 || values.frictionCoefficient < 0 || values.normalForce <= 0) {
        return {
          type: 'out_of_range',
          message: 'Force must be positive, friction coefficient must be non-negative, and normal force must be positive',
          userMessage: 'La fuerza debe ser positiva, el coeficiente de fricción no negativo y la fuerza normal positiva',
          suggestions: [
            'Asegúrate de que la fuerza sea mayor que cero',
            'Verifica que el coeficiente de fricción sea no negativo',
            'Asegúrate de que la fuerza normal sea mayor que cero'
          ]
        };
      }
      return null;
    }
  }
];

const WEIGHT_METHODS: CalculationMethod[] = [
  {
    id: 'weight',
    requiredVariables: ['mass', 'gravity'],
    formula: 'W = m × g',
    description: 'Calcula el peso de un objeto a partir de su masa y la gravedad',
    priority: 1,
    calculate: (values) => {
      const mass = values.mass; // Masa en kg
      const gravity = values.gravity; // Gravedad en m/s²
      if (gravity === 0) {
        throw new Error('Gravity cannot be zero');
      }
      return mass * gravity; // Peso en N
    },
    validate: (values) => {
      if (values.mass <= 0 || values.gravity <= 0) {
        return {
          type: 'out_of_range',
          message: 'Mass and gravity must be positive',
          userMessage: 'La masa y la gravedad deben ser positivas',
          suggestions: [
            'Asegúrate de que ambos valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      if (values.gravity === 0) {
        return {
          type: 'division_by_zero',
          message: 'Cannot calculate weight with zero gravity',
          userMessage: 'No se puede calcular el peso con gravedad cero',
          suggestions: [
            'Ingresa un valor de gravedad diferente de cero',
            'Verifica que el valor de gravedad sea correcto'
          ]
        };
      }
      return null;
    }
  }
];

const ACCELERATIONX_METHODS: CalculationMethod[] = [
  {
    id: 'accelerationX',
    requiredVariables: ['forceX', 'mass'],
    formula: 'a_x = F_x / m',
    description: 'Calcula la aceleración en el eje X a partir de la fuerza en X y la masa',
    priority: 1,
    calculate: (values) => {
      const forceX = values.forceX; // Fuerza en N
      const mass = values.mass; // Masa en kg
      if (mass === 0) {
        throw new Error('Mass cannot be zero');
      }
      return forceX / mass; // Aceleración en m/s²
    },
    validate: (values) => {
      if (values.forceX === 0 || values.mass <= 0) {
        return {
          type: 'out_of_range',
          message: 'Force must be non-zero and mass must be positive',
          userMessage: 'La fuerza debe ser diferente de cero y la masa positiva',
          suggestions: [
            'Asegúrate de que la fuerza sea diferente de cero',
            'Verifica que la masa sea mayor que cero'
          ]
        };
      }
      if (values.mass === 0) {
        return {
          type: 'division_by_zero',
          message: 'Cannot calculate acceleration with zero mass',
          userMessage: 'No se puede calcular la aceleración con masa cero',
          suggestions: [
            'Ingresa un valor de masa diferente de cero',
            'Verifica que el valor de masa sea correcto'
          ]
        };
      }
      return null;
    }
  }
];

const ACCELERATIONY_METHODS: CalculationMethod[] = [
  {
    id: 'accelerationY',
    requiredVariables: ['forceY', 'mass'],
    formula: 'a_y = F_y / m',
    description: 'Calcula la aceleración en el eje Y a partir de la fuerza en Y y la masa',
    priority: 1,
    calculate: (values) => {
      const forceY = values.forceY; // Fuerza en N
      const mass = values.mass; // Masa en kg
      if (mass === 0) {
        throw new Error('Mass cannot be zero');
      }
      return forceY / mass; // Aceleración en m/s²
    },
    validate: (values) => {
      if (values.forceY === 0 || values.mass <= 0) {
        return {
          type: 'out_of_range',
          message: 'Force must be non-zero and mass must be positive',
          userMessage: 'La fuerza debe ser diferente de cero y la masa positiva',
          suggestions: [
            'Asegúrate de que la fuerza sea diferente de cero',
            'Verifica que la masa sea mayor que cero'
          ]
        };
      }
      if (values.mass === 0) {
        return {
          type: 'division_by_zero',
          message: 'Cannot calculate acceleration with zero mass',
          userMessage: 'No se puede calcular la aceleración con masa cero',
          suggestions: [
            'Ingresa un valor de masa diferente de cero',
            'Verifica que el valor de masa sea correcto'
          ]
        };
      }
      return null;
    }
  }
];

const SYSTEM_DIRECTION_METHODS: CalculationMethod[] = [
  {
    id: 'system_direction_two_masses',
    requiredVariables: ['mass1', 'mass2', 'angle1', 'angle2'],
    formula: 'Direction = sign(m₂sinθ₂ - m₁sinθ₁)',
    description: 'Determina la dirección del movimiento en un sistema de dos masas en planos inclinados',
    priority: 1,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      
      // Fuerzas paralelas
      const F1_parallel = m1 * (values.gravity || 9.807) * Math.sin(theta1Rad);
      const F2_parallel = m2 * (values.gravity || 9.807) * Math.sin(theta2Rad);
      
      // Determinar dirección basada en cual fuerza es mayor
      const netForce = F2_parallel - F1_parallel;
      
      if (Math.abs(netForce) < 1e-6) return 0; // Equilibrio
      return netForce > 0 ? 1 : -1; // 1: masa 2 desciende, -1: masa 1 desciende
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses must be positive',
          userMessage: 'Las masas deben ser positivas',
          suggestions: [
            'Asegúrate de que ambos valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    },
    getDirectionText: (direction:number) => {
      if (direction === 0) return "Sistema en equilibrio";
      return direction > 0 ? "La masa 2 desciende" : "La masa 1 desciende";
    }
  },
  {
    id: 'system_direction_with_friction',
    requiredVariables: ['mass1', 'mass2', 'angle1', 'angle2', 'frictionCoefficient1', 'frictionCoefficient2'],
    formula: 'Direction = sign(m₂gsinθ₂ - μ₂m₂gcosθ₂ - m₁gsinθ₁ + μ₁m₁gcosθ₁)',
    description: 'Determina la dirección del movimiento en un sistema con fricción',
    priority: 2,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = values.gravity || 9.807;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      const mu1 = values.frictionCoefficient1;
      const mu2 = values.frictionCoefficient2;
      
      // Componentes de fuerzas con fricción
      const F1_parallel = m1 * g * Math.sin(theta1Rad) - mu1 * m1 * g * Math.cos(theta1Rad);
      const F2_parallel = m2 * g * Math.sin(theta2Rad) - mu2 * m2 * g * Math.cos(theta2Rad);
      
      // Fuerza neta
      const netForce = F2_parallel - F1_parallel;
      
      if (Math.abs(netForce) < 1e-6) return 0; // Equilibrio
      return netForce > 0 ? 1 : -1;
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses must be positive',
          userMessage: 'Las masas deben ser positivas',
          suggestions: [
            'Asegúrate de que ambos valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      if (values.frictionCoefficient1 < 0 || values.frictionCoefficient2 < 0) {
        return {
          type: 'out_of_range',
          message: 'Friction coefficients cannot be negative',
          userMessage: 'Los coeficientes de fricción no pueden ser negativos',
          suggestions: [
            'Ingresa valores no negativos para los coeficientes de fricción',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      return null;
    },
    getDirectionText: (direction:number) => {
      if (direction === 0) return "Sistema en equilibrio";
      return direction > 0 ? "La masa 2 desciende" : "La masa 1 desciende";
    }
  },
  {
    id: 'system_direction_with_external_force',
    requiredVariables: ['mass1', 'mass2', 'angle1', 'angle2', 'externalForce', 'externalForceAngle'],
    formula: 'Direction = sign(m₂gsinθ₂ - m₁gsinθ₁ + F_ext·cos(θ_ext))',
    description: 'Determina la dirección del movimiento con una fuerza externa aplicada',
    priority: 3,
    calculate: (values) => {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = values.gravity || 9.807;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      const extForce = values.externalForce;
      const extForceAngleRad = (values.externalForceAngle * Math.PI) / 180;
      
      // Componentes de fuerzas
      const F1_parallel = m1 * g * Math.sin(theta1Rad);
      const F2_parallel = m2 * g * Math.sin(theta2Rad);
      
      // Componente de fuerza externa en la dirección del movimiento
      const F_ext_component = extForce * Math.cos(extForceAngleRad);
      
      // Fuerza neta
      const netForce = F2_parallel - F1_parallel + F_ext_component;
      
      if (Math.abs(netForce) < 1e-6) return 0; // Equilibrio
      return netForce > 0 ? 1 : -1;
    },
    validate: (values) => {
      if (values.mass1 <= 0 || values.mass2 <= 0) {
        return {
          type: 'out_of_range',
          message: 'Masses must be positive',
          userMessage: 'Las masas deben ser positivas',
          suggestions: [
            'Asegúrate de que ambos valores sean mayores que cero',
            'Verifica que los valores ingresados sean correctos'
          ]
        };
      }
      if (values.externalForceAngle < 0 || values.externalForceAngle > 360) {
        return {
          type: 'out_of_range',
          message: 'External force angle must be between 0 and 360 degrees',
          userMessage: 'El ángulo de la fuerza externa debe estar entre 0 y 360 grados',
          suggestions: [
            'Ingresa un ángulo válido para la fuerza externa',
            'Verifica que el ángulo sea físicamente posible'
          ]
        };
      }
      return null;
    },
    getDirectionText: (direction:number) => {
      if (direction === 0) return "Sistema en equilibrio";
      return direction > 0 ? "La masa 2 desciende" : "La masa 1 desciende";
    }
  }
];

export function calculateNewton(variableToSolve: string, values: Record<string, number>): CalculationResult {
  if(!values){
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
    }
  }
  let multiresult: MultiMethodResult;
  switch (variableToSolve) {
    case "force":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'force',
        FORCE_METHODS,
        values,
        'Fuerza',
        'N'
      );
      break;
    case "mass":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'mass',
        MASS_METHODS,
        values,
        'Masa',
        'kg'
        );
      break;
    case "mass1":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'mass1',
        MASS1_METHODS,
        values,
        'Masa 1',
        'kg'
        );
      break;
    case "mass2":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'mass2',
        MASS2_METHODS,
        values,
        'Masa 2',
        'kg'
        );
      break;
    case "angle":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'angle',
        ANGLE_METHODS,
        values,
        'Ángulo',
        '°'
        );
      break;
    case "angle1":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'angle1',
        ANGLE1_METHODS,
        values,
        'Ángulo 1',
        '°'
        );
      break;
    case "angle2":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'angle2',
        ANGLE2_METHODS,
        values,
        'Ángulo 2',
        '°'
        );
      break;
    case "frictionCoefficient1":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'frictionCoefficient1',
        FRICTION_COEFFICIENT1_METHODS,
        values,
        'Coeficiente de fricción 1',
        ''
        );
      break;
    case "frictionCoefficient2":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'frictionCoefficient2',
        FRICTION_COEFFICIENT2_METHODS,
        values,
        'Coeficiente de fricción 2',
        ''
        );
      break;
    case "parallelForce":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'parallelForce',
        PARALLEL_FORCE_METHODS,
        values,
        'Fuerza paralela',
        'N'
        );
      break;
    case "planetGravity":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'planetGravity',
        PLANET_GRAVITY_METHODS,
        values,
        'Gravedad del planeta',
        'm/s²'
        );
      break;
    case "netForce":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'netForce',
        NET_FORCE_METHODS,
        values,
        'Fuerza neta',
        'N'
        );
      break;
    case "netForceInclined":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'netForceInclined',
        NET_FORCE_INCLINED_METHODS,
        values,
        'Fuerza neta en plano inclinado',
        'N'
        );
      break;
    case "maxStaticFriction":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'maxStaticFriction',
        MAX_STATIC_FRICTION_METHODS,
        values,
        'Fricción estática máxima',
        'N'
        );
      break;
    case "momentumChange":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'momentumChange',
        MOMENTUM_CHANGE_METHODS,
        values,
        'Cambio de momento lineal',
        'kg·m/s'
        );
      break;
    case "appliedForceWithFriction":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'appliedForceWithFriction',
        APPLIED_FORCE_WITH_FRICTION_METHODS,
        values,
        'Fuerza aplicada con fricción',
        'N'
        );
      break;
    case "weight":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'weight',
        WEIGHT_METHODS,
        values,
        'Peso',
        'N'
        );
      break;
    case "accelerationX":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'accelerationX',
        ACCELERATIONX_METHODS,
        values,
        'Aceleración en X',
        'm/s²'
        );
      break;
    case "accelerationY":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'accelerationY',
        ACCELERATIONY_METHODS,
        values,
        'Aceleración en Y',
        'm/s²'
        );
      break;

      case "acceleration":
    multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
      'acceleration',
      ACCELERATION_METHODS,
      values,
      'Aceleración',
      'm/s²'
    );
      break;
    case "systemAcceleration":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'systemAcceleration',
        SYSTEM_ACCELERATION_METHODS,
        values,
        'Aceleración del sistema',
        'm/s²'
      );
      break;
    case "systemTension":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'systemTension',
        SYSTEM_TENSION_METHODS,
        values,
        'Tensión del sistema',
        'N'
      );
      break;
    case "systemDirection":
      multiresult = MultiMethodCalculator.calculateWithMultipleMethods(
        'systemDirection',
        SYSTEM_DIRECTION_METHODS,
        values,
        'Dirección del sistema',
        '°',
      );
      break;

    default:
      return {
        value: null,
        unit: '',
        name: '',
        formula: '',
        error: {
          type: 'invalid_values',
          message: `Variable '${variableToSolve}' is not supported for Newton calculations`,
          userMessage: `La variable '${variableToSolve}' no es compatible con los cálculos de Newton`,
          suggestions: ['Verifica la variable ingresada y prueba con otra']
        }
      };
    }
    return multiresult;
};


export interface NewtonCalculationResult {
  result: number;
  formula: string;
  steps: string[];
  unit: string;
  components?: {
    fx?: number;
    fy?: number;
    magnitude?: number;
    angle?: number;
  };
}

export interface NewtonInputs {
  [key: string]: number;
}

// Función para calcular fuerza neta desde múltiples fuerzas
export function calculateNetForceFromMultiple(forces: Array<{magnitude: number, angle: number, unit: string}>): NewtonCalculationResult {
  let fx = 0;
  let fy = 0;
  const steps: string[] = [];
  
  steps.push('Calculando componentes de cada fuerza:');
  
  forces.forEach((force, index) => {
    const magnitudeInN = convertToNewtons(force.magnitude, force.unit);
    const angleRad = (force.angle * Math.PI) / 180;
    
    const forceX = magnitudeInN * Math.cos(angleRad);
    const forceY = magnitudeInN * Math.sin(angleRad);
    
    fx += forceX;
    fy += forceY;
    
    steps.push(`Fuerza ${index + 1}: ${force.magnitude} ${force.unit} a ${force.angle}°`);
    steps.push(`  Fx${index + 1} = ${magnitudeInN.toFixed(2)} × cos(${force.angle}°) = ${forceX.toFixed(2)} N`);
    steps.push(`  Fy${index + 1} = ${magnitudeInN.toFixed(2)} × sin(${force.angle}°) = ${forceY.toFixed(2)} N`);
  });
  
  steps.push('');
  steps.push('Sumando componentes:');
  steps.push(`ΣFx = ${fx.toFixed(2)} N`);
  steps.push(`ΣFy = ${fy.toFixed(2)} N`);
  
  const magnitude = Math.sqrt(fx * fx + fy * fy);
  const angle = Math.atan2(fy, fx) * (180 / Math.PI);
  
  steps.push('');
  steps.push('Calculando fuerza neta:');
  steps.push(`|F_net| = √(${fx.toFixed(2)}² + ${fy.toFixed(2)}²)`);
  steps.push(`|F_net| = √(${(fx * fx).toFixed(2)} + ${(fy * fy).toFixed(2)})`);
  steps.push(`|F_net| = √${(fx * fx + fy * fy).toFixed(2)}`);
  steps.push(`|F_net| = ${magnitude.toFixed(2)} N`);
  steps.push(`θ = arctan(${fy.toFixed(2)}/${fx.toFixed(2)}) = ${angle.toFixed(1)}°`);

  return {
    result: parseFloat(magnitude.toFixed(6)),
    formula: 'F_net = √((ΣFx)² + (ΣFy)²)',
    steps,
    unit: 'N',
    components: {
      fx: parseFloat(fx.toFixed(6)),
      fy: parseFloat(fy.toFixed(6)),
      magnitude: parseFloat(magnitude.toFixed(6)),
      angle: parseFloat(angle.toFixed(2))
    }
  };
}

function convertToNewtons(value: number, unit: string): number {
  const conversions: { [key: string]: number } = {
    'N': 1,
    'kN': 1000,
    'dyn': 1e-5,
    'lbf': 4.448,
    'kgf': 9.807
  };
  return value * (conversions[unit] || 1);
}