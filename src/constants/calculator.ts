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
    radius: [
      'linearVelocity', 'angularVelocity',  // Método 1
      'linearVelocity', 'period',           // Método 2  
      'centripetalAcceleration', 'angularVelocity' // Método 3
    ],
    
    // Para velocidad angular: cualquiera de estas combinaciones
    angularVelocity: [
      'period',                            // Método 1
      'frequency',                         // Método 2
      'linearVelocity', 'radius',          // Método 3
      'angularDisplacement', 'time',       // Método 4
      'centripetalAcceleration', 'radius'  // Método 5
    ],
    
    // Para velocidad lineal
    linearVelocity: [
      'angularVelocity', 'radius',         // Método 1
      'period', 'radius',                  // Método 2
      'frequency', 'radius',               // Método 3
      'centripetalAcceleration', 'radius'  // Método 4
    ],
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
    systemAcceleration: ['mass1', 'mass2', 'angle1', 'angle2', 'gravity', 'frictionCoefficient1', 'frictionCoefficient2'],
    systemTension: ['mass1', 'mass2', 'angle1', 'angle2', 'gravity', 'frictionCoefficient1', 'frictionCoefficient2' ],
    systemDirection: ['mass1', 'mass2', 'angle1', 'angle2', 'gravity', 'frictionCoefficient1', 'frictionCoefficient2'],

    mass1: ['mass2', 'angle1', 'angle2', 'gravity'],
    mass2: ['mass1', 'angle1', 'angle2', 'gravity'],
    angle1: ['mass1', 'mass2', 'angle2', 'gravity'],
    angle2: ['mass1', 'mass2', 'angle1', 'gravity'],
    frictionCoefficient1: ['normalForce', 'frictionForce'],
    frictionCoefficient2: ['normalForce', 'frictionForce'],

    weight: ['mass', 'gravity'],
    forceX: ['force', 'angle'],
    forceY: ['force', 'angle'],
    accelerationX: ['forceX', 'mass'],
    accelerationY: ['forceY', 'mass'],
    angle: ['forceX', 'forceY'],
    appliedForce: ['force', 'frictionForce'],
    frictionForce: ['appliedForce', 'normalForce', 'frictionCoefficient'],
    normalForce: ['mass', 'angle', 'gravity', 'force', 'weight', 'appliedForce'],
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

  // 🔹 SISTEMA DE DOS MASAS EN PLANOS INCLINADOS
  { value: 'systemAcceleration', label: 'Aceleración del Sistema (a_sistema)' },
  { value: 'systemTension', label: 'Tensión en la Cuerda (T)' },
  { value: 'systemDirection', label: 'Dirección del Movimiento' },
  
  // Variables para sistema de planos inclinados
  { value: 'mass1', label: 'Masa 1 (m₁)' },
  { value: 'mass2', label: 'Masa 2 (m₂)' },
  { value: 'angle1', label: 'Ángulo del Plano 1 (θ₁)' },
  { value: 'angle2', label: 'Ángulo del Plano 2 (θ₂)' },
  { value: 'gravity', label: 'Gravedad (g)' },
  { value: 'frictionCoefficient1', label: 'Coeficiente de Fricción 1 (μ₁)' },
  { value: 'frictionCoefficient2', label: 'Coeficiente de Fricción 2 (μ₂)' },
  
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
  // ==========================================
  // 1. FÓRMULAS FUNDAMENTALES
  // ==========================================
  { 
    formula: 'F = m × a', 
    description: 'Segunda Ley de Newton - Fuerza neta',
    example: 'Si m = 10 kg y a = 2 m/s², entonces F = 20 N'
  },
  { 
    formula: 'a = F / m', 
    description: 'Aceleración desde fuerza y masa',
    example: 'Si F = 20 N y m = 10 kg, entonces a = 2 m/s²'
  },
  { 
    formula: 'm = F / a', 
    description: 'Masa desde fuerza y aceleración',
    example: 'Si F = 20 N y a = 2 m/s², entonces m = 10 kg'
  },

  // ==========================================
  // 2. PESO Y GRAVEDAD
  // ==========================================
  {
    formula: 'W = m × g',
    description: 'Peso de un objeto',
    example: 'Si m = 10 kg, entonces W = 10 × 9.81 = 98.1 N'
  },
  {
    formula: 'g = 9.81 m/s²',
    description: 'Aceleración gravitacional estándar en la Tierra',
    example: 'En la superficie terrestre, g = 9.81 m/s²'
  },
  {
    formula: 'g = G × M / r²',
    description: 'Aceleración gravitacional en cualquier planeta',
    example: 'Para la Tierra: g = 6.674×10⁻¹¹ × 5.972×10²⁴ / (6.371×10⁶)² ≈ 9.81 m/s²'
  },

  // ==========================================
  // 3. DESCOMPOSICIÓN DE FUERZAS
  // ==========================================
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

  // ==========================================
  // 4. ACELERACIONES POR COMPONENTES
  // ==========================================
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
    example: 'Si ax = 2 m/s² y ay = 1 m/s², entonces a = √5 ≈ 2.24 m/s²' 
  },

  // ==========================================
  // 5. PLANOS INCLINADOS
  // ==========================================
  {
    formula: 'F_paralela = m × g × sin(θ)',
    description: 'Componente del peso paralela al plano inclinado',
    example: 'Si m = 10 kg y θ = 30°, entonces F_paralela = 10 × 9.81 × sin(30°) ≈ 49.05 N'
  },
  { 
    formula: 'N = m × g × cos(θ)', 
    description: 'Fuerza normal en plano inclinado',
    example: 'Si m = 10 kg y θ = 30°, entonces N = 10 × 9.81 × cos(30°) ≈ 84.87 N'
  },

  // ==========================================
  // 6. FRICCIÓN
  // ==========================================
  { 
    formula: 'Ff = μ × N', 
    description: 'Fuerza de fricción (cinética o estática)',
    example: 'Si μ = 0.5 y N = 100 N, entonces Ff = 50 N' 
  },
  {
    formula: 'Ff_max = μ_s × N',
    description: 'Fuerza de fricción estática máxima',
    example: 'Si μ_s = 0.5 y N = 100 N, entonces Ff_max = 50 N'
  },
  {
    formula: 'μ = Ff / N',
    description: 'Coeficiente de fricción',
    example: 'Si Ff = 50 N y N = 100 N, entonces μ = 0.5'
  },

  // ==========================================
  // 7. FUERZAS NETAS
  // ==========================================
  {
    formula: 'F_net = ΣF',
    description: 'Fuerza neta como suma vectorial de todas las fuerzas',
    example: 'Si F1 = 10 N, F2 = -5 N y F3 = 3 N, entonces F_net = 8 N'
  },
  { 
    formula: 'F_net = F_ap - Ff', 
    description: 'Fuerza neta considerando fricción',
    example: 'Si F_ap = 100 N y Ff = 50 N, entonces F_net = 50 N' 
  },

  // ==========================================
  // 8. SISTEMA DE DOS MASAS EN PLANOS INCLINADOS
  // ==========================================
  {
    formula: 'a = |m₂g sin θ₂ - m₁g sin θ₁ - f₁ - f₂| / (m₁ + m₂)',
    description: 'Aceleración del sistema de dos masas en planos inclinados',
    example: 'Si m₁ = 5 kg, m₂ = 8 kg, θ₁ = 30°, θ₂ = 45°, entonces a ≈ 3.4 m/s²'
  },
  {
    formula: 'T = mg sin θ + f + ma',
    description: 'Tensión en la cuerda del sistema (masa que sube)',
    example: 'T = 5×9.81×sin(30°) + 10 + 5×3.4 = 24.5 + 10 + 17 = 51.5 N'
  },
  {
    formula: 'Equilibrio: m₁g sin θ₁ + f₁ = m₂g sin θ₂ + f₂',
    description: 'Condición de equilibrio del sistema (a = 0)',
    example: 'Sistema en equilibrio cuando fuerzas descendentes = fuerzas ascendentes'
  },

  // ==========================================
  // 9. ANÁLISIS DE DIRECCIÓN DEL MOVIMIENTO
  // ==========================================
  {
    formula: 'Si m₂g sin θ₂ > m₁g sin θ₁ + fricciones → masa 2 baja',
    description: 'Criterio para determinar dirección del movimiento',
    example: 'Si 55.5 N > 34.5 N, entonces masa 2 baja y masa 1 sube'
  },
  {
    formula: 'Si m₁g sin θ₁ > m₂g sin θ₂ + fricciones → masa 1 baja',
    description: 'Criterio opuesto para dirección del movimiento',
    example: 'Si 60 N > 40 N, entonces masa 1 baja y masa 2 sube'
  },

  // ==========================================
  // 10. MOVIMIENTO CIRCULAR
  // ==========================================
  {
    formula: 'Fc = m × v² / r',
    description: 'Fuerza centrípeta para movimiento circular',
    example: 'Si m = 10 kg, v = 5 m/s y r = 2 m, entonces Fc = 125 N'
  },
  {
    formula: 'Fc = m × ω² × r',
    description: 'Fuerza centrípeta en función de velocidad angular',
    example: 'Si m = 10 kg, ω = 2.5 rad/s y r = 2 m, entonces Fc = 125 N'
  },

  // ==========================================
  // 11. CANTIDAD DE MOVIMIENTO
  // ==========================================
  {
    formula: 'F = dp/dt',
    description: 'Segunda Ley en términos de cantidad de movimiento',
    example: 'Si p cambia de 20 a 30 kg·m/s en 5 s, entonces F = 2 N'
  },
  {
    formula: 'p = m × v',
    description: 'Cantidad de movimiento',
    example: 'Si m = 10 kg y v = 5 m/s, entonces p = 50 kg·m/s'
  },

  // ==========================================
  // 12. CASOS ESPECIALES Y APLICACIONES
  // ==========================================
  { 
    formula: 'F_ap = F_net + Ff', 
    description: 'Fuerza aplicada necesaria para vencer fricción',
    example: 'Para acelerar con F_net = 50 N y Ff = 30 N, se necesita F_ap = 80 N' 
  },
  {
    formula: 'a_max = μ_s × g',
    description: 'Aceleración máxima sin deslizamiento',
    example: 'Si μ_s = 0.7, entonces a_max = 0.7 × 9.81 = 6.87 m/s²'
  },
  {
    formula: 'N = mg + F sin θ',
    description: 'Fuerza normal con fuerza aplicada hacia abajo',
    example: 'Si m = 10 kg, F = 50 N y θ = 30°, entonces N = 98.1 + 25 = 123.1 N'
  },
  {
    formula: 'N = mg - F sin θ',
    description: 'Fuerza normal con fuerza aplicada hacia arriba',
    example: 'Si m = 10 kg, F = 50 N y θ = 30°, entonces N = 98.1 - 25 = 73.1 N'
  }
];