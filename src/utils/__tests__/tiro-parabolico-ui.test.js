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
        <h1 class="text-header">Tiro Parabólico (Oblicuo)</h1>
          
        <label for="selectVariable">Selecciona una Variable a calcular:</label>
        <select id="selectVariable" class="tiro-select">
            <option value="">-- Selecciona --</option>
            <option value="x_t">Posición en x (x(t))</option>
            <option value="y_t">Posición en y (y(t))</option>
            <option value="vx">Velocidad en x (vₓ)</option>
        </select>

        <label for="selectFormula">Selecciona la formula a utilizar:</label>
        <select id="selectFormula" class="tiro-select">
            <option value="">-- Seleccionar fórmula --</option>
        </select>

        <hr class="tiro-divider">

        <div id="inputs" class="tiro-inputs">
            <div data-key="x"    class="tiro-input-group" style="display:none;"><label>x (m):</label><input type="number" id="x" class="tiro-input" step="any"></div>
            <div data-key="y"    class="tiro-input-group" style="display:none;"><label>y (m):</label><input type="number" id="y" class="tiro-input" step="any"></div>
            <div data-key="v0"   class="tiro-input-group" style="display:none;"><label>v₀ (m/s):</label><input type="number" id="v0" class="tiro-input" step="any"></div>
            <div data-key="vx"   class="tiro-input-group" style="display:none;"><label>vₓ (m/s):</label><input type="number" id="vx" class="tiro-input" step="any"></div>
            <div data-key="vy"   class="tiro-input-group" style="display:none;"><label>vᵧ (m/s):</label><input type="number" id="vy" class="tiro-input" step="any"></div>
            <div data-key="v0x"  class="tiro-input-group" style="display:none;"><label>v₀ₓ (m/s):</label><input type="number" id="v0x" class="tiro-input" step="any"></div>
            <div data-key="v0y"  class="tiro-input-group" style="display:none;"><label>v₀ᵧ (m/s):</label><input type="number" id="v0y" class="tiro-input" step="any"></div>
            <div data-key="theta" class="tiro-input-group" style="display:none;"><label>θ (°):</label><input type="number" id="theta" class="tiro-input" step="any"></div>
            <div data-key="t"    class="tiro-input-group" style="display:none;"><label>t (s):</label><input type="number" id="t" class="tiro-input" step="any"></div>
            <div data-key="g"    class="tiro-input-group" style="display:none;"><label>g (m/s²):</label><input type="number" id="g" class="tiro-input" step="any" placeholder="9.8"></div>
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
    path.resolve(__dirname, '../calculators/tiro-parabolico.js'),
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
        x: parseFloat(document.getElementById("x")?.value),
        y: parseFloat(document.getElementById("y")?.value),
        v0: parseFloat(document.getElementById("v0")?.value),
        vx: parseFloat(document.getElementById("vx")?.value),
        vy: parseFloat(document.getElementById("vy")?.value),
        v0x: parseFloat(document.getElementById("v0x")?.value),
        v0y: parseFloat(document.getElementById("v0y")?.value),
        theta: parseFloat(document.getElementById("theta")?.value),
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

describe('Interfaz de Calculadora de Tiro Parabólico', () => {
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
    expect(options.some(opt => opt.value === 'x_t')).toBeTruthy();
    expect(options.some(opt => opt.value === 'y_t')).toBeTruthy();
    expect(options.some(opt => opt.value === 'vx')).toBeTruthy();
  });

  // Test para verificar que al seleccionar una variable, se cargan las fórmulas correspondientes
  it('debería cargar las fórmulas al seleccionar una variable', () => {
    const selectVariable = document.getElementById('selectVariable');
    const selectFormula = document.getElementById('selectFormula');
    
    // Simular selección de variable
    selectVariable.value = 'x_t';
    selectVariable.dispatchEvent(new Event('change'));
    
    // Verificar que se cargaron las fórmulas
    expect(selectFormula.options.length).toBeGreaterThan(1);
    expect(selectFormula.options[1].textContent).toBe("x(t) = v₀·cos(θ)·t");
  });

  // Test para verificar que al seleccionar una fórmula, se muestran los campos de entrada correspondientes
  it('debería mostrar los campos de entrada al seleccionar una fórmula', () => {
    const selectVariable = document.getElementById('selectVariable');
    const selectFormula = document.getElementById('selectFormula');
    
    // Simular selección de variable
    selectVariable.value = 'x_t';
    selectVariable.dispatchEvent(new Event('change'));
    
    // Simular selección de fórmula
    selectFormula.value = '0';
    selectFormula.dispatchEvent(new Event('change'));
    
    // Verificar que se muestran los campos requeridos
    const v0Input = document.querySelector('[data-key="v0"]');
    const thetaInput = document.querySelector('[data-key="theta"]');
    const tInput = document.querySelector('[data-key="t"]');
    
    expect(v0Input.style.display).toBe("block");
    expect(thetaInput.style.display).toBe("block");
    expect(tInput.style.display).toBe("block");
  });

  // Test para verificar que el botón de calcular funciona y muestra resultados
  it('debería calcular y mostrar el resultado correctamente', () => {
    const selectVariable = document.getElementById('selectVariable');
    const selectFormula = document.getElementById('selectFormula');
    const btnCalcular = document.querySelector('.tiro-button');
    
    // Simular selección de variable y fórmula
    selectVariable.value = 'x_t';
    selectVariable.dispatchEvent(new Event('change'));
    selectFormula.value = '0';
    selectFormula.dispatchEvent(new Event('change'));
    
    // Establecer valores en los inputs
    document.getElementById('v0').value = '20';
    document.getElementById('theta').value = '30';
    document.getElementById('t').value = '2';
    
    // Simular clic en botón calcular
    btnCalcular.click();
    
    // Verificar resultado
    const resultadoDiv = document.getElementById('resultado');
    expect(resultadoDiv.style.display).toBe("block");
    expect(resultadoDiv.textContent).toContain("Resultado");
    
    // x(t) = v₀·cos(θ)·t = 20*cos(30°)*2 = 20*0.866*2 = 34.64
    const esperado = 20 * Math.cos(30 * Math.PI / 180) * 2;
    expect(resultadoDiv.textContent).toContain(esperado.toFixed(2));
  });

  // Test para verificar que se muestra error cuando faltan datos
  it('debería mostrar error cuando faltan datos', () => {
    const selectVariable = document.getElementById('selectVariable');
    const selectFormula = document.getElementById('selectFormula');
    const btnCalcular = document.querySelector('.tiro-button');
    
    // Simular selección de variable y fórmula
    selectVariable.value = 'y_t';
    selectVariable.dispatchEvent(new Event('change'));
    selectFormula.value = '0';
    selectFormula.dispatchEvent(new Event('change'));
    
    // Establecer solo algunos valores, dejando otros vacíos
    document.getElementById('v0').value = '20';
    document.getElementById('theta').value = '30';
    // t queda vacío
    document.getElementById('g').value = '9.8';
    
    // Simular clic en botón calcular
    btnCalcular.click();
    
    // Verificar mensaje de error
    const resultadoDiv = document.getElementById('resultado');
    expect(resultadoDiv.textContent).toContain("Revisa los datos");
  });
});
