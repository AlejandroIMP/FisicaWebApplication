import { type CalculationResult, type CalculationError, type ValidationResult } from '../../types/calculator-controller-type';

export class CalculationErrorHandler {
  
  /**
   * Valida los valores de entrada para un cálculo específico
   */
  static validateInputs(
    variableToSolve: string,
    values: Record<string, number>,
    requiredFields: string[],
    fieldLabels: Record<string, string> = {}
  ): ValidationResult {
    
    // 1. Verificar valores faltantes
    const missingFields = requiredFields.filter(field => 
      !(field in values) || values[field] === undefined || values[field] === null
    );
    
    // if (missingFields.length > 0) {
    //   return {
    //     isValid: false,
    //     error: {
    //       type: 'missing_values',
    //       message: `Missing required fields: ${missingFields.join(', ')}`,
    //       userMessage: 'Faltan valores requeridos para realizar el cálculo',
    //       suggestions: [
    //         'Completa todos los campos marcados como requeridos',
    //         'Verifica que hayas ingresado valores numéricos válidos',
    //         'Asegúrate de no dejar campos en blanco'
    //       ],
    //       missingFields: missingFields.map(field => fieldLabels[field] || field)
    //     }
    //   };
    // }

    // 2. Verificar valores inválidos (NaN, infinito)
    const invalidFields: string[] = [];
    const processedValues: Record<string, number> = {};
    
    for (const [key, value] of Object.entries(values)) {
      if (requiredFields.includes(key)) {
        if (isNaN(value) || !isFinite(value)) {
          invalidFields.push(key);
        } else {
          processedValues[key] = value;
        }
      }
    }
    
    if (invalidFields.length > 0) {
      return {
        isValid: false,
        error: {
          type: 'invalid_values',
          message: `Invalid values in fields: ${invalidFields.join(', ')}`,
          userMessage: 'Algunos valores ingresados no son válidos',
          suggestions: [
            'Verifica que todos los números estén correctamente escritos',
            'No uses caracteres especiales, solo números y punto decimal',
            'Asegúrate de que los valores sean finitos (no infinito)'
          ],
          invalidFields: invalidFields.map(field => fieldLabels[field] || field)
        }
      };
    }

    // 3. Validaciones específicas por contexto
    const contextError = this.validateContextSpecific(variableToSolve, processedValues);
    if (contextError) {
      return {
        isValid: false,
        error: contextError
      };
    }

    return {
      isValid: true,
      processedValues
    };
  }

  /**
   * Validaciones específicas según el contexto del cálculo
   */
  private static validateContextSpecific(
    variableToSolve: string,
    values: Record<string, number>
  ): CalculationError | null {
    
    // División por cero
    if (variableToSolve === 'mass' && 'acceleration' in values && values.acceleration === 0) {
      return {
        type: 'division_by_zero',
        message: 'Cannot divide by zero acceleration',
        userMessage: 'No se puede calcular la masa con aceleración cero',
        suggestions: [
          'Ingresa una aceleración diferente de cero',
          'Verifica que el valor de aceleración sea correcto',
          'Si realmente la aceleración es cero, usa otro método de cálculo'
        ],
        technicalDetails: 'masa = fuerza / aceleración (la aceleración no puede ser 0)'
      };
    }

    if (variableToSolve === 'acceleration' && 'mass' in values && values.mass === 0) {
      return {
        type: 'division_by_zero',
        message: 'Cannot divide by zero mass',
        userMessage: 'No se puede calcular la aceleración con masa cero',
        suggestions: [
          'Ingresa una masa diferente de cero',
          'Verifica que el valor de masa sea correcto',
          'La masa debe ser un número positivo'
        ],
        technicalDetails: 'aceleración = fuerza / masa (la masa no puede ser 0)'
      };
    }

    // Valores negativos no físicos
    if ('mass' in values && values.mass < 0) {
      return {
        type: 'out_of_range',
        message: 'Mass cannot be negative',
        userMessage: 'La masa no puede ser negativa',
        suggestions: [
          'Ingresa un valor positivo para la masa',
          'Verifica que no hayas puesto un signo negativo por error',
          'La masa siempre debe ser mayor que cero'
        ],
        technicalDetails: 'La masa es una magnitud escalar positiva'
      };
    }

    if ('time' in values && values.time < 0) {
      return {
        type: 'out_of_range',
        message: 'Time cannot be negative',
        userMessage: 'El tiempo no puede ser negativo',
        suggestions: [
          'Ingresa un valor positivo para el tiempo',
          'Verifica que no hayas puesto un signo negativo por error',
          'El tiempo debe ser mayor o igual a cero'
        ],
        technicalDetails: 'En estos cálculos, el tiempo debe ser positivo'
      };
    }

    // Ángulos fuera de rango razonable
    if ('angle' in values && (values.angle < -360 || values.angle > 360)) {
      return {
        type: 'out_of_range',
        message: 'Angle out of reasonable range',
        userMessage: 'El ángulo está fuera del rango esperado',
        suggestions: [
          'Ingresa un ángulo entre -360° y 360°',
          'Verifica que el ángulo esté en grados, no radianes',
          'Si es necesario, reduce el ángulo a su equivalente en un giro'
        ],
        technicalDetails: 'Los ángulos se esperan en grados (-360° a 360°)'
      };
    }

    // Coeficientes de fricción fuera de rango físico
    if ('frictionCoefficient' in values && (values.frictionCoefficient < 0 || values.frictionCoefficient > 2)) {
      return {
        type: 'out_of_range',
        message: 'Friction coefficient out of physical range',
        userMessage: 'El coeficiente de fricción está fuera del rango físico típico',
        suggestions: [
          'Los coeficientes de fricción suelen estar entre 0 y 2',
          'Verifica que el valor sea correcto',
          'μ = 0 significa sin fricción, μ > 1 significa fricción muy alta'
        ],
        technicalDetails: 'Coeficientes típicos: hielo 0.1, madera 0.5, goma 1.5'
      };
    }

    // Validaciones para sistema de masas
    if (variableToSolve.startsWith('system') && 'mass1' in values && 'mass2' in values) {
      if (values.mass1 <= 0 || values.mass2 <= 0) {
        return {
          type: 'out_of_range',
          message: 'System masses must be positive',
          userMessage: 'Las masas del sistema deben ser positivas',
          suggestions: [
            'Ambas masas deben ser mayores que cero',
            'Verifica los valores de masa1 y masa2',
            'No pueden existir masas negativas o cero en este sistema'
          ],
          technicalDetails: 'Sistema de dos masas requiere m₁ > 0 y m₂ > 0'
        };
      }
    }

    return null;
  }

