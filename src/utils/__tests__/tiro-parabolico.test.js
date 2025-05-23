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

    it('debería calcular correctamente y(t) usando vᵧ, t y g', () => {
      const valores = { vy: 10, t: 1, g: 9.8 };
      const resultado = calcularTiroParabolico('y_t', 1, valores);
      
      // y(t) = vᵧ·t - ½·g·t² = 10*1 - 0.5*9.8*1² = 10 - 4.9 = 5.1
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(5.1);
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

  // Tests para el cálculo de velocidad en y
  describe('Cálculo de velocidad en y (vy_t)', () => {
    it('debería calcular correctamente vᵧ(t) usando v₀, θ, t y g', () => {
      const valores = { v0: 20, theta: 30, t: 1, g: 9.8 };
      const resultado = calcularTiroParabolico('vy_t', 0, valores);
      
      // vᵧ(t) = v₀·sin(θ) - g·t = 20*sin(30°) - 9.8*1 = 20*0.5 - 9.8 = 10 - 9.8 = 0.2
      const esperado = 20 * Math.sin(30 * Math.PI / 180) - 9.8 * 1;
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(esperado);
      expect(resultado.unidad).toBe('m/s');
    });
  });

  // Tests para el cálculo de velocidad total
  describe('Cálculo de velocidad total (v_t)', () => {
    it('debería calcular correctamente v(t) usando vₓ y vᵧ', () => {
      const valores = { vx: 10, vy: 5 };
      const resultado = calcularTiroParabolico('v_t', 0, valores);
      
      // v(t) = √(vₓ² + vᵧ(t)²) = √(10² + 5²) = √(100 + 25) = √125 = 11.18
      const esperado = Math.sqrt(10*10 + 5*5);
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(esperado);
      expect(resultado.unidad).toBe('m/s');
    });
  });

  // Tests para el cálculo del ángulo
  describe('Cálculo del ángulo (theta)', () => {
    it('debería calcular correctamente θ usando vᵧ y vₓ', () => {
      const valores = { vy: 10, vx: 10 };
      const resultado = calcularTiroParabolico('theta', 0, valores);
      
      // θ = arctan(vᵧ / vₓ) = arctan(10 / 10) = arctan(1) = 45°
      const esperado = Math.atan(1) * 180 / Math.PI;
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(esperado);
      expect(resultado.unidad).toBe('°');
    });
  });

  // Tests para el cálculo de altura máxima
  describe('Cálculo de altura máxima (y_max)', () => {
    it('debería calcular correctamente y_max usando v₀, θ y g', () => {
      const valores = { v0: 20, theta: 30, g: 9.8 };
      const resultado = calcularTiroParabolico('y_max', 0, valores);
      
      // y_max = v₀²·sin²(θ) / (2·g)
      const sin2 = Math.sin(30 * Math.PI / 180) ** 2;
      const esperado = (20 * 20 * sin2) / (2 * 9.8);
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(esperado);
      expect(resultado.unidad).toBe('m');
    });

    it('debería calcular correctamente y_max usando vᵧ y g', () => {
      const valores = { vy: 10, g: 9.8 };
      const resultado = calcularTiroParabolico('y_max', 1, valores);
      
      // y_max = vᵧ² / (2·g) = 10² / (2*9.8) = 100/19.6 = 5.1
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(5.1, 1);
      expect(resultado.unidad).toBe('m');
    });
  });

  // Tests para el cálculo del tiempo de subida
  describe('Cálculo de tiempo de subida (t_subida)', () => {
    it('debería calcular correctamente t_subida usando v₀, θ y g', () => {
      const valores = { v0: 20, theta: 30, g: 9.8 };
      const resultado = calcularTiroParabolico('t_subida', 0, valores);
      
      // t_subida = v₀·sin(θ) / g = 20*sin(30°) / 9.8 = 20*0.5 / 9.8 = 10/9.8 = 1.02
      const esperado = 20 * Math.sin(30 * Math.PI / 180) / 9.8;
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(esperado);
      expect(resultado.unidad).toBe('s');
    });
  });

  // Tests para el cálculo del tiempo total
  describe('Cálculo de tiempo total (t_total)', () => {
    it('debería calcular correctamente t_total usando v₀, θ y g', () => {
      const valores = { v0: 20, theta: 30, g: 9.8 };
      const resultado = calcularTiroParabolico('t_total', 0, valores);
      
      // t_total = 2·v₀·sin(θ) / g = 2*20*sin(30°) / 9.8 = 2*20*0.5 / 9.8 = 20/9.8 = 2.04
      const esperado = 2 * 20 * Math.sin(30 * Math.PI / 180) / 9.8;
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(esperado);
      expect(resultado.unidad).toBe('s');
    });

    it('debería calcular correctamente t_total usando vᵧ y g', () => {
      const valores = { vy: 10, g: 9.8 };
      const resultado = calcularTiroParabolico('t_total', 1, valores);
      
      // t_total = 2·vᵧ / g = 2*10 / 9.8 = 20/9.8 = 2.04
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(2.04, 2);
      expect(resultado.unidad).toBe('s');
    });
  });

  // Tests para el cálculo del alcance horizontal
  describe('Cálculo del alcance horizontal (R)', () => {
    it('debería calcular correctamente R usando v₀, θ y g', () => {
      const valores = { v0: 20, theta: 45, g: 9.8 };
      const resultado = calcularTiroParabolico('R', 0, valores);
      
      // R = v₀²·sin(2θ) / g = 20²*sin(90°) / 9.8 = 400*1 / 9.8 = 400/9.8 = 40.82
      const esperado = (20 * 20 * Math.sin(2 * 45 * Math.PI / 180)) / 9.8;
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(esperado);
      expect(resultado.unidad).toBe('m');
    });

    it('debería calcular correctamente R usando vₓ y t', () => {
      const valores = { vx: 15, t: 2 };
      const resultado = calcularTiroParabolico('R', 1, valores);
      
      // R = vₓ · t_total = 15*2 = 30
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(30);
      expect(resultado.unidad).toBe('m');
    });
  });

  // Tests para el cálculo de la velocidad inicial
  describe('Cálculo de la velocidad inicial (v0)', () => {
    it('debería calcular correctamente v₀ usando v₀ₓ y v₀ᵧ', () => {
      const valores = { v0x: 10, v0y: 10 };
      const resultado = calcularTiroParabolico('v0', 0, valores);
      
      // v₀ = √(v₀ₓ² + v₀ᵧ²) = √(10² + 10²) = √(100 + 100) = √200 = 14.14
      const esperado = Math.sqrt(10*10 + 10*10);
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(esperado);
      expect(resultado.unidad).toBe('m/s');
    });
  });

  // Tests para el cálculo de v0x
  describe('Cálculo de la componente horizontal de v₀ (v0x)', () => {
    it('debería calcular correctamente v₀ₓ usando v₀ y θ', () => {
      const valores = { v0: 20, theta: 30 };
      const resultado = calcularTiroParabolico('v0x', 0, valores);
      
      // v₀ₓ = v₀·cos(θ) = 20*cos(30°) = 20*0.866 = 17.32
      const esperado = 20 * Math.cos(30 * Math.PI / 180);
      expect(resultado.exito).toBe(true);
      expect(resultado.valor).toBeCloseTo(esperado);
      expect(resultado.unidad).toBe('m/s');
    });
  });

  // Tests para el cálculo de v0y
  describe('Cálculo de la componente vertical de v₀ (v0y)', () => {
    it('debería calcular correctamente v₀ᵧ usando v₀ y θ', () => {
      const valores = { v0: 20, theta: 30 };
      const resultado = calcularTiroParabolico('v0y', 0, valores);
      
      // v₀ᵧ = v₀·sin(θ) = 20*sin(30°) = 20*0.5 = 10
      const esperado = 20 * Math.sin(30 * Math.PI / 180);
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
