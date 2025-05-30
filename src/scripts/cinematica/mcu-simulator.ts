/**
 * Clase que representa una partícula en movimiento circular uniforme
 */
export class MCUParticle {
  private radius: number;
  private angularVelocity: number; // rad/s
  private initialAngle: number; // rad
  private color: string;
  private centerX: number;
  private centerY: number;

  constructor(
    radius: number,
    angularVelocity: number,
    initialAngle: number = 0,
    color: string = '#FF6B35',
    centerX: number = 0,
    centerY: number = 0
  ) {
    this.radius = radius;
    this.angularVelocity = angularVelocity;
    this.initialAngle = initialAngle;
    this.color = color;
    this.centerX = centerX;
    this.centerY = centerY;
  }

  /**
   * Actualiza la partícula en función del tiempo transcurrido
   */
  update(deltaTime: number): void {
    // En esta implementación, el estado se calcula dinámicamente
    // basado en el tiempo total, no se requiere actualización específica
  }

  /**
   * Calcula la posición de la partícula en un tiempo dado
   * x(t) = R*cos(ωt + φ₀)
   * y(t) = R*sin(ωt + φ₀)
   */
  getPosition(time: number): { x: number; y: number } {
    const angle = this.angularVelocity * time + this.initialAngle;
    return {
      x: this.centerX + this.radius * Math.cos(angle),
      y: this.centerY + this.radius * Math.sin(angle)
    };
  }

  /**
   * Calcula la velocidad de la partícula en un tiempo dado (vector tangente)
   * vₓ(t) = -Rω*sin(ωt + φ₀)
   * vᵧ(t) = Rω*cos(ωt + φ₀)
   * Magnitud: |v| = Rω
   */
  getVelocity(time: number): { vx: number; vy: number; magnitude: number } {
    const angle = this.angularVelocity * time + this.initialAngle;
    const vx = -this.radius * this.angularVelocity * Math.sin(angle);
    const vy = this.radius * this.angularVelocity * Math.cos(angle);
    const magnitude = this.radius * Math.abs(this.angularVelocity);
    
    return { vx, vy, magnitude };
  }

  /**
   * Calcula la aceleración de la partícula en un tiempo dado (vector centrípeta)
   * aₓ(t) = -Rω²*cos(ωt + φ₀)
   * aᵧ(t) = -Rω²*sin(ωt + φ₀)
   * Magnitud: |a| = Rω²
   */
  getAcceleration(time: number): { ax: number; ay: number; magnitude: number } {
    const angle = this.angularVelocity * time + this.initialAngle;
    const ax = -this.radius * Math.pow(this.angularVelocity, 2) * Math.cos(angle);
    const ay = -this.radius * Math.pow(this.angularVelocity, 2) * Math.sin(angle);
    const magnitude = this.radius * Math.pow(this.angularVelocity, 2);
    
    return { ax, ay, magnitude };
  }

  // Getters y setters
  getRadius(): number { return this.radius; }
  getAngularVelocity(): number { return this.angularVelocity; }
  getInitialAngle(): number { return this.initialAngle; }
  getColor(): string { return this.color; }
  getCenter(): { x: number; y: number } { return { x: this.centerX, y: this.centerY }; }

  setRadius(radius: number): void { this.radius = radius; }
  setAngularVelocity(angularVelocity: number): void { this.angularVelocity = angularVelocity; }
  setInitialAngle(initialAngle: number): void { this.initialAngle = initialAngle; }
  setColor(color: string): void { this.color = color; }
  setCenter(x: number, y: number): void { this.centerX = x; this.centerY = y; }
}

/**
 * Simulador principal de MCU
 */
export class MCUSimulator {
  private particle: MCUParticle | null = null;
  private currentTime: number = 0;
  private isRunning: boolean = false;
  private animationFrameId: number | null = null;
  private lastFrameTime: number = 0;
  private updateCallbacks: Array<(particle: MCUParticle, time: number) => void> = [];

  constructor() {
    this.reset();
  }

