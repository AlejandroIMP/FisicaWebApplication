// Unidades compartidas por diferentes calculadoras
export const UNITS = {
  // Unidades lineales
  radius: [
    { value: 'm', label: 'm' },
    { value: 'cm', label: 'cm' },
    { value: 'km', label: 'km' }
  ],
  linearVelocity: [
    { value: 'm/s', label: 'm/s' },
    { value: 'km/h', label: 'km/h' },
    { value: 'cm/s', label: 'cm/s' }
  ],
  linearAcceleration: [
    { value: 'm/s²', label: 'm/s²' },
    { value: 'g', label: 'g' },
    { value: 'cm/s²', label: 'cm/s²' }
  ],
  
  // Unidades angulares
  angularVelocity: [
    { value: 'rad/s', label: 'rad/s' },
    { value: 'deg/s', label: '°/s' },
    { value: 'rpm', label: 'rpm' }
  ],
  angularAcceleration: [
    { value: 'rad/s²', label: 'rad/s²' },
    { value: 'deg/s²', label: '°/s²' },
    { value: 'rpm/s', label: 'rpm/s' }
  ],
  angularDisplacement: [
    { value: 'rad', label: 'rad' },
    { value: 'deg', label: '°' },
    { value: 'rev', label: 'vueltas' }
  ],
  
  // Unidades temporales
  time: [
    { value: 's', label: 's' },
    { value: 'min', label: 'min' },
    { value: 'h', label: 'h' }
  ],
  period: [
    { value: 's', label: 's' },
    { value: 'min', label: 'min' },
    { value: 'h', label: 'h' }
  ],
  frequency: [
    { value: 'Hz', label: 'Hz' },
    { value: 'kHz', label: 'kHz' },
    { value: 'rpm', label: 'rpm' }
  ],
  
  // Otras unidades específicas
  centripetalAcceleration: [
    { value: 'm/s²', label: 'm/s²' },
    { value: 'g', label: 'g' },
    { value: 'cm/s²', label: 'cm/s²' }
  ],
  tangentialAcceleration: [
    { value: 'm/s²', label: 'm/s²' },
    { value: 'g', label: 'g' },
    { value: 'cm/s²', label: 'cm/s²' }
  ],
  totalAcceleration: [
    { value: 'm/s²', label: 'm/s²' },
    { value: 'g', label: 'g' },
    { value: 'cm/s²', label: 'cm/s²' }
  ],
  
  // Unidades para MCUA
  initialAngularVelocity: [
    { value: 'rad/s', label: 'rad/s' },
    { value: 'deg/s', label: '°/s' },
    { value: 'rpm', label: 'rpm' }
  ],
  finalAngularVelocity: [
    { value: 'rad/s', label: 'rad/s' },
    { value: 'deg/s', label: '°/s' },
    { value: 'rpm', label: 'rpm' }
  ]
};

// Variables y fórmulas para MCU
export const MCU_VARIABLES = [
  { value: 'radius', label: 'Radio (r)' },
  { value: 'angularVelocity', label: 'Velocidad Angular (ω)' },
  { value: 'linearVelocity', label: 'Velocidad Lineal (v)' },
  { value: 'period', label: 'Periodo (T)' },
  { value: 'frequency', label: 'Frecuencia (f)' },
  { value: 'centripetalAcceleration', label: 'Aceleración Centrípeta (a)' },
  { value: 'angularDisplacement', label: 'Desplazamiento Angular (θ)' },
  { value: 'time', label: 'Tiempo (t)' }
];

export const MCU_FORMULAS = [
  { 
    formula: 'ω = 2π / T = 2π × f', 
    description: 'Velocidad angular en función del periodo o frecuencia' 
  },
  { 
    formula: 'v = ω × r', 
    description: 'Velocidad lineal en función de la velocidad angular y el radio' 
  },
  { 
    formula: 'a = v² / r = ω² × r', 
    description: 'Aceleración centrípeta' 
  },
  { 
    formula: 'T = 2π × r / v = 2π / ω', 
    description: 'Periodo del movimiento' 
  },
  { 
    formula: 'f = 1 / T = ω / 2π', 
    description: 'Frecuencia del movimiento' 
  },
  { 
    formula: 'θ = ω × t', 
    description: 'Desplazamiento angular en función del tiempo' 
  }
];

