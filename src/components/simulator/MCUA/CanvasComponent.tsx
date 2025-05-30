import React, { forwardRef, useImperativeHandle, useRef, useEffect, useCallback, useState } from 'react';
import { Application, Graphics, Container, Text, TextStyle } from 'pixi.js';
import { MCUAParticle, MCUASimulator } from '../../../scripts/cinematica/mcua-simulator';


interface Props {
  width?: number;
  height?: number;
  canvasId?: string;
}

export interface MCUASimulatorRef {
  startSimulation: () => void;
  pauseSimulation: () => void;
  resetSimulation: () => void;
  updateParameters: (radius: number, angularVelocity: number, initialAngle?: number) => void;
  updateMCUAParameters: (
    radius: number, 
    initialAngularVelocity: number, 
    angularAcceleration: number, 
    initialAngle?: number
  ) => void;
  toggleVectors: () => void;
  toggleTrail: () => void;
  toggleAccelerationComponents: () => void;
  destroy(): void;
  resize?(width: number, height: number): void;
}

export interface PixiMCUAVisualizer {
  app: Application;
  simulator: MCUASimulator;
  particleGraphics: Graphics;
  velocityVector: Graphics;
  accelerationVector: Graphics;
  centripetalVector: Graphics;
  tangentialVector: Graphics;
  totalAccelerationVector: Graphics;
  trailGraphics: Graphics;
  centerGraphics: Graphics;
  radiusGraphics: Graphics;
  infoText: Text;
  trailPoints: Array<{ x: number; y: number }>;
  showVectors: boolean;
  showTrail: boolean;
  showAccelerationComponents: boolean;
}

class PixiMCUARenderer {
  private visualizer: PixiMCUAVisualizer;
  private isInitialized: boolean = false;

  constructor(canvasElement: HTMLCanvasElement, width: number, height: number) {
    console.log('🏗️ Creando PixiMCUARenderer...');
    this.visualizer = {} as PixiMCUAVisualizer;
    this.init(canvasElement, width, height).catch(error => {
      console.error('💥 Error en inicialización:', error);
    });
  }

  private async init(canvasElement: HTMLCanvasElement, width: number, height: number): Promise<void> {
    try {
      console.log('🎨 Inicializando aplicación PixiJS...');
      
      // Crear aplicación Pixi
      this.visualizer.app = new Application();
      
      await this.visualizer.app.init({
        canvas: canvasElement,
        width,
        height,
        backgroundColor: 0xf8f9fa,
        antialias: true
      });

      console.log('✅ Aplicación PixiJS inicializada');

      // Configurar simulador
      console.log('⚙️ Configurando simulador...');
      this.visualizer.simulator = new MCUASimulator();
      this.setupGraphics();
      this.setupDefaultParticle(width, height);
      this.setupEventListeners();
      
      // Iniciar bucle de renderizado
      this.visualizer.app.ticker.add(this.render.bind(this));
      
      this.isInitialized = true;
      console.log('🎉 PixiMCUA Renderer inicializado completamente');
      
    } catch (error) {
      console.error('💥 Error durante la inicialización:', error);
      throw error; // Re-lanzar el error para que se capture arriba
    }
  }

  private setupGraphics(): void {
    const { app } = this.visualizer;

    // Container principal
    const mainContainer = new Container();
    app.stage.addChild(mainContainer);

    // Gráficos básicos
    this.visualizer.centerGraphics = new Graphics();
    this.visualizer.radiusGraphics = new Graphics();
    this.visualizer.particleGraphics = new Graphics();
    this.visualizer.trailGraphics = new Graphics();
    this.visualizer.trailPoints = [];

    // Vectores básicos
    this.visualizer.velocityVector = new Graphics();
    this.visualizer.accelerationVector = new Graphics(); // Solo centrípeta para compatibilidad

    // Nuevos vectores MCUA
    this.visualizer.centripetalVector = new Graphics();
    this.visualizer.tangentialVector = new Graphics();
    this.visualizer.totalAccelerationVector = new Graphics();

    // Texto informativo
    const textStyle = new TextStyle({
      fontSize: 12,
      fill: '#333333',
      fontFamily: 'Arial',
      lineHeight: 16
    });
    this.visualizer.infoText = new Text({ text: '', style: textStyle });
    this.visualizer.infoText.position.set(10, 10);

    // Añadir elementos al stage en orden correcto
    mainContainer.addChild(this.visualizer.trailGraphics);
    mainContainer.addChild(this.visualizer.radiusGraphics);
    mainContainer.addChild(this.visualizer.centerGraphics);
    mainContainer.addChild(this.visualizer.particleGraphics);
    
    // Vectores
    mainContainer.addChild(this.visualizer.velocityVector);
    mainContainer.addChild(this.visualizer.accelerationVector);
    mainContainer.addChild(this.visualizer.centripetalVector);
    mainContainer.addChild(this.visualizer.tangentialVector);
    mainContainer.addChild(this.visualizer.totalAccelerationVector);
    
    mainContainer.addChild(this.visualizer.infoText);

    // Configuraciones iniciales
    this.visualizer.showVectors = true;
    this.visualizer.showTrail = true;
    this.visualizer.showAccelerationComponents = false;
  }

