  // Mostrar sección MRU o MRUV
  function mostrarSeccion(valor) {
    document.getElementById('seccion_mru').style.display = 'none';
    document.getElementById('seccion_mruv').style.display = 'none';
    if (valor === 'mru') {
      document.getElementById('seccion_mru').style.display = 'block';
    }
    if (valor === 'mruv') {
      document.getElementById('seccion_mruv').style.display = 'block';
    }
    limpiarResultados();
  }

  function limpiarResultados() {
    document.getElementById('resultado_mru').textContent = '';
    document.getElementById('resultado_mruv').textContent = '';
  }

  // MRU: Mostrar campos según variable a calcular
  function mostrarCamposMRU() {
    const opcion = document.getElementById('mru_opcion').value;
    let html = '';
    if (opcion === 'x') {
      html = `
        <label>Posición inicial (x₀): <input type="number" id="mru_x0" /></label>
        <label>Velocidad (v): <input type="number" id="mru_v" /></label>
        <label>Tiempo (t): <input type="number" id="mru_t" /></label>
      `;
    } else if (opcion === 'v') {
      html = `
        <label>Posición inicial (x₀): <input type="number" id="mru_x0" /></label>
        <label>Posición final (x): <input type="number" id="mru_x" /></label>
        <label>Tiempo (t): <input type="number" id="mru_t" /></label>
      `;
    } else if (opcion === 't') {
      html = `
        <label>Posición inicial (x₀): <input type="number" id="mru_x0" /></label>
        <label>Posición final (x): <input type="number" id="mru_x" /></label>
        <label>Velocidad (v): <input type="number" id="mru_v" /></label>
      `;
    } else if (opcion === 'x0') {
      html = `
        <label>Posición final (x): <input type="number" id="mru_x" /></label>
        <label>Velocidad (v): <input type="number" id="mru_v" /></label>
        <label>Tiempo (t): <input type="number" id="mru_t" /></label>
      `;
    }
    document.getElementById('mru_campos').innerHTML = html;
    limpiarResultados();
  }

  // Calcular MRU
  function calcularMRU() {
    const opcion = document.getElementById('mru_opcion').value;
    const x = parseFloat(document.getElementById('mru_x')?.value);
    const x0 = parseFloat(document.getElementById('mru_x0')?.value);
    const v = parseFloat(document.getElementById('mru_v')?.value);
    const t = parseFloat(document.getElementById('mru_t')?.value);
    let resultado = '';

    if (opcion === 'x' && !isNaN(x0) && !isNaN(v) && !isNaN(t)) {
      resultado = `Posición final: ${x0 + v * t} m`;
    } else if (opcion === 'v' && !isNaN(x0) && !isNaN(x) && !isNaN(t)) {
      resultado = `Velocidad: ${(x - x0) / t} m/s`;
    } else if (opcion === 't' && !isNaN(x0) && !isNaN(x) && !isNaN(v)) {
      resultado = `Tiempo: ${(x - x0) / v} s`;
    } else if (opcion === 'x0' && !isNaN(x) && !isNaN(v) && !isNaN(t)) {
      resultado = `Posición inicial: ${x - v * t} m`;
    }
    document.getElementById('resultado_mru').textContent = resultado;

    if (opcion === 'x' && !isNaN(x0) && !isNaN(v) && !isNaN(t)) {
      const valor = x0 + v * t;
      resultado = `Posición final: ${valor} m`;
      simularMovimiento(valor - x0);
    }

  }

  // MRUV: Variables y fórmulas disponibles
  const formulas = {
    f1: { // x = x0 + v0 t + 1/2 a t^2
      name: "x = x₀ + v₀ t + ½ a t²",
      variables: ['x', 'x0', 'v0', 'a', 't'],
      calc: {
        x: vals => vals.x0 + vals.v0 * vals.t + 0.5 * vals.a * vals.t * vals.t,
        x0: vals => vals.x - vals.v0 * vals.t - 0.5 * vals.a * vals.t * vals.t,
        v0: vals => (vals.x - vals.x0 - 0.5 * vals.a * vals.t * vals.t) / vals.t,
        a: vals => 2 * (vals.x - vals.x0 - vals.v0 * vals.t) / (vals.t * vals.t),
        t: vals => {
          // t cuadrático: a t^2 + b t + c = 0
          // 0.5 a t^2 + v0 t + (x0 - x) = 0
          const A = 0.5 * vals.a;
          const B = vals.v0;
          const C = vals.x0 - vals.x;
          const discriminante = B*B - 4*A*C;
          if (discriminante < 0) return NaN;
          const t1 = (-B + Math.sqrt(discriminante)) / (2*A);
          const t2 = (-B - Math.sqrt(discriminante)) / (2*A);
          // Devolver el t positivo
          return t1 >= 0 ? t1 : (t2 >= 0 ? t2 : NaN);
        }
      }
    },
    f2: { // v_f = v0 + a t
      name: "v_f = v₀ + a t",
      variables: ['vf', 'v0', 'a', 't'],
      calc: {
        vf: vals => vals.v0 + vals.a * vals.t,
        v0: vals => vals.vf - vals.a * vals.t,
        a: vals => (vals.vf - vals.v0) / vals.t,
        t: vals => (vals.vf - vals.v0) / vals.a
      }
    },
    f3: { // v_f² = v0² + 2 a d
      name: "v_f² = v₀² + 2 a d",
      variables: ['vf', 'v0', 'a', 'd'],
      calc: {
        vf: vals => Math.sqrt(vals.v0*vals.v0 + 2 * vals.a * vals.d),
        v0: vals => Math.sqrt(vals.vf*vals.vf - 2 * vals.a * vals.d),
        a: vals => (vals.vf*vals.vf - vals.v0*vals.v0) / (2 * vals.d),
        d: vals => (vals.vf*vals.vf - vals.v0*vals.v0) / (2 * vals.a)
      }
    },
    f4: { // d = ((v0 + vf)/2) t
      name: "d = ((v₀ + v_f)/2) t",
      variables: ['d', 'v0', 'vf', 't'],
      calc: {
        d: vals => ((vals.v0 + vals.vf)/2) * vals.t,
        v0: vals => (2 * vals.d / vals.t) - vals.vf,
        vf: vals => (2 * vals.d / vals.t) - vals.v0,
        t: vals => (2 * vals.d) / (vals.v0 + vals.vf)
      }
    },
    f5: { // a = (vf - v0)/t
      name: "a = (v_f - v₀)/t",
      variables: ['a', 'vf', 'v0', 't'],
      calc: {
        a: vals => (vals.vf - vals.v0) / vals.t,
        vf: vals => vals.a * vals.t + vals.v0,
        v0: vals => vals.vf - vals.a * vals.t,
        t: vals => (vals.vf - vals.v0) / vals.a
      }
    }
  };

  // Cuando se selecciona fórmula en MRUV, actualizar variables a calcular
  function actualizarVariablesMruv() {
    const formulaSelect = document.getElementById('mruv_formula');
    const variableSelect = document.getElementById('mruv_variable');
    const formula = formulas[formulaSelect.value];

    variableSelect.innerHTML = '<option value="">-- Elegir variable --</option>';
    if (!formula) {
      document.getElementById('mruv_campos').innerHTML = '';
      limpiarResultados();
      return;
    }
    formula.variables.forEach(v => {
      variableSelect.innerHTML += `<option value="${v}">${v}</option>`;
    });
    document.getElementById('mruv_campos').innerHTML = '';
    limpiarResultados();
  }

  // Mostrar inputs para MRUV según fórmula y variable a calcular
  function mostrarCamposMruv() {
    const formulaSelect = document.getElementById('mruv_formula').value;
    const variable = document.getElementById('mruv_variable').value;
    if (!formulaSelect || !variable) {
      document.getElementById('mruv_campos').innerHTML = '';
      limpiarResultados();
      return;
    }
    const formula = formulas[formulaSelect];
    // Inputs para las variables que NO se van a calcular
    const variables = formula.variables.filter(v => v !== variable);
    let html = '';
    variables.forEach(v => {
      html += `<label>${v}: <input type="number" id="mruv_${v}" /></label>`;
    });
    document.getElementById('mruv_campos').innerHTML = html;
    limpiarResultados();
  }

  // Calcular MRUV
  function calcularMRUV() {
    const formulaSelect = document.getElementById('mruv_formula').value;
    const variable = document.getElementById('mruv_variable').value;
    if (!formulaSelect || !variable) {
      document.getElementById('resultado_mruv').textContent = 'Selecciona fórmula y variable a calcular.';
      return;
    }
    const formula = formulas[formulaSelect];
    // Recolectar valores de inputs excepto la variable a calcular
    const vals = {};
    for (const v of formula.variables) {
      if (v !== variable) {
        const input = document.getElementById('mruv_' + v);
        if (!input || input.value === '') {
          document.getElementById('resultado_mruv').textContent = 'Completa todos los campos necesarios.';
          return;
        }
        vals[v] = parseFloat(input.value);
      }
    }
    // Calcular
    let res;
    try {
      res = formula.calc[variable](vals);
      if (isNaN(res)) throw 'Resultado inválido';
      res = Number(res.toFixed(4));

      // 🔽 Agregar unidades del Sistema Internacional
      let unidad = '';
      if (variable.includes('x') || variable === 'd') {
        unidad = 'm';
      } else if (variable.startsWith('v')) {
        unidad = 'm/s';
      } else if (variable === 'a') {
        unidad = 'm/s²';
      } else if (variable === 't') {
        unidad = 's';
      }

      document.getElementById('resultado_mruv').textContent = `Resultado: ${variable} = ${res} ${unidad}`;
      if (variable === 'x' || variable === 'd') {
        simularMovimiento(res);
      }
    } catch {
      document.getElementById('resultado_mruv').textContent = 'Error en cálculo, revisa los valores.';
    }
  }

