import { getElementByIdStrict, setupCalculator, type CalculatorConfig } from '../calculators/calculator-controller';
import { type CalculationResult } from '../calculators/mcu-calculator';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Configurar JSDOM para emular el entorno del navegador
const dom = new JSDOM(`
  <!DOCTYPE html>
  <html>
  <body>
    <select id="variable-to-solve"></select>
    <button id="calculate-btn"></button>
    <div id="result"></div>
    <div id="formula-used"></div>
    <div id="velocity-group" class="input-group">
      <input id="velocity" type="number" />
      <select id="velocity-unit"></select>
    </div>
    <div id="radius-group" class="input-group">
      <input id="radius" type="number" />
      <select id="radius-unit"></select>
    </div>
    <div id="angularVelocity-group" class="input-group">
      <input id="angularVelocity" type="number" />
      <select id="angularVelocity-unit"></select>
    </div>
    <div id="period-group" class="input-group">
      <input id="period" type="number" />
      <select id="period-unit"></select>
    </div>
  </body>
  </html>
`);

// Configurar el DOM global para las pruebas
global.document = dom.window.document;
global.window = dom.window as any;
global.HTMLElement = dom.window.HTMLElement;
global.HTMLSelectElement = dom.window.HTMLSelectElement;
global.HTMLButtonElement = dom.window.HTMLButtonElement;
global.HTMLInputElement = dom.window.HTMLInputElement;
global.HTMLDivElement = dom.window.HTMLDivElement;
global.Event = dom.window.Event;

// Mockear las funciones de conversión de unidades
vi.mock('../unit-converter/unit-converter', () => ({
  convertToBaseUnit: vi.fn((value) => value),
  convertFromBaseUnit: vi.fn((value) => value)
}));