// Variables y fórmulas para MCUA
export const MCUA_VARIABLES = [
  { value: 'initialAngularVelocity', label: 'Velocidad Angular Inicial (ω₀)' },
  { value: 'finalAngularVelocity', label: 'Velocidad Angular Final (ω)' },
  { value: 'angularAcceleration', label: 'Aceleración Angular (α)' },
  { value: 'angularDisplacement', label: 'Desplazamiento Angular (θ)' },
  { value: 'time', label: 'Tiempo (t)' },
  { value: 'radius', label: 'Radio (r)' },
  { value: 'tangentialAcceleration', label: 'Aceleración Tangencial (aₜ)' },
  { value: 'centripetalAcceleration', label: 'Aceleración Centrípeta (aₙ)' },
  { value: 'totalAcceleration', label: 'Aceleración Total (aₜₒₜₐₗ)' }
];

export const MCUA_FORMULAS = [
  { 
    formula: 'ω = ω₀ + α × t', 
    description: 'Velocidad angular en función del tiempo' 
  },
  { 
    formula: 'θ = ω₀ × t + ½ × α × t²', 
    description: 'Desplazamiento angular en función del tiempo' 
  },
  { 
    formula: 'ω² = ω₀² + 2 × α × θ', 
    description: 'Relación entre velocidades angulares, aceleración y desplazamiento' 
  },
  { 
    formula: 'aₜ = α × r', 
    description: 'Aceleración tangencial' 
  },
  { 
    formula: 'aₙ = ω² × r', 
    description: 'Aceleración normal o centrípeta' 
  },
  { 
    formula: 'aₜₒₜₐₗ = √(aₙ² + aₜ²)', 
    description: 'Aceleración total' 
  }
];

// Configuraciones para los calculadores
export const MCU_CONFIG = {
  title: "Movimiento Circular Uniforme",
  description: "Calculadora de Movimiento Circular Uniforme",
  calculatorTitle: "Calculadora MCU",
  calculatorDescription: "Selecciona la incógnita que deseas calcular y completa los valores conocidos",
  variables: MCU_VARIABLES,
  formulas: MCU_FORMULAS,
  variableGroups: {
    radius: ['angularVelocity', 'linearVelocity', 'period', 'frequency', 'centripetalAcceleration'],
    angularVelocity: ['radius', 'linearVelocity', 'period', 'frequency', 'centripetalAcceleration', 'angularDisplacement', 'time'],
    linearVelocity: ['radius', 'angularVelocity', 'period', 'frequency', 'centripetalAcceleration'],
    period: ['angularVelocity', 'frequency', 'radius', 'linearVelocity'],
    frequency: ['period', 'angularVelocity'],
    centripetalAcceleration: ['linearVelocity', 'radius', 'angularVelocity'],
    angularDisplacement: ['angularVelocity', 'time'],
    time: ['angularVelocity', 'angularDisplacement']
  }
};

export const MCUA_CONFIG = {
  title: "Movimiento Circular Uniformemente Acelerado",
  description: "Calculadora de Movimiento Circular Uniformemente Acelerado",
  calculatorTitle: "Calculadora MCUA",
  calculatorDescription: "Selecciona la incógnita que deseas calcular y completa los valores conocidos",
  variables: MCUA_VARIABLES,
  formulas: MCUA_FORMULAS,
  variableGroups: {
    initialAngularVelocity: ['finalAngularVelocity', 'angularAcceleration', 'time', 'angularDisplacement'],
    finalAngularVelocity: ['initialAngularVelocity', 'angularAcceleration', 'time', 'angularDisplacement'],
    angularAcceleration: ['initialAngularVelocity', 'finalAngularVelocity', 'time', 'angularDisplacement', 'radius', 'tangentialAcceleration'],
    angularDisplacement: ['initialAngularVelocity', 'finalAngularVelocity', 'angularAcceleration', 'time'],
    time: ['initialAngularVelocity', 'finalAngularVelocity', 'angularAcceleration', 'angularDisplacement'],
    radius: ['tangentialAcceleration', 'angularAcceleration'],
    tangentialAcceleration: ['angularAcceleration', 'radius'],
    centripetalAcceleration: ['initialAngularVelocity', 'finalAngularVelocity', 'radius'],
    totalAcceleration: ['centripetalAcceleration', 'tangentialAcceleration']
  }
};