function simularMovimiento(distancia) {
  const auto = document.getElementById('auto');
  const contenedor = document.getElementById('simulacion');
  if (!auto || !contenedor) return;

  const escala = 5; // px por metro
  const maxLeft = contenedor.clientWidth - auto.offsetWidth;

  let left = distancia * escala;
  left = Math.max(0, Math.min(left, maxLeft));

  // Reiniciar posición si es necesario
  if (left === 0) {
    auto.style.left = '0px';
    void auto.offsetWidth; // Fuerza el reinicio de transición
  }

  auto.style.left = left + 'px';
  auto.style.transform = `scaleX(${distancia < 0 ? -1 : 1})`;
}



function animarResultado(valorFinal, unidad = '', duracion = 1500) {
  const elemento = document.getElementById('resultadoFinal');
  let inicio = null;

  // Limpiamos clases anteriores
  elemento.classList.remove('resultado-animado');

  const animacion = (timestamp) => {
    if (!inicio) inicio = timestamp;
    const progreso = timestamp - inicio;
    const porcentaje = Math.min(progreso / duracion, 1);
    const valorAnimado = valorFinal * porcentaje;

    elemento.textContent = `${valorAnimado.toFixed(2)} ${unidad}`;

    if (porcentaje < 1) {
      requestAnimationFrame(animacion);
    } else {
      // Al finalizar la animación, agregamos efecto de rebote o resaltado
      elemento.classList.add('resultado-animado');
    }
  };

  requestAnimationFrame(animacion);
}

// Función que puedes usar en vez de mostrarResultado normal:
function mostrarResultado(valor, unidad) {
  animarResultado(valor, unidad);
}

