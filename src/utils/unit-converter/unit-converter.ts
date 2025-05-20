import { conversionFactors } from './conversion-factors';
import { type UnitType } from '../../types';

/**
 * Convierte un valor desde la unidad seleccionada a la unidad base (SI)
 * @param value Valor a convertir
 * @param type Tipo de unidad (e.g., 'radius', 'angularVelocity', etc.)
 * @param unitSelected Unidad seleccionada por el usuario
 * @returns Valor convertido a unidad base
 */
export function convertToBaseUnit(value: number, type: UnitType, unitSelected: string): number {
  if (!unitSelected || !conversionFactors[type] || !(unitSelected in conversionFactors[type])) {
    return value;  // Si no hay conversión definida, devolver el valor original
  }
  return value * conversionFactors[type][unitSelected as keyof typeof conversionFactors[typeof type]];
}
      
/**
 * Convierte un valor desde la unidad base (SI) a la unidad seleccionada
 * @param value Valor en unidad base a convertir
 * @param type Tipo de unidad (e.g., 'radius', 'angularVelocity', etc.)
 * @param unitSelected Unidad destino seleccionada por el usuario
 * @returns Valor convertido a unidad seleccionada
 */
export function convertFromBaseUnit(value: number, type: UnitType, unitSelected: string): number {
  if (!unitSelected || !conversionFactors[type] || !(unitSelected in conversionFactors[type])) {
    return value;  // Si no hay conversión definida, devolver el valor original
  }
  return value / conversionFactors[type][unitSelected as keyof typeof conversionFactors[typeof type]];
}
