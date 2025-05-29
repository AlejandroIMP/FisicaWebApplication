import { type CalculationResult } from './mcu-calculator';

/**
 * Calculadora independiente para fuerzas múltiples
 * Compatible con el setupCalculator infrastructure
 */

// Interfaz para una fuerza individual
export interface Force {
  id: string;
  magnitude: number;
  angle: number;
  name?: string;
  unit: string;
}

// Resultado específico para múltiples fuerzas
export interface MultipleForceResult extends CalculationResult {
  components?: {
    x: number;
    y: number;
  };
  forces?: Force[];
  steps?: string[];
}

// Store global para las fuerzas
let globalForces: Force[] = [];

/**
 * Añade una nueva fuerza al cálculo
 */
export function addForce(force: Omit<Force, 'id'>): void {
  const newForce: Force = {
    ...force,
    id: generateForceId()
  };
  globalForces.push(newForce);
  updateForcesDisplay();
}

/**
 * Elimina una fuerza del cálculo
 */
export function removeForce(forceId: string): void {
  globalForces = globalForces.filter(force => force.id !== forceId);
  updateForcesDisplay();
}

/**
 * Obtiene todas las fuerzas actuales
 */
export function getForces(): Force[] {
  return [...globalForces];
}

/**
 * Limpia todas las fuerzas
 */
export function clearForces(): void {
  globalForces = [];
  updateForcesDisplay();
}

/**
 * Genera un ID único para una fuerza
 */
