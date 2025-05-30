/**
 * Clase que representa una partícula en movimiento circular uniformemente acelerado (MCUA)
 */
export class MCUAParticle {
  private radius: number;
  private initialAngularVelocity: number; // ω₀ (rad/s)
  private angularAcceleration: number; // α (rad/s²)
  private initialAngle: number; // θ₀ (rad)
  private color: string;
  private centerX: number;
  private centerY: number;

  constructor(
    radius: number,
    initialAngularVelocity: number,
    angularAcceleration: number = 0,
    initialAngle: number = 0,
    color: string = '#FF6B35',
    centerX: number = 0,
    centerY: number = 0
  ) {
    this.radius = radius;
    this.initialAngularVelocity = initialAngularVelocity;
    this.angularAcceleration = angularAcceleration;
    this.initialAngle = initialAngle;
    this.color = color;
    this.centerX = centerX;
    this.centerY = centerY;
  }

  /**
   * Actualiza la partícula en función del tiempo transcurrido
   */
  update(deltaTime: number): void {
    // En MCUA, el estado se calcula dinámicamente basado en el tiempo total
    // No se requiere actualización específica del estado interno
  }

  /**
   * Calcula el ángulo actual en un tiempo dado
   * θ(t) = θ₀ + ω₀t + ½αt²
   */
  getAngle(time: number): number {
    return this.initialAngle + 
           this.initialAngularVelocity * time + 
           0.5 * this.angularAcceleration * Math.pow(time, 2);
  }

  /**
   * Calcula la velocidad angular actual en un tiempo dado
   * ω(t) = ω₀ + αt
   */
  getAngularVelocity(time: number): number {
    return this.initialAngularVelocity + this.angularAcceleration * time;
  }

  /**
   * Calcula la posición de la partícula en un tiempo dado
   * x(t) = R*cos(θ(t))
   * y(t) = R*sin(θ(t))
   */
  getPosition(time: number): { x: number; y: number } {
    const angle = this.getAngle(time);
    return {
      x: this.centerX + this.radius * Math.cos(angle),
      y: this.centerY + this.radius * Math.sin(angle)
    };
  }

  /**
   * Calcula la velocidad tangencial de la partícula en un tiempo dado
   * |v(t)| = R·ω(t)
   * vₓ(t) = -Rω(t)sin(θ(t))
   * vᵧ(t) = Rω(t)cos(θ(t))
   */
  getVelocity(time: number): { vx: number; vy: number; magnitude: number } {
    const angle = this.getAngle(time);
    const angularVelocity = this.getAngularVelocity(time);
    
    const vx = -this.radius * angularVelocity * Math.sin(angle);
    const vy = this.radius * angularVelocity * Math.cos(angle);
    const magnitude = this.radius * Math.abs(angularVelocity);
    
    return { vx, vy, magnitude };
  }

  /**
   * Calcula la aceleración centrípeta en un tiempo dado
   * |aₒ(t)| = R·ω(t)²
   * aₒₓ(t) = -Rω(t)²cos(θ(t))
   * aₒᵧ(t) = -Rω(t)²sin(θ(t))
   */
  getCentripetalAcceleration(time: number): { ax: number; ay: number; magnitude: number } {
    const angle = this.getAngle(time);
    const angularVelocity = this.getAngularVelocity(time);
    const omega_squared = Math.pow(angularVelocity, 2);
    
    const ax = -this.radius * omega_squared * Math.cos(angle);
    const ay = -this.radius * omega_squared * Math.sin(angle);
    const magnitude = this.radius * omega_squared;
    
    return { ax, ay, magnitude };
  }

  /**
   * Calcula la aceleración tangencial en un tiempo dado
   * |aₜ(t)| = R·α (constante)
   * aₜₓ(t) = -Rα sin(θ(t))
   * aₜᵧ(t) = Rα cos(θ(t))
   */
  getTangentialAcceleration(time: number): { ax: number; ay: number; magnitude: number } {
    const angle = this.getAngle(time);
    
    const ax = -this.radius * this.angularAcceleration * Math.sin(angle);
    const ay = this.radius * this.angularAcceleration * Math.cos(angle);
    const magnitude = this.radius * Math.abs(this.angularAcceleration);
    
    return { ax, ay, magnitude };
  }

