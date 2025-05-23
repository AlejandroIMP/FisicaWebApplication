import { describe, it, expect } from 'vitest';
import { calcularTiroVertical, formulas } from '../calculators/tiro-vertical';

describe('Calculadora de Tiro Vertical', () => {
  // Tests para el cálculo de la altura en t
  describe('Cálculo de altura en tiempo t (h_t)', () => {
    it('debería calcular correctamente h(t) usando h₀, v₀, t y g', () => {
      const valores = { h0: 10, v0: 15, t: 2, g: 9.8 };
      const resultado = calcularTiroVertical('h_t', 0, valores);
      
      // h(t) = h₀ + v₀·t – ½·g·t² = 10 + 15*2 - 0.5*9.8*2² = 10 + 30 - 19.6 = 20.4
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(20.4);
      expect(resultado.unidad).toBe('m');
      expect(resultado.formulaDescripcion).toBe("h(t) = h₀ + v₀·t – ½·g·t²");
    });

    it('debería retornar error cuando faltan valores requeridos para h_t', () => {
      const valores = { h0: 10, v0: 15, t: 2 }; // Falta g
      const resultado = calcularTiroVertical('h_t', 0, valores);
      
      expect(resultado.exito).toBe(false);
      expect(resultado.valor).toBeNull();
      expect(resultado.mensaje).toContain('Falta el valor');
    });
  });

  // Tests para el cálculo de la velocidad en t
  describe('Cálculo de velocidad en tiempo t (v_t)', () => {
    it('debería calcular correctamente v(t) usando v₀, t y g', () => {
      const valores = { v0: 20, t: 1.5, g: 9.8 };
      const resultado = calcularTiroVertical('v_t', 0, valores);
      
      // v(t) = v₀ – g·t = 20 - 9.8*1.5 = 20 - 14.7 = 5.3
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(5.3);
      expect(resultado.unidad).toBe('m/s');
    });
  });

  // Tests para altura máxima
  describe('Cálculo de altura máxima (h_max)', () => {
    it('debería calcular h_max con h₀, v₀ y g', () => {
      const valores = { h0: 5, v0: 10, g: 9.8 };
      const resultado = calcularTiroVertical('h_max', 0, valores);
      
      // h_max = h₀ + v₀² / (2·g) = 5 + 10² / (2*9.8) = 5 + 100/19.6 = 5 + 5.1 = 10.1
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(10.1, 1);
      expect(resultado.unidad).toBe('m');
    });

    it('debería calcular h_max sólo con v₀ y g (h₀=0)', () => {
      const valores = { v0: 10, g: 9.8 };
      const resultado = calcularTiroVertical('h_max', 1, valores);
      
      // h_max = v₀² / (2·g) = 10² / (2*9.8) = 100/19.6 = 5.1
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(5.1, 1);
      expect(resultado.unidad).toBe('m');
    });
  });

  // Tests para tiempo de subida
  describe('Cálculo de tiempo de subida (t_subida)', () => {
    it('debería calcular el tiempo de subida usando v₀ y g', () => {
      const valores = { v0: 15, g: 9.8 };
      const resultado = calcularTiroVertical('t_subida', 0, valores);
      
      // t_subida = v₀ / g = 15 / 9.8 = 1.53
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(1.53, 2);
      expect(resultado.unidad).toBe('s');
    });
  });

  // Tests para tiempo total
  describe('Cálculo de tiempo total (t_total)', () => {
    it('debería calcular tiempo total con v₀ y g (h₀=0)', () => {
      const valores = { v0: 15, g: 9.8 };
      const resultado = calcularTiroVertical('t_total', 0, valores);
      
      // t_total = 2·v₀ / g = 2*15 / 9.8 = 30/9.8 = 3.06
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(3.06, 2);
      expect(resultado.unidad).toBe('s');
    });

    it('debería calcular tiempo total con v₀, h₀ y g', () => {
      const valores = { v0: 15, h0: 10, g: 9.8 };
      const resultado = calcularTiroVertical('t_total', 1, valores);
      
      // t_total = (v₀ + √(v₀² + 2·g·h₀)) / g
      const esperado = (15 + Math.sqrt(15*15 + 2*9.8*10)) / 9.8;
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(esperado, 2);
      expect(resultado.unidad).toBe('s');
    });
  });

  // Tests para casos de error
  describe('Manejo de errores', () => {
    it('debería manejar variables inválidas', () => {
      const valores = { h0: 10, v0: 15, t: 2, g: 9.8 };
      const resultado = calcularTiroVertical('variable_inexistente', 0, valores);
      
      expect(resultado.exito).toBe(false);
      expect(resultado.mensaje).toContain('no válida');
    });

    it('debería manejar índices de fórmula inválidos', () => {
      const valores = { h0: 10, v0: 15, t: 2, g: 9.8 };
      const resultado = calcularTiroVertical('h_t', 5, valores);
      
      expect(resultado.exito).toBe(false);
      expect(resultado.mensaje).toContain('no válida');
    });
  });
});