function generateForceId(): string {
  return `force_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Convierte ángulo de grados a radianes
 */
function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Calcula la fuerza neta de múltiples fuerzas
 */
function calculateNetForce(forces: Force[]): { magnitude: number; angle: number; components: { x: number; y: number } } {
  let totalX = 0;
  let totalY = 0;

  // Sumar componentes de todas las fuerzas
  forces.forEach(force => {
    const angleRad = degreesToRadians(force.angle);
    totalX += force.magnitude * Math.cos(angleRad);
    totalY += force.magnitude * Math.sin(angleRad);
  });

  // Calcular magnitud resultante
  const magnitude = Math.sqrt(totalX * totalX + totalY * totalY);
  
  // Calcular ángulo resultante
  let angle = Math.atan2(totalY, totalX) * (180 / Math.PI);
  if (angle < 0) angle += 360; // Convertir a ángulo positivo

  return {
    magnitude,
    angle,
    components: { x: totalX, y: totalY }
  };
}

/**
 * Función principal de cálculo compatible con setupCalculator
 */
export function calculateMultipleForces(variableToSolve: string, inputs: Record<string, number>): MultipleForceResult {
  const { mass = 0 } = inputs;

  if (globalForces.length === 0) {
    return {
      value: null,
      unit: 'N',
      name: 'Fuerza Neta',
      formula: 'F_neta = √(ΣFx² + ΣFy²)',
      components: { x: 0, y: 0 },
      forces: [],
      steps: ['No hay fuerzas definidas']
    };
  }

  const netForceResult = calculateNetForce(globalForces);
  const steps: string[] = [];

  // Generar pasos del cálculo
  steps.push('Cálculo de componentes de cada fuerza:');
  globalForces.forEach((force, index) => {
    const angleRad = degreesToRadians(force.angle);
    const fx = force.magnitude * Math.cos(angleRad);
    const fy = force.magnitude * Math.sin(angleRad);
    steps.push(`F${index + 1}: Fx = ${force.magnitude.toFixed(2)} × cos(${force.angle}°) = ${fx.toFixed(2)} N`);
    steps.push(`F${index + 1}: Fy = ${force.magnitude.toFixed(2)} × sin(${force.angle}°) = ${fy.toFixed(2)} N`);
  });

  steps.push('');
  steps.push('Suma de componentes:');
  steps.push(`ΣFx = ${netForceResult.components.x.toFixed(2)} N`);
  steps.push(`ΣFy = ${netForceResult.components.y.toFixed(2)} N`);
  steps.push('');
  steps.push('Fuerza neta:');
  steps.push(`F_neta = √((${netForceResult.components.x.toFixed(2)})² + (${netForceResult.components.y.toFixed(2)})²)`);
  steps.push(`F_neta = ${netForceResult.magnitude.toFixed(2)} N`);
  steps.push(`θ = ${netForceResult.angle.toFixed(2)}°`);

  switch (variableToSolve) {
    case 'netForce':
      return {
        value: netForceResult.magnitude,
        unit: 'N',
        name: 'Fuerza Neta',
        formula: 'F_neta = √(ΣFx² + ΣFy²)',
        components: netForceResult.components,
        forces: [...globalForces],
        steps
      };

    case 'acceleration':
      if (mass <= 0) {
        return {
          value: null,
          unit: 'm/s²',
          name: 'Aceleración',
          formula: 'a = F_neta / m',
          components: netForceResult.components,
          forces: [...globalForces],
          steps: [...steps, '', 'Error: La masa debe ser mayor que cero']
        };
      }
      
      const acceleration = netForceResult.magnitude / mass;
      steps.push('');
      steps.push('Cálculo de aceleración:');
      steps.push(`a = F_neta / m = ${netForceResult.magnitude.toFixed(2)} / ${mass} = ${acceleration.toFixed(2)} m/s²`);
      
      return {
        value: acceleration,
        unit: 'm/s²',
        name: 'Aceleración',
        formula: 'a = F_neta / m',
        components: netForceResult.components,
        forces: [...globalForces],
        steps
      };

    case 'mass':
      const netForce = inputs.netForce || netForceResult.magnitude;
      const accelerationInput = inputs.acceleration;
      
      if (!accelerationInput || accelerationInput <= 0) {
        return {
          value: null,
          unit: 'kg',
          name: 'Masa',
          formula: 'm = F_neta / a',
          components: netForceResult.components,
          forces: [...globalForces],
          steps: [...steps, '', 'Error: La aceleración debe ser mayor que cero']
        };
      }
      
      const calculatedMass = netForce / accelerationInput;
      steps.push('');
      steps.push('Cálculo de masa:');
      steps.push(`m = F_neta / a = ${netForce.toFixed(2)} / ${accelerationInput} = ${calculatedMass.toFixed(2)} kg`);
      
      return {
        value: calculatedMass,
        unit: 'kg',
        name: 'Masa',
        formula: 'm = F_neta / a',
        components: netForceResult.components,
        forces: [...globalForces],
        steps
      };

    default:
      return {
        value: null,
        unit: '',
        name: 'Variable desconocida',
        formula: '',
        components: { x: 0, y: 0 },
        forces: [],
        steps: ['Variable de cálculo no reconocida']
      };
  }
}

/**
 * Actualiza la visualización de fuerzas en el DOM
 */
function updateForcesDisplay(): void {
  const forcesContainer = document.getElementById('forces-list');
  if (!forcesContainer) return;

  if (globalForces.length === 0) {
    forcesContainer.innerHTML = '<p class="no-forces">No hay fuerzas definidas. Añade algunas fuerzas para comenzar el cálculo.</p>';
    return;
  }

  const forcesHTML = globalForces.map((force, index) => `
    <div class="force-item" data-force-id="${force.id}">
      <div class="force-info">
        <span class="force-label">F${index + 1}:</span>
        <span class="force-magnitude">${force.magnitude} ${force.unit}</span>
        <span class="force-angle">@ ${force.angle}°</span>
        ${force.name ? `<span class="force-name">(${force.name})</span>` : ''}
      </div>
      <button type="button" class="remove-force-btn" onclick="window.removeForce('${force.id}')">
        ✕
      </button>
    </div>
  `).join('');

  forcesContainer.innerHTML = forcesHTML;

  // Actualizar contador de fuerzas
  const forceCount = document.getElementById('force-count');
  if (forceCount) {
    forceCount.textContent = globalForces.length.toString();
  }
}

/**
 * Inicializa la funcionalidad de múltiples fuerzas
 */
/**
 * Inicializa la funcionalidad de múltiples fuerzas
 */
export function initializeMultipleForces(): void {
  // Exponer funciones globalmente para uso en HTML PRIMERO
  (window as any).addForce = addForce;
  (window as any).removeForce = removeForce;
  (window as any).getForces = getForces;
  (window as any).clearForces = clearForces;

  // Configurar event listeners para agregar fuerzas
  const addForceBtn = document.getElementById('add-force-btn');
  const addMultipleForcesBtn = document.getElementById('add-multiple-forces-btn');
  const clearForcesBtn = document.getElementById('clear-forces-btn');

  if (addForceBtn) {
    addForceBtn.addEventListener('click', () => {
      const magnitudeInput = document.getElementById('force-magnitude') as HTMLInputElement;
      const angleInput = document.getElementById('force-angle') as HTMLInputElement;
      const nameInput = document.getElementById('force-name') as HTMLInputElement;

      if (magnitudeInput && angleInput) {
        const magnitude = parseFloat(magnitudeInput.value);
        const angle = parseFloat(angleInput.value);
        const name = nameInput?.value || '';

        if (!isNaN(magnitude) && !isNaN(angle) && magnitude > 0) {
          addForce({
            magnitude,
            angle,
            name,
            unit: 'N'
          });

          // Limpiar inputs
          magnitudeInput.value = '';
          angleInput.value = '';
          if (nameInput) nameInput.value = '';

          showNotification('Fuerza añadida correctamente');
        } else {
          showNotification('Por favor, ingresa valores válidos para magnitud y ángulo', 'error');
        }
      }
    });
  }

  // ... resto del código igual

  if (addMultipleForcesBtn) {
    addMultipleForcesBtn.addEventListener('click', () => {
      // Añadir 3 fuerzas de ejemplo
      addForce({ magnitude: 10, angle: 0, name: 'Horizontal', unit: 'N' });
      addForce({ magnitude: 8, angle: 90, name: 'Vertical', unit: 'N' });
      addForce({ magnitude: 5, angle: 45, name: 'Diagonal', unit: 'N' });
      showNotification('3 fuerzas de ejemplo añadidas');
    });
  }

  if (clearForcesBtn) {
    clearForcesBtn.addEventListener('click', () => {
      clearForces();
      showNotification('Todas las fuerzas eliminadas');
    });
  }

  // Inicializar display
  updateForcesDisplay();
}

/**
 * Muestra una notificación temporal
 */
function showNotification(message: string, type: 'success' | 'error' = 'success'): void {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 6px;
    color: white;
    font-weight: 500;
    z-index: 1000;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.3s ease;
    ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
  `;

  document.body.appendChild(notification);

  // Animar entrada
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
  }, 10);

  // Eliminar después de 3 segundos
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}
