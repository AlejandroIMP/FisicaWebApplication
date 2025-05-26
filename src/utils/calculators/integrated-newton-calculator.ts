/**
 * Calculadora integrada de Segunda Ley de Newton con soporte para fuerzas múltiples
 * Combina el calculador básico con el de fuerzas múltiples
 */

import { 
  calculateNewtonSecondLaw, 
  type CalculationResult 
} from './newton-second-law-calculator';
import { 
  calculateNetForce, 
  solveMultipleForcesProblem,
  type Force,
  type NetForceResult,
  type MultipleForceNewtonResult 
} from './multiple-forces-calculator';

// Tipo para el modo de cálculo
export type CalculationMode = 'basic' | 'multipleForces';

// Interfaz para el resultado integrado
export interface IntegratedNewtonResult extends CalculationResult {
  mode: CalculationMode;
  netForceDetails?: NetForceResult;
  multipleForceSteps?: string[];
  forces?: Force[];
}

/**
 * Función principal integrada para resolver problemas de Segunda Ley de Newton
 */
export function calculateIntegratedNewton(
  mode: CalculationMode,
  variableToSolve: string,
  data: any
): IntegratedNewtonResult {
  
  switch (mode) {
    case 'basic':
      return calculateBasicNewton(variableToSolve, data);
    
    case 'multipleForces':
      return calculateMultipleForcesNewton(variableToSolve, data);
    
    default:
      throw new Error(`Modo de cálculo desconocido: ${mode}`);
  }
}

/**
 * Cálculo básico usando el calculador original
 */
function calculateBasicNewton(
  variableToSolve: string, 
  values: Record<string, number>
): IntegratedNewtonResult {
  
  const basicResult = calculateNewtonSecondLaw(variableToSolve, values);
  
  return {
    ...basicResult,
    mode: 'basic'
  };
}

/**
 * Cálculo con múltiples fuerzas
 */
function calculateMultipleForcesNewton(
  variableToSolve: string,
  data: { forces: Force[]; mass?: number; acceleration?: number }
): IntegratedNewtonResult {
  
  const { forces, mass, acceleration } = data;
  
  if (!forces || forces.length === 0) {
    throw new Error('Se requieren fuerzas para el cálculo con múltiples fuerzas');
  }
  
  // Validar fuerzas
  const validForces = forces.filter(f => f.magnitude > 0);
  if (validForces.length === 0) {
    throw new Error('Se requiere al menos una fuerza con magnitud mayor a cero');
  }
  
  switch (variableToSolve) {
    case 'netForce':
      return calculateNetForceOnly(validForces);
    
    case 'acceleration':
      if (!mass || mass <= 0) {
        throw new Error('Se requiere una masa válida para calcular la aceleración');
      }
      return calculateAccelerationFromForces(validForces, mass);
    
    case 'mass':
      if (!acceleration || acceleration === 0) {
        throw new Error('Se requiere una aceleración válida para calcular la masa');
      }
      return calculateMassFromForces(validForces, acceleration);
    
    default:
      throw new Error(`Variable desconocida para múltiples fuerzas: ${variableToSolve}`);
  }
}

/**
 * Calcula solo la fuerza neta
 */
function calculateNetForceOnly(forces: Force[]): IntegratedNewtonResult {
  const netForce = calculateNetForce(forces);
  
  return {
    value: netForce.magnitude,
    name: 'Fuerza Neta',
    formula: 'F_neta = √(Fx² + Fy²)',
    unit: 'N',
    mode: 'multipleForces',
    netForceDetails: netForce,
    multipleForceSteps: netForce.steps,
    forces: forces
  };
}

/**
 * Calcula aceleración a partir de múltiples fuerzas
 */
function calculateAccelerationFromForces(
  forces: Force[], 
  mass: number
): IntegratedNewtonResult {
  
  const result = solveMultipleForcesProblem(forces, 'acceleration', mass);
  
  return {
    value: result.acceleration!,
    name: 'Aceleración',
    formula: result.formula,
    unit: 'm/s²',
    mode: 'multipleForces',
    netForceDetails: result.netForce,
    multipleForceSteps: result.steps,
    forces: forces
  };
}