  private setupDefaultParticle(width: number, height: number): void {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.25;
    
    const particle = new MCUAParticle(
      radius,
      1.0,  // ω₀ = 1 rad/s
      0.2,  // α = 0.2 rad/s² (pequeña aceleración angular)
      0,    // ángulo inicial
      '#FF6B35',
      centerX,
      centerY
    );

    this.visualizer.simulator.setParticle(particle);
  }

  private setupEventListeners(): void {
    window.addEventListener('mcuaParameterChange', (event: any) => {
      const { radius, initialAngularVelocity, angularAcceleration, initialAngle } = event.detail;
      this.updateMCUAParameters(radius, initialAngularVelocity, angularAcceleration, initialAngle);
    });
  }

  private render(): void {
    if (!this.isInitialized) return;

    const { 
      simulator, 
      particleGraphics, 
      velocityVector, 
      accelerationVector,
      centripetalVector,
      tangentialVector,
      totalAccelerationVector,
      trailGraphics, 
      centerGraphics, 
      radiusGraphics, 
      infoText 
    } = this.visualizer;
    
    const state = simulator.getCurrentState();
    if (!state) return;

    const { 
      position, 
      velocity, 
      acceleration, 
      centripetalAcceleration,
      tangentialAcceleration,
      totalAcceleration,
      time 
    } = state;
    
    const particle = simulator.getParticle();
    if (!particle) return;

    // Limpiar todos los gráficos
    this.clearAllGraphics();

    // Dibujar elementos básicos
    this.drawCenter(centerGraphics, particle.getCenter());
    this.drawRadiusCircle(radiusGraphics, particle);
    this.drawParticle(particleGraphics, position, particle.getColor());
    
    // Dibujar vectores según configuración
    if (this.visualizer.showVectors) {
      this.drawVelocityVector(velocityVector, position, velocity);
      
      if (this.visualizer.showAccelerationComponents) {
        // Mostrar componentes separadas
        this.drawCentripetalVector(centripetalVector, position, centripetalAcceleration);
        this.drawTangentialVector(tangentialVector, position, tangentialAcceleration);
        this.drawTotalAccelerationVector(totalAccelerationVector, position, totalAcceleration);
      } else {
        // Mostrar solo aceleración total
        this.drawAccelerationVector(accelerationVector, position, acceleration);
      }
    }
    
    // Actualizar trayectoria
    if (this.visualizer.showTrail) {
      this.updateTrail(position);
      this.drawTrail(trailGraphics);
    }
    
    // Actualizar información
    this.updateInfoText(infoText, state);
  }

  private clearAllGraphics(): void {
    const {
      particleGraphics,
      velocityVector,
      accelerationVector,
      centripetalVector,
      tangentialVector,
      totalAccelerationVector,
      centerGraphics,
      radiusGraphics
    } = this.visualizer;

    particleGraphics.clear();
    velocityVector.clear();
    accelerationVector.clear();
    centripetalVector.clear();
    tangentialVector.clear();
    totalAccelerationVector.clear();
    centerGraphics.clear();
    radiusGraphics.clear();
  }

  private drawCenter(graphics: Graphics, center: { x: number; y: number }): void {
    graphics
      .circle(center.x, center.y, 4)
      .fill(0x666666)
      .circle(center.x, center.y, 4)
      .stroke({ width: 1, color: 0x333333 });
  }

