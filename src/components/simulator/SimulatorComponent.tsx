import React, { useRef, useState, useEffect } from 'react';
import CanvasComponent, { useMCUSimulator, type MCUSimulatorRef } from './CanvasComponent';

import { 
  Play, 
  Pause, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Activity, 
  Circle,
  Zap,
  Settings,
  Info,
  MapPin,
  Timer,
  TrendingUp,
  Target
} from 'lucide-react';
import '../../styles/simulator-mcu-component.css';

const MCUSimulationPage: React.FC = () => {
  const canvasRef = useRef<MCUSimulatorRef>(null);
  const simulator = useMCUSimulator(canvasRef);

  // Estados para los controles
  const [isPlaying, setIsPlaying] = useState(true);
  const [showVectors, setShowVectors] = useState(true);
  const [showTrail, setShowTrail] = useState(true);
  
  // Estados para los parámetros físicos
  const [radius, setRadius] = useState(100);
  const [angularVelocity, setAngularVelocity] = useState(1.0);
  const [initialAngle, setInitialAngle] = useState(0);

  // Manejadores de eventos
  const handlePlayPause = () => {
    if (isPlaying) {
      simulator.pauseSimulation();
    } else {
      simulator.startSimulation();
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    simulator.resetSimulation();
    setIsPlaying(false);
  };

  const handleParameterChange = () => {
    simulator.updateParameters(radius, angularVelocity, initialAngle);
  };

  const handleToggleVectors = () => {
    simulator.toggleVectors();
    setShowVectors(!showVectors);
  };

  const handleToggleTrail = () => {
    simulator.toggleTrail();
    setShowTrail(!showTrail);
  };

  // Aplicar parámetros automáticamente cuando cambian
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      simulator.updateParameters(radius, angularVelocity, initialAngle);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [radius, angularVelocity, initialAngle]);

  return (
    <div className="mcu-simulation-container">
      {/* Título mejorado con icono */}



      <div className="simulation-layout">
        {/* Panel de visualización */}
        <div className="visualization-panel">
          <CanvasComponent 
            ref={canvasRef}
            width={600}
            height={400}
            canvasId="mcu-simulator"
          />
          
          {/* Controles de reproducción con iconos */}
          <div className="playback-controls">
            <button 
              onClick={handlePlayPause}
              className={`btn ${isPlaying ? 'btn-pause' : 'btn-play'}`}
              title={isPlaying ? 'Pausar simulación' : 'Iniciar simulación'}
            >
              {isPlaying ? (
                <>
                  <Pause size={18} />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play size={18} />
                  <span>Reproducir</span>
                </>
              )}
            </button>
            
            <button 
              onClick={handleReset}
              className="btn btn-reset"
              title="Reiniciar simulación"
            >
              <RotateCcw size={18} />
              <span>Reiniciar</span>
            </button>

            {/* Indicador de estado */}
            <div className="status-indicator">
              <Activity 
                size={16} 
                className={`status-icon ${isPlaying ? 'playing' : 'paused'}`}
              />
              <span className="status-text">
                {isPlaying ? 'Ejecutándose' : 'Pausado'}
              </span>
            </div>
          </div>
        </div>

        {/* Panel de controles */}
        <div className="controls-panel">
          <div className="control-section">
            <h3>
              <Settings className="section-icon" size={20} />
              Parámetros Físicos
            </h3>
            
            {/* Control de radio */}
            <div className="parameter-control">
              <label htmlFor="radius" className="parameter-label">
                <Circle className="param-icon" size={16} />
                <span>Radio (px):</span>
                <span className="parameter-value">{radius}</span>
              </label>
              <input
                id="radius"
                type="range"
                min="50"
                max="200"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="parameter-slider"
              />
              <div className="slider-info">
                <span>50px</span>
                <span>200px</span>
              </div>
            </div>

            {/* Control de velocidad angular */}
            <div className="parameter-control">
              <label htmlFor="angular-velocity" className="parameter-label">
                <TrendingUp className="param-icon" size={16} />
                <span>Velocidad Angular (rad/s):</span>
                <span className="parameter-value">{angularVelocity.toFixed(1)}</span>
              </label>
              <input
                id="angular-velocity"
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={angularVelocity}
                onChange={(e) => setAngularVelocity(Number(e.target.value))}
                className="parameter-slider"
              />
              <div className="slider-info">
                <span>0.1 rad/s</span>
                <span>3.0 rad/s</span>
              </div>
            </div>

            {/* Control de ángulo inicial */}
            <div className="parameter-control">
              <label htmlFor="initial-angle" className="parameter-label">
                <Target className="param-icon" size={16} />
                <span>Ángulo Inicial:</span>
                <span className="parameter-value">{(initialAngle / Math.PI).toFixed(2)}π rad</span>
              </label>
              <input
                id="initial-angle"
                type="range"
                min="0"
                max={2 * Math.PI}
                step={Math.PI / 8}
                value={initialAngle}
                onChange={(e) => setInitialAngle(Number(e.target.value))}
                className="parameter-slider"
              />
              <div className="slider-info">
                <span>0°</span>
                <span>360°</span>
              </div>
            </div>

            {/* Botón de aplicar cambios */}
            <button 
              onClick={handleParameterChange}
              className="btn btn-apply"
              title="Aplicar cambios inmediatamente"
            >
              <RotateCcw size={16} />
              <span>Aplicar Cambios</span>
            </button>
          </div>

          {/* Controles de visualización */}
          <div className="control-section">
            <h3>
              <Eye className="section-icon" size={20} />
              Visualización
            </h3>
            
            <div className="toggle-controls">
              <label className="toggle" title="Mostrar/ocultar vectores de velocidad y aceleración">
                <input
                  type="checkbox"
                  checked={showVectors}
                  onChange={handleToggleVectors}
                />
                <div className="toggle-icon">
                  {showVectors ? <Eye size={16} /> : <EyeOff size={16} />}
                </div>
                <span>Mostrar vectores</span>
                <div className="toggle-indicator">
                  <Zap size={14} className="vector-icon" />
                </div>
              </label>

              <label className="toggle" title="Mostrar/ocultar trayectoria de la partícula">
                <input
                  type="checkbox"
                  checked={showTrail}
                  onChange={handleToggleTrail}
                />
                <div className="toggle-icon">
                  <Activity size={16} />
                </div>
                <span>Mostrar trayectoria</span>
                <div className="toggle-indicator">
                  <MapPin size={14} className="trail-icon" />
                </div>
              </label>
            </div>

            {/* Leyenda de vectores */}
            <div className="vector-legend">
              <h4>
                <Info className="legend-icon" size={14} />
                Leyenda de Vectores:
              </h4>
              <div className="legend-items">
                <div className="legend-item">
                  <TrendingUp size={14} style={{ color: '#00ff00' }} />
                  <span>Velocidad (V) - Verde</span>
                </div>
                <div className="legend-item">
                  <Zap size={14} style={{ color: '#ff0000' }} />
                  <span>Aceleración centrípeta (a) - Rojo</span>
                </div>
                <div className="legend-item">
                  <Target size={14} style={{ color: '#666666' }} />
                  <span>Centro de rotación - Gris</span>
                </div>
              </div>
            </div>
          </div>

          {/* Información teórica */}
          <div className="control-section">
            <h3>
              <Info className="section-icon" size={20} />
              Información Teórica
            </h3>
            <div className="info-content">
              <div className="formula-group">
                <h4>
                  <MapPin className="formula-icon" size={14} />
                  Posición:
                </h4>
                <div className="formula">
                  <code>x(t) = R·cos(ωt + φ₀)</code><br/>
                  <code>y(t) = R·sin(ωt + φ₀)</code>
                </div>
              </div>
              
              <div className="formula-group">
                <h4>
                  <TrendingUp className="formula-icon" size={14} />
                  Velocidad:
                </h4>
                <div className="formula">
                  <code>|v| = R·ω</code><br/>
                  <small>Siempre tangente al círculo</small>
                </div>
              </div>
              
              <div className="formula-group">
                <h4>
                  <Zap className="formula-icon" size={14} />
                  Aceleración centrípeta:
                </h4>
                <div className="formula">
                  <code>|a| = R·ω²</code><br/>
                  <small>Siempre apunta hacia el centro</small>
                </div>
              </div>
            </div>
          </div>

          {/* Estado actual */}
          <div className="control-section">
            <h3>
              <Timer className="section-icon" size={20} />
              Estado Actual
            </h3>
            <div className="current-state">
              <div className="state-item">
                <Circle className="state-icon" size={14} />
                <span>Radio:</span>
                <span className="state-value">{radius} px</span>
              </div>
              <div className="state-item">
                <TrendingUp className="state-icon" size={14} />
                <span>Velocidad Angular:</span>
                <span className="state-value">{angularVelocity.toFixed(1)} rad/s</span>
              </div>
              <div className="state-item">
                <Target className="state-icon" size={14} />
                <span>Ángulo Inicial:</span>
                <span className="state-value">{(initialAngle * 180 / Math.PI).toFixed(0)}°</span>
              </div>
              <div className="state-item">
                <Zap className="state-icon" size={14} />
                <span>Velocidad Tangencial:</span>
                <span className="state-value">{(radius * angularVelocity).toFixed(1)} px/s</span>
              </div>
              <div className="state-item">
                <Activity className="state-icon" size={14} />
                <span>Aceleración Centrípeta:</span>
                <span className="state-value">{(radius * Math.pow(angularVelocity, 2)).toFixed(1)} px/s²</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCUSimulationPage;