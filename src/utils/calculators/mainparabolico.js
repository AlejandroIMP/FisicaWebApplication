// Definir las fórmulas para cálculos de tiro parabólico
const formulas = {
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

// Elementos del DOM
const selectVar = document.getElementById("selectVariable");
const selectForm = document.getElementById("selectFormula");
const inputsCont = document.getElementById("inputs");
const resultadoDiv = document.getElementById("resultado");

// Evento de cambio en el selector de variables
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

// Evento de cambio en el selector de fórmulas
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

// Función para ocultar todos los inputs
function ocultarTodosInputs() {
  Array.from(inputsCont.children).forEach(div => div.style.display = "none");
}

// Función que se llama al hacer clic en el botón calcular
function calcular() {
  const key = selectVar.value;
  const fi = parseInt(selectForm.value);
  
  if (!formulas[key] || isNaN(fi)) {
    resultadoDiv.textContent = "Primero selecciona variable y fórmula.";
    resultadoDiv.style.display = "block";
    return;
  }
  
  const vals = {
    x: parseFloat(document.getElementById("x")?.value),
    y: parseFloat(document.getElementById("y")?.value),
    v0: parseFloat(document.getElementById("v0")?.value),
    vx: parseFloat(document.getElementById("vx")?.value),
    vy: parseFloat(document.getElementById("vy")?.value),
    v0x: parseFloat(document.getElementById("v0x")?.value),
    v0y: parseFloat(document.getElementById("v0y")?.value),
    theta: parseFloat(document.getElementById("theta")?.value),
    t: parseFloat(document.getElementById("t")?.value),
    g: parseFloat(document.getElementById("g")?.value) || 9.8
  };
  
  try {
    const { val, unit } = formulas[key][fi].func(vals);
    
    resultadoDiv.style.display = "block";
    resultadoDiv.style.color = "#111827"; // Color fijo para asegurar visibilidad
    if (isNaN(val)) {
      resultadoDiv.innerHTML = '<span class="tiro-resultado-text">Revisa los datos ingresados.</span>';
    } else {
      resultadoDiv.innerHTML = `<span class="tiro-resultado-text">${val.toFixed(2)} ${unit}</span>`;
    }
  } catch (error) {
    resultadoDiv.innerHTML = `<span class="tiro-resultado-text">Error en el cálculo: ${error.message}</span>`;
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
