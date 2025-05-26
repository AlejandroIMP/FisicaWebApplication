/**
 * Test para la calculadora de la Segunda Ley de Newton
 */

import { describe, it, expect } from 'vitest';
import { calculateNewtonSecondLaw } from '../calculators/newton-second-law-calculator';

describe('calculateNewtonSecondLaw', () => {
  it('debería calcular la fuerza correctamente (F = m × a)', () => {
    const result = calculateNewtonSecondLaw('force', {
      mass: 10, // kg
      acceleration: 2 // m/s²
    });
    
    expect(result.value).toBe(20); // 10 kg × 2 m/s² = 20 N
    expect(result.name).toBe('Fuerza');
    expect(result.formula).toBe('F = m × a');
    expect(result.unit).toBe('N');
  });

  it('debería calcular la masa correctamente (m = F / a)', () => {
    const result = calculateNewtonSecondLaw('mass', {
      force: 20, // N
      acceleration: 2 // m/s²
    });
    
    expect(result.value).toBe(10); // 20 N / 2 m/s² = 10 kg
    expect(result.name).toBe('Masa');
    expect(result.formula).toBe('m = F / a');
    expect(result.unit).toBe('kg');
  });

  it('debería calcular la aceleración correctamente (a = F / m)', () => {
    const result = calculateNewtonSecondLaw('acceleration', {
      force: 20, // N
      mass: 10 // kg
    });
    
    expect(result.value).toBe(2); // 20 N / 10 kg = 2 m/s²
    expect(result.name).toBe('Aceleración');
    expect(result.formula).toBe('a = F / m');
    expect(result.unit).toBe('m/s²');
  });

  it('debería manejar valores decimales correctamente', () => {
    const result = calculateNewtonSecondLaw('force', {
      mass: 2.5, // kg
      acceleration: 9.8 // m/s²
    });
    
    expect(result.value).toBeCloseTo(24.5); // 2.5 kg × 9.8 m/s² = 24.5 N
    expect(result.name).toBe('Fuerza');
    expect(result.unit).toBe('N');
  });

  it('debería lanzar error cuando faltan valores', () => {
    expect(() => {
      calculateNewtonSecondLaw('force', {
        mass: 10 // falta aceleración
      });
    }).toThrow('Se necesitan al menos dos valores conocidos para realizar el cálculo');
  });

  it('debería lanzar error cuando la masa es cero para calcular aceleración', () => {
    expect(() => {
      calculateNewtonSecondLaw('acceleration', {
        force: 20,
        mass: 0
      });
    }).toThrow('La masa no puede ser cero para calcular la aceleración');
  });

  it('debería lanzar error cuando la aceleración es cero para calcular masa', () => {
    expect(() => {
      calculateNewtonSecondLaw('mass', {
        force: 20,
        acceleration: 0
      });
    }).toThrow('La aceleración no puede ser cero para calcular la masa');
  });

  it('debería lanzar error para variable desconocida', () => {
    expect(() => {
      calculateNewtonSecondLaw('unknown', {
        force: 20,
        mass: 10
      });
    }).toThrow('Variable desconocida: unknown');
  });

  it('debería calcular con valores muy pequeños', () => {
    const result = calculateNewtonSecondLaw('force', {
      mass: 0.001, // 1 gramo en kg
      acceleration: 0.001 // muy pequeña aceleración
    });
    
    expect(result.value).toBeCloseTo(0.000001); // 1e-6 N
    expect(result.unit).toBe('N');
  });

  it('debería calcular con valores muy grandes', () => {
    const result = calculateNewtonSecondLaw('acceleration', {
      force: 1000000, // 1 MN en N
      mass: 1000 // 1 tonelada en kg
    });
    
    expect(result.value).toBe(1000); // 1000 m/s²
    expect(result.unit).toBe('m/s²');
  });
});

describe('Casos de uso reales', () => {
  it('debería calcular la fuerza para levantar un objeto (peso)', () => {
    // Fuerza para levantar 5 kg contra la gravedad
    const result = calculateNewtonSecondLaw('force', {
      mass: 5, // kg
      acceleration: 9.8 // gravedad terrestre m/s²
    });
    
    expect(result.value).toBeCloseTo(49); // 5 kg × 9.8 m/s² = 49 N
    expect(result.unit).toBe('N');
  });

  it('debería calcular la masa de un coche que acelera', () => {
    // Un coche que produce 2000 N de fuerza y acelera a 2 m/s²
    const result = calculateNewtonSecondLaw('mass', {
      force: 2000, // N
      acceleration: 2 // m/s²
    });
    
    expect(result.value).toBe(1000); // 2000 N / 2 m/s² = 1000 kg (1 tonelada)
    expect(result.unit).toBe('kg');
  });

  it('debería calcular la aceleración de un proyectil', () => {
    // Un proyectil de 0.5 kg con fuerza aplicada de 100 N
    const result = calculateNewtonSecondLaw('acceleration', {
      force: 100, // N
      mass: 0.5 // kg
    });
    
    expect(result.value).toBe(200); // 100 N / 0.5 kg = 200 m/s²
    expect(result.unit).toBe('m/s²');
  });
});
