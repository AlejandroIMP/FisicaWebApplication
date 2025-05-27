# Calculadora de Múltiples Fuerzas - Documentación

## Descripción General

Se ha creado una calculadora independiente y especializada para el análisis de múltiples fuerzas usando la Segunda Ley de Newton. Esta calculadora funciona de manera asíncrona y separada de la calculadora principal de la Segunda Ley de Newton, utilizando la infraestructura `setupCalculator` para mayor consistencia y mantenibilidad.

## Archivos Creados/Modificados

### Nuevos Archivos

1. **`src/utils/calculators/multiple-forces-standalone-calculator.ts`**
   - Calculadora independiente para múltiples fuerzas
   - Compatible con la interfaz `CalculationResult` 
   - Gestión global de fuerzas con funciones CRUD
   - Cálculos vectoriales de fuerza neta
   - Soporte para cálculo de aceleración y masa

2. **`src/pages/calculators/dinamica/multiples-fuerzas.astro`**
   - Página web independiente para la calculadora
   - Interfaz moderna y responsiva
   - Gestión dinámica de fuerzas
   - Resultados detallados con componentes y pasos
   - Notificaciones de usuario
   - Análisis visual de resultados

### Archivos Modificados

3. **`src/utils/calculators/calculator-controller.ts`**
   - Agregado guardado de último resultado para análisis detallado
   - Compatibilidad mejorada con diferentes tipos de calculadoras

4. **`src/pages/calculators/dinamica/segunda-ley-newton.astro`**
   - Agregado enlace prominente a la calculadora especializada
   - Estilos CSS para el enlace especializado
   - Mejor separación de responsabilidades

## Características de la Nueva Calculadora

### Gestión de Fuerzas
- ✅ Agregar fuerzas individuales con magnitud, ángulo y nombre
- ✅ Eliminar fuerzas específicas
- ✅ Limpiar todas las fuerzas
- ✅ Agregar fuerzas de ejemplo en lote
- ✅ Contador visual de fuerzas activas

### Cálculos Disponibles
- ✅ **Fuerza Neta**: Cálculo vectorial de la suma de todas las fuerzas
- ✅ **Aceleración**: A partir de fuerza neta y masa conocida
- ✅ **Masa**: A partir de fuerza neta y aceleración conocida

### Interfaz de Usuario
- ✅ Diseño moderno con gradientes y animaciones
- ✅ Formulario intuitivo para agregar fuerzas
- ✅ Lista dinámica de fuerzas con opciones de eliminación
- ✅ Botones de acción rápida
- ✅ Notificaciones temporales de confirmación
- ✅ Diseño totalmente responsivo para móviles

### Resultados Detallados
- ✅ Componentes X e Y de la fuerza neta
- ✅ Magnitud y ángulo resultante
- ✅ Pasos matemáticos detallados
- ✅ Fórmulas utilizadas
- ✅ Análisis paso a paso del cálculo

## Arquitectura Técnica

### Separación de Responsabilidades
- **Calculadora Principal**: Casos simples de Segunda Ley de Newton
- **Calculadora de Múltiples Fuerzas**: Análisis vectorial especializado
- **Controller**: Gestión común de interface y validaciones

### Compatibilidad
- ✅ Utiliza `setupCalculator` para consistencia
- ✅ Compatible con `CalculationResult` interface
- ✅ Manejo de errores robusto
- ✅ Validaciones de entrada
- ✅ Conversión de unidades integrada

### Estado Global
```typescript
// Gestión de fuerzas en memoria
let globalForces: Force[] = [];

// Funciones públicas
export function addForce(force: Omit<Force, 'id'>): void
export function removeForce(forceId: string): void
export function getForces(): Force[]
export function clearForces(): void
```

### Tipos de Datos
```typescript
interface Force {
  id: string;
  magnitude: number;
  angle: number;
  name?: string;
  unit: string;
}

interface MultipleForceResult extends CalculationResult {
  components?: { x: number; y: number };
  forces?: Force[];
  steps?: string[];
}
```

## URLs de Acceso

- **Calculadora Principal**: `/calculators/dinamica/segunda-ley-newton`
- **Calculadora de Múltiples Fuerzas**: `/calculators/dinamica/multiples-fuerzas`

## Casos de Uso

### Ejemplo 1: Análisis de Tres Fuerzas
```
F1: 10 N @ 0°   (Horizontal derecha)
F2: 8 N @ 90°   (Vertical arriba)  
F3: 5 N @ 45°   (Diagonal)

Resultado:
- Fx = 13.54 N
- Fy = 11.54 N
- F_neta = 17.78 N @ 40.4°
```

### Ejemplo 2: Cálculo de Aceleración
```
Fuerzas definidas + Masa = 2 kg
→ Aceleración = F_neta / masa = 8.89 m/s²
```

## Beneficios del Nuevo Sistema

1. **Separación Clara**: Cada calculadora tiene su propósito específico
2. **Escalabilidad**: Fácil agregar nuevas funcionalidades a cada una
3. **Mantenibilidad**: Código modular y bien estructurado
4. **UX Mejorada**: Interface especializada para cada tipo de problema
5. **Consistencia**: Uso del mismo sistema de controller y validaciones
6. **Flexibilidad**: Análisis tanto simple como complejo según la necesidad

## Testing

- ✅ Compilación exitosa sin errores TypeScript
- ✅ Build de producción funcional
- ✅ Tests del controller passing
- ✅ Páginas web funcionando correctamente
- ✅ Enlaces entre páginas operativos

## Próximos Pasos Recomendados

1. **Testing Unitario**: Agregar tests específicos para `multiple-forces-standalone-calculator.ts`
2. **Visualización**: Considerar agregar un diagrama vectorial interactivo
3. **Exportación**: Opción para exportar resultados en PDF o imagen
4. **Presets**: Guardar configuraciones de fuerzas frecuentes
5. **Validación Avanzada**: Alertas para casos físicos imposibles

---

**Fecha de Creación**: Mayo 26, 2025  
**Estado**: ✅ Completado y Funcional  
**Mantenido por**: Equipo de Desarrollo Physica Platform
