export const MRUA_VARIABLES = [
  {value: "distance", label: "Distancia (d)"},
  {value: "velocity", label: "Velocidad (v)"},
  {value: "acceleration", label: "Aceleración (a)"},
  {value: "time", label: "Tiempo (t)", unit: "s"},
  {value: "coefficient", label: "Coeficiente de fricción (μ)"},
  {value: "initialVelocity", label: "Velocidad inicial (v₀)"},
  {value: "finalVelocity", label: "Velocidad final (v₁)"},
  {value: "initialTime", label: "Tiempo inicial (t₀)"},
  {value: "finalTime", label: "Tiempo final (t₁)"},
  {value: "initialDistance", label: "Distancia inicial (d₀)"},
  {value: "finalDistance", label: "Distancia final (d₁)"},
  {value: "initialAcceleration", label: "Aceleración inicial (a₀)"},
  {value: "finalAcceleration", label: "Aceleración final (a₁)"},
  {value: "initialCoefficient", label: "Coeficiente de fricción inicial (μ₀)"},
  {value: "finalCoefficient", label: "Coeficiente de fricción final (μ₁)"},
  {value: "initialVelocityX", label: "Velocidad inicial en X (v₀x)"},
  {value: "finalVelocityX", label: "Velocidad final en X (v₁x)"},
  {value: "initialVelocityY", label: "Velocidad inicial en Y (v₀y)"},
  {value: "finalVelocityY", label: "Velocidad final en Y (v₁y)"},
  {value: "initialAccelerationX", label: "Aceleración inicial en X (a₀x)"},
  {value: "finalAccelerationX", label: "Aceleración final en X (a₁x)"},
  {value: "initialAccelerationY", label: "Aceleración inicial en Y (a₀y)"},
  {value: "finalAccelerationY", label: "Aceleración final en Y (a₁y)"},
  {value: "initialTimeX", label: "Tiempo inicial en X (t₀x)"},
  {value: "finalTimeX", label: "Tiempo final en X (t₁x)"},
  {value: "initialTimeY", label: "Tiempo inicial en Y (t₀y)"},
  {value: "finalTimeY", label: "Tiempo final en Y (t₁y)"},
  {value: "initialDistanceX", label: "Distancia inicial en X (d₀x)"},
  {value: "finalDistanceX", label: "Distancia final en X (d₁x)"},
  {value: "initialDistanceY", label: "Distancia inicial en Y (d₀y)"},
  {value: "finalDistanceY", label: "Distancia final en Y (d₁y)"},
  {value: "initialCoefficientX", label: "Coeficiente de fricción inicial en X (μ₀x)"},
  {value: "finalCoefficientX", label: "Coeficiente de fricción final en X (μ₁x)"},
  {value: "initialCoefficientY", label: "Coeficiente de fricción inicial en Y (μ₀y)"},
  {value: "finalCoefficientY", label: "Coeficiente de fricción final en Y (μ₁y)"}
];

export const MRUA_FORMULAS = [
  {
    formula: "d = v₀ * t + 0.5 * a * t²",
    description: "La distancia recorrida es igual a la velocidad inicial por el tiempo más la mitad de la aceleración por el cuadrado del tiempo.",
    example: "Si la velocidad inicial es 10 m/s, la aceleración es 2 m/s² y el tiempo es 5 s, entonces la distancia es 60 m."
  },
  {
    formula: "v = v₀ + a * t",
    description: "La velocidad final es igual a la velocidad inicial más la aceleración por el tiempo.",
    example: "Si la velocidad inicial es 10 m/s, la aceleración es 2 m/s² y el tiempo es 5 s, entonces la velocidad final es 20 m/s."
  },
  {
    formula: "a = (v - v₀) / t",
    description: "La aceleración es igual a la diferencia entre la velocidad final y la inicial dividida por el tiempo.",
    example: "Si la velocidad final es 20 m/s, la velocidad inicial es 10 m/s y el tiempo es 5 s, entonces la aceleración es 2 m/s²."
  },
  {
    formula: "t = (v - v₀) / a",
    description: "El tiempo es igual a la diferencia entre la velocidad final y la inicial dividida por la aceleración.",
    example: "Si la velocidad final es 20 m/s, la velocidad inicial es 10 m/s y la aceleración es 2 m/s², entonces el tiempo es 5 s."
  },
  {
    formula: "μ = f / N",
    description: "El coeficiente de fricción es igual a la fuerza de fricción dividida por la fuerza normal.",
    example: "Si la fuerza de fricción es 10 N y la fuerza normal es 50 N, entonces el coeficiente de fricción es 0.2."
  }
];

