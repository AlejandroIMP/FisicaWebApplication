import { describe, it, expect } from 'vitest';
import { calcularTiroParabolico, formulas } from '../calculators/tiro-parabolico';

describe('Calculadora de Tiro Parabólico', () => {
  // Tests para el cálculo de posición en x
  describe('Cálculo de posición en x (x_t)', () => {
    it('debería calcular correctamente x(t) usando v₀, θ y t', () => {
      const valores = { v0: 20, theta: 30, t: 2 };
      const resultado = calcularTiroParabolico('x_t', 0, valores);
      
      // x(t) = v₀·cos(θ)·t = 20*cos(30°)*2 = 20*0.866*2 = 34.64
      const esperado = 20 * Math.cos(30 * Math.PI / 180) * 2;
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(esperado);
      expect(resultado.unidad).toBe('m');
      expect(resultado.formulaDescripcion).toBe("x(t) = v₀·cos(θ)·t");
    });

    it('debería calcular correctamente x(t) usando vₓ y t', () => {
      const valores = { vx: 15, t: 2 };
      const resultado = calcularTiroParabolico('x_t', 1, valores);
      
      // x(t) = vₓ·t = 15*2 = 30
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(30);
      expect(resultado.unidad).toBe('m');
    });

    it('debería retornar error cuando faltan valores requeridos', () => {
      const valores = { v0: 20, t: 2 }; // Falta theta
      const resultado = calcularTiroParabolico('x_t', 0, valores);
      
      expect(resultado.exito).toBe(false);
      expect(resultado.valor).toBeNull();
      expect(resultado.mensaje).toContain('Falta el valor');
    });
  });

  // Tests para el cálculo de posición en y
  describe('Cálculo de posición en y (y_t)', () => {
    it('debería calcular correctamente y(t) usando v₀, θ, t y g', () => {
      const valores = { v0: 20, theta: 30, t: 1, g: 9.8 };
      const resultado = calcularTiroParabolico('y_t', 0, valores);
      
      // y(t) = v₀·sin(θ)·t - ½·g·t² = 20*sin(30°)*1 - 0.5*9.8*1² = 20*0.5 - 4.9 = 10 - 4.9 = 5.1
      const esperado = 20 * Math.sin(30 * Math.PI / 180) * 1 - 0.5 * 9.8 * 1;
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(esperado);
      expect(resultado.unidad).toBe('m');
    });
  });

  // Tests para el cálculo de velocidad en x
  describe('Cálculo de velocidad en x (vx)', () => {
    it('debería calcular correctamente vₓ usando v₀ y θ', () => {
      const valores = { v0: 20, theta: 30 };
      const resultado = calcularTiroParabolico('vx', 0, valores);
      
      // vₓ = v₀·cos(θ) = 20*cos(30°) = 20*0.866 = 17.32
      const esperado = 20 * Math.cos(30 * Math.PI / 180);
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(esperado);
      expect(resultado.unidad).toBe('m/s');
    });
  });

  // Tests para casos de error
  describe('Manejo de errores', () => {
    it('debería manejar variables inválidas', () => {
      const valores = { v0: 20, theta: 30, t: 2 };
      const resultado = calcularTiroParabolico('variable_inexistente', 0, valores);
      
      expect(resultado.exito).toBe(false);
      expect(resultado.mensaje).toContain('no válida');
    });

    it('debería manejar índices de fórmula inválidos', () => {
      const valores = { v0: 20, theta: 30, t: 2 };
      const resultado = calcularTiroParabolico('x_t', 5, valores);
      
      expect(resultado.exito).toBe(false);
      expect(resultado.mensaje).toContain('no válida');
    });
  });
});
