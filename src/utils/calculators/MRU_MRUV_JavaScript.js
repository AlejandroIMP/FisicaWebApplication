// Mostrar sección MRU o MRUV
export  function mostrarSeccion(valor) {
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
export  function limpiarResultados() {
    document.getElementById('resultado_mru').textContent = '';
    document.getElementById('resultado_mruv').textContent = '';
    
    // Restablecer la simulación
    const auto = document.getElementById('auto');
    if (auto) {
      const contenedor = document.getElementById('simulacion');
      if (contenedor) {
        // Colocar el auto en el centro
        const centerPoint = contenedor.clientWidth / 2;
        auto.style.left = (centerPoint - (auto.offsetWidth / 2)) + 'px';
        auto.style.transform = 'scaleX(1)'; // Orientación por defecto
      }
    }
  }

  // MRU: Mostrar campos según variable a calcular
export  function mostrarCamposMRU() {
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
export  function calcularMRU() {
    const opcion = document.getElementById('mru_opcion').value;
    const x = parseFloat(document.getElementById('mru_x')?.value);
    const x0 = parseFloat(document.getElementById('mru_x0')?.value);
    const v = parseFloat(document.getElementById('mru_v')?.value);
    const t = parseFloat(document.getElementById('mru_t')?.value);
    let resultado = '';
    let valorCalculado = 0;
    let desplazamiento = 0;
    
    if (opcion === 'x' && !isNaN(x0) && !isNaN(v) && !isNaN(t)) {
      valorCalculado = x0 + v * t;
      resultado = `Posición final: ${valorCalculado.toFixed(4)} m`;
      desplazamiento = valorCalculado - x0;
    } else if (opcion === 'v' && !isNaN(x0) && !isNaN(x) && !isNaN(t)) {
      valorCalculado = (x - x0) / t;
      resultado = `Velocidad: ${valorCalculado.toFixed(4)} m/s`;
      desplazamiento = x - x0;
    } else if (opcion === 't' && !isNaN(x0) && !isNaN(x) && !isNaN(v)) {
      valorCalculado = (x - x0) / v;
      resultado = `Tiempo: ${valorCalculado.toFixed(4)} s`;
      desplazamiento = x - x0;
    } else if (opcion === 'x0' && !isNaN(x) && !isNaN(v) && !isNaN(t)) {
      valorCalculado = x - v * t;
      resultado = `Posición inicial: ${valorCalculado.toFixed(4)} m`;
      desplazamiento = x - valorCalculado;
    } else {
      resultado = 'Completa todos los campos necesarios.';
    }
    
    document.getElementById('resultado_mru').textContent = resultado;
    
    // Simular el movimiento si tenemos un desplazamiento válido
    if (desplazamiento !== 0 && !isNaN(desplazamiento)) {
      simularMovimiento(desplazamiento);
    }
  }

  // MRUV: Variables y fórmulas disponibles
export  const formulas = {
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
export  function actualizarVariablesMruv() {
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
export  function mostrarCamposMruv() {
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
export  function calcularMRUV() {
    const formulaSelect = document.getElementById('mruv_formula').value;
    const variable = document.getElementById('mruv_variable').value;
    if (!formulaSelect || !variable) {
      document.getElementById('resultado_mruv').textContent = 'Selecciona fórmula y variable a calcular.';
      return;
    }
    
    const formula = formulas[formulaSelect];
    if (!formula) {
      document.getElementById('resultado_mruv').textContent = 'Fórmula no válida. Por favor, selecciona una fórmula.';
      return;
    }
    
    // Recolectar valores de inputs excepto la variable a calcular
    const vals = {};
    let todosCamposCompletos = true;
    let camposFaltantes = [];
    
    for (const v of formula.variables) {
      if (v !== variable) {
        const input = document.getElementById('mruv_' + v);
        if (!input || input.value === '') {
          todosCamposCompletos = false;
          camposFaltantes.push(v);
          continue;
        }
        
        const valor = parseFloat(input.value);
        if (isNaN(valor)) {
          document.getElementById('resultado_mruv').textContent = `El valor para ${v} no es un número válido.`;
          return;
        }
        
        vals[v] = valor;
      }
    }
    
    if (!todosCamposCompletos) {
      document.getElementById('resultado_mruv').textContent = `Completa los campos: ${camposFaltantes.join(', ')}`;
      return;
    }
    
    // Calcular
    let res;
    try {
      // Comprobar posibles divisiones por cero o casos especiales
      if ((variable === 't' || variable === 'a') && vals.a === 0) {
        throw 'No se puede calcular con aceleración igual a cero';
      }
      if (variable === 't' && vals.v === 0) {
        throw 'No se puede calcular con velocidad igual a cero';
      }
      
      // Realizar el cálculo
      res = formula.calc[variable](vals);
      
      if (isNaN(res)) throw 'Resultado matemáticamente inválido';
      if (!isFinite(res)) throw 'Resultado es infinito, verifica los valores';
      
      res = Number(res.toFixed(4));      // Agregar unidades del Sistema Internacional
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
      
      // Simular el movimiento para diferentes variables
      let desplazamiento = 0;
      if (variable === 'x') {
        // Si calculamos posición final, simulamos el desplazamiento desde x0
        desplazamiento = res - vals.x0;
      } else if (variable === 'd') {
        // Si calculamos distancia, usamos el valor directamente
        desplazamiento = res;
      } else if (variable === 'x0') {
        // Si calculamos posición inicial, el desplazamiento es desde x0 a x
        desplazamiento = vals.x - res;
      }
      
      // Solo simulamos si hay un desplazamiento a mostrar
      if (desplazamiento !== 0 && !isNaN(desplazamiento)) {
        simularMovimiento(desplazamiento);
      }    } catch (error) {
      // Mostrar mensaje de error más específico si está disponible
      const errorMsg = typeof error === 'string' ? error : 'Error en cálculo, revisa los valores.';
      document.getElementById('resultado_mruv').textContent = errorMsg;
    }
  }

  
export function simularMovimiento(distancia) {
    const auto = document.getElementById('auto');
    const contenedor = document.getElementById('simulacion');
    const maxLeft = contenedor.clientWidth - auto.offsetWidth;
    const centerPoint = contenedor.clientWidth / 2;

    // Posiciona el auto en el centro inicialmente
    auto.style.left = centerPoint - (auto.offsetWidth / 2) + 'px';
    
    // Calcula la nueva posición a partir del centro
    let newPosition = centerPoint + (distancia * 5) - (auto.offsetWidth / 2);

    // Limita la posición para que no se salga del contenedor
    if (newPosition < 0) newPosition = 0;
    if (newPosition > maxLeft) newPosition = maxLeft;

    // Mueve el auto
    auto.style.left = newPosition + 'px';

    // Voltea el auto si se mueve hacia atrás
    if (distancia < 0) {
      auto.style.transform = 'scaleX(-1)';
    } else {
      auto.style.transform = 'scaleX(1)';
    }
  }

  // Función de inicialización
  export function inicializarSimulacion() {
    // Centrar el auto al cargar la página
    limpiarResultados();
    
    // Asegurarse que la imagen del auto se ha cargado
    const auto = document.getElementById('auto');
    if (auto) {
      auto.onload = function() {
        limpiarResultados();
      };
    }
  }

  // Ejecutar inicialización cuando se cargue la página
  window.addEventListener('DOMContentLoaded', inicializarSimulacion);