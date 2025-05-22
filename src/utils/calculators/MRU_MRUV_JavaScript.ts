// Mostrar sección MRU o MRUV

  type Seccion = 'mru' | 'mruv';
  
  export function mostrarSeccion(valor: Seccion): void {
    const seccion_mru = document.getElementById('seccion_mru');
    const seccion_mruv = document.getElementById('seccion_mruv');
    if (seccion_mru) seccion_mru.style.display = 'none';
    if (seccion_mruv) seccion_mruv.style.display = 'none';
    if (seccion_mru && valor === 'mru') seccion_mru.style.display = 'block';
    if (seccion_mruv && valor === 'mruv') seccion_mruv.style.display = 'block';

    limpiarResultados();
  }

  function limpiarResultados(): void {
    const resultado_mru = document.getElementById('resultado_mru');
    const resultado_mruv = document.getElementById('resultado_mruv');

    if (resultado_mru) resultado_mru.textContent = '';
    if (resultado_mruv) resultado_mruv.textContent = '';
  }

  // MRU: Mostrar campos según variable a calcular
  export function mostrarCamposMRU(): void {
    const opcionSeleccionada = document.getElementById('mru_opcion') as HTMLSelectElement | null;

    if (!opcionSeleccionada) return;
    const opcion = opcionSeleccionada.value;

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
    const camposElement = document.getElementById('mru_campos');
    if (camposElement) camposElement.innerHTML = html;
    limpiarResultados();
  }

  // Calcular MRU
  export function calcularMRU(): void {
    const opcionSeleccionada = document.getElementById('mru_opcion') as HTMLSelectElement | null;
    const xValor = document.getElementById('mru_x') as HTMLInputElement | null;
    const x0Valor = document.getElementById('mru_x0') as HTMLInputElement | null;
    const vValor = document.getElementById('mru_v') as HTMLInputElement | null;
    const tValor = document.getElementById('mru_t') as HTMLInputElement | null;
    
    if (!opcionSeleccionada || !xValor || !x0Valor || !vValor || !tValor) return;

    const opcion = opcionSeleccionada.value;
    const x = parseFloat(xValor.value);
    const x0 = parseFloat(x0Valor.value);
    const v = parseFloat(vValor.value);
    const t = parseFloat(tValor.value);
    let resultado = '';

    if (opcion === 'x' && !isNaN(x0) && !isNaN(v) && !isNaN(t)) {
      const valor = x0 + v * t;
      resultado = `Posición final: ${valor} m`;
      simularMovimiento(valor - x0);
    } else if (opcion === 'v' && !isNaN(x0) && !isNaN(x) && !isNaN(t)) {
      resultado = `Velocidad: ${(x - x0) / t} m/s`;
    } else if (opcion === 't' && !isNaN(x0) && !isNaN(x) && !isNaN(v)) {
      resultado = `Tiempo: ${(x - x0) / v} s`;
    } else if (opcion === 'x0' && !isNaN(x) && !isNaN(v) && !isNaN(t)) {
      resultado = `Posición inicial: ${x - v * t} m`;
    }
    
    const resultado_mru = document.getElementById('resultado_mru');
    if (resultado_mru) resultado_mru.textContent = resultado;
  }

  // MRUV: Variables y fórmulas disponibles
  interface Variable {
    name: string;
    unit: string;
  }

  interface Variables {
    [key: string]: Variable;
  }

  interface FormulaCalc {
    [key: string]: (vals: Record<string, number>) => number;
  }

  interface Formula {
    name: string;
    variables: string[];
    calc: FormulaCalc;
  }

  interface Formulas {
    [key: string]: Formula;
  }

  const variables: Variables = {
    x: { name: 'Posición', unit: 'm' },
    x0: { name: 'Posición inicial', unit: 'm' },
    v0: { name: 'Velocidad inicial', unit: 'm/s' },
    vf: { name: 'Velocidad final', unit: 'm/s' },
    a: { name: 'Aceleración', unit: 'm/s²' },
    d: { name: 'Desplazamiento', unit: 'm' },
    t: { name: 'Tiempo', unit: 's' }
  };

  const formulas: Formulas = {
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
  export function actualizarVariablesMruv(): void {
    const formulaSelect = document.getElementById('mruv_formula') as HTMLSelectElement | null;
    const variableSelect = document.getElementById('mruv_variable') as HTMLSelectElement | null;
    const mruv_campos = document.getElementById('mruv_campos');
    
    if (!formulaSelect || !variableSelect || !mruv_campos) return;
    const formula = formulas[formulaSelect.value];

    variableSelect.innerHTML = '<option value="">-- Elegir variable --</option>';
    if (!formula) {
      mruv_campos.innerHTML = '';
      limpiarResultados();
      return;
    }
    
    formula.variables.forEach(v => {
      variableSelect.innerHTML += `<option value="${v}">${v}</option>`;
    });
    mruv_campos.innerHTML = '';
    limpiarResultados();
  }

  // Mostrar inputs para MRUV según fórmula y variable a calcular
  export function mostrarCamposMruv(): void {
    const formulaSelect = document.getElementById('mruv_formula') as HTMLSelectElement | null;
    const variableSelect = document.getElementById('mruv_variable') as HTMLSelectElement | null;
    const mruvCampos = document.getElementById('mruv_campos');
    
    if (!formulaSelect || !variableSelect || !mruvCampos) {
      limpiarResultados();
      return;
    }
    
    const formulaValue = formulaSelect.value;
    const variable = variableSelect.value;
    
    if (!formulaValue || !variable) {
      mruvCampos.innerHTML = '';
      limpiarResultados();
      return;
    }
    
    const formula = formulas[formulaValue];
    if (!formula) {
      mruvCampos.innerHTML = '';
      limpiarResultados();
      return;
    }
    
    // Inputs para las variables que NO se van a calcular
    const variables = formula.variables.filter(v => v !== variable);
    let html = '';
    variables.forEach(v => {
      html += `<label>${v}: <input type="number" id="mruv_${v}" /></label>`;
    });
    
    mruvCampos.innerHTML = html;
    limpiarResultados();
  }

  // Calcular MRUV
  export function calcularMRUV(): void {
    const formulaSelect = document.getElementById('mruv_formula') as HTMLSelectElement | null;
    const variableSelect = document.getElementById('mruv_variable') as HTMLSelectElement | null;
    const resultadoMruv = document.getElementById('resultado_mruv');
    
    if (!formulaSelect || !variableSelect || !resultadoMruv) return;
    
    const formulaValue = formulaSelect.value;
    const variable = variableSelect.value;
    
    if (!formulaValue || !variable) {
      resultadoMruv.textContent = 'Selecciona fórmula y variable a calcular.';
      return;
    }
    
    const formula = formulas[formulaValue];
    if (!formula) {
      resultadoMruv.textContent = 'Fórmula no encontrada.';
      return;
    }
    
    // Recolectar valores de inputs excepto la variable a calcular
    const vals: Record<string, number> = {};
    for (const v of formula.variables) {
      if (v !== variable) {
        const input = document.getElementById('mruv_' + v) as HTMLInputElement | null;
        if (!input || input.value === '') {
          resultadoMruv.textContent = 'Completa todos los campos necesarios.';
          return;
        }
        vals[v] = parseFloat(input.value);
      }
    }
    
    // Calcular
    try {
      const res = formula.calc[variable](vals);
      if (isNaN(res)) throw new Error('Resultado inválido');
      const formattedRes = Number(res.toFixed(4));

      // Agregar unidades del Sistema Internacional
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

      resultadoMruv.textContent = `Resultado: ${variable} = ${formattedRes} ${unidad}`;
      if (variable === 'x' || variable === 'd') {
        simularMovimiento(formattedRes);
      }
    } catch (error) {
      resultadoMruv.textContent = 'Error en cálculo, revisa los valores.';
    }
  }

  // Unified simulation function with improved behavior
  export function simularMovimiento(distancia: number): void {
    const auto = document.getElementById('auto');
    const contenedor = document.getElementById('simulacion');
    
    if (!auto || !contenedor) return;
    
    const maxLeft = contenedor.clientWidth - auto.offsetWidth;

    // Calcula posición horizontal (left)
    let left = distancia * 5; // Scale factor: 5 pixels per meter

    // Limita la posición para que no se salga del contenedor
    if (left < 0) left = 0;
    if (left > maxLeft) left = maxLeft;

    // Mueve el auto
    auto.style.left = left + 'px';

    // Voltea el auto si se mueve hacia atrás
    if (distancia < 0) {
      auto.style.transform = 'scaleX(-1)';
    } else {
      auto.style.transform = 'scaleX(1)';
    }
  }