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
  const fi = selectForm.value;
  if (!formulas[key] || fi === "") {
    resultadoDiv.textContent = "Primero selecciona variable y fórmula.";
    return;
  }


  const vals = {
    h: parseFloat(document.getElementById("h")?.value),
    h0: parseFloat(document.getElementById("h0")?.value),
    h_max: parseFloat(document.getElementById("h_max")?.value),
    v0: parseFloat(document.getElementById("v0")?.value),
    vt: parseFloat(document.getElementById("vt")?.value),
    t: parseFloat(document.getElementById("t")?.value),
    g: parseFloat(document.getElementById("g")?.value)
  };

  const { val, unit } = formulas[key][fi].func(vals);
  if (isNaN(val)) {
    resultadoDiv.textContent = "Revisa los datos ingresados.";
  } else {
    resultadoDiv.textContent = `Resultado: ${val.toFixed(2)} ${unit}`;

        // --- ANIMACIÓN AQUÍ ---
    if (key === "h_max") {
      animarTiroVertical("h_max", val, {
        v0: vals.v0,
        h0: vals.h0,
        g: vals.g
      });
    }
    else if (key === "t_subida") {
      animarTiroVertical("t_subida", val, {
        v0: vals.v0,
        h0: vals.h0,
        g: vals.g
      });
    }
    else if (key === "h_t") {
      // Para h(t), “val” es la altura, pero la función espera “tiempo” como segundo argumento
      animarTiroVertical("h_t", vals.t, {
        v0: vals.v0,
        h0: vals.h0,
        g: vals.g
      });
    }
    // Si no es ninguna de las tres fórmulas, no se anima.
  }
}
  /**
 * Animar el proyectil para distintos casos de tiro vertical:
 *  - h_max (sube a la altura máxima y se queda)
 *  - t_subida (sube a la altura máxima en ese tiempo)
 *  - h(t) (sube a la altura h(t) en el tiempo t)
 *
 * @param {string} tipo   - "h_max", "t_subida" o "h_t"
 * @param {number} val    - valor de la variable (h_max en m, t_subida en s, o h en m)
 * @param {object} valores - objeto con v0, h0, g, t (cuando aplique) para cálculos extra
 */
function animarTiroVertical(tipo, val, valores) {
  const proyectil = document.getElementById("proyectil");
  const cont = document.getElementById("animacion-container");

  // Reinicio inmediato:
  proyectil.style.transition = "none";
  proyectil.style.bottom = "0px";
  proyectil.style.opacity = "1";

  // Pequeña pausa para “resetear” posición
  setTimeout(() => {
    // Determinar la posición final en píxeles:
    //  - El contenedor mide 300px de altura total (0 m en bottom hasta “cima” a 300px).
    //  - Para simular “altura en metros” val, lo normalizamos respecto a la altura máxima posible.
    //  - Si el tipo es “h_max” o “t_subida”, la bolita llega al tope (300px).
    //  - Si el tipo es “h_t”, calculamos el factor relativo:
    let píxelesDestino = 0;

    if (tipo === "h_max" || tipo === "t_subida") {
      // Llega al tope del contenedor (cima) = 300px
      píxelesDestino = cont.clientHeight - 30; 
      // (restamos 30px para que la bolita entera quede dentro del contenedor)
    }
    else if (tipo === "h_t") {
      // Necesitamos saber la “altura máxima física” para normalizar:
      // Si valor.h0=0, h_max_físico = (v0^2)/(2g). Si h0 !=0, h_max_físico = h0 + (v0^2)/(2g)
      const { v0, h0, g } = valores;
      let hMaxFisico;
      if (!isNaN(h0) && h0 !== 0) {
        hMaxFisico = h0 + (v0 * v0) / (2 * g);
      } else {
        hMaxFisico = (v0 * v0) / (2 * g);
      }
      // Ahora normalizamos: píxelesDestino = (val / hMaxFisico) * (alto del contenedor - altura de la bola)
      const factor = val / hMaxFisico;
      const alturaCont = cont.clientHeight - 30; 
      píxelesDestino = factor * alturaCont;
      // Si excede contenedor, forzamos tope:
      if (píxelesDestino > alturaCont) píxelesDestino = alturaCont;
    }

    // Determinar duración de la animación:
    //  - Para h_max: podemos hacer 1.5s de subida
    //  - Para t_subida: su valor “val” es precisamente el tiempo, así que lo usamos
    //  - Para h(t): también “val” es tiempo, se mueve en ese tiempo hasta h(t)
    let duracion = 0;
    if (tipo === "h_max") {
      duracion = 1.5; // segundos
    } else if (tipo === "t_subida" || tipo === "h_t") {
      duracion = val; // directamente en segundos
    }

    // Aplicamos transición para “bottom”
    proyectil.style.transition = `bottom ${duracion}s ease-out`;
    proyectil.style.bottom = `${píxelesDestino}px`;

    // Cuando termine la subida, si es h(t) o t_subida, podríamos “mantener” la bolita arriba.
    // Y finalmente, tras 0.5s adicional, la pelota se desvanece:
    setTimeout(() => {
      proyectil.style.transition = `opacity 0.5s ease`;
      proyectil.style.opacity = "0";
    }, (duracion * 1000) + 500);

  }, 100);
}



