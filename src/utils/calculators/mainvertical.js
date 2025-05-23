
// Definir las fórmulas para cálculos de tiro vertical
const formulas = {
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

// Elementos del DOM
const selectVar = document.getElementById("selectVariable");
const selectForm = document.getElementById("selectFormula");
const inputsCont = document.getElementById("inputs");
const resultadoDiv = document.getElementById("resultado");

selectVar.addEventListener("change", () => {
  const key = selectVar.value;
  selectForm.innerHTML = "<option value=''>-- Selecciona fórmula --</option>";
  resultadoDiv.textContent = "";
  if (formulas[key]) {
    formulas[key].forEach((f, i) => {
      const o = document.createElement("option");
      o.value = i;
      o.textContent = f.label;
      selectForm.appendChild(o);
    });
  }
  ocultarTodosInputs();
});

selectForm.addEventListener("change", () => {
  ocultarTodosInputs();
  resultadoDiv.textContent = "";
  const key = selectVar.value;
  const fi = selectForm.value;
  if (fi === "" || !formulas[key]) return;
  const requiere = formulas[key][fi].requiere;
  requiere.forEach(id => {
    const div = inputsCont.querySelector(`[data-key="${id}"]`);
    if (div) div.style.display = "block";
  });
});

function ocultarTodosInputs() {
  Array.from(inputsCont.children).forEach(div => div.style.display = "none");
}

function calcular() {
  const key = selectVar.value;
  const fi = parseInt(selectForm.value);
  
  if (!formulas[key] || isNaN(fi)) {
    resultadoDiv.textContent = "Primero selecciona variable y fórmula.";
    resultadoDiv.style.display = "block";
    return;
  }

  const vals = {
    h: parseFloat(document.getElementById("h")?.value),
    h0: parseFloat(document.getElementById("h0")?.value),
    h_max: parseFloat(document.getElementById("h_max")?.value),
    v0: parseFloat(document.getElementById("v0")?.value),
    vt: parseFloat(document.getElementById("vt")?.value),
    t: parseFloat(document.getElementById("t")?.value),
    g: parseFloat(document.getElementById("g")?.value) || 9.8
  };  try {
    const { val, unit } = formulas[key][fi].func(vals);
      resultadoDiv.style.display = "block";
    resultadoDiv.style.color = "#111827"; // Color fijo para asegurar visibilidad
    if (isNaN(val)) {
      resultadoDiv.innerHTML = '<span class="tiro-resultado-text">Revisa los datos ingresados.</span>';
    } else {
      resultadoDiv.innerHTML = `<span class="tiro-resultado-text">${val.toFixed(2)} ${unit}</span>`;
    }
  } catch (error) {    resultadoDiv.innerHTML = `<span class="tiro-resultado-text">Error en el cálculo: ${error.message}</span>`;
    resultadoDiv.style.display = "block";
    resultadoDiv.style.color = "#111827";
  }
}

// Exponer la función calcular globalmente
window.calcular = calcular;

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
  // Verificar si los elementos existen
  if (!selectVar || !selectForm || !inputsCont || !resultadoDiv) {
    console.error('Algunos elementos del DOM no se pudieron encontrar');
    return;
  }
  
  // Inicializar los campos ocultos
  ocultarTodosInputs();
});
