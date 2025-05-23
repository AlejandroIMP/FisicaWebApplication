// Versión exportable de las funciones de cálculo del tiro parabólico

export interface FormulaResult {
  val: number;
  unit: string;
}

export interface Formula {
  label: string;
  requiere: string[];
  func: (values: Record<string, number>) => FormulaResult;
}

export interface CalculationResult {
  valor: number | null;
  unidad: string | null;
  exito: boolean;
  mensaje: string | null;
  formulaDescripcion?: string;
}

export const formulas: Record<string, Formula[]> = {
  x_t: [
    {
      label: "x(t) = v₀·cos(θ)·t",
      requiere: ["v0", "theta", "t"],
      func: ({ v0, theta, t }) => ({ val: v0 * Math.cos(theta * Math.PI / 180) * t, unit: "m" })
    },
    {
      label: "x(t) = vₓ·t",
      requiere: ["vx", "t"],
      func: ({ vx, t }) => ({ val: vx * t, unit: "m" })
    }
  ],
  y_t: [
    {
      label: "y(t) = v₀·sin(θ)·t - ½·g·t²",
      requiere: ["v0", "theta", "t", "g"],
      func: ({ v0, theta, t, g }) => ({ val: v0 * Math.sin(theta * Math.PI / 180) * t - 0.5 * g * t * t, unit: "m" })
    },
    {
      label: "y(t) = vᵧ·t - ½·g·t²",
      requiere: ["vy", "t", "g"],
      func: ({ vy, t, g }) => ({ val: vy * t - 0.5 * g * t * t, unit: "m" })
    }
  ],
  vx: [
    {
      label: "vₓ = v₀·cos(θ)",
      requiere: ["v0", "theta"],
      func: ({ v0, theta }) => ({ val: v0 * Math.cos(theta * Math.PI / 180), unit: "m/s" })
    }
  ],
  vy_t: [
    {
      label: "vᵧ(t) = v₀·sin(θ) - g·t",
      requiere: ["v0", "theta", "t", "g"],
      func: ({ v0, theta, t, g }) => ({ val: v0 * Math.sin(theta * Math.PI / 180) - g * t, unit: "m/s" })
    }
  ],
  v_t: [
    {
      label: "v(t) = √(vₓ² + vᵧ(t)²)",
      requiere: ["vx", "vy"],
      func: ({ vx, vy }) => ({ val: Math.sqrt(vx * vx + vy * vy), unit: "m/s" })
    }
  ],
  theta: [
    {
      label: "θ = arctan(vᵧ / vₓ)",
      requiere: ["vy", "vx"],
      func: ({ vy, vx }) => ({ val: Math.atan(vy / vx) * 180 / Math.PI, unit: "°" })
    }
  ],
  y_max: [
    {
      label: "y_max = v₀²·sin²(θ) / (2·g)",
      requiere: ["v0", "theta", "g"],
      func: ({ v0, theta, g }) => {
        const sin2 = Math.sin(theta * Math.PI / 180) ** 2;
        return { val: (v0 * v0 * sin2) / (2 * g), unit: "m" };
      }
    },
    {
      label: "y_max = vᵧ² / (2·g)",
      requiere: ["vy", "g"],
      func: ({ vy, g }) => ({ val: (vy * vy) / (2 * g), unit: "m" })
    }
  ],
  t_subida: [
    {
      label: "t_subida = v₀·sin(θ) / g",
      requiere: ["v0", "theta", "g"],
      func: ({ v0, theta, g }) => ({ val: v0 * Math.sin(theta * Math.PI / 180) / g, unit: "s" })
    }
  ],
  t_total: [
    {
      label: "t_total = 2·v₀·sin(θ) / g",
      requiere: ["v0", "theta", "g"],
      func: ({ v0, theta, g }) => ({ val: 2 * v0 * Math.sin(theta * Math.PI / 180) / g, unit: "s" })
    },
    {
      label: "t_total = 2·vᵧ / g",
      requiere: ["vy", "g"],
      func: ({ vy, g }) => ({ val: 2 * vy / g, unit: "s" })
    }
  ],
  R: [
    {
      label: "R = v₀²·sin(2θ) / g",
      requiere: ["v0", "theta", "g"],
      func: ({ v0, theta, g }) => ({ val: (v0 * v0 * Math.sin(2 * theta * Math.PI / 180)) / g, unit: "m" })
    },
    {
      label: "R = vₓ · t_total",
      requiere: ["vx", "t"],
      func: ({ vx, t }) => ({ val: vx * t, unit: "m" })
    }
  ],
  v0: [
    {
      label: "v₀ = √(v₀ₓ² + v₀ᵧ²)",
      requiere: ["v0x", "v0y"],
      func: ({ v0x, v0y }) => ({ val: Math.sqrt(v0x * v0x + v0y * v0y), unit: "m/s" })
    }
  ],
  v0x: [
    {
      label: "v₀ₓ = v₀·cos(θ)",
      requiere: ["v0", "theta"],
      func: ({ v0, theta }) => ({ val: v0 * Math.cos(theta * Math.PI / 180), unit: "m/s" })
    }
  ],
  v0y: [
    {
      label: "v₀ᵧ = v₀·sin(θ)",
      requiere: ["v0", "theta"],
      func: ({ v0, theta }) => ({ val: v0 * Math.sin(theta * Math.PI / 180), unit: "m/s" })
    }
  ]
};

/**
 * Calcula el resultado para una variable en tiro parabólico
 * @param {string} variable - Variable a calcular (x_t, y_t, vx, etc.)
 * @param {number} formulaIndex - Índice de la fórmula a usar
 * @param {Object} valores - Valores de entrada para el cálculo
 * @returns {Object} Resultado con valor, unidad y éxito
 */
export function calcularTiroParabolico(variable: string, formulaIndex: number, valores: Record<string, number>): CalculationResult {
  if (!formulas[variable] || formulaIndex < 0 || formulaIndex >= formulas[variable].length) {
    return { 
      valor: null, 
      unidad: null, 
      exito: false, 
      mensaje: "Fórmula o variable no válida" 
    };
  }

  const formula = formulas[variable][formulaIndex];
  const requiere = formula.requiere;
  
  // Verificar que todos los valores requeridos estén presentes
  for (const param of requiere) {
    if (valores[param] === undefined || isNaN(valores[param])) {
      return { 
        valor: null, 
        unidad: null, 
        exito: false, 
        mensaje: `Falta el valor para ${param}` 
      };
    }
  }

  try {
    const resultado = formula.func(valores);
    return {
      valor: resultado.val,
      unidad: resultado.unit,
      exito: true,
      mensaje: null,
      formulaDescripcion: formula.label
    };
  } catch (error) {
    return { 
      valor: null, 
      unidad: null, 
      exito: false, 
      mensaje: "Error en el cálculo: " + (error instanceof Error ? error.message : String(error))
    };
  }
}