  updateCenter(centerX: number, centerY: number): void {
    if (this.particle) {
      this.particle.setCenter(centerX, centerY);
      console.log(`🎯 Simulation center updated to: (${centerX}, ${centerY})`);
    }
  }

  /**
   * Establece la partícula a simular
   */
  setParticle(particle: MCUParticle): void {
    this.particle = particle;
  }

  /**
   * Inicia la simulación
   */
  start(): void {
    if (!this.particle) {
      console.warn('No hay partícula configurada para simular');
      return;
    }
    
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.animate();
  }

  /**
   * Pausa la simulación
   */
  pause(): void {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Reinicia la simulación
   */
  reset(): void {
    this.pause();
    this.currentTime = 0;
    this.lastFrameTime = 0;
  }

  /**
   * Bucle principal de animación
   */
  private animate(): void {
    if (!this.isRunning) return;

    const currentFrameTime = performance.now();
    const deltaTime = (currentFrameTime - this.lastFrameTime) / 1000; // Convertir a segundos
    
    this.updateSimulation(deltaTime);
    this.lastFrameTime = currentFrameTime;
    
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  /**
   * Actualiza el estado de la simulación
   */
  updateSimulation(deltaTime: number): void {
    if (!this.particle) return;
    
    this.currentTime += deltaTime;
    this.particle.update(deltaTime);
    
    // Notificar a las callbacks registradas
    this.updateCallbacks.forEach(callback => {
      callback(this.particle!, this.currentTime);
    });
  }

  /**
   * Actualiza los parámetros de la partícula
   */
  setParameters(radius: number, angularVelocity: number, initialAngle: number = 0): void {
    if (this.particle) {
      this.particle.setRadius(radius);
      this.particle.setAngularVelocity(angularVelocity);
      this.particle.setInitialAngle(initialAngle);
    }
  }

  /**
   * Registra una callback para recibir actualizaciones
   */
  onUpdate(callback: (particle: MCUParticle, time: number) => void): void {
    this.updateCallbacks.push(callback);
  }

  /**
   * Remueve una callback de actualización
   */
  removeUpdateCallback(callback: (particle: MCUParticle, time: number) => void): void {
    const index = this.updateCallbacks.indexOf(callback);
    if (index > -1) {
      this.updateCallbacks.splice(index, 1);
    }
  }

  // Getters
  getCurrentTime(): number { return this.currentTime; }
  isSimulationRunning(): boolean { return this.isRunning; }
  getParticle(): MCUParticle | null { return this.particle; }

  /**
   * Obtiene el estado actual completo de la simulación
   */
  getCurrentState(): {
    time: number;
    position: { x: number; y: number };
    velocity: { vx: number; vy: number; magnitude: number };
    acceleration: { ax: number; ay: number; magnitude: number };
  } | null {
    if (!this.particle) return null;
    
    return {
      time: this.currentTime,
      position: this.particle.getPosition(this.currentTime),
      velocity: this.particle.getVelocity(this.currentTime),
      acceleration: this.particle.getAcceleration(this.currentTime)
    };
  }
}

/**
 * Factory function para crear simulaciones MCU predefinidas
 */
export class MCUSimulatorFactory {
  /**
   * Crea un simulador con configuración básica
   */
  static createBasicSimulator(
    radius: number = 100,
    angularVelocity: number = 1,
    centerX: number = 400,
    centerY: number = 300
  ): MCUSimulator {
    const simulator = new MCUSimulator();
    const particle = new MCUParticle(radius, angularVelocity, 0, '#FF6B35', centerX, centerY);
    simulator.setParticle(particle);
    return simulator;
  }

  /**
   * Crea un simulador con múltiples configuraciones preestablecidas
   */
  static createPresetSimulator(preset: 'slow' | 'normal' | 'fast'): MCUSimulator {
    const configs = {
      slow: { radius: 80, angularVelocity: 0.5 },
      normal: { radius: 100, angularVelocity: 1.0 },
      fast: { radius: 120, angularVelocity: 2.0 }
    };
    
    const config = configs[preset];
    return this.createBasicSimulator(config.radius, config.angularVelocity);
  }
}