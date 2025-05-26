/**
 * Calculadora para Fuerzas Múltiples - Segunda Ley de Newton
 * Permite el cálculo de fuerza neta a partir de múltiples fuerzas aplicadas
 */

// Interfaz para una fuerza individual
export interface Force {
  id: string;
  magnitude: number;    // Magnitud de la fuerza
  angle: number;        // Ángulo en grados (0° = hacia la derecha)
  name?: string;        // Nombre descriptivo opcional
  unit: string;         // Unidad de la fuerza
}

// Interfaz para el resultado del cálculo de fuerza neta
export interface NetForceResult {
  magnitude: number;        // Magnitud de la fuerza resultante
  angle: number;           // Ángulo de la fuerza resultante
  components: {
    x: number;             // Componente X de la fuerza neta
    y: number;             // Componente Y de la fuerza neta
  };
  unit: string;
  forces: Force[];         // Fuerzas individuales utilizadas
  steps: string[];         // Pasos del cálculo
}

// Interfaz para el cálculo completo de la Segunda Ley de Newton con múltiples fuerzas
export interface MultipleForceNewtonResult {
  netForce: NetForceResult;
  acceleration?: number;    // Si se conoce la masa
  mass?: number;           // Si se conoce la aceleración
  formula: string;
  steps: string[];
}

// Factores de conversión de fuerzas a Newtons
const FORCE_CONVERSIONS: { [key: string]: number } = {
  'N': 1,
  'kN': 1000,
  'dyn': 0.00001,
  'lbf': 4.44822,
  'kgf': 9.80665
};

/**
 * Convierte una fuerza a Newtons
 */
function convertForceToNewtons(force: Force): number {
  const conversion = FORCE_CONVERSIONS[force.unit] || 1;
  return force.magnitude * conversion;
}

/**
 * Convierte ángulo de grados a radianes
 */
function degToRad(degrees: number): number {
  return degrees * Math.PI / 180;
}

/**
 * Convierte ángulo de radianes a grados
 */
function radToDeg(radians: number): number {
  return radians * 180 / Math.PI;
}

/**
 * Calcula la fuerza neta a partir de múltiples fuerzas
 */
export function calculateNetForce(forces: Force[]): NetForceResult {
  if (forces.length === 0) {
    throw new Error('Se requiere al menos una fuerza para el cálculo');
  }

  let totalFx = 0;  // Componente X total
  let totalFy = 0;  // Componente Y total
  const steps: string[] = [];
  
  // Determinar unidad resultante (usar la unidad de la primera fuerza)
  const resultUnit = forces[0].unit;
  
  steps.push(`Calculando componentes de ${forces.length} fuerza(s):`);
  
  // Calcular componentes X e Y de cada fuerza
  forces.forEach((force, index) => {
    const forceInNewtons = convertForceToNewtons(force);
    const angleRad = degToRad(force.angle);
    
    const fx = forceInNewtons * Math.cos(angleRad);
    const fy = forceInNewtons * Math.sin(angleRad);
    
    totalFx += fx;
    totalFy += fy;
    
    const forceName = force.name || `F${index + 1}`;
    steps.push(
      `${forceName}: ${force.magnitude} ${force.unit} a ${force.angle}°`
    );
    steps.push(
      `  Fx${index + 1} = ${force.magnitude} × cos(${force.angle}°) = ${fx.toFixed(2)} N`
    );
    steps.push(
      `  Fy${index + 1} = ${force.magnitude} × sin(${force.angle}°) = ${fy.toFixed(2)} N`
    );
  });

  // Calcular fuerza neta
  const netMagnitude = Math.sqrt(totalFx * totalFx + totalFy * totalFy);
  let netAngle = radToDeg(Math.atan2(totalFy, totalFx));
  
  // Normalizar ángulo a 0-360°
  if (netAngle < 0) {
    netAngle += 360;
  }

  steps.push('');
  steps.push('Sumando componentes:');
  steps.push(`ΣFx = ${totalFx.toFixed(2)} N`);
  steps.push(`ΣFy = ${totalFy.toFixed(2)} N`);
  steps.push('');
  steps.push('Calculando fuerza neta:');
  steps.push(`Magnitud: |F| = √(Fx² + Fy²) = √(${totalFx.toFixed(2)}² + ${totalFy.toFixed(2)}²) = ${netMagnitude.toFixed(2)} N`);
  steps.push(`Ángulo: θ = arctan(Fy/Fx) = arctan(${totalFy.toFixed(2)}/${totalFx.toFixed(2)}) = ${netAngle.toFixed(1)}°`);

  return {
    magnitude: netMagnitude,
    angle: netAngle,
    components: {
      x: totalFx,
      y: totalFy
    },
    unit: 'N',
    forces: forces,
    steps: steps
  };
}