  private drawRadiusCircle(graphics: Graphics, particle: MCUAParticle): void {
    const center = particle.getCenter();
    graphics
      .circle(center.x, center.y, particle.getRadius())
      .stroke({ width: 1, color: 0xcccccc, alpha: 0.5 });
  }

  private drawParticle(graphics: Graphics, position: { x: number; y: number }, color: string): void {
    const colorHex = parseInt(color.replace('#', ''), 16);
    graphics
      .circle(position.x, position.y, 8)
      .fill(colorHex)
      .circle(position.x, position.y, 8)
      .stroke({ width: 2, color: 0xffffff });
  }

  private drawVelocityVector(graphics: Graphics, position: { x: number; y: number }, velocity: { vx: number; vy: number }): void {
    const scale = 8;
    const endX = position.x + velocity.vx * scale;
    const endY = position.y + velocity.vy * scale;
    
    this.drawVector(graphics, position.x, position.y, endX, endY, 0x00ff00, 'V', 3);
  }

  private drawAccelerationVector(graphics: Graphics, position: { x: number; y: number }, acceleration: { ax: number; ay: number }): void {
    const scale = 50;
    const endX = position.x + acceleration.ax * scale;
    const endY = position.y + acceleration.ay * scale;
    
    this.drawVector(graphics, position.x, position.y, endX, endY, 0xff0000, 'a', 2);
  }

  private drawCentripetalVector(graphics: Graphics, position: { x: number; y: number }, acceleration: { ax: number; ay: number }): void {
    const scale = 50;
    const endX = position.x + acceleration.ax * scale;
    const endY = position.y + acceleration.ay * scale;
    
    this.drawVector(graphics, position.x, position.y, endX, endY, 0xff4444, 'ac', 2);
  }

  private drawTangentialVector(graphics: Graphics, position: { x: number; y: number }, acceleration: { ax: number; ay: number }): void {
    const scale = 50;
    const endX = position.x + acceleration.ax * scale;
    const endY = position.y + acceleration.ay * scale;
    
    this.drawVector(graphics, position.x, position.y, endX, endY, 0xff8800, 'at', 2);
  }

  private drawTotalAccelerationVector(graphics: Graphics, position: { x: number; y: number }, acceleration: { ax: number; ay: number }): void {
    const scale = 50;
    const endX = position.x + acceleration.ax * scale;
    const endY = position.y + acceleration.ay * scale;
    
    this.drawVector(graphics, position.x, position.y, endX, endY, 0x8800ff, 'atotal', 3);
  }

  private drawVector(
    graphics: Graphics, 
    startX: number, 
    startY: number, 
    endX: number, 
    endY: number, 
    color: number, 
    label: string,
    lineWidth: number = 2
  ): void {
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    if (length < 5) return; // No dibujar vectores muy pequeños

    // Línea del vector
    graphics
      .moveTo(startX, startY)
      .lineTo(endX, endY)
      .stroke({ width: lineWidth, color });

    // Punta de flecha
    const angle = Math.atan2(endY - startY, endX - startX);
    const arrowLength = Math.min(12, length * 0.3);
    const arrowAngle = Math.PI / 6;

    graphics
      .moveTo(endX, endY)
      .lineTo(
        endX - arrowLength * Math.cos(angle - arrowAngle),
        endY - arrowLength * Math.sin(angle - arrowAngle)
      )
      .moveTo(endX, endY)
      .lineTo(
        endX - arrowLength * Math.cos(angle + arrowAngle),
        endY - arrowLength * Math.sin(angle + arrowAngle)
      )
      .stroke({ width: lineWidth, color });

    // Etiqueta del vector (opcional, cerca del extremo)
    if (length > 20) {
      const labelX = endX + 10;
      const labelY = endY - 5;
      
      const labelStyle = new TextStyle({
        fontSize: 10,
        fill: color,
        fontFamily: 'Arial',
        fontWeight: 'bold'
      });
      
      const labelText = new Text({ text: label, style: labelStyle });
      labelText.position.set(labelX, labelY);
      graphics.addChild(labelText);
    }
  }

  private updateTrail(position: { x: number; y: number }): void {
    this.visualizer.trailPoints.push({ x: position.x, y: position.y });
    
    // Limitar el número de puntos del trail
    if (this.visualizer.trailPoints.length > 150) {
      this.visualizer.trailPoints.shift();
    }
  }

