export const MRU_VARIABLES = [
  {value: "distance", label: "Distancia (d)"},
  {value: "time", label: "Tiempo (t)"},
  {value: "velocity", label: "Velocidad (v)"},
];

export const MRU_FORMULAS = [
  {
    formula: "d = v * t",
    description: "La distancia es igual a la velocidad por el tiempo.",
    example: "Si la velocidad es 10 m/s y el tiempo es 5 s, entonces la distancia es 50 m.",
  },
  {
    formula: "v = d / t",
    description: "La velocidad es igual a la distancia dividida por el tiempo.",
    example: "Si la distancia es 100 m y el tiempo es 20 s, entonces la velocidad es 5 m/s.",
  },
  {
    formula: "t = d / v",
    description: "El tiempo es igual a la distancia dividida por la velocidad.",
    example: "Si la distancia es 150 m y la velocidad es 30 m/s, entonces el tiempo es 5 s.",
  },
  

];

export const MRU_CONFIG = {
  title: "Movimiento Rectilineo Uniforme",
  description: "Calculadora de Movimiento Rectilineo Uniforme",
  calculatorTitle: "Calculadora MRU",
  calculatorDescription: "Selecciona la incógnita que deseas calcular y completa los valores conocidos",
  variables: MRU_VARIABLES,
  formulas: MRU_FORMULAS,
  variableGroups: {
    distancia: ["velocity", "time"],
    velocidad: ["distance", "time"],
    tiempo: ["distance", "velocity"],
  }
};
