export type UnitType = 'radius' | 'angularVelocity' | 'linearVelocity' | 'period' | 'frequency' | 'centripetalAcceleration' | 'time' | 'angularDisplacement' ;

export type UnitMap = {
  radius: 'm' | 'cm' | 'km';
  angularVelocity: 'rad/s' | 'deg/s' | 'rpm';
  linearVelocity: 'm/s' | 'km/h' | 'cm/s';
  period: 's' | 'min' | 'h';
  frequency: 'Hz' | 'kHz' | 'rpm';
  centripetalAcceleration: 'm/s²' | 'g' | 'cm/s²';
  time: 's' | 'min' | 'h';
  angularDisplacement: 'rad' | 'deg' | 'rev';  
  aceleration: 'm/s²' | 'g' | 'cm/s²';
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
}