/**
 * Calcula masa a partir de múltiples fuerzas
 */
function calculateMassFromForces(
  forces: Force[], 
  acceleration: number
): IntegratedNewtonResult {
  
  const result = solveMultipleForcesProblem(forces, 'mass', acceleration);
  
  return {
    value: result.mass!,
    name: 'Masa',
    formula: result.formula,
    unit: 'kg',
    mode: 'multipleForces',
    netForceDetails: result.netForce,
    multipleForceSteps: result.steps,
    forces: forces
  };
}

/**
 * Función de utilidad para obtener todas las fuerzas desde la interfaz
 */
export function getForcesFromUI(): Force[] {
  if (typeof window === 'undefined') return [];
  
  const getMultipleForces = (window as any).getMultipleForces;
  if (typeof getMultipleForces === 'function') {
    return getMultipleForces();
  }
  
  return [];
}

/**
 * Función de utilidad para validar que hay fuerzas válidas
 */
export function validateMultipleForcesFromUI(): boolean {
  if (typeof window === 'undefined') return false;
  
  const validateMultipleForces = (window as any).validateMultipleForces;
  if (typeof validateMultipleForces === 'function') {
    return validateMultipleForces();
  }
  
  return false;
}

/**
 * Función de utilidad para detectar el modo de cálculo apropiado
 */
export function detectCalculationMode(): CalculationMode {
  // Si hay fuerzas múltiples válidas, usar ese modo
  if (validateMultipleForcesFromUI()) {
    return 'multipleForces';
  }
  
  // De lo contrario, usar modo básico
  return 'basic';
}

/**
 * Función principal que se usa desde la interfaz de usuario
 * Detecta automáticamente el modo apropiado y ejecuta el cálculo correspondiente
 */
export function calculateNewtonAuto(
  variableToSolve: string,
  basicValues: Record<string, number>
): IntegratedNewtonResult {
  
  const mode = detectCalculationMode();
  
  if (mode === 'multipleForces') {
    const forces = getForcesFromUI();
    const data = {
      forces,
      mass: basicValues.mass,
      acceleration: basicValues.acceleration
    };
    
    return calculateIntegratedNewton(mode, variableToSolve, data);
  } else {
    return calculateIntegratedNewton(mode, variableToSolve, basicValues);
  }
}

/**
 * Función para limpiar y resetear el estado de fuerzas múltiples
 */
export function resetMultipleForces(): void {
  if (typeof window !== 'undefined' && (window as any).clearMultipleForces) {
    (window as any).clearMultipleForces();
  }
}

/**
 * Función para obtener ejemplos de uso con múltiples fuerzas
 */
export function getMultipleForcesExamples(): { name: string; forces: Force[]; description: string }[] {
  return [
    {
      name: "Dos fuerzas perpendiculares",
      description: "Una fuerza hacia la derecha y otra hacia arriba",
      forces: [
        { id: "ex1_f1", magnitude: 30, angle: 0, unit: "N", name: "F₁" },
        { id: "ex1_f2", magnitude: 40, angle: 90, unit: "N", name: "F₂" }
      ]
    },
    {
      name: "Tres fuerzas en equilibrio",
      description: "Sistema en equilibrio con resultante cero",
      forces: [
        { id: "ex2_f1", magnitude: 100, angle: 0, unit: "N", name: "F₁" },
        { id: "ex2_f2", magnitude: 86.6, angle: 150, unit: "N", name: "F₂" },
        { id: "ex2_f3", magnitude: 50, angle: 270, unit: "N", name: "F₃" }
      ]
    },
    {
      name: "Fuerzas en plano inclinado",
      description: "Simulación de fuerzas en un plano inclinado",
      forces: [
        { id: "ex3_f1", magnitude: 98, angle: 270, unit: "N", name: "Peso" },
        { id: "ex3_f2", magnitude: 50, angle: 30, unit: "N", name: "F. Aplicada" },
        { id: "ex3_f3", magnitude: 20, angle: 210, unit: "N", name: "Fricción" }
      ]
    }
  ];
}
