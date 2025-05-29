import { CalculationErrorHandler } from '../Handlers/calculator-error-handler';
import { type CalculationError } from '../../types/calculator-controller-type';

export interface CalculationMethod {
  id: string;
  requiredVariables: string[];
  formula: string;
  description: string;
  priority: number; // Menor número = mayor prioridad
  calculate: (values: Record<string, number>) => number;
  validate?: (values: Record<string, number>) => CalculationError | null;
}

export interface MultiMethodResult {
  value: number | null;
  unit: string;
  name: string;
  formula: string;
  methodUsed?: string;
  methodDescription?: string;
  availableMethods?: string[];
  error?: CalculationError;
  warnings?: string[];
}

export class MultiMethodCalculator {
  
  /**
   * Intenta calcular usando múltiples métodos en orden de prioridad
   */
  static calculateWithMultipleMethods(
    variableName: string,
    methods: CalculationMethod[],
    values: Record<string, number>,
    defaultUnit: string,
    displayName: string
  ): MultiMethodResult {
    
    const result: MultiMethodResult = {
      value: null,
      unit: defaultUnit,
      name: displayName,
      formula: '',
      availableMethods: []
    };

    // Filtrar métodos que tienen todas las variables requeridas
    const availableMethods = methods.filter(method => 
      method.requiredVariables.every(variable => 
        variable in values && 
        values[variable] !== undefined && 
        values[variable] !== null &&
        !isNaN(values[variable])
      )
    );

    if (availableMethods.length === 0) {
      result.error = {
        type: 'insufficient_data',
        message: 'No sufficient data for any calculation method',
        userMessage: `No hay suficientes datos para calcular ${displayName}`,
        suggestions: [
          'Necesitas proporcionar al menos una combinación válida de variables',
          'Revisa que todos los valores estén correctamente ingresados',
          'Verifica que no falten campos requeridos'
        ],
        technicalDetails: `Variables disponibles: ${Object.keys(values).join(', ')}`
      };
      return result;
    }

    // Ordenar por prioridad (menor número = mayor prioridad)
    availableMethods.sort((a, b) => a.priority - b.priority);
    
    // Lista de métodos disponibles para información del usuario
    result.availableMethods = availableMethods.map(m => m.description);

    // Intentar cada método hasta encontrar uno que funcione
    for (const method of availableMethods) {
      try {
        // Validación específica del método (si existe)
        if (method.validate) {
          const validationError = method.validate(values);
          if (validationError) {
            // Si es el único método disponible, mostrar el error
            if (availableMethods.length === 1) {
              result.error = validationError;
              return result;
            }
            // Si hay otros métodos, continuar con el siguiente
            continue;
          }
        }

        // Realizar el cálculo
        const calculatedValue = method.calculate(values);
        
        // Verificar que el resultado sea válido
        if (isNaN(calculatedValue) || !isFinite(calculatedValue)) {
          if (availableMethods.length === 1) {
            result.error = {
              type: 'mathematical_error',
              message: 'Calculation resulted in invalid value',
              userMessage: 'El cálculo produjo un resultado inválido',
              suggestions: [
                'Verifica que todos los valores sean correctos',
                'Asegúrate de que no haya divisiones por cero',
                'Revisa que los valores estén en rangos físicamente posibles'
              ],
              technicalDetails: `Método usado: ${method.description}, Resultado: ${calculatedValue}`
            };
            return result;
          }
          continue;
        }

        // Éxito - asignar resultado
        result.value = calculatedValue;
        result.formula = method.formula;
        result.methodUsed = method.id;
        result.methodDescription = method.description;
        
        // Agregar warning si hay múltiples métodos disponibles
        if (availableMethods.length > 1) {
          result.warnings = [
            `Se usó el método: ${method.description}`,
            `Otros métodos disponibles: ${availableMethods.filter(m => m.id !== method.id).map(m => m.description).join(', ')}`
          ];
        }
        
        return result;
        
      } catch (error) {
        // Si es el último método, propagar el error
        if (method === availableMethods[availableMethods.length - 1]) {
          result.error = CalculationErrorHandler.handleCalculationError(error, variableName);
          return result;
        }
        // Si hay más métodos, continuar
        continue;
      }
    }

    // Si llegamos aquí, ningún método funcionó
    result.error = {
      type: 'mathematical_error',
      message: 'All calculation methods failed',
      userMessage: 'Ningún método de cálculo pudo completarse exitosamente',
      suggestions: [
        'Verifica que todos los valores sean correctos',
        'Asegúrate de que los valores estén en rangos físicamente posibles',
        'Intenta con diferentes combinaciones de variables'
      ],
      technicalDetails: `Se intentaron ${availableMethods.length} métodos diferentes`
    };

    return result;
  }
}