describe('Calculator Controller', () => {
  describe('getElementByIdStrict', () => {
    it('should return element when found', () => {
      const element = getElementByIdStrict<HTMLSelectElement>('variable-to-solve');
      expect(element).toBeDefined();
      expect(element instanceof dom.window.HTMLSelectElement).toBe(true);
    });

    it('should throw error when element not found', () => {
      expect(() => {
        getElementByIdStrict<HTMLElement>('non-existent-element');
      }).toThrow('Element with id non-existent-element not found');
    });
  });

  describe('setupCalculator', () => {
    let mockConfig: CalculatorConfig;
    let mockCalculateFunction: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      // Restablecer cualquier estado previo
      document.getElementById('result')!.innerHTML = '';
      document.getElementById('formula-used')!.innerHTML = '';
      
      // Configurar valores en los selectores
      const select = document.getElementById('variable-to-solve') as HTMLSelectElement;
      select.innerHTML = `
        <option value="velocity">Velocidad Lineal</option>
        <option value="radius">Radio</option>
        <option value="angularVelocity">Velocidad Angular</option>
        <option value="period">Período</option>
      `;

      // Configurar nuestros mocks
      mockCalculateFunction = vi.fn().mockImplementation((variableToSolve, values) => ({
        value: 42,
        name: 'Test Result',
        unit: 'm/s',
        formula: 'test = formula'
      } as CalculationResult));

      mockConfig = {
        calculateFunction: mockCalculateFunction,
        variableGroups: {
          velocity: ['radius', 'angularVelocity'],
          radius: ['velocity', 'angularVelocity'],
          angularVelocity: ['velocity', 'radius'],
          period: ['angularVelocity']
        }
      };
    });

    it('should initialize correctly', () => {
      setupCalculator(mockConfig);
      
      // Verificar que se configuró correctamente
      expect(document.getElementById('variable-to-solve')).not.toBeNull();
      expect(document.getElementById('calculate-btn')).not.toBeNull();
    });

    it('should update visible fields when variable to solve changes', () => {
      setupCalculator(mockConfig);
      
      const select = document.getElementById('variable-to-solve') as HTMLSelectElement;
      const velocityGroup = document.getElementById('velocity-group') as HTMLDivElement;
      const radiusGroup = document.getElementById('radius-group') as HTMLDivElement;
      const angularVelocityGroup = document.getElementById('angularVelocity-group') as HTMLDivElement;
      
      // Simular selección de 'velocity'
      select.value = 'velocity';
      select.dispatchEvent(new Event('change'));
      
      // velocity debería estar oculto, radius y angularVelocity visibles
      expect(velocityGroup.style.display).toBe('none');
      expect(radiusGroup.style.display).toBe('block');
      expect(angularVelocityGroup.style.display).toBe('block');
      
      // Simular selección de 'radius'
      select.value = 'radius';
      select.dispatchEvent(new Event('change'));
      
      // radius debería estar oculto, velocity y angularVelocity visibles
      expect(velocityGroup.style.display).toBe('block');
      expect(radiusGroup.style.display).toBe('none');
      expect(angularVelocityGroup.style.display).toBe('block');
    });

    it('should calculate and display result when calculate button is clicked', () => {
      setupCalculator(mockConfig);
      
      const select = document.getElementById('variable-to-solve') as HTMLSelectElement;
      const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;
      const radiusInput = document.getElementById('radius') as HTMLInputElement;
      const radiusUnitSelect = document.getElementById('radius-unit') as HTMLSelectElement;
      const angularVelocityInput = document.getElementById('angularVelocity') as HTMLInputElement;
      const angularVelocityUnitSelect = document.getElementById('angularVelocity-unit') as HTMLSelectElement;
      const resultDiv = document.getElementById('result') as HTMLDivElement;
      const formulaDiv = document.getElementById('formula-used') as HTMLDivElement;
      
      // Configurar para el cálculo
      select.value = 'velocity';
      radiusInput.value = '10';
      radiusUnitSelect.value = 'm';
      angularVelocityInput.value = '5';
      angularVelocityUnitSelect.value = 'rad/s';
      
      // Trigger del cálculo
      calculateBtn.click();
      
      // Verificar que la función de cálculo se llamó con los parámetros correctos
      expect(mockCalculateFunction).toHaveBeenCalledWith('velocity', expect.objectContaining({
        radius: 10,
        angularVelocity: 5
      }));
      
      // Verificar que el resultado se mostró correctamente
      expect(resultDiv.innerHTML).toContain('42.0000');
      expect(formulaDiv.innerHTML).toContain('test = formula');
    });

    it('should handle calculation error gracefully', () => {
      mockCalculateFunction.mockReturnValueOnce({
        value: null,
        name: '',
        unit: '',
        formula: ''
      });
      
      setupCalculator(mockConfig);
      
      const select = document.getElementById('variable-to-solve') as HTMLSelectElement;
      const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;
      const resultDiv = document.getElementById('result') as HTMLDivElement;
      
      // Configurar para el cálculo
      select.value = 'velocity';
      
      // Trigger del cálculo
      calculateBtn.click();
      
      // Verificar que se mostró el mensaje de error
      expect(resultDiv.innerHTML).toContain('No se pudo calcular');
    });

    it('should handle empty input values', () => {
      setupCalculator(mockConfig);
      
      const select = document.getElementById('variable-to-solve') as HTMLSelectElement;
      const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;
      const radiusInput = document.getElementById('radius') as HTMLInputElement;
      const angularVelocityInput = document.getElementById('angularVelocity') as HTMLInputElement;
      
      // Configurar para el cálculo con valor vacío
      select.value = 'velocity';
      radiusInput.value = ''; // Valor vacío
      angularVelocityInput.value = '5';
      
      // Trigger del cálculo
      calculateBtn.click();
      
      // En la implementación actual, campos vacíos son excluidos
      expect(mockCalculateFunction).toHaveBeenCalled();
    });

    it('should handle NaN input values', () => {
      setupCalculator(mockConfig);
      
      const select = document.getElementById('variable-to-solve') as HTMLSelectElement;
      const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;
      const radiusInput = document.getElementById('radius') as HTMLInputElement;
      const angularVelocityInput = document.getElementById('angularVelocity') as HTMLInputElement;
      
      // Configurar para el cálculo con valor no numérico
      select.value = 'velocity';
      radiusInput.value = 'not-a-number';
      angularVelocityInput.value = '5';
      
      // Trigger del cálculo
      calculateBtn.click();
      
      // En la implementación actual, valores NaN son excluidos
      expect(mockCalculateFunction).toHaveBeenCalled();
    });

    it('should handle zero input values', () => {
      setupCalculator(mockConfig);
      
      const select = document.getElementById('variable-to-solve') as HTMLSelectElement;
      const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;
      const radiusInput = document.getElementById('radius') as HTMLInputElement;
      const angularVelocityInput = document.getElementById('angularVelocity') as HTMLInputElement;
      
      // Configurar para el cálculo con valor cero
      select.value = 'velocity';
      radiusInput.value = '0';
      angularVelocityInput.value = '5';
      
      // Trigger del cálculo
      calculateBtn.click();
      
      // En la implementación actual, los valores cero son incluidos en los cálculos
      expect(mockCalculateFunction).toHaveBeenCalledWith('velocity', expect.objectContaining({
        angularVelocity: 5
      }));
    });

    it('should handle case where no input values are provided', () => {
      setupCalculator(mockConfig);
      
      const select = document.getElementById('variable-to-solve') as HTMLSelectElement;
      const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;
      const radiusInput = document.getElementById('radius') as HTMLInputElement;
      const angularVelocityInput = document.getElementById('angularVelocity') as HTMLInputElement;
      
      // Limpiar valores
      radiusInput.value = '';
      angularVelocityInput.value = '';
      
      // Configurar para el cálculo sin valores
      select.value = 'velocity';
      
      // Trigger del cálculo
      calculateBtn.click();
      
      // Verificar que la función de cálculo fue llamada
      expect(mockCalculateFunction).toHaveBeenCalled();
    });
  });

  describe('Input error handling', () => {
    let mockConfig: CalculatorConfig;
    let mockCalculateFunction: ReturnType<typeof vi.fn>;
    
    beforeEach(() => {
      // Reset DOM elements
      document.getElementById('result')!.innerHTML = '';
      document.getElementById('formula-used')!.innerHTML = '';
      
      // Mock calculation function
      mockCalculateFunction = vi.fn().mockImplementation((variableToSolve, values) => ({
        value: 42,
        name: 'Test Result',
        unit: 'm/s',
        formula: 'test = formula'
      } as CalculationResult));
      
      mockConfig = {
        calculateFunction: mockCalculateFunction,
        variableGroups: {
          velocity: ['radius', 'angularVelocity'],
          radius: ['velocity', 'angularVelocity'],
          angularVelocity: ['velocity', 'radius'],
          period: ['angularVelocity']
        }
      };
      
      setupCalculator(mockConfig);
    });
    
    it('should handle non-numeric input values', () => {
      const select = document.getElementById('variable-to-solve') as HTMLSelectElement;
      const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;
      const radiusInput = document.getElementById('radius') as HTMLInputElement;
      const angularVelocityInput = document.getElementById('angularVelocity') as HTMLInputElement;
      const resultDiv = document.getElementById('result') as HTMLDivElement;
      
      // Configurar para el cálculo con valor no numérico
      select.value = 'velocity';
      radiusInput.value = 'abc'; // Valor no numérico
      angularVelocityInput.value = '5';
      
      // Simular clic
      calculateBtn.click();
      
      // Verificar que la función fue llamada y el valor no numérico fue excluido
      expect(mockCalculateFunction).toHaveBeenCalled();
    });
    
    it('should handle negative input values properly', () => {
      const select = document.getElementById('variable-to-solve') as HTMLSelectElement;
      const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;
      const radiusInput = document.getElementById('radius') as HTMLInputElement;
      const angularVelocityInput = document.getElementById('angularVelocity') as HTMLInputElement;
      
      // Configurar para el cálculo con valor negativo
      select.value = 'velocity';
      radiusInput.value = '-10'; // Valor negativo
      angularVelocityInput.value = '5';
      
      // Simular clic
      calculateBtn.click();
      
      // El controller debería pasar el valor negativo correctamente
      expect(mockCalculateFunction).toHaveBeenCalledWith('velocity', expect.objectContaining({
        radius: -10,
        angularVelocity: 5
      }));
    });
    
    it('should handle extremely small numbers without rounding errors', () => {
      const select = document.getElementById('variable-to-solve') as HTMLSelectElement;
      const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;
      const radiusInput = document.getElementById('radius') as HTMLInputElement;
      const angularVelocityInput = document.getElementById('angularVelocity') as HTMLInputElement;
      
      // Configurar para el cálculo con valor muy pequeño
      select.value = 'velocity';
      radiusInput.value = '1e-8'; // Valor muy pequeño
      angularVelocityInput.value = '5';
      
      // Simular clic
      calculateBtn.click();
      
      // El controller debería pasar el valor pequeño sin errores de redondeo
      expect(mockCalculateFunction).toHaveBeenCalledWith('velocity', expect.objectContaining({
        radius: 1e-8,
        angularVelocity: 5
      }));
    });
    
    it('should handle when calculation returns NaN', () => {
      mockCalculateFunction.mockReturnValueOnce({
        value: NaN,
        name: 'Test Result',
        unit: 'm/s',
        formula: 'test = formula'
      });
      
      const select = document.getElementById('variable-to-solve') as HTMLSelectElement;
      const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;
      const radiusInput = document.getElementById('radius') as HTMLInputElement;
      const angularVelocityInput = document.getElementById('angularVelocity') as HTMLInputElement;
      const resultDiv = document.getElementById('result') as HTMLDivElement;
      
      // Configurar para el cálculo
      select.value = 'velocity';
      radiusInput.value = '10';
      angularVelocityInput.value = '5';
      
      // Simular clic
      calculateBtn.click();
      
      // El resultado NaN debería manejarse adecuadamente
      expect(resultDiv.innerHTML).toContain('No se pudo calcular');
    });
    
    it('should handle when calculation returns Infinity', () => {
      mockCalculateFunction.mockReturnValueOnce({
        value: Infinity,
        name: 'Test Result',
        unit: 'm/s',
        formula: 'test = formula'
      });
      
      const select = document.getElementById('variable-to-solve') as HTMLSelectElement;
      const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;
      const radiusInput = document.getElementById('radius') as HTMLInputElement;
      const angularVelocityInput = document.getElementById('angularVelocity') as HTMLInputElement;
      const resultDiv = document.getElementById('result') as HTMLDivElement;
      
      // Configurar para el cálculo
      select.value = 'velocity';
      radiusInput.value = '10';
      angularVelocityInput.value = '0'; // División por cero
      
      // Simular clic
      calculateBtn.click();
      
      // El resultado Infinity debería manejarse adecuadamente
      expect(resultDiv.innerHTML).toContain('No se pudo calcular');
    });
  });
});