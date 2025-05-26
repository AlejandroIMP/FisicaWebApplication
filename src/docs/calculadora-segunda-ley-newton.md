# Calculadora de la Segunda Ley de Newton

## Descripción

La calculadora de la Segunda Ley de Newton permite calcular cualquiera de las tres variables fundamentales de la dinámica: **fuerza (F)**, **masa (m)** y **aceleración (a)**, utilizando la ecuación fundamental **F = m × a**.

## Características

### ✅ Funcionalidades Implementadas

- **Cálculo de Fuerza**: Determina la fuerza resultante cuando se conocen masa y aceleración
- **Cálculo de Masa**: Calcula la masa cuando se conocen fuerza y aceleración  
- **Cálculo de Aceleración**: Determina la aceleración cuando se conocen fuerza y masa
- **Múltiples Unidades de Medida**:
  - **Fuerza**: Newton (N), Kilonewton (kN), Dina (dyn), Libra-fuerza (lbf)
  - **Masa**: Kilogramo (kg), Gramo (g), Libra (lb), Tonelada (t)
  - **Aceleración**: m/s², cm/s², ft/s², g (gravedad terrestre)
- **Conversiones Automáticas**: El sistema maneja automáticamente las conversiones entre unidades
- **Interfaz Accesible**: Diseñada siguiendo estándares de accesibilidad web
- **Diseño Responsivo**: Funciona correctamente en dispositivos móviles y escritorio
- **Validación de Errores**: Manejo robusto de casos extremos y errores de entrada

### 🎯 Arquitectura Escalable

La calculadora está construida con una arquitectura modular que permite:

- **Fácil Adición de Controles de Errores**: Sistema de validación extensible
- **Preparación para Animaciones**: Estructura de datos lista para integrar visualizaciones interactivas
- **Código Reutilizable**: Componentes compatibles con otras calculadoras de física
- **Tests Unitarios Completos**: Cobertura del 100% de los casos de uso principales

## Uso de la Calculadora

### Pasos para Realizar un Cálculo

1. **Seleccionar Variable a Calcular**: Elige qué quieres calcular (Fuerza, Masa o Aceleración)
2. **Ingresar Valores Conocidos**: Completa los dos valores que conoces
3. **Seleccionar Unidades**: Elige las unidades apropiadas para cada valor
4. **Calcular**: Presiona el botón "Calcular" para obtener el resultado

### Ejemplos de Uso

#### Ejemplo 1: Calcular Fuerza
- **Datos**: Masa = 10 kg, Aceleración = 2 m/s²
- **Resultado**: F = 20 N
- **Aplicación**: Fuerza necesaria para acelerar un objeto

#### Ejemplo 2: Calcular Masa  
- **Datos**: Fuerza = 100 N, Aceleración = 5 m/s²
- **Resultado**: m = 20 kg
- **Aplicación**: Determinar la masa de un objeto en movimiento

#### Ejemplo 3: Calcular Aceleración
- **Datos**: Fuerza = 50 N, Masa = 5 kg  
- **Resultado**: a = 10 m/s²
- **Aplicación**: Determinar la aceleración producida por una fuerza

## Fórmulas Utilizadas

### Fórmula Principal
**F = m × a**

Donde:
- **F**: Fuerza resultante (Newton)
- **m**: Masa del objeto (kilogramo) 
- **a**: Aceleración producida (metros por segundo cuadrado)

### Variaciones
- **Masa**: m = F / a
- **Aceleración**: a = F / m

## Aplicaciones Prácticas

### En la Vida Cotidiana
- Calcular la fuerza necesaria para mover objetos
- Determinar el peso de objetos (F = mg)
- Analizar aceleraciones en vehículos

### En Ingeniería
- Diseño de sistemas mecánicos
- Cálculo de fuerzas estructurales
- Análisis de dinámicas de máquinas

### En Educación
- Comprensión de conceptos fundamentales de física
- Resolución de problemas de dinámica
- Preparación para exámenes de física

## Arquitectura Técnica

### Componentes Principales

```typescript
// Función principal de cálculo
calculateNewtonSecondLaw(variableToSolve: string, values: Record<string, number>)

// Configuración de unidades
NEWTON_SECOND_LAW_CONFIG = {
  variables: ['force', 'mass', 'acceleration'],
  formulas: ['F = m × a', 'a = F / m', 'm = F / a'],
  variableGroups: { ... }
}
```

### Sistema de Validación
- Verificación de valores de entrada
- Manejo de casos extremos (división por cero)
- Validación de unidades correctas

### Tests Unitarios
- 13 tests completos que cubren todos los casos de uso
- Validación de cálculos correctos
- Verificación de manejo de errores
- Tests de casos de uso reales

## Roadmap Futuro

### 🚀 Funcionalidades Planificadas

1. **Sistema de Animaciones Interactivas**
   - Visualización de fuerzas aplicadas
   - Representación gráfica de masa y aceleración
   - Animaciones educativas basadas en los cálculos

2. **Controles de Errores Avanzados**
   - Sugerencias de valores razonables
   - Detección de errores de unidades
   - Advertencias para valores extremos

3. **Integración con Otras Calculadoras**
   - Conexión con calculadoras de cinemática
   - Flujo de trabajo completo de problemas de física
   - Historial de cálculos relacionados

4. **Exportación de Resultados**
   - Generación de reportes PDF
   - Exportación de datos para análisis
   - Compartir cálculos con otros usuarios

## Conclusión

La calculadora de la Segunda Ley de Newton proporciona una herramienta robusta, accesible y educativa para entender y aplicar uno de los principios fundamentales de la física. Su arquitectura escalable y diseño modular la convierten en una base sólida para futuras expansiones y mejoras.
