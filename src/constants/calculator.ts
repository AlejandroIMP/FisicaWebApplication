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
  ],
  
  // Unidades para Segunda Ley de Newton
  force: [
    { value: 'N', label: 'N' },
    { value: 'kN', label: 'kN' },
    { value: 'dyn', label: 'dyn' },
    { value: 'lbf', label: 'lbf' }
  ],
  mass: [
    { value: 'kg', label: 'kg' },
    { value: 'g', label: 'g' },
    { value: 'lb', label: 'lb' },
    { value: 't', label: 't' }
  ],
  acceleration: [
    { value: 'm/s²', label: 'm/s²' },
    { value: 'cm/s²', label: 'cm/s²' },
    { value: 'ft/s²', label: 'ft/s²' },
    { value: 'g', label: 'g' }
  ],
  
  // Unidades para cálculos avanzados de Segunda Ley de Newton
  angle: [
    { value: 'deg', label: '°' },
    { value: 'rad', label: 'rad' }
  ],
  coefficient: [
    { value: 'dimensionless', label: 'sin unidad' }
  ]
};

// Variables para Segunda Ley de Newton
export const NEWTON_SECOND_LAW_VARIABLES = [
  { value: 'force', label: 'Fuerza (F)' },
  { value: 'mass', label: 'Masa (m)' },
  { value: 'acceleration', label: 'Aceleración (a)' }
];


// Variables para Segunda Ley de Newton Avanzada
export const NEWTON_ADVANCED_VARIABLES = [
  // Variables básicas
  { value: 'force', label: 'Fuerza Resultante (F)' },
  { value: 'mass', label: 'Masa (m)' },
  { value: 'acceleration', label: 'Aceleración Resultante (a)' },
  
  // Componentes bidimensionales
  { value: 'forceX', label: 'Fuerza en X (Fx)' },
  { value: 'forceY', label: 'Fuerza en Y (Fy)' },
  { value: 'accelerationX', label: 'Aceleración en X (ax)' },
  { value: 'accelerationY', label: 'Aceleración en Y (ay)' },
  { value: 'angle', label: 'Ángulo de la Fuerza (θ)' },
  
  // Fuerzas múltiples y fricción
  { value: 'appliedForce', label: 'Fuerza Aplicada (Fap)' },
  { value: 'frictionForce', label: 'Fuerza de Fricción (Ff)' },
  { value: 'normalForce', label: 'Fuerza Normal (N)' },
  { value: 'frictionCoefficient', label: 'Coeficiente de Fricción (μ)' }
];

export const NEWTON_ADVANCED_FORMULAS = [
  // Fórmulas básicas
  { 
    formula: 'F = m × a', 
    description: 'Segunda Ley de Newton - Fuerza neta',
    example: 'Si m = 10 kg y a = 2 m/s², entonces F = 20 N'
  },
  
  // Componentes bidimensionales
  { 
    formula: 'Fx = F × cos(θ)', 
    description: 'Componente horizontal de la fuerza',
    example: 'Si F = 100 N y θ = 30°, entonces Fx = 86.6 N'
  },
  { 
    formula: 'Fy = F × sin(θ)', 
    description: 'Componente vertical de la fuerza',
    example: 'Si F = 100 N y θ = 30°, entonces Fy = 50 N'
  },
  { 
    formula: 'F = √(Fx² + Fy²)', 
    description: 'Magnitud de la fuerza resultante',
    example: 'Si Fx = 86.6 N y Fy = 50 N, entonces F = 100 N'
  },
  { 
    formula: 'θ = arctan(Fy / Fx)', 
    description: 'Ángulo de la fuerza resultante',
    example: 'Si Fx = 86.6 N y Fy = 50 N, entonces θ = 30°' 
  },
  
  // Aceleraciones por componentes
  { 
    formula: 'ax = Fx / m', 
    description: 'Aceleración en componente X',
    example: 'Si Fx = 20 N y m = 10 kg, entonces ax = 2 m/s²' 
  },
  { 
    formula: 'ay = Fy / m', 
    description: 'Aceleración en componente Y',
    example: 'Si Fy = 10 N y m = 10 kg, entonces ay = 1 m/s²' 
  },
  { 
    formula: 'a = √(ax² + ay²)', 
    description: 'Aceleración resultante',
    example: 'Si ax = 2 m/s² y ay = 1 m/s², entonces a = √(2² + 1²) = √5 ≈ 2.24 m/s²' 
  },
  
  // Fricción
  { 
    formula: 'Ff = μ × N', 
    description: 'Fuerza de fricción',
    example: 'Si μ = 0.5 y N = 100 N, entonces Ff = 50 N' 
  },
  { 
    formula: 'N = m × g × cos(θ)', 
    description: 'Fuerza normal en plano inclinado',
    example: 'Si m = 10 kg, g = 9.81 m/s² y θ = 30°, entonces N = 10 × 9.81 × cos(30°) ≈ 84.87 N'
  },
  { 
    formula: 'Fneta = Fap - Ff', 
    description: 'Fuerza neta considerando fricción',
    example: 'Si Fap = 100 N y Ff = 50 N, entonces Fneta = 50 N' 
  }
];

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
    description: 'Velocidad angular en función del periodo o frecuencia',
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

export const NEWTON_SECOND_LAW_FORMULAS = [
  { 
    formula: 'F = m × a', 
    description: 'Fuerza resultante en función de la masa y aceleración' 
  },
  { 
    formula: 'a = F / m', 
    description: 'Aceleración en función de la fuerza y masa' 
  },
  { 
    formula: 'm = F / a', 
    description: 'Masa en función de la fuerza y aceleración' 
  }
];

