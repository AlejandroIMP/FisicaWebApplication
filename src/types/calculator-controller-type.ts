export interface CalculationResult {
  value: number | null;
  unit: string;
  name: string;
  formula: string;
  direction?: string;
  error?: CalculationError;
  errorMessage?: string;
  warnings?: string[];
  methodUsed?: string;
  availableMethods?: string[];
}


export interface CalculationError {
  type: 'missing_values' | 'invalid_values' | 'division_by_zero' | 'mathematical_error' | 'out_of_range' | 'incompatible_units' | 'insufficient_data';
  message: string;
  userMessage: string;
  suggestions: string[];
  missingFields?: string[];
  invalidFields?: string[];
  technicalDetails?: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: CalculationError;
  processedValues?: Record<string, number>;
}