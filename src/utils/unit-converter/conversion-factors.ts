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
    'h': 3600
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
    'in': 0.0254
  },
  velocity: {
    'm/s': 1,
    'km/h': 1 / 3.6,         // 1 km/h = 0.2777... m/s
    'cm/s': 0.01,
    'ft/s': 0.3048,
    'mph': 0.44704           // 1 mph = 0.44704 m/s
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
  }
  
};
