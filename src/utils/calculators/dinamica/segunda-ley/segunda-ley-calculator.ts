
import { MultiMethodCalculator, type CalculationMethod, type MultiMethodResult } from '../../multi-method-calculator'

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

      const F1_parallel = m1 * g * Math.sin(theta1Rad);
      const F2_parallel = m2 * g * Math.sin(theta2Rad);

      const netForce = F2_parallel - F1_parallel;
      const totalMass = m1 + m2;
      return Math.abs(netForce) / totalMass;
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
      const g = 9.807; // Gravedad estándar
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;

      const F1_parallel = m1 * g * Math.sin(theta1Rad);
      const F2_parallel = m2 * g * Math.sin(theta2Rad);

      const netForce = F2_parallel - F1_parallel;
      const totalMass = m1 + m2;
      return netForce / totalMass;
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

export function calculateNewton(variableToSolve: string, values: Record<string, number>): CalculationResult {
  if (!values) {
    return { value: null, unit: '', name: '', formula: '' };
  }
  let result: CalculationResult = { value: null, unit: '', name: '', formula: '' };

  switch (variableToSolve) {
    case 'force':
      if ('mass' in values && 'acceleration' in values) {
        result.value = values.mass * values.acceleration;
        result.unit = 'N';
        result.name = 'Fuerza (F)';
        result.formula = 'F = m × a';
      } else if ('weight' in values) {
        result.value = values.weight;
        result.unit = 'N';
        result.name = 'Peso (P)';
        result.formula = 'P = m × g';
      }
      break;

    case 'mass':
      if ('force' in values && 'acceleration' in values && values.acceleration !== 0) {
        result.value = values.force / values.acceleration;
        result.unit = 'kg';
        result.name = 'Masa (m)';
        result.formula = 'm = F / a';
      } else if ('weight' in values && 'gravity' in values && values.gravity !== 0) {
        result.value = values.weight / values.gravity;
        result.unit = 'kg';
        result.name = 'Masa (m)';
        result.formula = 'm = P / g';
      } else if ('weight' in values) {
        result.value = values.weight / 9.807; // Gravedad estándar como fallback
        result.unit = 'kg';
        result.name = 'Masa (m)';
        result.formula = 'm = P / g (g = 9.807 m/s²)';
      }
      break;

    case 'acceleration':
      if ('force' in values && 'mass' in values && values.mass !== 0) {
        result.value = values.force / values.mass;
        result.unit = 'm/s²';
        result.name = 'Aceleración (a)';
        result.formula = 'a = F / m';
      }
      break;

    case 'weight':
      if ('mass' in values && 'gravity' in values) {
        result.value = values.mass * values.gravity;
        result.unit = 'N';
        result.name = 'Peso (P)';
        result.formula = 'P = m × g';
      } else if ('mass' in values) {
        result.value = values.mass * 9.807; // Gravedad estándar
        result.unit = 'N';
        result.name = 'Peso (P)';
        result.formula = 'P = m × g (g = 9.807 m/s²)';
      }
      break;

    case 'forceX':
      if ('force' in values && 'angle' in values) {
        const angleRad = (values.angle * Math.PI) / 180;
        result.value = values.force * Math.cos(angleRad);
        result.unit = 'N';
        result.name = 'Componente X de la Fuerza (Fx)';
        result.formula = 'Fx = F × cos(θ)';
      }
      break;

    case 'forceY':
      if ('force' in values && 'angle' in values) {
        const angleRad = (values.angle * Math.PI) / 180;
        result.value = values.force * Math.sin(angleRad);
        result.unit = 'N';
        result.name = 'Componente Y de la Fuerza (Fy)';
        result.formula = 'Fy = F × sin(θ)';
      }
      break;

    case 'accelerationX':
      if ('acceleration' in values && 'angle' in values) {
        const angleRad = (values.angle * Math.PI) / 180;
        result.value = values.acceleration * Math.cos(angleRad);
        result.unit = 'm/s²';
        result.name = 'Componente X de la Aceleración (Ax)';
        result.formula = 'Ax = a × cos(θ)';
      }
      break;

    case 'accelerationY':
      if ('acceleration' in values && 'angle' in values) {
        const angleRad = (values.angle * Math.PI) / 180;
        result.value = values.acceleration * Math.sin(angleRad);
        result.unit = 'm/s²';
        result.name = 'Componente Y de la Aceleración (Ay)';
        result.formula = 'Ay = a × sin(θ)';
      }
      break;

    case 'angle':
      if ('forceX' in values && 'forceY' in values) {
        const fx = values.forceX;
        const fy = values.forceY;
        result.value = Math.atan2(fy, fx) * (180 / Math.PI);
        result.unit = '°';
        result.name = 'Ángulo de la Fuerza (θ)';
        result.formula = 'θ = arctan(Fy / Fx)';
      }
      break;

    case 'appliedForce':
      if ('force' in values && 'angle' in values) {
        const angleRad = (values.angle * Math.PI) / 180;
        result.value = values.force * Math.cos(angleRad);
        result.unit = 'N';
        result.name = 'Fuerza Aplicada (F_aplicada)';
        result.formula = 'F_aplicada = F × cos(θ)';
      }
      break;

    case 'appliedAcceleration':
      if ('acceleration' in values && 'angle' in values) {
        const angleRad = (values.angle * Math.PI) / 180;
        result.value = values.acceleration * Math.cos(angleRad);
        result.unit = 'm/s²';
        result.name = 'Aceleración Aplicada (a_aplicada)';
        result.formula = 'a_aplicada = a × cos(θ)';
      }
      break;

    case 'frictionForce':
      if ('normalForce' in values && 'frictionCoefficient' in values) {
        result.value = values.normalForce * values.frictionCoefficient;
        result.unit = 'N';
        result.name = 'Fuerza de Fricción (F_fricción)';
        result.formula = 'F_fricción = N × μ';
      }
      break;

    case 'normalForce':
      // 1. PLANO INCLINADO con masa y gravedad
      if ('mass' in values && 'gravity' in values && 'angle' in values) {
        const angleRad = (values.angle * Math.PI) / 180;
        result.value = values.mass * values.gravity * Math.cos(angleRad);
        result.unit = 'N';
        result.name = 'Fuerza Normal en Plano Inclinado (N)';
        result.formula = 'N = m × g × cos(θ)';
      } 
      // 2. PLANO INCLINADO con peso directo
      else if ('weight' in values && 'angle' in values) {
        const angleRad = (values.angle * Math.PI) / 180;
        result.value = values.weight * Math.cos(angleRad);
        result.unit = 'N';
        result.name = 'Fuerza Normal en Plano Inclinado (N)';
        result.formula = 'N = P × cos(θ)';
      }
      // 3. PLANO INCLINADO con masa (gravedad estándar)
      else if ('mass' in values && 'angle' in values) {
        const angleRad = (values.angle * Math.PI) / 180;
        result.value = values.mass * 9.807 * Math.cos(angleRad);
        result.unit = 'N';
        result.name = 'Fuerza Normal en Plano Inclinado (N)';
        result.formula = 'N = m × g × cos(θ) (g = 9.807 m/s²)';
      }
      // 4. SUPERFICIE HORIZONTAL con masa y gravedad
      else if ('mass' in values && 'gravity' in values) {
        result.value = values.mass * values.gravity;
        result.unit = 'N';
        result.name = 'Fuerza Normal Horizontal (N)';
        result.formula = 'N = m × g';
      }
      // 5. SUPERFICIE HORIZONTAL con peso directo
      else if ('weight' in values) {
        result.value = values.weight;
        result.unit = 'N';
        result.name = 'Fuerza Normal Horizontal (N)';
        result.formula = 'N = P (superficie horizontal)';
      }
      // 6. SUPERFICIE HORIZONTAL con masa (gravedad estándar)
      else if ('mass' in values) {
        result.value = values.mass * 9.807;
        result.unit = 'N';
        result.name = 'Fuerza Normal Horizontal (N)';
        result.formula = 'N = m × g (g = 9.807 m/s²)';
      }
      // 7. COMPONENTE PERPENDICULAR de fuerza aplicada
      else if ('force' in values && 'angle' in values) {
        const angleRad = (values.angle * Math.PI) / 180;
        result.value = values.force * Math.sin(angleRad);
        result.unit = 'N';
        result.name = 'Componente Normal de Fuerza (N)';
        result.formula = 'N = F × sin(θ)';
      }
      // 8. CASO CON FUERZAS ADICIONALES (avanzado)
      else if ('weight' in values && 'appliedForce' in values && 'angle' in values) {
        const angleRad = (values.angle * Math.PI) / 180;
        const normalFromWeight = values.weight * Math.cos(angleRad);
        const normalFromApplied = values.appliedForce * Math.sin(angleRad);
        result.value = normalFromWeight + normalFromApplied;
        result.unit = 'N';
        result.name = 'Fuerza Normal Total (N)';
        result.formula = 'N = P × cos(θ) + F_aplicada × sin(θ)';
      }
      break;

    case 'frictionCoefficient':
      if ('frictionForce' in values && 'normalForce' in values && values.normalForce !== 0) {
        result.value = values.frictionForce / values.normalForce;
        result.unit = '';
        result.name = 'Coeficiente de Fricción (μ)';
        result.formula = 'μ = F_fricción / N';
      }
      break;

    case 'netForce':
      if ('forceX' in values && 'forceY' in values) {
        const fx = values.forceX;
        const fy = values.forceY;
        result.value = Math.sqrt(fx * fx + fy * fy);
        result.unit = 'N';
        result.name = 'Fuerza Neta (F_net)';
        result.formula = 'F_net = √(Fx² + Fy²)';
      }
      break;

    case 'parallelForce':
      if ('force' in values && 'angle' in values) {
        // Componente paralela de una fuerza aplicada
        const angleRad = (values.angle * Math.PI) / 180;
        result.value = values.force * Math.cos(angleRad);
        result.unit = 'N';
        result.name = 'Fuerza Paralela (F_paralela)';
        result.formula = 'F_paralela = F × cos(θ)';
      } else if ('mass' in values && 'gravity' in values && 'angle' in values) {
        // Componente del peso paralela al plano inclinado
        const angleRad = (values.angle * Math.PI) / 180;
        result.value = values.mass * values.gravity * Math.sin(angleRad);
        result.unit = 'N';
        result.name = 'Fuerza Paralela al Plano (F_paralela)';
        result.formula = 'F_paralela = m × g × sin(θ)';
      } else if ('mass' in values && 'angle' in values) {
        // Usando gravedad estándar
        const angleRad = (values.angle * Math.PI) / 180;
        result.value = values.mass * 9.807 * Math.sin(angleRad);
        result.unit = 'N';
        result.name = 'Fuerza Paralela al Plano (F_paralela)';
        result.formula = 'F_paralela = m × g × sin(θ) (g = 9.807 m/s²)';
      }
      break; // 

    case 'perpendicularForce':
      if ('force' in values && 'angle' in values) {
        // Componente perpendicular de una fuerza aplicada
        const angleRad = (values.angle * Math.PI) / 180;
        result.value = values.force * Math.sin(angleRad);
        result.unit = 'N';
        result.name = 'Fuerza Perpendicular (F_perpendicular)';
        result.formula = 'F_perpendicular = F × sin(θ)';
      } else if ('mass' in values && 'gravity' in values && 'angle' in values) {
        // Componente del peso perpendicular al plano inclinado
        const angleRad = (values.angle * Math.PI) / 180;
        result.value = values.mass * values.gravity * Math.cos(angleRad);
        result.unit = 'N';
        result.name = 'Fuerza Perpendicular al Plano (F_perpendicular)';
        result.formula = 'F_perpendicular = m × g × cos(θ)';
      }
      break;
    case 'systemAcceleration':
    // SISTEMA DE DOS MASAS EN PLANOS INCLINADOS CON POLEA
    if ('mass1' in values && 'mass2' in values && 'angle1' in values && 'angle2' in values && 'gravity' in values) {
      // Con coeficientes de fricción opcionales
      const mu1 = values.frictionCoefficient1 || 0;
      const mu2 = values.frictionCoefficient2 || 0;
      
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = values.gravity;
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      
      // Fuerzas paralelas al plano para cada masa
      const F1_parallel = m1 * g * Math.sin(theta1Rad);
      const F2_parallel = m2 * g * Math.sin(theta2Rad);
      
      // Fuerzas normales
      const N1 = m1 * g * Math.cos(theta1Rad);
      const N2 = m2 * g * Math.cos(theta2Rad);
      
      // Fuerzas de fricción
      const f1 = mu1 * N1;
      const f2 = mu2 * N2;
      
      // Determinar dirección del movimiento y calcular aceleración
      // Asumimos que masa2 baja si F2_parallel > F1_parallel + fricciones
      const netForce = F2_parallel - F1_parallel - f1 - f2;
      const totalMass = m1 + m2;
      const acceleration = Math.abs(netForce) / totalMass;
      
      result.value = acceleration;
      result.unit = 'm/s²';
      result.name = 'Aceleración del Sistema (a)';
      
      if (mu1 === 0 && mu2 === 0) {
        result.formula = 'a = |m₂gsinθ₂ - m₁gsinθ₁| / (m₁ + m₂)';
      } else {
        result.formula = 'a = |m₂gsinθ₂ - m₁gsinθ₁ - μ₁m₁gcosθ₁ - μ₂m₂gcosθ₂| / (m₁ + m₂)';
      }
    }
    // SISTEMA SIMPLIFICADO: solo con masas, ángulos y gravedad estándar
    else if ('mass1' in values && 'mass2' in values && 'angle1' in values && 'angle2' in values) {
      const m1 = values.mass1;
      const m2 = values.mass2;
      const g = 9.807; // Gravedad estándar
      const theta1Rad = (values.angle1 * Math.PI) / 180;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      
      const F1_parallel = m1 * g * Math.sin(theta1Rad);
      const F2_parallel = m2 * g * Math.sin(theta2Rad);
      
      const netForce = Math.abs(F2_parallel - F1_parallel);
      const totalMass = m1 + m2;
      const acceleration = netForce / totalMass;
      
      result.value = acceleration;
      result.unit = 'm/s²';
      result.name = 'Aceleración del Sistema (a)';
      result.formula = 'a = |m₂gsinθ₂ - m₁gsinθ₁| / (m₁ + m₂) (g = 9.807 m/s²)';
    }
    // SISTEMA CON UNA MASA HORIZONTAL Y OTRA EN PLANO INCLINADO
    else if ('mass1' in values && 'mass2' in values && 'angle2' in values && 'gravity' in values) {
      const m1 = values.mass1; // Masa horizontal
      const m2 = values.mass2; // Masa en plano inclinado
      const g = values.gravity;
      const theta2Rad = (values.angle2 * Math.PI) / 180;
      const mu1 = values.frictionCoefficient1 || 0; // Fricción masa horizontal
      const mu2 = values.frictionCoefficient2 || 0; // Fricción masa inclinada
      
      // Fuerzas
      const F2_parallel = m2 * g * Math.sin(theta2Rad);
      const N1 = m1 * g; // Normal masa horizontal
      const N2 = m2 * g * Math.cos(theta2Rad); // Normal masa inclinada
      const f1 = mu1 * N1; // Fricción masa horizontal
      const f2 = mu2 * N2; // Fricción masa inclinada
      
      const netForce = F2_parallel - f1 - f2;
      const totalMass = m1 + m2;
      const acceleration = Math.abs(netForce) / totalMass;
      
      result.value = acceleration;
      result.unit = 'm/s²';
      result.name = 'Aceleración del Sistema (a)';
      result.formula = 'a = |m₂gsinθ₂ - μ₁m₁g - μ₂m₂gcosθ₂| / (m₁ + m₂)';
    }
    break;

    case 'systemTension':
      // TENSIÓN EN LA CUERDA DEL SISTEMA DE PLANOS INCLINADOS
      if ('mass1' in values && 'mass2' in values && 'angle1' in values && 'angle2' in values && 'gravity' in values) {
        const m1 = values.mass1;
        const m2 = values.mass2;
        const g = values.gravity;
        const theta1Rad = (values.angle1 * Math.PI) / 180;
        const theta2Rad = (values.angle2 * Math.PI) / 180;
        const mu1 = values.frictionCoefficient1 || 0;
        const mu2 = values.frictionCoefficient2 || 0;
        
        // Calcular primero la aceleración del sistema
        const F1_parallel = m1 * g * Math.sin(theta1Rad);
        const F2_parallel = m2 * g * Math.sin(theta2Rad);
        const N1 = m1 * g * Math.cos(theta1Rad);
        const N2 = m2 * g * Math.cos(theta2Rad);
        const f1 = mu1 * N1;
        const f2 = mu2 * N2;
        
        const netForce = F2_parallel - F1_parallel - f1 - f2;
        const acceleration = Math.abs(netForce) / (m1 + m2);
        
        // Calcular tensión usando la masa que sube (asumiendo m1 sube)
        const tension = F1_parallel + f1 + m1 * acceleration;
        
        result.value = tension;
        result.unit = 'N';
        result.name = 'Tensión en la Cuerda (T)';
        result.formula = 'T = m₁gsinθ₁ + f₁ + m₁a';
      }
      break;

    case 'systemDirection':
      // DETERMINAR DIRECCIÓN DEL MOVIMIENTO
      if ('mass1' in values && 'mass2' in values && 'angle1' in values && 'angle2' in values && 'gravity' in values) {
        const m1 = values.mass1;
        const m2 = values.mass2;
        const g = values.gravity;
        const theta1Rad = (values.angle1 * Math.PI) / 180;
        const theta2Rad = (values.angle2 * Math.PI) / 180;
        const mu1 = values.frictionCoefficient1 || 0;
        const mu2 = values.frictionCoefficient2 || 0;
        
        const F1_parallel = m1 * g * Math.sin(theta1Rad);
        const F2_parallel = m2 * g * Math.sin(theta2Rad);
        const f1 = mu1 * m1 * g * Math.cos(theta1Rad);
        const f2 = mu2 * m2 * g * Math.cos(theta2Rad);
        
        const F1_total = F1_parallel + f1;
        const F2_total = F2_parallel + f2;
        
        // Resultado como código: 1 = masa2 baja, -1 = masa1 baja, 0 = equilibrio
        if (F2_total > F1_total) {
          result.value = 1; // Masa 2 baja, masa 1 sube
        } else if (F1_total > F2_total) {
          result.value = -1; // Masa 1 baja, masa 2 sube
        } else {
          result.value = 0; // Equilibrio
        }
        
        result.unit = '';
        result.name = 'Dirección del Movimiento';
        result.formula = 'Comparar: m₂gsinθ₂ vs m₁gsinθ₁ + fricciones';
      }
      break;  
    default:
        return { value: null, unit: '', name: '', formula: '' };
    }

  return result;
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