  /**
   * Calcula la aceleración total (centrípeta + tangencial)
   * aₜₒₜₐₗ(t) = aₒ(t) + aₜ(t)
   */
  getTotalAcceleration(time: number): { 
    ax: number; 
    ay: number; 
    magnitude: number;
    centripetal: { ax: number; ay: number; magnitude: number };
    tangential: { ax: number; ay: number; magnitude: number };
  } {
    const centripetal = this.getCentripetalAcceleration(time);
    const tangential = this.getTangentialAcceleration(time);
    
    const ax = centripetal.ax + tangential.ax;
    const ay = centripetal.ay + tangential.ay;
    const magnitude = Math.sqrt(Math.pow(ax, 2) + Math.pow(ay, 2));
    
    return { 
      ax, 
      ay, 
      magnitude,
      centripetal,
      tangential
    };
  }

  /**
   * Método de compatibilidad con MCU (solo aceleración centrípeta)
   */
  getAcceleration(time: number): { ax: number; ay: number; magnitude: number } {
    return this.getCentripetalAcceleration(time);
  }

  // Getters y setters
  getRadius(): number { return this.radius; }
  getInitialAngularVelocity(): number { return this.initialAngularVelocity; }
  getAngularAcceleration(): number { return this.angularAcceleration; }
  getInitialAngle(): number { return this.initialAngle; }
  getColor(): string { return this.color; }
  getCenter(): { x: number; y: number } { return { x: this.centerX, y: this.centerY }; }

  setRadius(radius: number): void { this.radius = radius; }
  setInitialAngularVelocity(initialAngularVelocity: number): void { 
    this.initialAngularVelocity = initialAngularVelocity; 
  }
  setAngularAcceleration(angularAcceleration: number): void { 
    this.angularAcceleration = angularAcceleration; 
  }
  setInitialAngle(initialAngle: number): void { this.initialAngle = initialAngle; }
  setColor(color: string): void { this.color = color; }
  setCenter(x: number, y: number): void { this.centerX = x; this.centerY = y; }

  /**
   * Actualiza todos los parámetros MCUA de una vez
   */
  setMCUAParameters(
    radius: number, 
    initialAngularVelocity: number, 
    angularAcceleration: number, 
    initialAngle: number = 0
  ): void {
    this.radius = radius;
    this.initialAngularVelocity = initialAngularVelocity;
    this.angularAcceleration = angularAcceleration;
    this.initialAngle = initialAngle;
  }
}

// Mantener MCUParticle para compatibilidad hacia atrás
export class MCUParticle extends MCUAParticle {
  constructor(
    radius: number,
    angularVelocity: number,
    initialAngle: number = 0,
    color: string = '#FF6B35',
    centerX: number = 0,
    centerY: number = 0
  ) {
    // MCU es MCUA con aceleración angular = 0
    super(radius, angularVelocity, 0, initialAngle, color, centerX, centerY);
  }

  // Métodos de compatibilidad para MCU
  getAngularVelocity(): number {
    return this.getInitialAngularVelocity(); // En MCU es constante
  }

  setAngularVelocity(angularVelocity: number): void {
    this.setInitialAngularVelocity(angularVelocity);
  }
}

/**
 * Simulador principal de MCUA
 */
export class MCUASimulator {
  private particle: MCUAParticle | null = null;
  private currentTime: number = 0;
  private isRunning: boolean = false;
  private animationFrameId: number | null = null;
  private lastFrameTime: number = 0;
  private updateCallbacks: Array<(particle: MCUAParticle, time: number) => void> = [];

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
  setParticle(particle: MCUAParticle): void {
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
   * Actualiza los parámetros MCUA de la partícula
   */
  setMCUAParameters(
    radius: number, 
    initialAngularVelocity: number, 
    angularAcceleration: number, 
    initialAngle: number = 0
  ): void {
    if (this.particle) {
      this.particle.setMCUAParameters(radius, initialAngularVelocity, angularAcceleration, initialAngle);
    }
  }

  /**
   * Método de compatibilidad con MCU
   */
  setParameters(radius: number, angularVelocity: number, initialAngle: number = 0): void {
    this.setMCUAParameters(radius, angularVelocity, 0, initialAngle);
  }

  /**
   * Registra una callback para recibir actualizaciones
   */
  onUpdate(callback: (particle: MCUAParticle, time: number) => void): void {
    this.updateCallbacks.push(callback);
  }

  /**
   * Remueve una callback de actualización
   */
  removeUpdateCallback(callback: (particle: MCUAParticle, time: number) => void): void {
    const index = this.updateCallbacks.indexOf(callback);
    if (index > -1) {
      this.updateCallbacks.splice(index, 1);
    }
  }

  // Getters
  getCurrentTime(): number { return this.currentTime; }
  isSimulationRunning(): boolean { return this.isRunning; }
  getParticle(): MCUAParticle | null { return this.particle; }

  /**
   * Obtiene el estado actual completo de la simulación MCUA
   */
  getCurrentState(): {
    time: number;
    angle: number;
    angularVelocity: number;
    position: { x: number; y: number };
    velocity: { vx: number; vy: number; magnitude: number };
    acceleration: { ax: number; ay: number; magnitude: number };
    centripetalAcceleration: { ax: number; ay: number; magnitude: number };
    tangentialAcceleration: { ax: number; ay: number; magnitude: number };
    totalAcceleration: { ax: number; ay: number; magnitude: number };
  } | null {
    if (!this.particle) return null;
    
    const totalAcceleration = this.particle.getTotalAcceleration(this.currentTime);
    
    return {
      time: this.currentTime,
      angle: this.particle.getAngle(this.currentTime),
      angularVelocity: this.particle.getAngularVelocity(this.currentTime),
      position: this.particle.getPosition(this.currentTime),
      velocity: this.particle.getVelocity(this.currentTime),
      acceleration: this.particle.getAcceleration(this.currentTime), // Solo centrípeta para compatibilidad
      centripetalAcceleration: totalAcceleration.centripetal,
      tangentialAcceleration: totalAcceleration.tangential,
      totalAcceleration: {
        ax: totalAcceleration.ax,
        ay: totalAcceleration.ay,
        magnitude: totalAcceleration.magnitude
      }
    };
  }
}

// Mantener MCUSimulator para compatibilidad hacia atrás
export class MCUSimulator extends MCUASimulator {
  constructor() {
    super();
  }