/**
 * Calcula aceleración conociendo la fuerza neta y la masa
 */
export function calculateAccelerationFromNetForce(
  netForce: NetForceResult, 
  mass: number
): { acceleration: number; formula: string; steps: string[] } {
  if (mass <= 0) {
    throw new Error('La masa debe ser mayor que cero');
  }

  const acceleration = netForce.magnitude / mass;
  const formula = 'a = F_neta / m';
  const steps = [
    ...netForce.steps,
    '',
    'Aplicando Segunda Ley de Newton:',
    `a = F_neta / m = ${netForce.magnitude.toFixed(2)} N / ${mass} kg = ${acceleration.toFixed(2)} m/s²`
  ];

  return {
    acceleration,
    formula,
    steps
  };
}

/**
 * Calcula masa conociendo la fuerza neta y la aceleración
 */
export function calculateMassFromNetForce(
  netForce: NetForceResult, 
  acceleration: number
): { mass: number; formula: string; steps: string[] } {
  if (acceleration === 0) {
    throw new Error('La aceleración no puede ser cero para calcular la masa');
  }

  const mass = netForce.magnitude / acceleration;
  const formula = 'm = F_neta / a';
  const steps = [
    ...netForce.steps,
    '',
    'Aplicando Segunda Ley de Newton:',
    `m = F_neta / a = ${netForce.magnitude.toFixed(2)} N / ${acceleration} m/s² = ${mass.toFixed(2)} kg`
  ];

  return {
    mass,
    formula,
    steps
  };
}

/**
 * Función principal para resolver problemas con múltiples fuerzas
 */
export function solveMultipleForcesProblem(
  forces: Force[],
  variableToSolve: 'acceleration' | 'mass',
  knownValue: number
): MultipleForceNewtonResult {
  
  // Calcular fuerza neta
  const netForce = calculateNetForce(forces);
  
  let result: MultipleForceNewtonResult;
  
  switch (variableToSolve) {
    case 'acceleration':
      const accelResult = calculateAccelerationFromNetForce(netForce, knownValue);
      result = {
        netForce,
        acceleration: accelResult.acceleration,
        formula: accelResult.formula,
        steps: accelResult.steps
      };
      break;
      
    case 'mass':
      const massResult = calculateMassFromNetForce(netForce, knownValue);
      result = {
        netForce,
        mass: massResult.mass,
        formula: massResult.formula,
        steps: massResult.steps
      };
      break;
      
    default:
      throw new Error(`Variable desconocida: ${variableToSolve}`);
  }

  return result;
}

/**
 * Valida que las fuerzas ingresadas sean válidas
 */
export function validateForces(forces: Force[]): string[] {
  const errors: string[] = [];
  
  if (forces.length === 0) {
    errors.push('Se requiere al menos una fuerza');
    return errors;
  }
  
  forces.forEach((force, index) => {
    if (force.magnitude < 0) {
      errors.push(`La magnitud de la fuerza ${index + 1} no puede ser negativa`);
    }
    
    if (force.magnitude === 0) {
      errors.push(`La magnitud de la fuerza ${index + 1} no puede ser cero`);
    }
    
    if (!FORCE_CONVERSIONS[force.unit]) {
      errors.push(`Unidad no válida para la fuerza ${index + 1}: ${force.unit}`);
    }
    
    if (isNaN(force.angle)) {
      errors.push(`El ángulo de la fuerza ${index + 1} debe ser un número válido`);
    }
  });
  
  return errors;
}

/**
 * Función de utilidad para crear una fuerza
 */
export function createForce(
  magnitude: number, 
  angle: number, 
  unit: string = 'N', 
  name?: string
): Force {
  return {
    id: Math.random().toString(36).substr(2, 9),
    magnitude,
    angle,
    unit,
    name
  };
}
