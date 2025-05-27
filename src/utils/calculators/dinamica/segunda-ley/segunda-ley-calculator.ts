import { type CalculationResult } from "../../mcu-calculator";
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
      if ('force' in values && 'acceleration' in values) {
        result.value = values.force / values.acceleration;
        result.unit = 'kg';
        result.name = 'Masa (m)';
        result.formula = 'm = F / a';
      } else if ('weight' in values) {
        result.value = values.weight / 9.807; // Asumiendo gravedad estándar
        result.unit = 'kg';
        result.name = 'Masa (m)';
        result.formula = 'm = P / g';
      }
      break;

    case 'acceleration':
      if ('force' in values && 'mass' in values) {
        result.value = values.force / values.mass;
        result.unit = 'm/s²';
        result.name = 'Aceleración (a)';
        result.formula = 'a = F / m';
      }
      break;

    case 'weight':
      if ('mass' in values) {
        result.value = values.mass * 9.807; // Asumiendo gravedad estándar
        result.unit = 'N';
        result.name = 'Peso (P)';
        result.formula = 'P = m × g';
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