// Variables y fórmulas para Segunda Ley de Newton Avanzada
// export const NEWTON_ADVANCED_VARIABLES = [
//   { value: 'force', label: 'Fuerza Resultante (F)' },
//   { value: 'mass', label: 'Masa (m)' },
//   { value: 'acceleration', label: 'Aceleración (a)' },
//   { value: 'forceX', label: 'Fuerza en X (Fx)' },
//   { value: 'forceY', label: 'Fuerza en Y (Fy)' },
//   { value: 'accelerationX', label: 'Aceleración en X (ax)' },
//   { value: 'accelerationY', label: 'Aceleración en Y (ay)' },
//   { value: 'angle', label: 'Ángulo de Aplicación (θ)' },
//   { value: 'appliedForce', label: 'Fuerza Aplicada (Fa)' },
//   { value: 'frictionForce', label: 'Fuerza de Fricción (Ff)' },
//   { value: 'normalForce', label: 'Fuerza Normal (N)' },
//   { value: 'frictionCoefficient', label: 'Coeficiente de Fricción (μ)' }
// ];


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
  },
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

export const NEWTON_SECOND_LAW_CONFIG = {
  title: "Segunda Ley de Newton",
  description: "Calculadora de la Segunda Ley de Newton (F = ma)",
  calculatorTitle: "Calculadora Segunda Ley de Newton",
  calculatorDescription: "Selecciona la incógnita que deseas calcular y completa los valores conocidos",
  variables: NEWTON_SECOND_LAW_VARIABLES,
  formulas: NEWTON_SECOND_LAW_FORMULAS,
  variableGroups: {
    force: ['mass', 'acceleration'],
    mass: ['force', 'acceleration'],
    acceleration: ['force', 'mass']
  }
};

export const NEWTON_ADVANCED_CONFIG = {
  title: "Segunda Ley de Newton - Avanzada",
  description: "Calculadora avanzada de la Segunda Ley de Newton con fuerzas múltiples, componentes 2D y fricción",
  calculatorTitle: "Calculadora Avanzada - Segunda Ley de Newton",
  calculatorDescription: "Analiza sistemas complejos con múltiples fuerzas, componentes bidimensionales y fricción",
  variables: NEWTON_ADVANCED_VARIABLES,
  formulas: NEWTON_ADVANCED_FORMULAS,
  variableGroups: {
    force: ['forceX', 'forceY', 'mass', 'acceleration'],
    forceX: ['force', 'angle', 'mass', 'accelerationX'],
    forceY: ['force', 'angle', 'mass', 'accelerationY'],
    accelerationX: ['forceX', 'mass'],
    accelerationY: ['forceY', 'mass'],
    appliedForce: ['frictionForce', 'mass', 'acceleration', 'angle'],
    frictionForce: ['frictionCoefficient', 'normalForce'],
    normalForce: ['mass', 'angle'],
    frictionCoefficient: ['frictionForce', 'normalForce']
  }
};

// Variables para Fuerzas Múltiples - Segunda Ley de Newton
export const NEWTON_MULTIPLE_FORCES_VARIABLES = [
  { value: 'netForce', label: 'Fuerza Neta (F_neta)' },
  { value: 'acceleration', label: 'Aceleración (a)' },
  { value: 'mass', label: 'Masa (m)' },
  { value: 'multipleForces', label: 'Fuerzas Múltiples' }
];

export const NEWTON_MULTIPLE_FORCES_FORMULAS = [
  { 
    formula: 'F_neta = √(Fx² + Fy²)', 
    description: 'Fuerza neta a partir de componentes',
    example: 'Si Fx = 30 N y Fy = 40 N, entonces F_neta = √(30² + 40²) = 50 N'
  },
  { 
    formula: 'Fx = Σ(Fi × cos(θi))', 
    description: 'Componente X de la fuerza neta',
    example: 'F₁ = 100N a 0°, F₂ = 50N a 90° → Fx = 100×cos(0°) + 50×cos(90°) = 100 N'
  },
  { 
    formula: 'Fy = Σ(Fi × sin(θi))', 
    description: 'Componente Y de la fuerza neta',
    example: 'F₁ = 100N a 0°, F₂ = 50N a 90° → Fy = 100×sin(0°) + 50×sin(90°) = 50 N'
  },
  { 
    formula: 'θ = arctan(Fy / Fx)', 
    description: 'Ángulo de la fuerza neta',
    example: 'Si Fx = 100 N y Fy = 50 N, entonces θ = arctan(50/100) = 26.57°'
  },
  { 
    formula: 'a = F_neta / m', 
    description: 'Aceleración a partir de fuerza neta',
    example: 'Si F_neta = 50 N y m = 10 kg, entonces a = 5 m/s²'
  },
  { 
    formula: 'm = F_neta / a', 
    description: 'Masa a partir de fuerza neta',
    example: 'Si F_neta = 50 N y a = 5 m/s², entonces m = 10 kg'
  }
];

export const NEWTON_MULTIPLE_FORCES_CONFIG = {
  title: "Segunda Ley de Newton - Fuerzas Múltiples",
  description: "Calculadora para múltiples fuerzas aplicadas y cálculo de fuerza neta",
  calculatorTitle: "Calculadora de Fuerzas Múltiples",
  calculatorDescription: "Ingresa múltiples fuerzas para calcular la fuerza neta y aplicar la Segunda Ley de Newton",
  variables: NEWTON_MULTIPLE_FORCES_VARIABLES,
  formulas: NEWTON_MULTIPLE_FORCES_FORMULAS,
  variableGroups: {
    netForce: ['multipleForces'],
    acceleration: ['netForce', 'mass', 'multipleForces'],
    mass: ['netForce', 'acceleration', 'multipleForces'],
    multipleForces: ['netForce', 'acceleration', 'mass']
  }
};
