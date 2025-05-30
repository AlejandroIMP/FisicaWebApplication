export type UnitType = 
  // Unidades básicas compartidas
  'radius' | 'time' | 'angularDisplacement' | 
  
  // Unidades MCU
  'angularVelocity' | 'linearVelocity' | 'period' | 'frequency' | 'centripetalAcceleration' | 
  
  // Unidades MCUA
  'initialAngularVelocity' | 'finalAngularVelocity' | 'angularAcceleration' | 
  'tangentialAcceleration' | 'totalAcceleration' |
  
  // Unidades Segunda Ley de Newton básicas
  'force' | 'mass' | 'acceleration' |
  
  // Unidades Segunda Ley de Newton avanzadas
  'forceX' | 'forceY' | 'accelerationX' | 'accelerationY' | 'angle' | 
  'appliedForce' | 'frictionForce' | 'normalForce' | 'frictionCoefficient'
  
  // MRU y MRUA
  | 'distance' | 'velocity' | 'coefficient' | 'efficiency' 


  ;

export type UnitMap = {
  distance: 'm' | 'km' | 'cm' | 'mm' | 'mi' | 'yd' | 'ft' | 'in';
  velocity: 'm/s' | 'km/h' | 'cm/s' | 'mm/s' | 'mi/h' | 'yd/s' | 'ft/s' | 'in/s';
  radius: 'm' | 'cm' | 'km';
  angularVelocity: 'rad/s' | 'deg/s' | 'rpm';
  linearVelocity: 'm/s' | 'km/h' | 'cm/s';
  period: 's' | 'min' | 'h';
  frequency: 'Hz' | 'kHz' | 'rpm';
  centripetalAcceleration: 'm/s²' | 'g' | 'cm/s²';
  time: 's' | 'min' | 'h'| 'day' | 'week' | 'month' | 'year';
  angularDisplacement: 'rad' | 'deg' | 'rev';  
  initialAngularVelocity: 'rad/s' | 'deg/s' | 'rpm';
  finalAngularVelocity: 'rad/s' | 'deg/s' | 'rpm';
  angularAcceleration: 'rad/s²' | 'deg/s²' | 'rpm/s';
  initialLinearVelocity: 'm/s' | 'km/h' | 'cm/s';
  finalLinearVelocity: 'm/s' | 'km/h' | 'cm/s';
  linearAcceleration: 'm/s²' | 'g' | 'cm/s²';
  initialCentripetalAcceleration: 'm/s²' | 'g' | 'cm/s²';
  finalCentripetalAcceleration: 'm/s²' | 'g' | 'cm/s²';
  initialPeriod: 's' | 'min' | 'h';
  finalPeriod: 's' | 'min' | 'h';
  initialFrequency: 'Hz' | 'kHz' | 'rpm';
  finalFrequency: 'Hz' | 'kHz' | 'rpm';
  initialAngularDisplacement: 'rad' | 'deg' | 'rev';
  finalAngularDisplacement: 'rad' | 'deg' | 'rev';
  initialTime: 's' | 'min' | 'h';
  finalTime: 's' | 'min' | 'h';
  initialRadius: 'm' | 'cm' | 'km';
  finalRadius: 'm' | 'cm' | 'km';
  initialAngularAcceleration: 'rad/s²' | 'deg/s²' | 'rpm/s';
  finalAngularAcceleration: 'rad/s²' | 'deg/s²' | 'rpm/s';
  
  // Tipos para Segunda Ley de Newton
  force: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  mass: 'kg' | 'g' | 'lb' | 't' | 'oz' | 'slug';
  acceleration: 'm/s²' | 'cm/s²' | 'ft/s²' | 'g' | 'km/s²' | 'mi/s²' | 'km/h²' | 'mi/h²';
  forceX: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  forceY: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  accelerationX: 'm/s²' | 'cm/s²' | 'ft/s²' | 'g' | 'km/s²' | 'mi/s²' | 'km/h²' | 'mi/h²';
  accelerationY: 'm/s²' | 'cm/s²' | 'ft/s²' | 'g' | 'km/s²' | 'mi/s²' | 'km/h²' | 'mi/h²';
  angle: 'deg' | 'rad';
  appliedForce: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  frictionForce: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  normalForce: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  frictionCoefficient: 'dimensionless';
  // Tipos para Segunda Ley de Newton avanzados
  initialForce: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  finalForce: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  initialMass: 'kg' | 'g' | 'lb' | 't' | 'oz' | 'slug';
  finalMass: 'kg' | 'g' | 'lb' | 't' | 'oz' | 'slug';
  initialAcceleration: 'm/s²' | 'cm/s²' | 'ft/s²' | 'g' | 'km/s²' | 'mi/s²' | 'km/h²' | 'mi/h²';
  finalAcceleration: 'm/s²' | 'cm/s²' | 'ft/s²' | 'g' | 'km/s²' | 'mi/s²' | 'km/h²' | 'mi/h²';
  initialForceX: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  finalForceX: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  initialForceY: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  finalForceY: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  initialAccelerationX: 'm/s²' | 'cm/s²' | 'ft/s²' | 'g' | 'km/s²' | 'mi/s²' | 'km/h²' | 'mi/h²';
  finalAccelerationX: 'm/s²' | 'cm/s²' | 'ft/s²' | 'g' | 'km/s²' | 'mi/s²' | 'km/h²' | 'mi/h²';
  initialAccelerationY: 'm/s²' | 'cm/s²' | 'ft/s²' | 'g' | 'km/s²' | 'mi/s²' | 'km/h²' | 'mi/h²';
  finalAccelerationY: 'm/s²' | 'cm/s²' | 'ft/s²' | 'g' | 'km/s²' | 'mi/s²' | 'km/h²' | 'mi/h²';
  initialAngle: 'deg' | 'rad';
  finalAngle: 'deg' | 'rad';
  initialCoefficient: 'dimensionless';
  finalCoefficient: 'dimensionless';
  appliedForceX: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  appliedForceY: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  frictionForceX: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  frictionForceY: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  normalForceX: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  normalForceY: 'N' | 'kN' | 'dyn' | 'lbf' | 'kgf' | 'poundal';
  
  // Tipos para cálculos avanzados

  coefficient: 'dimensionless';

  efficiency: 'percentage' | 'decimal' | 'fraction'; // Porcentaje o decimal
}