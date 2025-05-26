/**
 * Script de prueba para verificar el funcionamiento de las calculadoras de tiro vertical y parabólico
 * Este script puede ejecutarse desde la consola del navegador al abrir las páginas de las calculadoras
 */

function testTiroVerticalCalculator() {
  console.log("Iniciando prueba de calculadora de tiro vertical...");
  
  // 1. Verificar que todos los elementos esenciales existen
  const variableSelect = document.getElementById('variableSelect');
  const formulaSelect = document.getElementById('formulaSelect');
  const calculateBtn = document.getElementById('calculateBtn');
  const resultDisplay = document.getElementById('resultDisplay');
  
  if (!variableSelect || !formulaSelect || !calculateBtn || !resultDisplay) {
    console.error("Error: Faltan elementos críticos en la interfaz");
    return false;
  }
  
  // 2. Probar un cálculo simple
  try {
    // Seleccionar "Altura máxima" como variable a calcular
    variableSelect.value = "h_max";
    variableSelect.dispatchEvent(new Event('change'));
    
    // Dar tiempo para que se actualice el formulario
    setTimeout(() => {
      // Seleccionar la primera fórmula
      if (formulaSelect.options.length > 0) {
        formulaSelect.value = "0";
        formulaSelect.dispatchEvent(new Event('change'));
        
        // Dar tiempo para que se actualicen los campos
        setTimeout(() => {
          // Buscar y rellenar los campos necesarios
          const inputs = document.querySelectorAll('#inputFields input');
          inputs.forEach(input => {
            if (!input.closest('.hidden-initially')) {
              if (input.id === "v0") input.value = "10";
              if (input.id === "g") input.value = "9.8";
              if (input.id === "h0") input.value = "0";
            }
          });
          
          // Hacer clic en el botón calcular
          calculateBtn.click();
          
          // Verificar el resultado
          setTimeout(() => {
            console.log("Resultado mostrado:", resultDisplay.textContent);
            console.log("Prueba completada!");
          }, 200);
        }, 200);
      } else {
        console.error("Error: No se han cargado las fórmulas");
      }
    }, 200);
  } catch (error) {
    console.error("Error durante la prueba:", error);
    return false;
  }
  
  return true;
}

function testTiroParabolicoCalculator() {
  console.log("Iniciando prueba de calculadora de tiro parabólico...");
  
  // 1. Verificar que todos los elementos esenciales existen
  const variableSelect = document.getElementById('variableSelect');
  const formulaSelect = document.getElementById('formulaSelect');
  const calculateBtn = document.getElementById('calculateBtn');
  const resultDisplay = document.getElementById('resultDisplay');
  
  if (!variableSelect || !formulaSelect || !calculateBtn || !resultDisplay) {
    console.error("Error: Faltan elementos críticos en la interfaz");
    return false;
  }
  
  // 2. Probar un cálculo simple
  try {
    // Seleccionar "Alcance horizontal" como variable a calcular
    variableSelect.value = "R";
    variableSelect.dispatchEvent(new Event('change'));
    
    // Dar tiempo para que se actualice el formulario
    setTimeout(() => {
      // Seleccionar la primera fórmula
      if (formulaSelect.options.length > 0) {
        formulaSelect.value = "0";
        formulaSelect.dispatchEvent(new Event('change'));
        
        // Dar tiempo para que se actualicen los campos
        setTimeout(() => {
          // Buscar y rellenar los campos necesarios
          const inputs = document.querySelectorAll('#inputFields input');
          inputs.forEach(input => {
            if (!input.closest('.hidden-initially')) {
              if (input.id === "v0") input.value = "20";
              if (input.id === "theta") input.value = "45";
              if (input.id === "g") input.value = "9.8";
            }
          });
          
          // Hacer clic en el botón calcular
          calculateBtn.click();
          
          // Verificar el resultado
          setTimeout(() => {
            console.log("Resultado mostrado:", resultDisplay.textContent);
            console.log("Prueba completada!");
          }, 200);
        }, 200);
      } else {
        console.error("Error: No se han cargado las fórmulas");
      }
    }, 200);
  } catch (error) {
    console.error("Error durante la prueba:", error);
    return false;
  }
  
  return true;
}

// Exportamos las funciones para poder usarlas desde la consola del navegador
window.testTiroVerticalCalculator = testTiroVerticalCalculator;
window.testTiroParabolicoCalculator = testTiroParabolicoCalculator;

console.log("Script de prueba cargado. Para ejecutar las pruebas:");
console.log("- En la calculadora de tiro vertical, ejecute: testTiroVerticalCalculator()");
console.log("- En la calculadora de tiro parabólico, ejecute: testTiroParabolicoCalculator()");
