// Factores de conversión para todas las unidades utilizadas en las calculadoras
export const conversionFactors = {
  radius: {
    'm': 1,
    'cm': 0.01,
    'km': 1000
  },
  angularVelocity: {
    'rad/s': 1,
    'deg/s': Math.PI / 180,  // grados a radianes
    'rpm': Math.PI / 30      // 1 rpm = 2π/60 rad/s
  },
  linearVelocity: {
    'm/s': 1,
    'km/h': 1/3.6,           // 1 km/h = 0.2777... m/s
    'cm/s': 0.01
  },
  period: {
    's': 1,
    'min': 60,
    'h': 3600
  },
  frequency: {
    'Hz': 1,
    'kHz': 1000,
    'rpm': 1/60              // 1 rpm = 1/60 Hz
  },
  centripetalAcceleration: {
    'm/s²': 1,
    'g': 9.8,                // 1g = 9.8 m/s²
    'cm/s²': 0.01
  },
  time: {
    's': 1,
    'min': 60,
    'h': 3600,
    'day': 86400,            // 1 día = 86400 segundos
    'week': 604800,          // 1 semana = 604800 segundos
    'month': 2592000,        // 1 mes = 2592000 segundos (30 días)
    'year': 31536000         // 1 año = 31536000 segundos (365 días)
    
  },
  angularDisplacement: {
    'rad': 1,
    'deg': Math.PI / 180,    // grados a radianes
    'rev': 2 * Math.PI       // 1 vuelta = 2π rad
  },
  initialAngularVelocity: {
    'rad/s': 1,
    'deg/s': Math.PI / 180,
    'rpm': Math.PI / 30
  },
  finalAngularVelocity: {
    'rad/s': 1,
    'deg/s': Math.PI / 180,
    'rpm': Math.PI / 30
  },
  angularAcceleration: {
    'rad/s²': 1,
    'deg/s²': Math.PI / 180,
    'rpm/s': Math.PI / 30
  },
  tangentialAcceleration: {
    'm/s²': 1,
    'g': 9.8,
    'cm/s²': 0.01
  },
  totalAcceleration: {
    'm/s²': 1,
    'g': 9.8,
    'cm/s²': 0.01
  },
  
  // Factores de conversión para Segunda Ley de Newton
  force: {
    'N': 1,
    'kN': 1000,
    'dyn': 0.00001,
    'lbf': 4.44822,
    'kgf': 9.80665, 
    'poundal': 0.138255,
    'kip': 4.44822 * 1000 // 1 kip = 1000 lbf
  },
  mass: {
    'kg': 1,
    'g': 0.001,
    'lb': 0.453592,
    't': 1000,
    'slug': 14.5939, // 1 slug = 14.5939 kg
    'oz': 0.0283495, // 1 oz = 0.0283495 kg
    'stone': 6.35029, // 1 stone = 6.35029 kg
  },
  acceleration: {
    'm/s²': 1,
    'cm/s²': 0.01,
    'ft/s²': 0.3048,
    'g': 9.80665,
    'in/s²': 0.0254,
    'km/h²': 1 / (3.6 * 3.6), // 1 km/h² = 1 / (3.6 * 3.6) m/s²
  },
  angle: {
    'rad': 1,
    'deg': Math.PI / 180,
    'grad': Math.PI / 200,
    'turn': 2 * Math.PI, // 1 turn = 2π rad
  },
  distance: {
    'm': 1,
    'cm': 0.01,
    'km': 1000,
    'ft': 0.3048,
    'in': 0.0254,
    'mi': 1609.34,         // 1 mile = 1609.34 m
    'yd': 0.9144,          // 1 yard = 0.9144 m
    'nm': 1852,            // 1 nautical mile = 1852 m
    'ly': 9.461e15,        // 1 light year = 9.461e15 m
    'pc': 3.086e16,        // 1 parsec = 3.086e16 m
    'au': 1.496e11,        // 1 astronomical unit = 1.496e11 m
    'furlong': 201.168,    // 1 furlong = 201.168 m
    'rod': 5.0292,         // 1 rod = 5.0292 m
    'chain': 20.1168,      // 1 chain = 20.1168 m
    'league': 4828.03,     // 1 league = 4828.03 m
    'parsec': 3.085677581491367e16, // 1 parsec = 3.085677581491367e16 m
    'kiloparsec': 3.085677581491367e19, // 1 kiloparsec = 3.085677581491367e19 m
    'megaparsec': 3.085677581491367e22, // 1 megaparsec = 3.085677581491367e22 m
    'gigaparsec': 3.085677581491367e25, // 1 gigaparsec = 3.085677581491367e25 m
    'teraparsec': 3.085677581491367e28, // 1 teraparsec = 3.085677581491367e28 m
  },
  velocity: {
    'm/s': 1,
    'km/h': 1 / 3.6,         // 1 km/h = 0.2777... m/s
    'cm/s': 0.01,
    'ft/s': 0.3048,
    'mph': 0.44704,
    'knots': 0.514444,
    'mi/s': 1609.34,
    'ft/min': 0.00508,
    'in/s': 0.0254,
    'yd/s': 0.9144,
    'miles/s': 1609.34,
    'nautical miles/s': 1852,           
  },
  forceX: {
    'N': 1,
    'kN': 1000,
    'dyn': 0.00001,
    'lbf': 4.44822,
    'kgf': 9.80665,
    'poundal': 0.138255
  },
  forceY: {
    'N': 1,
    'kN': 1000,
    'dyn': 0.00001,
    'lbf': 4.44822,
    'kgf': 9.80665,
    'poundal': 0.138255
  },
  accelerationX: {
    'm/s²': 1,
    'cm/s²': 0.01,
    'ft/s²': 0.3048,
    'g': 9.80665,
    'in/s²': 0.0254,
    'km/h²': 1 / (3.6 * 3.6) // 1 km/h² = 1 / (3.6 * 3.6) m/s²
  },
  accelerationY: {
    'm/s²': 1,
    'cm/s²': 0.01,
    'ft/s²': 0.3048,
    'g': 9.80665,
    'in/s²': 0.0254,
    'km/h²': 1 / (3.6 * 3.6) // 1 km/h² = 1 / (3.6 * 3.6) m/s²
  },
  appliedForce: {
    'N': 1,
    'kN': 1000,
    'dyn': 0.00001,
    'lbf': 4.44822,
    'kgf': 9.80665,
    'poundal': 0.138255
  },
  frictionForce: {
    'N': 1,
    'kN': 1000,
    'dyn': 0.00001,
    'lbf': 4.44822,
    'kgf': 9.80665,
    'poundal': 0.138255
  },
  normalForce: {
    'N': 1,
    'kN': 1000,
    'dyn': 0.00001,
    'lbf': 4.44822,
    'kgf': 9.80665,
    'poundal': 0.138255
  },
  frictionCoefficient: {
    'static': 0.5, // Valor típico para coeficiente de fricción estática
    'kinetic': 0.3 // Valor típico para coeficiente de fricción cinética
  },

  coefficient: {
    'dimensionless': 1,
    'unitless': 1,
    'percent': 0.01,
    'ratio': 1
  },

  efficiency: {
    'percent': 0.01, // 1% = 0.01
    'decimal': 1,    // 1 = 100%
    'fraction': 1    // 1 = 100%
  }
  
};