  // Sobrescribir setParticle para aceptar MCUParticle
  setParticle(particle: MCUParticle): void {
    super.setParticle(particle);
  }

  // Mantener método original de MCU
  setParameters(radius: number, angularVelocity: number, initialAngle: number = 0): void {
    super.setParameters(radius, angularVelocity, initialAngle);
  }
}

/**
 * Factory function para crear simulaciones MCUA predefinidas
 */
export class MCUASimulatorFactory {
  /**
   * Crea un simulador MCUA con configuración básica
   */
  static createBasicMCUASimulator(
    radius: number = 100,
    initialAngularVelocity: number = 1,
    angularAcceleration: number = 0,
    centerX: number = 400,
    centerY: number = 300
  ): MCUASimulator {
    const simulator = new MCUASimulator();
    const particle = new MCUAParticle(
      radius, 
      initialAngularVelocity, 
      angularAcceleration, 
      0, 
      '#FF6B35', 
      centerX, 
      centerY
    );
    simulator.setParticle(particle);
    return simulator;
  }

  /**
   * Crea un simulador MCU (caso especial de MCUA con α = 0)
   */
  static createMCUSimulator(
    radius: number = 100,
    angularVelocity: number = 1,
    centerX: number = 400,
    centerY: number = 300
  ): MCUASimulator {
    return this.createBasicMCUASimulator(radius, angularVelocity, 0, centerX, centerY);
  }

  /**
   * Crea simuladores con configuraciones preestablecidas
   */
  static createPresetMCUASimulator(preset: 'accelerating' | 'decelerating' | 'uniform'): MCUASimulator {
    const configs = {
      accelerating: { radius: 100, initialAngularVelocity: 0.5, angularAcceleration: 0.5 },
      decelerating: { radius: 100, initialAngularVelocity: 2.0, angularAcceleration: -0.3 },
      uniform: { radius: 100, initialAngularVelocity: 1.0, angularAcceleration: 0 }
    };
    
    const config = configs[preset];
    return this.createBasicMCUASimulator(
      config.radius, 
      config.initialAngularVelocity, 
      config.angularAcceleration
    );
  }
}

// Mantener MCUSimulatorFactory para compatibilidad
export class MCUSimulatorFactory extends MCUASimulatorFactory {
  static createBasicSimulator(
    radius: number = 100,
    angularVelocity: number = 1,
    centerX: number = 400,
    centerY: number = 300
  ): MCUSimulator {
    return super.createMCUSimulator(radius, angularVelocity, centerX, centerY) as MCUSimulator;
  }

  static createPresetSimulator(preset: 'slow' | 'normal' | 'fast'): MCUSimulator {
    const configs = {
      slow: { radius: 80, angularVelocity: 0.5 },
      normal: { radius: 100, angularVelocity: 1.0 },
      fast: { radius: 120, angularVelocity: 2.0 }
    };
    
    const config = configs[preset];
    return this.createBasicSimulator(config.radius, config.angularVelocity) as MCUSimulator;
  }
}