  private drawTrail(graphics: Graphics): void {
    if (this.visualizer.trailPoints.length < 2) return;

    graphics.clear();
    
    for (let i = 0; i < this.visualizer.trailPoints.length - 1; i++) {
      const point = this.visualizer.trailPoints[i];
      const alpha = i / this.visualizer.trailPoints.length;
      const radius = 1 + alpha * 2;
      
      graphics
        .circle(point.x, point.y, radius)
        .fill({ color: 0xff6b35, alpha: alpha * 0.4 });
    }
  }

  private updateInfoText(textObject: Text, state: any): void {
    const { 
      time, 
      angle, 
      angularVelocity, 
      position, 
      velocity, 
      centripetalAcceleration,
      tangentialAcceleration,
      totalAcceleration 
    } = state;
    
    const particle = this.visualizer.simulator.getParticle();
    if (!particle) return;

    const info = [
      `⏱️ Tiempo: ${time.toFixed(2)}s`,
      `📐 Ángulo: ${(angle % (2 * Math.PI)).toFixed(2)} rad`,
      `🔄 ω: ${angularVelocity.toFixed(2)} rad/s`,
      `🚀 α: ${particle.getAngularAcceleration().toFixed(2)} rad/s²`,
      ``,
      `📍 Posición: (${position.x.toFixed(0)}, ${position.y.toFixed(0)})`,
      `⚡ |v|: ${velocity.magnitude.toFixed(1)} px/s`,
      ``,
      `🎯 |ac|: ${centripetalAcceleration.magnitude.toFixed(1)} px/s²`,
      `📈 |at|: ${tangentialAcceleration.magnitude.toFixed(1)} px/s²`,
      `📊 |atotal|: ${totalAcceleration.magnitude.toFixed(1)} px/s²`
    ].join('\n');
    
    textObject.text = info;
  }

  // Métodos públicos para controlar la simulación
  public startSimulation(): void {
    this.visualizer.simulator.start();
  }

  public pauseSimulation(): void {
    this.visualizer.simulator.pause();
  }

  public resetSimulation(): void {
    this.visualizer.simulator.reset();
    this.visualizer.trailPoints = [];
  }

  public updateParameters(radius: number, angularVelocity: number, initialAngle: number = 0): void {
    // Compatibilidad con MCU (α = 0)
    this.updateMCUAParameters(radius, angularVelocity, 0, initialAngle);
  }

  public updateMCUAParameters(
    radius: number, 
    initialAngularVelocity: number, 
    angularAcceleration: number, 
    initialAngle: number = 0
  ): void {
    this.visualizer.simulator.setMCUAParameters(radius, initialAngularVelocity, angularAcceleration, initialAngle);
  }

  public toggleVectors(): void {
    this.visualizer.showVectors = !this.visualizer.showVectors;
  }

  public toggleTrail(): void {
    this.visualizer.showTrail = !this.visualizer.showTrail;
    if (!this.visualizer.showTrail) {
      this.visualizer.trailGraphics.clear();
    }
  }

  public toggleAccelerationComponents(): void {
    this.visualizer.showAccelerationComponents = !this.visualizer.showAccelerationComponents;
  }

  public destroy(): void {
    if (this.visualizer.app) {
      this.visualizer.app.destroy(true);
    }
  }

  resize(newWidth: number, newHeight: number): void {
    if (this.visualizer.app && this.visualizer.app.renderer) {
      this.visualizer.app.renderer.resize(newWidth, newHeight);
      
      if (this.visualizer.app.canvas) {
        this.visualizer.app.canvas.style.width = `${newWidth}px`;
        this.visualizer.app.canvas.style.height = `${newHeight}px`;
      }
      
      this.updateSimulationBounds(newWidth, newHeight);
      console.log(`📐 Canvas resized to: ${newWidth}x${newHeight}`);
    }
  }

  private updateSimulationBounds(width: number, height: number): void {
    const centerX = width / 2;
    const centerY = height / 2;
    
    if (this.visualizer.simulator) {
      this.visualizer.simulator.updateCenter?.(centerX, centerY);
    }
  }
}

