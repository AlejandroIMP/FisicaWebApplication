import React, { forwardRef, useImperativeHandle, useRef, useEffect, useCallback, useState } from 'react';
import { Application, Graphics, Container, Text, TextStyle } from 'pixi.js';
import { MCUParticle, MCUSimulator } from '../../scripts/cinematica/mcu-simulator';


interface Props {
  width?: number;
  height?: number;
  canvasId?: string;
}

export interface MCUSimulatorRef {
  startSimulation: () => void;
  pauseSimulation: () => void;
  resetSimulation: () => void;
  updateParameters: (radius: number, angularVelocity: number, initialAngle?: number) => void;
  toggleVectors: () => void;
  toggleTrail: () => void;
  destroy(): void;
  resize?(width: number, height: number): void; // Optional method
}

export interface PixiMCUVisualizer {
  app: Application;
  simulator: MCUSimulator;
  particleGraphics: Graphics;
  velocityVector: Graphics;
  accelerationVector: Graphics;
  trailGraphics: Graphics;
  centerGraphics: Graphics;
  radiusGraphics: Graphics;
  infoText: Text;
  trailPoints: Array<{ x: number; y: number }>;
  showVectors: boolean;
  showTrail: boolean;
}

class PixiMCURenderer {
  private visualizer: PixiMCUVisualizer;
  private isInitialized: boolean = false;

  constructor(canvasElement: HTMLCanvasElement, width: number, height: number) {
    console.log('🏗️ Creando PixiMCURenderer...');
    this.visualizer = {} as PixiMCUVisualizer;
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
      this.visualizer.simulator = new MCUSimulator();
      this.setupGraphics();
      this.setupDefaultParticle(width, height);
      this.setupEventListeners();
      
      // Iniciar bucle de renderizado
      this.visualizer.app.ticker.add(this.render.bind(this));
      
      this.isInitialized = true;
      console.log('🎉 PixiMCU Renderer inicializado completamente');
      
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

    // Gráficos para el centro y radio
    this.visualizer.centerGraphics = new Graphics();
    this.visualizer.radiusGraphics = new Graphics();
    
    // Gráficos para la partícula
    this.visualizer.particleGraphics = new Graphics();
    
    // Gráficos para vectores
    this.visualizer.velocityVector = new Graphics();
    this.visualizer.accelerationVector = new Graphics();
    
    // Gráficos para la trayectoria
    this.visualizer.trailGraphics = new Graphics();
    this.visualizer.trailPoints = [];
    
    // Texto informativo
    const textStyle = new TextStyle({
      fontSize: 14,
      fill: '#333333',
      fontFamily: 'Arial'
    });
    this.visualizer.infoText = new Text({ text: '', style: textStyle });
    this.visualizer.infoText.position.set(10, 10);

    // Añadir todos los elementos al stage
    mainContainer.addChild(this.visualizer.trailGraphics);
    mainContainer.addChild(this.visualizer.radiusGraphics);
    mainContainer.addChild(this.visualizer.centerGraphics);
    mainContainer.addChild(this.visualizer.particleGraphics);
    mainContainer.addChild(this.visualizer.velocityVector);
    mainContainer.addChild(this.visualizer.accelerationVector);
    mainContainer.addChild(this.visualizer.infoText);

    // Configuraciones iniciales
    this.visualizer.showVectors = true;
    this.visualizer.showTrail = true;
  }

  private setupDefaultParticle(width: number, height: number): void {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.25;
    
    const particle = new MCUParticle(
      radius,
      1.0, // 1 rad/s
      0,   // ángulo inicial
      '#FF6B35',
      centerX,
      centerY
    );

    this.visualizer.simulator.setParticle(particle);
    this.visualizer.simulator.onUpdate(this.onSimulationUpdate.bind(this));
  }

  private setupEventListeners(): void {
    // Agregar listeners para controles externos si es necesario
    window.addEventListener('mcuParameterChange', (event: any) => {
      const { radius, angularVelocity, initialAngle } = event.detail;
      this.updateParameters(radius, angularVelocity, initialAngle);
    });
  }

  private onSimulationUpdate(particle: MCUParticle, time: number): void {
    // Este método se llama desde el simulador
    // La renderización actual se maneja en el método render()
  }

  private render(): void {
    if (!this.isInitialized) return;

    const { simulator, particleGraphics, velocityVector, accelerationVector, 
            trailGraphics, centerGraphics, radiusGraphics, infoText } = this.visualizer;
    
    const state = simulator.getCurrentState();
    if (!state) return;

    const { position, velocity, acceleration, time } = state;
    const particle = simulator.getParticle();
    if (!particle) return;

    // Limpiar gráficos
    particleGraphics.clear();
    velocityVector.clear();
    accelerationVector.clear();
    centerGraphics.clear();
    radiusGraphics.clear();

    // Dibujar centro
    this.drawCenter(centerGraphics, particle.getCenter());
    
    // Dibujar círculo de radio
    this.drawRadiusCircle(radiusGraphics, particle);
    
    // Dibujar partícula
    this.drawParticle(particleGraphics, position, particle.getColor());
    
    // Dibujar vectores si están habilitados
    if (this.visualizer.showVectors) {
      this.drawVelocityVector(velocityVector, position, velocity);
      this.drawAccelerationVector(accelerationVector, position, acceleration);
    }
    
    // Actualizar trayectoria si está habilitada
    if (this.visualizer.showTrail) {
      this.updateTrail(position);
      this.drawTrail(trailGraphics);
    }
    
    // Actualizar información
    this.updateInfoText(infoText, state);
  }

