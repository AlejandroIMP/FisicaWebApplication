import { describe, it, expect } from 'vitest';
import { calculateNewtonAdvanced } from '../calculators/newton-advanced-calculator';

describe('Newton Advanced Calculator', () => {
  describe('Fuerza Resultante', () => {
    it('debería calcular la fuerza a partir de masa y aceleración', () => {
      const result = calculateNewtonAdvanced('force', [
        { variable: 'mass', value: 10, unit: 'kg' },
        { variable: 'acceleration', value: 5, unit: 'm/s²' }
      ]);

      expect(result.success).toBe(true);
      expect(result.result).toBe(50);
      expect(result.formula).toBe('F = m × a');
    });

    it('debería calcular la fuerza a partir de componentes', () => {
      const result = calculateNewtonAdvanced('force', [
        { variable: 'forceX', value: 30, unit: 'N' },
        { variable: 'forceY', value: 40, unit: 'N' }
      ]);

      expect(result.success).toBe(true);
      expect(result.result).toBe(50);
      expect(result.formula).toBe('F = √(Fx² + Fy²)');
    });

    it('debería manejar unidades diferentes correctamente', () => {
      const result = calculateNewtonAdvanced('force', [
        { variable: 'mass', value: 2000, unit: 'g' },
        { variable: 'acceleration', value: 5, unit: 'm/s²' }
      ]);

      expect(result.success).toBe(true);
      expect(result.result).toBe(10); // 2 kg × 5 m/s² = 10 N
    });
  });

  describe('Componentes de Fuerza', () => {
    it('debería calcular la componente X de la fuerza', () => {
      const result = calculateNewtonAdvanced('forceX', [
        { variable: 'force', value: 100, unit: 'N' },
        { variable: 'angle', value: 30, unit: 'deg' }
      ]);

      expect(result.success).toBe(true);
      expect(result.result).toBeCloseTo(86.603, 2); // 100 * cos(30°)
      expect(result.formula).toBe('Fx = F × cos(θ)');
    });

    it('debería calcular la componente Y de la fuerza', () => {
      const result = calculateNewtonAdvanced('forceY', [
        { variable: 'force', value: 100, unit: 'N' },
        { variable: 'angle', value: 30, unit: 'deg' }
      ]);

      expect(result.success).toBe(true);
      expect(result.result).toBeCloseTo(50, 2); // 100 * sin(30°)
      expect(result.formula).toBe('Fy = F × sin(θ)');
    });

    it('debería calcular componente X a partir de masa y aceleración', () => {
      const result = calculateNewtonAdvanced('forceX', [
        { variable: 'mass', value: 5, unit: 'kg' },
        { variable: 'accelerationX', value: 4, unit: 'm/s²' }
      ]);

      expect(result.success).toBe(true);
      expect(result.result).toBe(20);
      expect(result.formula).toBe('Fx = m × ax');
    });
  });

  describe('Aceleraciones', () => {
    it('debería calcular la aceleración resultante', () => {
      const result = calculateNewtonAdvanced('acceleration', [
        { variable: 'force', value: 100, unit: 'N' },
        { variable: 'mass', value: 10, unit: 'kg' }
      ]);

      expect(result.success).toBe(true);
      expect(result.result).toBe(10);
      expect(result.formula).toBe('a = F / m');
    });

    it('debería calcular aceleración a partir de componentes', () => {
      const result = calculateNewtonAdvanced('acceleration', [
        { variable: 'accelerationX', value: 3, unit: 'm/s²' },
        { variable: 'accelerationY', value: 4, unit: 'm/s²' }
      ]);

      expect(result.success).toBe(true);
      expect(result.result).toBe(5); // √(3² + 4²) = 5
      expect(result.formula).toBe('a = √(ax² + ay²)');
    });

    it('debería calcular aceleración en X', () => {
      const result = calculateNewtonAdvanced('accelerationX', [
        { variable: 'forceX', value: 20, unit: 'N' },
        { variable: 'mass', value: 4, unit: 'kg' }
      ]);

      expect(result.success).toBe(true);
      expect(result.result).toBe(5);
      expect(result.formula).toBe('ax = Fx / m');
    });
  });

  describe('Ángulo', () => {
    it('debería calcular el ángulo de la fuerza resultante', () => {
      const result = calculateNewtonAdvanced('angle', [
        { variable: 'forceX', value: 10, unit: 'N' },
        { variable: 'forceY', value: 10, unit: 'N' }
      ]);

      expect(result.success).toBe(true);
      expect(result.result).toBeCloseTo(45, 1); // arctan(10/10) = 45°
      expect(result.formula).toBe('θ = arctan(Fy / Fx)');
    });

    it('debería manejar error cuando Fx es cero', () => {
      const result = calculateNewtonAdvanced('angle', [
        { variable: 'forceX', value: 0, unit: 'N' },
        { variable: 'forceY', value: 10, unit: 'N' }
      ]);

      expect(result.success).toBe(false);
      expect(result.error).toContain('La componente X no puede ser cero');
    });
  });

  describe('Fricción', () => {
    it('debería calcular la fuerza de fricción', () => {
      const result = calculateNewtonAdvanced('frictionForce', [
        { variable: 'frictionCoefficient', value: 0.3, unit: 'dimensionless' },
        { variable: 'normalForce', value: 100, unit: 'N' }
      ]);

      expect(result.success).toBe(true);
      expect(result.result).toBe(30);
      expect(result.formula).toBe('Ff = μ × N');
    });

    it('debería calcular la fuerza normal', () => {
      const result = calculateNewtonAdvanced('normalForce', [
        { variable: 'mass', value: 10, unit: 'kg' }
      ]);

      expect(result.success).toBe(true);
      expect(result.result).toBeCloseTo(98.1, 1); // 10 × 9.81
      expect(result.formula).toBe('N = m × g');
    });

    it('debería calcular la fuerza normal en plano inclinado', () => {
      const result = calculateNewtonAdvanced('normalForce', [
        { variable: 'mass', value: 10, unit: 'kg' },
        { variable: 'angle', value: 30, unit: 'deg' }
      ]);

      expect(result.success).toBe(true);
      expect(result.result).toBeCloseTo(84.95, 1); // 10 × 9.81 × cos(30°)
      expect(result.formula).toBe('N = m × g × cos(θ)');
    });

    it('debería calcular el coeficiente de fricción', () => {
      const result = calculateNewtonAdvanced('frictionCoefficient', [
        { variable: 'frictionForce', value: 30, unit: 'N' },
        { variable: 'normalForce', value: 100, unit: 'N' }
      ]);

      expect(result.success).toBe(true);
      expect(result.result).toBe(0.3);
      expect(result.formula).toBe('μ = Ff / N');
    });

    it('debería calcular la fuerza aplicada', () => {
      const result = calculateNewtonAdvanced('appliedForce', [
        { variable: 'frictionForce', value: 20, unit: 'N' },
        { variable: 'mass', value: 5, unit: 'kg' },
        { variable: 'acceleration', value: 4, unit: 'm/s²' }
      ]);

      expect(result.success).toBe(true);
      expect(result.result).toBe(40); // 5×4 + 20 = 40
      expect(result.formula).toBe('Fap = m × a + Ff');
    });
  });

  describe('Manejo de Errores', () => {
    it('debería manejar masa cero', () => {
      const result = calculateNewtonAdvanced('acceleration', [
        { variable: 'force', value: 100, unit: 'N' },
        { variable: 'mass', value: 0, unit: 'kg' }
      ]);

      expect(result.success).toBe(false);
      expect(result.error).toContain('La masa no puede ser cero');
    });

    it('debería manejar valores no numéricos', () => {
      const result = calculateNewtonAdvanced('force', [
        { variable: 'mass', value: 'abc', unit: 'kg' },
        { variable: 'acceleration', value: 5, unit: 'm/s²' }
      ]);

      expect(result.success).toBe(false);
      expect(result.error).toContain('no es un número válido');
    });

    it('debería manejar datos insuficientes', () => {
      const result = calculateNewtonAdvanced('force', [
        { variable: 'mass', value: 10, unit: 'kg' }
      ]);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Datos insuficientes');
    });

    it('debería manejar variable no reconocida', () => {
      const result = calculateNewtonAdvanced('invalidVariable', [
        { variable: 'mass', value: 10, unit: 'kg' },
        { variable: 'acceleration', value: 5, unit: 'm/s²' }
      ]);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Variable no reconocida');
    });
  });

  describe('Casos Reales Avanzados', () => {
    it('debería resolver problema con plano inclinado y fricción', () => {
      // Masa de 10 kg en plano inclinado 30°, μ = 0.2
      // Calcular fuerza normal
      const normalResult = calculateNewtonAdvanced('normalForce', [
        { variable: 'mass', value: 10, unit: 'kg' },
        { variable: 'angle', value: 30, unit: 'deg' }
      ]);

      expect(normalResult.success).toBe(true);
      
      // Calcular fuerza de fricción
      const frictionResult = calculateNewtonAdvanced('frictionForce', [
        { variable: 'frictionCoefficient', value: 0.2, unit: 'dimensionless' },
        { variable: 'normalForce', value: normalResult.result!, unit: 'N' }
      ]);

      expect(frictionResult.success).toBe(true);
      expect(frictionResult.result).toBeCloseTo(16.99, 1);
    });

    it('debería resolver sistema de fuerzas bidimensional', () => {
      // Fuerza de 50N a 37° y fuerza de 30N a 90°
      const fx1Result = calculateNewtonAdvanced('forceX', [
        { variable: 'force', value: 50, unit: 'N' },
        { variable: 'angle', value: 37, unit: 'deg' }
      ]);

      const fy1Result = calculateNewtonAdvanced('forceY', [
        { variable: 'force', value: 50, unit: 'N' },
        { variable: 'angle', value: 37, unit: 'deg' }
      ]);

      expect(fx1Result.success).toBe(true);
      expect(fy1Result.success).toBe(true);
      expect(fx1Result.result).toBeCloseTo(39.9, 1);
      expect(fy1Result.result).toBeCloseTo(30.1, 1);
    });
  });
});