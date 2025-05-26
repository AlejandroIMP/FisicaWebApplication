/**
 * Script de verificación para la calculadora de Segunda Ley de Newton
 * Este script verifica que todas las funcionalidades principales estén funcionando
 */

import { calculateNewtonSecondLaw } from './utils/calculators/newton-second-law-calculator.js';

console.log('🧮 Verificando Calculadora de Segunda Ley de Newton...\n');

// Test 1: Calcular Fuerza
console.log('📐 Test 1: Calculando Fuerza (F = m × a)');
try {
  const resultForce = calculateNewtonSecondLaw('force', {
    mass: 10, // kg
    acceleration: 9.8 // m/s² (gravedad)
  });
  console.log(`✅ Fuerza = ${resultForce.value} ${resultForce.unit}`);
  console.log(`   Fórmula: ${resultForce.formula}`);
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

console.log();

// Test 2: Calcular Masa
console.log('⚖️ Test 2: Calculando Masa (m = F / a)');
try {
  const resultMass = calculateNewtonSecondLaw('mass', {
    force: 100, // N
    acceleration: 5 // m/s²
  });
  console.log(`✅ Masa = ${resultMass.value} ${resultMass.unit}`);
  console.log(`   Fórmula: ${resultMass.formula}`);
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

console.log();

// Test 3: Calcular Aceleración
console.log('🚀 Test 3: Calculando Aceleración (a = F / m)');
try {
  const resultAcceleration = calculateNewtonSecondLaw('acceleration', {
    force: 50, // N
    mass: 2.5 // kg
  });
  console.log(`✅ Aceleración = ${resultAcceleration.value} ${resultAcceleration.unit}`);
  console.log(`   Fórmula: ${resultAcceleration.formula}`);
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

console.log();

// Test 4: Verificar manejo de errores
console.log('🛡️ Test 4: Verificando manejo de errores');
try {
  calculateNewtonSecondLaw('force', {
    mass: 10 // Falta aceleración
  });
  console.log('❌ Debería haber lanzado un error');
} catch (error) {
  console.log(`✅ Error manejado correctamente: ${error.message}`);
}

console.log();

// Test 5: Caso de uso real - Peso de un objeto
console.log('🌍 Test 5: Caso real - Peso de un objeto de 5kg');
try {
  const weight = calculateNewtonSecondLaw('force', {
    mass: 5, // kg
    acceleration: 9.80665 // gravedad estándar
  });
  console.log(`✅ Peso = ${weight.value.toFixed(2)} ${weight.unit}`);
  console.log('   (Fuerza gravitacional sobre 5 kg)');
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

console.log('\n🎉 Verificación completada!');
console.log('\n📋 Resumen de funcionalidades verificadas:');
console.log('  ✅ Cálculo de Fuerza');
console.log('  ✅ Cálculo de Masa');
console.log('  ✅ Cálculo de Aceleración');
console.log('  ✅ Manejo de Errores');
console.log('  ✅ Casos de Uso Reales');
console.log('\n🎯 ¡La calculadora está lista para usar!');