  /**
   * Maneja errores que ocurren durante el cálculo
   */
  static handleCalculationError(error: any, variableToSolve: string): CalculationError {
    
    // Error matemático genérico
    if (error instanceof Error) {
      if (error.message.includes('division by zero') || error.message.includes('divide by zero')) {
        return {
          type: 'division_by_zero',
          message: error.message,
          userMessage: 'Error de división por cero en el cálculo',
          suggestions: [
            'Verifica que no hay valores cero donde no deberían estar',
            'Revisa las fórmulas utilizadas',
            'Contacta soporte si el problema persiste'
          ],
          technicalDetails: error.message
        };
      }

      if (error.message.includes('NaN') || error.message.includes('infinite')) {
        return {
          type: 'mathematical_error',
          message: error.message,
          userMessage: 'Error matemático en el cálculo',
          suggestions: [
            'Verifica que todos los valores sean números válidos',
            'Revisa que no hay operaciones indefinidas',
            'Intenta con valores diferentes'
          ],
          technicalDetails: error.message
        };
      }
    }

    // Error genérico
    return {
      type: 'mathematical_error',
      message: 'Unknown calculation error',
      userMessage: 'Ocurrió un error inesperado durante el cálculo',
      suggestions: [
        'Verifica todos los valores ingresados',
        'Intenta realizar el cálculo nuevamente',
        'Si el problema persiste, contacta soporte técnico'
      ],
      technicalDetails: error?.toString() || 'Error desconocido'
    };
  }

  /**
   * Genera un mensaje de error amigable para el usuario
   */
  static formatErrorMessage(error: CalculationError): string {
    let message = `❌ ${error.userMessage}\n\n`;
    
    if (error.missingFields && error.missingFields.length > 0) {
      message += `📋 Campos faltantes: ${error.missingFields.join(', ')}\n\n`;
    }
    
    if (error.invalidFields && error.invalidFields.length > 0) {
      message += `⚠️ Campos con valores inválidos: ${error.invalidFields.join(', ')}\n\n`;
    }
    
    message += '💡 Sugerencias:\n';
    error.suggestions.forEach((suggestion, index) => {
      message += `   ${index + 1}. ${suggestion}\n`;
    });
    
    if (error.technicalDetails) {
      message += `\n🔧 Detalles técnicos: ${error.technicalDetails}`;
    }
    
    return message;
  }

  /**
   * Genera un objeto de resultado con error formateado
   */
  static createErrorResult(error: CalculationError): CalculationResult {
    return {
      value: null,
      unit: '',
      name: 'Error en el cálculo',
      formula: '',
      error: error,
      errorMessage: this.formatErrorMessage(error)
    };
  }
}