export type UnitType = 'radius' | 'angularVelocity' | 'linearVelocity' | 'period' | 'frequency' | 'centripetalAcceleration' | 'time' | 'angularDisplacement';

export type UnitMap = {
  radius: 'm' | 'cm' | 'km';
  angularVelocity: 'rad/s' | 'deg/s' | 'rpm';
  linearVelocity: 'm/s' | 'km/h' | 'cm/s';
  period: 's' | 'min' | 'h';
  frequency: 'Hz' | 'kHz' | 'rpm';
  centripetalAcceleration: 'm/s²' | 'g' | 'cm/s²';
  time: 's' | 'min' | 'h';
  angularDisplacement: 'rad' | 'deg' | 'rev';  
}