const CanvasComponent = forwardRef<MCUASimulatorRef, Props>(({ 
  width = 600, 
  height = 400, 
  canvasId = 'pixi-canvas' 
}, ref) => {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<PixiMCUARenderer | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    startSimulation: () => {
      rendererRef.current?.startSimulation();
    },
    pauseSimulation: () => {
      rendererRef.current?.pauseSimulation();
    },
    resetSimulation: () => {
      rendererRef.current?.resetSimulation();
    },
    updateParameters: (radius: number, angularVelocity: number, initialAngle: number = 0) => {
      rendererRef.current?.updateParameters(radius, angularVelocity, initialAngle);
    },
    updateMCUAParameters: (radius: number, initialAngularVelocity: number, angularAcceleration: number, initialAngle: number = 0) => {
      rendererRef.current?.updateMCUAParameters(radius, initialAngularVelocity, angularAcceleration, initialAngle);
    },
    toggleVectors: () => {
      rendererRef.current?.toggleVectors();
    },
    toggleTrail: () => {
      rendererRef.current?.toggleTrail();
    },
    toggleAccelerationComponents: () => {
      rendererRef.current?.toggleAccelerationComponents();
    },
    destroy: () => {
      rendererRef.current?.destroy();
    }
    
  }), []);

  // Inicialización del renderer
  useEffect(() => {
    const canvas = canvasElementRef.current;
    if (!canvas) return;

    const initializeRenderer = async () => {
      try {
        console.log('🚀 Iniciando inicialización del renderer MCUA...');
        rendererRef.current = new PixiMCUARenderer(canvas, width, height);
        
        // Esperar un poco más para que PixiJS se inicialice completamente
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log('✅ Renderer MCUA creado exitosamente');
        setIsLoaded(true);
        
        // Auto-iniciar la simulación
        setTimeout(() => {
          console.log('🎮 Iniciando simulación MCUA...');
          rendererRef.current?.startSimulation();
        }, 100);
      } catch (error: unknown) {
        console.error('❌ Error inicializando PixiMCUA Renderer:', error);
      }
    };

    initializeRenderer();

    // Cleanup al desmontar
    return () => {
      if (rendererRef.current) {
        rendererRef.current.destroy();
        rendererRef.current = null;
      }
    };
  }, [width, height]);

  useEffect(() => {
    const handleResize = () => {
      if (rendererRef.current && canvasElementRef.current) {
        const container = canvasElementRef.current.parentElement;
        if (container) {
          const newWidth = container.clientWidth;
          const newHeight = container.clientHeight;
          
          // Redimensionar el canvas de PixiJS
          rendererRef.current.resize?.(newWidth, newHeight);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className="canvas-container"
      style={{
        width: width || 600,
        height: height || 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#f8f9fa',
        position: 'relative'
      }}
    >
      <canvas 
        ref={canvasElementRef}
        id={canvasId}
        width={width}
        height={height}
        style={{
          display: 'block',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      />
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          color: '#666',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          🔄 Cargando simulador MCUA...
        </div>
      )}
    </div>
  );
});

CanvasComponent.displayName = 'MCUACanvasComponent';

export default CanvasComponent;

export const useMCUASimulator = (canvasRef: React.RefObject<MCUASimulatorRef | null>) => {
  const startSimulation = useCallback(() => {
    canvasRef.current?.startSimulation();
  }, []);

  const pauseSimulation = useCallback(() => {
    canvasRef.current?.pauseSimulation();
  }, []);

  const resetSimulation = useCallback(() => {
    canvasRef.current?.resetSimulation();
  }, []);

  const updateParameters = useCallback((radius: number, angularVelocity: number, initialAngle: number = 0) => {
    canvasRef.current?.updateParameters(radius, angularVelocity, initialAngle);
  }, []);

  const updateMCUAParameters = useCallback((
    radius: number, 
    initialAngularVelocity: number, 
    angularAcceleration: number, 
    initialAngle: number = 0
  ) => {
    canvasRef.current?.updateMCUAParameters(radius, initialAngularVelocity, angularAcceleration, initialAngle);
  }, []);

  const toggleVectors = useCallback(() => {
    canvasRef.current?.toggleVectors();
  }, []);

  const toggleTrail = useCallback(() => {
    canvasRef.current?.toggleTrail();
  }, []);

  const toggleAccelerationComponents = useCallback(() => {
    canvasRef.current?.toggleAccelerationComponents();
  }, []);

  return {
    startSimulation,
    pauseSimulation,
    resetSimulation,
    updateParameters,
    updateMCUAParameters,
    toggleVectors,
    toggleTrail,
    toggleAccelerationComponents
  };
};