  private drawCenter(graphics: Graphics, center: { x: number; y: number }): void {
    graphics
      .circle(center.x, center.y, 3)
      .fill(0x666666);
  }

  private drawRadiusCircle(graphics: Graphics, particle: MCUParticle): void {
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
    const scale = 10; // Factor de escala para visualización
    const endX = position.x + velocity.vx * scale;
    const endY = position.y + velocity.vy * scale;
    
    this.drawVector(graphics, position.x, position.y, endX, endY, 0x00ff00, 'V');
  }

  private drawAccelerationVector(graphics: Graphics, position: { x: number; y: number }, acceleration: { ax: number; ay: number }): void {
    const scale = 100; // Factor de escala mayor para aceleración
    const endX = position.x + acceleration.ax * scale;
    const endY = position.y + acceleration.ay * scale;
    
    this.drawVector(graphics, position.x, position.y, endX, endY, 0xff0000, 'A');
  }

  private drawVector(graphics: Graphics, startX: number, startY: number, endX: number, endY: number, color: number, label: string): void {
    // Línea del vector
    graphics
      .moveTo(startX, startY)
      .lineTo(endX, endY)
      .stroke({ width: 2, color });

    // Punta de flecha
    const angle = Math.atan2(endY - startY, endX - startX);
    const arrowLength = 10;
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
      .stroke({ width: 2, color });
  }

  private updateTrail(position: { x: number; y: number }): void {
    this.visualizer.trailPoints.push({ x: position.x, y: position.y });
    
    // Limitar el número de puntos del trail
    if (this.visualizer.trailPoints.length > 100) {
      this.visualizer.trailPoints.shift();
    }
  }

  private drawTrail(graphics: Graphics): void {
    if (this.visualizer.trailPoints.length < 2) return;

    graphics.clear();
    
    for (let i = 0; i < this.visualizer.trailPoints.length - 1; i++) {
      const point = this.visualizer.trailPoints[i];
      const alpha = i / this.visualizer.trailPoints.length;
      
      graphics
        .circle(point.x, point.y, 2)
        .fill({ color: 0xff6b35, alpha: alpha * 0.3 });
    }
  }

  private updateInfoText(textObject: Text, state: any): void {
    const { time, position, velocity, acceleration } = state;
    
    const info = [
      `Tiempo: ${time.toFixed(2)}s`,
      `Posición: (${position.x.toFixed(1)}, ${position.y.toFixed(1)})`,
      `Velocidad: ${velocity.magnitude.toFixed(2)} px/s`,
      `Aceleración: ${acceleration.magnitude.toFixed(2)} px/s²`
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
    this.visualizer.simulator.setParameters(radius, angularVelocity, initialAngle);
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

  public destroy(): void {
    if (this.visualizer.app) {
      this.visualizer.app.destroy(true);
    }
  }

  // Add the resize method
  resize(newWidth: number, newHeight: number): void {
    if (this.visualizer.app && this.visualizer.app.renderer) {
      // Resize the PixiJS application
      this.visualizer.app.renderer.resize(newWidth, newHeight);
      
      // Update canvas element dimensions
      if (this.visualizer.app.canvas) {
        this.visualizer.app.canvas.style.width = `${newWidth}px`;
        this.visualizer.app.canvas.style.height = `${newHeight}px`;
      }
      
      // Optionally, you might want to update simulation parameters
      // based on the new dimensions
      this.updateSimulationBounds(newWidth, newHeight);
      
      console.log(`📐 Canvas resized to: ${newWidth}x${newHeight}`);
    }
  }

  private updateSimulationBounds(width: number, height: number): void {
    // Update any simulation parameters that depend on canvas size
    // For example, update center position for circular motion
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Update your simulation center if needed
    if (this.visualizer.simulator) {
      this.visualizer.simulator.updateCenter?.(centerX, centerY);
    }
  }
}

const CanvasComponent = forwardRef<MCUSimulatorRef, Props>(({ 
  width = 600, 
  height = 400, 
  canvasId = 'pixi-canvas' 
}, ref) => {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<PixiMCURenderer | null>(null);
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
    toggleVectors: () => {
      rendererRef.current?.toggleVectors();
    },
    toggleTrail: () => {
      rendererRef.current?.toggleTrail();
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
        console.log('🚀 Iniciando inicialización del renderer...');
        console.log('Canvas element:', canvas);
        console.log('Dimensiones:', { width, height });
        
        rendererRef.current = new PixiMCURenderer(canvas, width, height);
        
        // Esperar un poco más para que PixiJS se inicialice completamente
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log('✅ Renderer creado exitosamente');
        setIsLoaded(true);
        
        // Auto-iniciar la simulación
        setTimeout(() => {
          console.log('🎮 Iniciando simulación...');
          rendererRef.current?.startSimulation();
        }, 100);
      } catch (error: unknown) {
        console.error('❌ Error inicializando PixiMCU Renderer:', error);
        if (error instanceof Error) {
          console.error('Stack trace:', error.stack);
        }
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
        width: width || 300,
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
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '10px',
          borderRadius: '4px'
        }}>
          Cargando simulador...
        </div>
      )}
    </div>
  );
});

CanvasComponent.displayName = 'CanvasComponent';

export default CanvasComponent;

export const useMCUSimulator = (canvasRef: React.RefObject<MCUSimulatorRef | null>) => {
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

  const toggleVectors = useCallback(() => {
    canvasRef.current?.toggleVectors();
  }, []);

  const toggleTrail = useCallback(() => {
    canvasRef.current?.toggleTrail();
  }, []);

  return {
    startSimulation,
    pauseSimulation,
    resetSimulation,
    updateParameters,
    toggleVectors,
    toggleTrail
  };
};
