import React, { useRef, useState } from 'react';
import CanvasComponent, { useMCUSimulator, type MCUSimulatorRef } from './CanvasComponent';
import '../../styles/simulator-mcu-component.css';

const MCUSimulationPage: React.FC = () => {
  const canvasRef = useRef<MCUSimulatorRef>(null);
  const simulator = useMCUSimulator(canvasRef);

  
  
  // Estados para los controles
  const [isPlaying, setIsPlaying] = useState(false);
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

  

  return (
    <div className="mcu-simulation-container">
      {/* Título */}


      <div className="simulation-layout">
        {/* Panel de visualización */}
        <div className="visualization-panel">
          <CanvasComponent 
            ref={canvasRef}
            width={600}
            height={400}
            canvasId="mcu-simulator"
          />
          
          {/* Controles de reproducción */}
          <div className="playback-controls">
            <button 
              onClick={handlePlayPause}
              className={`btn ${isPlaying ? 'btn-pause' : 'btn-play'}`}
            >
              {isPlaying ? '⏸️ Pausar' : '▶️ Reproducir'}
            </button>
            
            <button 
              onClick={handleReset}
              className="btn btn-reset"
            >
              🔄 Reiniciar
            </button>
          </div>
        </div>

        {/* Panel de controles */}
        <div className="controls-panel">
          <div className="control-section">
            <h3>Parámetros Físicos</h3>
            
            {/* Control de radio */}
            <div className="parameter-control">
              <label htmlFor="radius">Radio (px):</label>
              <input
                id="radius"
                type="range"
                min="50"
                max="200"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                onMouseUp={handleParameterChange}
              />
              <span className="parameter-value">{radius}</span>
            </div>

            {/* Control de velocidad angular */}
            <div className="parameter-control">
              <label htmlFor="angular-velocity">Velocidad Angular (rad/s):</label>
              <input
                id="angular-velocity"
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={angularVelocity}
                onChange={(e) => setAngularVelocity(Number(e.target.value))}
                onMouseUp={handleParameterChange}
              />
              <span className="parameter-value">{angularVelocity.toFixed(1)}</span>
            </div>

            {/* Control de ángulo inicial */}
            <div className="parameter-control">
              <label htmlFor="initial-angle">Ángulo Inicial (rad):</label>
              <input
                id="initial-angle"
                type="range"
                min="0"
                max={2 * Math.PI}
                step={Math.PI / 8}
                value={initialAngle}
                onChange={(e) => setInitialAngle(Number(e.target.value))}
                onMouseUp={handleParameterChange}
              />
              <span className="parameter-value">{(initialAngle / Math.PI).toFixed(2)}π</span>
            </div>

            {/* Botón de aplicar cambios */}
            <button 
              onClick={handleParameterChange}
              className="btn btn-apply"
            >
              Aplicar Cambios
            </button>
          </div>

          {/* Controles de visualización */}
          <div className="control-section">
            <h3>Visualización</h3>
            
            <div className="toggle-controls">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={showVectors}
                  onChange={handleToggleVectors}
                />
                <span>Mostrar vectores</span>
              </label>

              <label className="toggle">
                <input
                  type="checkbox"
                  checked={showTrail}
                  onChange={handleToggleTrail}
                />
                <span>Mostrar trayectoria</span>
              </label>
            </div>
          </div>

          {/* Información teórica */}
          <div className="control-section">
            <h3>Información</h3>
            <div className="info-content">
              <div className="formula">
                <strong>Posición:</strong><br/>
                x(t) = R·cos(ωt + φ₀)<br/>
                y(t) = R·sin(ωt + φ₀)
              </div>
              
              <div className="formula">
                <strong>Velocidad:</strong><br/>
                |v| = R·ω
              </div>
              
              <div className="formula">
                <strong>Aceleración centrípeta:</strong><br/>
                |a| = R·ω²
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCUSimulationPage;