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
    { value: 'h', label: 'h' },
    { value: 'day', label: 'día' },
    { value: 'week', label: 'semana' },
    { value: 'month', label: 'mes' },
    { value: 'year', label: 'año' }
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
    { value: 'lbf', label: 'lbf' },
    { value: 'kgf', label: 'kgf' },
    { value: 'kip', label: 'kip' },
    { value: 'poundal', label: 'poundal' }
  ],
  mass: [
    { value: 'kg', label: 'kg' },
    { value: 'g', label: 'g' },
    { value: 'lb', label: 'lb' },
    { value: 't', label: 't' },
    { value: 'slug', label: 'slug' },
    { value: 'stone', label: 'stone' },
    { value: 'oz', label: 'oz' }
  ],
  acceleration: [
    { value: 'm/s²', label: 'm/s²' },
    { value: 'cm/s²', label: 'cm/s²' },
    { value: 'ft/s²', label: 'ft/s²' },
    { value: 'g', label: 'g' },
    { value: 'in/s²', label: 'in/s²' },
    { value: 'km/h²', label: 'km/h²' },
  ],
  
  // Unidades para cálculos avanzados de Segunda Ley de Newton
  angle: [
    { value: 'deg', label: '°' },
    { value: 'rad', label: 'rad' },
    { value: 'grad', label: 'grad' },
    { value: 'turn', label: 'vueltas' }
  ],
  coefficient: [
    { value: 'dimensionless', label: 'sin unidad' }
  ],

  // Unidades para MRU

  distance: [
    { value: 'm', label: 'm' },
    { value: 'km', label: 'km' },
    { value: 'cm', label: 'cm' },
    { value: 'mm', label: 'mm' },
    { value: 'mi', label: 'mi' },
    { value: 'yd', label: 'yd' },
    { value: 'ft', label: 'ft' },
    { value: 'in', label: 'in' }
  ],
  velocity: [
    { value: 'm/s', label: 'm/s' },
    { value: 'km/h', label: 'km/h' },
    { value: 'cm/s', label: 'cm/s' },
    { value: 'mm/s', label: 'mm/s' },
    { value: 'mi/h', label: 'mi/h' },
    { value: 'yd/s', label: 'yd/s' },
    { value: 'ft/s', label: 'ft/s' },
    { value: 'in/s', label: 'in/s' }
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
    description: 'Velocidad angular en función del periodo o frecuencia',
    example: 'Si T = 2 s, entonces ω = π rad/s'
  },
  { 
    formula: 'v = ω × r', 
    description: 'Velocidad lineal en función de la velocidad angular y el radio',
    example: 'Si ω = π rad/s y r = 1 m, entonces v = π m/s'
  },
  { 
    formula: 'a = v² / r = ω² × r', 
    description: 'Aceleración centrípeta',
    example: 'Si v = 2 m/s y r = 1 m, entonces a = 4 m/s²'
  },
  { 
    formula: 'T = 2π × r / v = 2π / ω', 
    description: 'Periodo del movimiento',
    example: 'Si r = 1 m y v = π m/s, entonces T = 2 s'
  },
  { 
    formula: 'f = 1 / T = ω / 2π', 
    description: 'Frecuencia del movimiento',
    example: 'Si T = 2 s, entonces f = 0.5 Hz'
  },
  { 
    formula: 'θ = ω × t', 
    description: 'Desplazamiento angular en función del tiempo',
    example: 'Si ω = π rad/s y t = 2 s, entonces θ = 2π rad'
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
    description: 'Velocidad angular en función del tiempo',
    example: 'Si ω₀ = 0 rad/s, α = 2 rad/s² y t = 3 s, entonces ω = 6 rad/s'
  },
  { 
    formula: 'θ = ω₀ × t + ½ × α × t²', 
    description: 'Desplazamiento angular en función del tiempo',
    example: 'Si ω₀ = 0 rad/s, α = 2 rad/s² y t = 3 s, entonces θ = 9 rad'
  },
  { 
    formula: 'ω² = ω₀² + 2 × α × θ', 
    description: 'Relación entre velocidades angulares, aceleración y desplazamiento',
    example: 'Si ω₀ = 0 rad/s, α = 2 rad/s² y θ = 9 rad, entonces ω = 6 rad/s' 
  },
  { 
    formula: 'aₜ = α × r', 
    description: 'Aceleración tangencial',
    example: 'Si α = 2 rad/s² y r = 1 m, entonces aₜ = 2 m/s²'
  },
  { 
    formula: 'aₙ = ω² × r', 
    description: 'Aceleración normal o centrípeta',
    example: 'Si ω = 6 rad/s y r = 1 m, entonces aₙ = 36 m/s²'
  },
  { 
    formula: 'aₜₒₜₐₗ = √(aₙ² + aₜ²)', 
    description: 'Aceleración total',
    example: 'Si aₜ = 2 m/s² y aₙ = 36 m/s², entonces aₜₒₜₐₗ = √(36² + 2²) ≈ 36.16 m/s²'
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
  description: "Calculadora de la Segunda Ley de Newton",
  calculatorTitle: "Calculadora Segunda Ley de Newton",
  calculatorDescription: "Selecciona la incógnita que deseas calcular y completa los valores conocidos",
  variableGroups: {
    force: ['mass', 'acceleration'],
    mass: ['force', 'acceleration'],
    acceleration: ['force', 'mass'],
    weight: ['mass', 'gravity'],
    forceX: ['force', 'angle'],
    forceY: ['force', 'angle'],
    accelerationX: ['forceX', 'mass'],
    accelerationY: ['forceY', 'mass'],
    angle: ['forceX', 'forceY'],
    appliedForce: ['force', 'frictionForce'],
    frictionForce: ['appliedForce', 'normalForce', 'frictionCoefficient'],
    normalForce: ['mass', 'angle'],
    frictionCoefficient: ['frictionForce', 'normalForce'],
    parallelForce: ['mass', 'gravity', 'angle'],
    planetGravity: ['mass', 'radius'],

    // NUEVOS GRUPOS PARA FUERZA NETA
    netForce: ['appliedForce', 'frictionForce', 'mass', 'gravity', 'angle'],
    netForceComponents: ['forceX', 'forceY'],
    netForceInclined: ['mass', 'gravity', 'angle', 'frictionCoefficient'],
    maxStaticFriction: ['frictionCoefficient', 'normalForce'],
    momentumChange: ['force', 'time'],
    appliedForceWithFriction: ['frictionForce', 'normalForce', 'appliedForce'],
    frictionForceWithNormal: ['frictionCoefficient', 'normalForce'],
    normalForceInclinedPlane: ['mass', 'gravity', 'angle'],
  }
}

export const NEWTON_ADVANCED_VARIABLES = [
// Variables básicas
  { value: 'force', label: 'Fuerza Resultante (F)' },
  { value: 'mass', label: 'Masa (m)' },
  { value: 'acceleration', label: 'Aceleración Resultante (a)' },

  // Variables adicionales
  { value: 'weight', label: 'Peso (W)' },
  
  // Componentes bidimensionales
  { value: 'forceX', label: 'Fuerza en X (Fx)' },
  { value: 'forceY', label: 'Fuerza en Y (Fy)' },
  { value: 'accelerationX', label: 'Aceleración en X (ax)' },
  { value: 'accelerationY', label: 'Aceleración en Y (ay)' },
  { value: 'angle', label: 'Ángulo de la Fuerza (θ)' },
  
  // Fuerzas múltiples y fricción
  { value: 'appliedForce', label: 'Fuerza Aplicada (F_ap)' },
  { value: 'frictionForce', label: 'Fuerza de Fricción (Ff)' },
  { value: 'normalForce', label: 'Fuerza Normal (N)' },
  { value: 'frictionCoefficient', label: 'Coeficiente de Fricción (μ)' },

  // componente de la fuerza de gravedad en un plano inclinado
  { value: 'parallelForce', label: 'Fuerza Paralela al Plano Inclinado (F_parallela)' },

  // Aceleración gravitacional
  { value: 'planetGravity', label: 'Aceleración Gravitacional en Planeta (g)' },

  // Fuerza neta en un sistema con múltiples fuerzas - NUEVA VARIABLE
  { value: 'netForce', label: 'Fuerza Neta (F_net)' },
  { value: 'netForceComponents', label: 'Fuerza Neta por Componentes (F_net)' },
  { value: 'netForceInclined', label: 'Fuerza Neta en Plano Inclinado (F_net)' },

  // Fricción estática máxima
  { value: 'maxStaticFriction', label: 'Fricción Estática Máxima (Ff_max)' },

  // Fórmula general de la segunda ley en términos de cantidad de movimiento
  { value: 'momentumChange', label: 'Cambio de Cantidad de Movimiento (dp/dt)' },

  // Fuerzas aplicadas y fricción
  { value: 'appliedForceWithFriction', label: 'Fuerza Aplicada con Fricción (F_ap)' },
  { value: 'frictionForceWithNormal', label: 'Fuerza de Fricción con Normal (Ff)' },
  { value: 'normalForceInclinedPlane', label: 'Fuerza Normal en Plano Inclinado (N)' },
];

export const NEWTON_ADVANCED_FORMULAS = [
  // Fórmulas básicas
  { 
    formula: 'F = m × a', 
    description: 'Segunda Ley de Newton - Fuerza neta',
    example: 'Si m = 10 kg y a = 2 m/s², entonces F = 20 N'
  },

  {
    formula: 'W = m × g',
    description: 'Peso de un objeto en la Tierra',
    example: 'Si m = 10 kg, entonces W = 10 × 9.81 = 98.1 N'
  },

  // componente de la fuerza de gravedad en un plano inclinado
  {
    formula: 'F_parallela = m × g × sin(θ)',
    description: 'Componente de la fuerza de gravedad paralela al plano inclinado',
    example: 'Si m = 10 kg, g = 9.81 m/s² y θ = 30°, entonces F_parallel = 10 × 9.81 × sin(30°) ≈ 49.05 N'
  },

  // Aceleración gravitacional
  {
    formula: 'g = 9.81 m/s²',
    description: 'Aceleración gravitacional en la superficie de la Tierra',
    example: 'En la Tierra, g = 9.81 m/s²'
  },

  // Aceleracion gravitacional en planetas ajenos a la tierra
  {
    formula: 'g = G × M / r²',
    description: 'Aceleración gravitacional en un planeta o luna',
    example: 'Si G = 6.674 × 10⁻¹¹ m³/kg·s², M = 5.972 × 10²⁴ kg (masa de la Tierra) y r = 6.371 × 10⁶ m (radio de la Tierra), entonces g ≈ 9.81 m/s²'
  },


  // Fuerza neta en un sistema con múltiples fuerzas
  {
    formula: 'F_net = ΣF',
    description: 'Fuerza neta como la suma vectorial de todas las fuerzas actuantes',
    example: 'Si F1 = 10 N, F2 = -5 N y F3 = 3 N, entonces F_net = 10 - 5 + 3 = 8 N'
  },

  // Fricción estatica maxima
  {
    formula: 'Ff_max = μ_s × N',
    description: 'Fuerza de fricción estática máxima',
    example: 'Si μ_s = 0.5 y N = 100 N, entonces Ff_max = 50 N'
  },

  // Fuerza centripeta para movimiento circular
  {
    formula: 'Fc = m × v² / r',
    description: 'Fuerza centrípeta necesaria para mantener un objeto en movimiento circular',
    example: 'Si m = 10 kg, v = 5 m/s y r = 2 m, entonces Fc = 12.5 N'
  },

  // Formula general de la segunda ley en terminos de cantidad de movimiento
  {
    formula: 'F = dp/dt',
    description: 'Fuerza como la tasa de cambio de la cantidad de movimiento',
    example: 'Si la cantidad de movimiento cambia de 20 kg·m/s a 30 kg·m/s en 5 segundos, entonces F = (30 - 20) / 5 = 2 N'
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
    formula: 'Fneta = F_ap - Ff', 
    description: 'Fuerza neta considerando fricción',
    example: 'Si F_ap = 100 N y Ff = 50 N, entonces Fneta = 50 N' 
  },

  // Fuerzas aplicadas y fricción
  { 
    formula: 'F_ap = Ff + N × μ', 
    description: 'Fuerza aplicada considerando fricción',
    example: 'Si Ff = 50 N, N = 100 N y μ = 0.5, entonces F_ap = 50 + 100 × 0.5 = 100 N' 
  },
  { 
    formula: 'Ff = μ × N', 
    description: 'Fuerza de fricción en función del coeficiente de fricción y la fuerza normal',
    example: 'Si μ = 0.3 y N = 200 N, entonces Ff = 60 N' 
  },

  // Fuerza normal en un plano inclinado
  {
    formula: 'N = m × g × cos(θ)',
    description: 'Fuerza normal en un plano inclinado',
    example: 'Si m = 10 kg, g = 9.81 m/s² y θ = 30°, entonces N = 10 × 9.81 × cos(30°) ≈ 84.87 N'
  },
  // Coeficiente de fricción
  {
    formula: 'μ = Ff / N',
    description: 'Coeficiente de fricción en función de la fuerza de fricción y la fuerza normal',
    example: 'Si Ff = 50 N y N = 100 N, entonces μ = 0.5'
  },

];