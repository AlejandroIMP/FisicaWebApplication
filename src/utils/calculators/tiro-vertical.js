// Versión exportable de las funciones de cálculo del tiro vertical

export const formulas = {
  h_t: [
    {
      label: "h(t) = h₀ + v₀·t – ½·g·t²",
      requiere: ["h0", "v0", "t", "g"],
      func: ({ h0, v0, t, g }) => ({ val: h0 + v0 * t - 0.5 * g * t * t, unit: "m" })
    }
  ],
  v_t: [
    {
      label: "v(t) = v₀ – g·t",
      requiere: ["v0", "t", "g"],
      func: ({ v0, t, g }) => ({ val: v0 - g * t, unit: "m/s" })
    }
  ],
  h_max: [
    {
      label: "h_max = h₀ + v₀² / (2·g)",
      requiere: ["h0", "v0", "g"],
      func: ({ h0, v0, g }) => ({ val: h0 + (v0 ** 2) / (2 * g), unit: "m" })
    },
    {
      label: "h_max = v₀² / (2·g) (si h₀=0)",
      requiere: ["v0", "g"],
      func: ({ v0, g }) => ({ val: (v0 ** 2) / (2 * g), unit: "m" })
    }
  ],
  t_subida: [
    {
      label: "t_subida = v₀ / g",
      requiere: ["v0", "g"],
      func: ({ v0, g }) => ({ val: v0 / g, unit: "s" })
    }
  ],
  t_total: [
    {
      label: "t_total = 2·v₀ / g (si h₀=0)",
      requiere: ["v0", "g"],
      func: ({ v0, g }) => ({ val: 2 * v0 / g, unit: "s" })
    },
    {
      label: "t_total = (v₀ + √(v₀² + 2·g·h₀)) / g",
      requiere: ["v0", "h0", "g"],
      func: ({ v0, h0, g }) => ({ val: (v0 + Math.sqrt(v0 ** 2 + 2 * g * h0)) / g, unit: "s" })
    }
  ],
  v0: [
    {
      label: "v₀ = √(2·g·h_max)",
      requiere: ["g", "h_max"],
      func: ({ g, h_max }) => ({ val: Math.sqrt(2 * g * h_max), unit: "m/s" })
    },
    {
      label: "v₀ = (h – h₀ + ½·g·t²)/t",
      requiere: ["h", "h0", "t", "g"],
      func: ({ h, h0, t, g }) => ({ val: (h - h0 + 0.5 * g * t * t) / t, unit: "m/s" })
    },
    {
      label: "v₀ = g·t + v(t)",
      requiere: ["g", "t", "vt"],
      func: ({ g, t, vt }) => ({ val: g * t + vt, unit: "m/s" })
    }
  ],
  h0: [
    {
      label: "h₀ = h – v₀·t + ½·g·t²",
      requiere: ["h", "v0", "t", "g"],
      func: ({ h, v0, t, g }) => ({ val: h - v0 * t + 0.5 * g * t * t, unit: "m" })
    }
  ],
  g: [
    {
      label: "g = 2·(h – h₀ + v₀·t) / t²",
      requiere: ["h", "h0", "v0", "t"],
      func: ({ h, h0, v0, t }) => ({ val: 2 * (h - h0 + v0 * t) / (t * t), unit: "m/s²" })
    }
  ],
  t: [
    {
      label: "t = v₀ / g",
      requiere: ["v0", "g"],
      func: ({ v0, g }) => ({ val: v0 / g, unit: "s" })
    },
    {
      label: "t = √((2·(h – h₀))/g)",
      requiere: ["h", "h0", "g"],
      func: ({ h, h0, g }) => ({ val: Math.sqrt(2 * (h - h0) / g), unit: "s" })
    }
  ]
};

/**
 * Calcula el resultado para una variable en tiro vertical
 * @param {string} variable - Variable a calcular (h_t, v_t, h_max, etc.)
 * @param {number} formulaIndex - Índice de la fórmula a usar
 * @param {Object} valores - Valores de entrada para el cálculo
 * @returns {Object} Resultado con valor, unidad y éxito
 */
export function calcularTiroVertical(variable, formulaIndex, valores) {
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
      mensaje: "Error en el cálculo: " + error.message 
    };
  }
}
