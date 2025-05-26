/**
 * Calculadora para la Segunda Ley de Newton
 * F = m × a
 */

interface NewtonSecondLawInput {
  force?: number;
  mass?: number;
  acceleration?: number;
  forceUnit?: string;
  massUnit?: string;
  accelerationUnit?: string;
}

interface NewtonSecondLawResult {
  force?: number;
  mass?: number;
  acceleration?: number;
  equation?: string;
  steps?: string[];
}

// Interfaz compatible con el controller
export interface CalculationResult {
  value: number;
  name: string;
  formula: string;
  unit: string;
}

// Factores de conversión para las unidades (todas a unidades SI)
const FORCE_CONVERSIONS: { [key: string]: number } = {
  'N': 1,
  'kN': 1000,
  'dyn': 0.00001,
  'lbf': 4.44822
};

const MASS_CONVERSIONS: { [key: string]: number } = {
  'kg': 1,
  'g': 0.001,
  'lb': 0.453592,
  't': 1000
};

const ACCELERATION_CONVERSIONS: { [key: string]: number } = {
  'm/s²': 1,
  'cm/s²': 0.01,
  'ft/s²': 0.3048,
  'g': 9.80665
};

/**
 * Función principal compatible con el calculator-controller
 * @param variableToSolve Variable que se desea calcular
 * @param values Valores de entrada en unidades SI
 * @returns Resultado del cálculo
 */
export function calculateNewtonSecondLaw(variableToSolve: string, values: Record<string, number>): CalculationResult {
  const { force, mass, acceleration } = values;
  
  // Validar que se tengan suficientes valores
  const knownValues = Object.values(values).filter(v => v !== undefined && !isNaN(v)).length;
  
  if (knownValues < 2) {
    throw new Error('Se necesitan al menos dos valores conocidos para realizar el cálculo');
  }
  
  let result: number;
  let formula: string;
  let name: string;
  let unit: string;
  
  switch (variableToSolve) {
    case 'force':
      if (mass !== undefined && acceleration !== undefined) {
        result = mass * acceleration; // F = m × a
        formula = 'F = m × a';
        name = 'Fuerza';
        unit = 'N';
      } else {
        throw new Error('Para calcular la fuerza se necesitan masa y aceleración');
      }
      break;
      
    case 'mass':
      if (force !== undefined && acceleration !== undefined) {
        if (acceleration === 0) {
          throw new Error('La aceleración no puede ser cero para calcular la masa');
        }
        result = force / acceleration; // m = F / a
        formula = 'm = F / a';
        name = 'Masa';
        unit = 'kg';
      } else {
        throw new Error('Para calcular la masa se necesitan fuerza y aceleración');
      }
      break;
      
    case 'acceleration':
      if (force !== undefined && mass !== undefined) {
        if (mass === 0) {
          throw new Error('La masa no puede ser cero para calcular la aceleración');
        }
        result = force / mass; // a = F / m
        formula = 'a = F / m';
        name = 'Aceleración';
        unit = 'm/s²';
      } else {
        throw new Error('Para calcular la aceleración se necesitan fuerza y masa');
      }
      break;
      
    default:
      throw new Error(`Variable desconocida: ${variableToSolve}`);
  }
  
  return {
    value: result,
    name,
    formula,
    unit
  };
}

/**
 * Valida que los valores de entrada sean válidos
 */
export function validateNewtonSecondLawInput(input: NewtonSecondLawInput): string[] {
  const errors: string[] = [];
  
  const { force, mass, acceleration } = input;
  const values = [force, mass, acceleration].filter(v => v !== undefined);
  
  if (values.length < 2) {
    errors.push('Se requieren al menos dos valores para realizar el cálculo');
  }
  
  if (values.length > 2) {
    errors.push('Solo se pueden ingresar dos valores conocidos');
  }
  
  if (force !== undefined && force < 0) {
    errors.push('La fuerza no puede ser negativa');
  }
  
  if (mass !== undefined && mass <= 0) {
    errors.push('La masa debe ser mayor que cero');
  }
  
  if (acceleration !== undefined && acceleration === 0) {
    errors.push('La aceleración no puede ser cero para este cálculo');
  }
  
  return errors;
}
