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
  }
};
