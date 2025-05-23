import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

// Configurar jsdom
function setupDOM() {
  // Leer el HTML del componente
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test</title>
    </head>
    <body>
      <div class="tiro-calculator">
        <h1 class="text-header">Calculadora de Tiro Vertical</h1>

        <label for="selectVariable">Selecciona la variable a calcular:</label>
        <select id="selectVariable" class="tiro-select">
            <option value="">-- Selecciona --</option>
            <option value="h_t">Altura en t (h(t))</option>
            <option value="v_t">Velocidad en t (v(t))</option>
            <option value="h_max">Altura máxima (h_max)</option>
        </select>

        <label for="selectFormula">Selecciona la fórmula:</label>
        <select id="selectFormula" class="tiro-select">
          <option value="">-- Primero selecciona variable --</option>
        </select>

        <hr class="tiro-divider">

        <div id="inputs" class="tiro-inputs">
          <div data-key="h" class="tiro-input-group" style="display:none;"><label>h (m):</label><input type="number" id="h" class="tiro-input" step="any"></div>
          <div data-key="h0" class="tiro-input-group" style="display:none;"><label>h₀ (m):</label><input type="number" id="h0" class="tiro-input" step="any"></div>
          <div data-key="h_max" class="tiro-input-group" style="display:none;"><label>hₘₐₓ (m):</label><input type="number" id="h_max" class="tiro-input" step="any"></div>
          <div data-key="v0" class="tiro-input-group" style="display:none;"><label>v₀ (m/s):</label><input type="number" id="v0" class="tiro-input" step="any"></div>
          <div data-key="vt" class="tiro-input-group" style="display:none;"><label>v(t) (m/s):</label><input type="number" id="vt" class="tiro-input" step="any"></div>
          <div data-key="t" class="tiro-input-group" style="display:none;"><label>t (s):</label><input type="number" id="t" class="tiro-input" step="any"></div>
          <div data-key="g" class="tiro-input-group" style="display:none;"><label>g (m/s²):</label><input type="number" id="g" class="tiro-input" step="any" placeholder="9.8"></div>
        </div>

        <button onclick="calcular()" class="tiro-button">Calcular</button>
        <div id="resultado" class="tiro-resultado" style="display:none;"></div>
      </div>
    </body>
    </html>
  `;

  // Crear entorno DOM para pruebas
  const dom = new JSDOM(html, { 
    url: 'http://localhost',
    runScripts: 'dangerously' 
  });

  // Configurar variables globales
  global.document = dom.window.document;
  global.window = dom.window;
  global.navigator = dom.window.navigator;

  // Importar el contenido del archivo JS principal
  const scriptContent = fs.readFileSync(
    path.resolve(__dirname, '../calculators/tiro-vertical.js'),
    'utf8'
  );

  // Inyectar el script en el entorno DOM
  const script = dom.window.document.createElement('script');
  script.textContent = `
    ${scriptContent}
    
    // Implementar la función calcular
    function calcular() {
      const selectVar = document.getElementById("selectVariable");
      const selectForm = document.getElementById("selectFormula");
      const resultadoDiv = document.getElementById("resultado");
      
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
        g: parseFloat(document.getElementById("g")?.value)
      };
      
      try {
        const { val, unit } = formulas[key][fi].func(vals);
        
        resultadoDiv.style.display = "block";
        if (isNaN(val)) {
          resultadoDiv.textContent = "Revisa los datos ingresados.";
        } else {
          resultadoDiv.textContent = "Resultado: " + val.toFixed(2) + " " + unit;
        }
      } catch (error) {
        resultadoDiv.textContent = "Error en el cálculo.";
        resultadoDiv.style.display = "block";
      }
    }
    
    // Inicializar eventos
    const selectVar = document.getElementById("selectVariable");
    const selectForm = document.getElementById("selectFormula");
    const inputsCont = document.getElementById("inputs");
    
    selectVar.addEventListener("change", () => {
      const key = selectVar.value;
      selectForm.innerHTML = "<option value=''>-- Selecciona fórmula --</option>";
      document.getElementById("resultado").textContent = "";
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
      document.getElementById("resultado").textContent = "";
      const key = selectVar.value;
      const fi = selectForm.value;
      if (fi === "" || !formulas[key]) return;
      const requiere = formulas[key][fi].requiere;
      requiere.forEach(id => {
        const div = inputsCont.querySelector("[data-key='" + id + "']");
        if (div) div.style.display = "block";
      });
    });
    
    function ocultarTodosInputs() {
      Array.from(inputsCont.children).forEach(div => div.style.display = "none");
    }
  `;
  dom.window.document.body.appendChild(script);

  return dom;
}

describe('Interfaz de Calculadora de Tiro Vertical', () => {
  let dom;

  beforeEach(() => {
    dom = setupDOM();
  });

  afterEach(() => {
    dom = null;
  });

  // Test para verificar que los selectores estén presentes
  it('debería cargar todos los elementos de la interfaz correctamente', () => {
    const selectVariable = document.getElementById('selectVariable');
    const selectFormula = document.getElementById('selectFormula');
    const btnCalcular = document.querySelector('.tiro-button');
    const inputsContainer = document.getElementById('inputs');
    const resultadoDiv = document.getElementById('resultado');
    
    expect(selectVariable).not.toBeNull();
    expect(selectFormula).not.toBeNull();
    expect(btnCalcular).not.toBeNull();
    expect(inputsContainer).not.toBeNull();
    expect(resultadoDiv).not.toBeNull();
  });

  // Test para verificar que el selector de variables tiene las opciones correctas
  it('debería mostrar las opciones de variables correctas', () => {
    const selectVariable = document.getElementById('selectVariable');
    const options = Array.from(selectVariable.options);
    
    expect(options.length).toBeGreaterThan(1);
    expect(options.some(opt => opt.value === 'h_t')).toBeTruthy();
    expect(options.some(opt => opt.value === 'v_t')).toBeTruthy();
    expect(options.some(opt => opt.value === 'h_max')).toBeTruthy();
  });

  // Test para verificar que al seleccionar una variable, se cargan las fórmulas correspondientes
  it('debería cargar las fórmulas al seleccionar una variable', () => {
    const selectVariable = document.getElementById('selectVariable');
    const selectFormula = document.getElementById('selectFormula');
    
    // Simular selección de variable
    selectVariable.value = 'h_t';
    selectVariable.dispatchEvent(new Event('change'));
    
    // Verificar que se cargaron las fórmulas
    expect(selectFormula.options.length).toBeGreaterThan(1);
    expect(selectFormula.options[1].textContent).toBe("h(t) = h₀ + v₀·t – ½·g·t²");
  });

  // Test para verificar que al seleccionar una fórmula, se muestran los campos de entrada correspondientes
  it('debería mostrar los campos de entrada al seleccionar una fórmula', () => {
    const selectVariable = document.getElementById('selectVariable');
    const selectFormula = document.getElementById('selectFormula');
    
    // Simular selección de variable
    selectVariable.value = 'h_t';
    selectVariable.dispatchEvent(new Event('change'));
    
    // Simular selección de fórmula
    selectFormula.value = '0';
    selectFormula.dispatchEvent(new Event('change'));
    
    // Verificar que se muestran los campos requeridos
    const h0Input = document.querySelector('[data-key="h0"]');
    const v0Input = document.querySelector('[data-key="v0"]');
    const tInput = document.querySelector('[data-key="t"]');
    const gInput = document.querySelector('[data-key="g"]');
    
    expect(h0Input.style.display).toBe("block");
    expect(v0Input.style.display).toBe("block");
    expect(tInput.style.display).toBe("block");
    expect(gInput.style.display).toBe("block");
  });

  // Test para verificar que el botón de calcular funciona y muestra resultados
  it('debería calcular y mostrar el resultado correctamente', () => {
    const selectVariable = document.getElementById('selectVariable');
    const selectFormula = document.getElementById('selectFormula');
    const btnCalcular = document.querySelector('.tiro-button');
    
    // Simular selección de variable y fórmula
    selectVariable.value = 'h_t';
    selectVariable.dispatchEvent(new Event('change'));
    selectFormula.value = '0';
    selectFormula.dispatchEvent(new Event('change'));
    
    // Establecer valores en los inputs
    document.getElementById('h0').value = '10';
    document.getElementById('v0').value = '15';
    document.getElementById('t').value = '2';
    document.getElementById('g').value = '9.8';
    
    // Simular clic en botón calcular
    btnCalcular.click();
    
    // Verificar resultado
    const resultadoDiv = document.getElementById('resultado');
    expect(resultadoDiv.style.display).toBe("block");
    expect(resultadoDiv.textContent).toContain("Resultado");
    expect(resultadoDiv.textContent).toContain("20.4"); // h(t) = 10 + 15*2 - 0.5*9.8*2² = 20.4
  });

  // Test para verificar que se muestra error cuando faltan datos
  it('debería mostrar error cuando faltan datos', () => {
    const selectVariable = document.getElementById('selectVariable');
    const selectFormula = document.getElementById('selectFormula');
    const btnCalcular = document.querySelector('.tiro-button');
    
    // Simular selección de variable y fórmula
    selectVariable.value = 'h_t';
    selectVariable.dispatchEvent(new Event('change'));
    selectFormula.value = '0';
    selectFormula.dispatchEvent(new Event('change'));
    
    // Establecer solo algunos valores, dejando otros vacíos
    document.getElementById('h0').value = '10';
    document.getElementById('v0').value = '15';
    // t queda vacío
    document.getElementById('g').value = '9.8';
    
    // Simular clic en botón calcular
    btnCalcular.click();
    
    // Verificar mensaje de error
    const resultadoDiv = document.getElementById('resultado');
    expect(resultadoDiv.textContent).toContain("Revisa los datos");
  });
});