export const MRUA_CONFIG = {
  title: "Movimiento Rectilineo Uniforme",
  description: "Calculadora de Movimiento Rectilineo Uniforme",
  calculatorTitle: "Calculadora MRU",
  calculatorDescription: "Selecciona la incógnita que deseas calcular y completa los valores conocidos",
  variables: MRUA_VARIABLES,
  formulas: MRUA_FORMULAS,
  variableGroups: {
    distance: ['initialVelocity', 'acceleration', 'time', 'finalVelocity', 'coefficient'],
    velocity: ['initialVelocity', 'acceleration', 'time', 'distance'],
    acceleration: ['finalVelocity', 'initialVelocity', 'time', 'distance', 'coefficient'],
    time: ['finalVelocity', 'initialVelocity', 'acceleration', 'distance'],
    coefficient: ['acceleration', 'initialVelocity', 'distance'],
    initialVelocity: ['finalVelocity', 'acceleration', 'time', 'distance'],
    finalVelocity: ['initialVelocity', 'acceleration', 'time', 'distance'],
    initialTime: ['finalTime', 'timeDuration'],
    // Tiempos generales (no direccionales)
    finalTime: ['initialTime', 'timeDuration'],

    // Variables en X
    finalDistanceX: ['initialDistanceX', 'initialVelocityX', 'initialAccelerationX', 'initialTimeX', 'finalTimeX', 'initialCoefficientX'],
    initialDistanceX: ['finalDistanceX', 'initialVelocityX', 'initialAccelerationX', 'initialTimeX', 'finalTimeX', 'initialCoefficientX'],
    finalVelocityX: ['initialVelocityX', 'initialAccelerationX', 'initialTimeX', 'finalTimeX', 'initialCoefficientX'],
    initialVelocityX: ['finalVelocityX', 'initialAccelerationX', 'initialTimeX', 'finalTimeX', 'finalDistanceX', 'initialDistanceX'],
    initialAccelerationX: ['finalVelocityX', 'initialVelocityX', 'initialTimeX', 'finalTimeX', 'initialCoefficientX', 'finalDistanceX', 'initialDistanceX'],
    initialCoefficientX: ['initialAccelerationX', 'finalDistanceX', 'initialDistanceX', 'initialVelocityX'],
    finalTimeX: ['initialTimeX', 'initialVelocityX', 'initialAccelerationX', 'finalDistanceX', 'initialDistanceX'],

    // Variables en Y
    finalDistanceY: ['initialDistanceY', 'initialVelocityY', 'initialAccelerationY', 'initialTimeY', 'finalTimeY', 'initialCoefficientY'],
    initialDistanceY: ['finalDistanceY', 'initialVelocityY', 'initialAccelerationY', 'initialTimeY', 'finalTimeY', 'initialCoefficientY'],
    finalVelocityY: ['initialVelocityY', 'initialAccelerationY', 'initialTimeY', 'finalTimeY', 'initialCoefficientY'],
    initialVelocityY: ['finalVelocityY', 'initialAccelerationY', 'initialTimeY', 'finalTimeY', 'finalDistanceY', 'initialDistanceY'],
    initialAccelerationY: ['finalVelocityY', 'initialVelocityY', 'initialTimeY', 'finalTimeY', 'initialCoefficientY', 'finalDistanceY', 'initialDistanceY'],
    initialCoefficientY: ['initialAccelerationY', 'finalDistanceY', 'initialDistanceY', 'initialVelocityY'],
    finalTimeY: ['initialTimeY', 'initialVelocityY', 'initialAccelerationY', 'finalDistanceY', 'initialDistanceY'],

    // Relaciones cruzadas X/Y (para tiempo compartido)
    initialTimeX: ['finalTimeX', 'initialTimeY', 'finalTimeY'],
    initialTimeY: ['finalTimeY', 'initialTimeX', 'finalTimeX']
  }
};
