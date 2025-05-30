import React, { useRef, useState, useEffect } from 'react';
import CanvasComponent, { useMCUASimulator, type MCUASimulatorRef } from './CanvasComponent';
import '../../../styles/simulator-mcua-component.css'

const MCUASimulationPage: React.FC = () => {
  const canvasRef = useRef<MCUASimulatorRef>(null);
  const simulator = useMCUASimulator(canvasRef);

  // Estados para los controles
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVectors, setShowVectors] = useState(true);
  const [showTrail, setShowTrail] = useState(true);
  const [showAccelerationComponents, setShowAccelerationComponents] = useState(false);
  
  // Estados para los parámetros físicos MCUA
  const [radius, setRadius] = useState(100);
  const [initialAngularVelocity, setInitialAngularVelocity] = useState(1.0);
  const [angularAcceleration, setAngularAcceleration] = useState(0.2);
  const [initialAngle, setInitialAngle] = useState(0);

  // Presets de simulación
  const [currentPreset, setCurrentPreset] = useState('custom');

  const presets = {
    uniform: {
      name: 'MCU (Uniforme)',
      radius: 100,
      initialAngularVelocity: 1.5,
      angularAcceleration: 0,
      initialAngle: 0
    },
    accelerating: {
      name: 'Acelerando',
      radius: 120,
      initialAngularVelocity: 0.5,
      angularAcceleration: 0.5,
      initialAngle: 0
    },
    decelerating: {
      name: 'Desacelerando',
      radius: 100,
      initialAngularVelocity: 2.0,
      angularAcceleration: -0.3,
      initialAngle: 0
    },
    fastAccel: {
      name: 'Aceleración Rápida',
      radius: 80,
      initialAngularVelocity: 0.2,
      angularAcceleration: 1.0,
      initialAngle: 0
    },
    custom: {
      name: 'Personalizado',
      radius: 100,
      initialAngularVelocity: 1.0,
      angularAcceleration: 0.2,
      initialAngle: 0
    }
  };

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
    simulator.updateMCUAParameters(radius, initialAngularVelocity, angularAcceleration, initialAngle);
    setCurrentPreset('custom');
  };

  const handlePresetChange = (presetKey: string) => {
    const preset = presets[presetKey as keyof typeof presets];
    if (preset) {
      setRadius(preset.radius);
      setInitialAngularVelocity(preset.initialAngularVelocity);
      setAngularAcceleration(preset.angularAcceleration);
      setInitialAngle(preset.initialAngle);
      setCurrentPreset(presetKey);
      
      // Aplicar inmediatamente
      simulator.updateMCUAParameters(
        preset.radius, 
        preset.initialAngularVelocity, 
        preset.angularAcceleration, 
        preset.initialAngle
      );
    }
  };

  const handleToggleVectors = () => {
    simulator.toggleVectors();
    setShowVectors(!showVectors);
  };

  const handleToggleTrail = () => {
    simulator.toggleTrail();
    setShowTrail(!showTrail);
  };

  const handleToggleAccelerationComponents = () => {
    simulator.toggleAccelerationComponents();
    setShowAccelerationComponents(!showAccelerationComponents);
  };

  // Aplicar parámetros cuando cambian
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      simulator.updateMCUAParameters(radius, initialAngularVelocity, angularAcceleration, initialAngle);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [radius, initialAngularVelocity, angularAcceleration, initialAngle]);

  return (
    <div className="mcua-simulation-container">
      {/* Título */}
      <header className="simulation-header">
        <p>Explora las relaciones entre velocidad angular, aceleración angular y los vectores de aceleración</p>
      </header>

      <div className="simulation-layout">
        {/* Panel de visualización */}
        <div className="visualization-panel">
          <CanvasComponent 
            ref={canvasRef}
            width={700}
            height={500}
            canvasId="mcua-simulator"
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

            <div className="preset-selector">
              <label htmlFor="preset-select">Preset:</label>
              <select 
                id="preset-select"
                value={currentPreset}
                onChange={(e) => handlePresetChange(e.target.value)}
                className="preset-dropdown"
              >
                {Object.entries(presets).map(([key, preset]) => (
                  <option key={key} value={key}>
                    {preset.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Panel de controles */}
        <div className="controls-panel">
          <div className="control-section">
            <h3>⚙️ Parámetros MCUA</h3>
            
            {/* Control de radio */}
            <div className="parameter-control">
              <label htmlFor="radius">
                📏 Radio (px): <span className="parameter-value">{radius}</span>
              </label>
              <input
                id="radius"
                type="range"
                min="50"
                max="250"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="parameter-slider"
              />
            </div>

            {/* Control de velocidad angular inicial */}
            <div className="parameter-control">
              <label htmlFor="initial-angular-velocity">
                🚀 ω₀ (rad/s): <span className="parameter-value">{initialAngularVelocity.toFixed(2)}</span>
              </label>
              <input
                id="initial-angular-velocity"
                type="range"
                min="0"
                max="3.0"
                step="0.1"
                value={initialAngularVelocity}
                onChange={(e) => setInitialAngularVelocity(Number(e.target.value))}
                className="parameter-slider"
              />
            </div>

            {/* Control de aceleración angular */}
            <div className="parameter-control">
              <label htmlFor="angular-acceleration">
                ⚡ α (rad/s²): <span className="parameter-value">{angularAcceleration.toFixed(2)}</span>
              </label>
              <input
                id="angular-acceleration"
                type="range"
                min="-1.0"
                max="1.0"
                step="0.1"
                value={angularAcceleration}
                onChange={(e) => setAngularAcceleration(Number(e.target.value))}
                className="parameter-slider"
              />
              <div className="slider-labels">
                <span>Decelera</span>
                <span>Acelera</span>
              </div>
            </div>

            {/* Control de ángulo inicial */}
            <div className="parameter-control">
              <label htmlFor="initial-angle">
                📐 θ₀: <span className="parameter-value">{(initialAngle / Math.PI).toFixed(2)}π rad</span>
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
            </div>

            {/* Botón de aplicar cambios */}
            <button 
              onClick={handleParameterChange}
              className="btn btn-apply"
            >
              🔄 Aplicar Cambios
            </button>
          </div>

          {/* Controles de visualización */}
          <div className="control-section">
            <h3>👁️ Visualización</h3>
            
            <div className="toggle-controls">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={showVectors}
                  onChange={handleToggleVectors}
                />
                <span>🏹 Mostrar vectores</span>
              </label>

              <label className="toggle">
                <input
                  type="checkbox"
                  checked={showTrail}
                  onChange={handleToggleTrail}
                />
                <span>✨ Mostrar trayectoria</span>
              </label>

              <label className="toggle">
                <input
                  type="checkbox"
                  checked={showAccelerationComponents}
                  onChange={handleToggleAccelerationComponents}
                />
                <span>🔍 Componentes de aceleración</span>
              </label>
            </div>

            {/* Leyenda de vectores */}
            <div className="vector-legend">
              <h4>Leyenda de Vectores:</h4>
              <div className="legend-item">
                <span className="legend-color velocity"></span>
                <span>Velocidad (V) - Verde</span>
              </div>
              {showAccelerationComponents ? (
                <>
                  <div className="legend-item">
                    <span className="legend-color centripetal"></span>
                    <span>Aceleración centrípeta (ac) - Rojo</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color tangential"></span>
                    <span>Aceleración tangencial (at) - Naranja</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color total"></span>
                    <span>Aceleración total (atotal) - Morado</span>
                  </div>
                </>
              ) : (
                <div className="legend-item">
                  <span className="legend-color acceleration"></span>
                  <span>Aceleración (a) - Rojo</span>
                </div>
              )}
            </div>
          </div>

          {/* Información teórica */}
          <div className="control-section">
            <h3>📚 Fórmulas MCUA</h3>
            <div className="info-content">
              <div className="formula-group">
                <h4>Cinemática Angular:</h4>
                <div className="formula">
                  <strong>θ(t) = θ₀ + ω₀t + ½αt²</strong>
                </div>
                <div className="formula">
                  <strong>ω(t) = ω₀ + αt</strong>
                </div>
              </div>
              
              <div className="formula-group">
                <h4>Velocidad Tangencial:</h4>
                <div className="formula">
                  <strong>|v| = R·ω(t)</strong>
                </div>
              </div>
              
              <div className="formula-group">
                <h4>Aceleraciones:</h4>
                <div className="formula">
                  <strong>|ac| = R·ω(t)²</strong><br/>
                  <small>(centrípeta)</small>
                </div>
                <div className="formula">
                  <strong>|at| = R·α</strong><br/>
                  <small>(tangencial)</small>
                </div>
                <div className="formula">
                  <strong>|atotal| = √(ac² + at²)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Estado actual */}
          <div className="control-section">
            <h3>📊 Estado Actual</h3>
            <div className="current-state">
              <div className="state-item">
                <span>Tipo de movimiento:</span>
                <span className={`movement-type ${
                  angularAcceleration === 0 ? 'uniform' : 
                  angularAcceleration > 0 ? 'accelerating' : 'decelerating'
                }`}>
                  {angularAcceleration === 0 ? 'MCU (Uniforme)' : 
                   angularAcceleration > 0 ? 'Acelerando' : 'Desacelerando'}
                </span>
              </div>
              <div className="state-item">
                <span>Radio:</span>
                <span>{radius} px</span>
              </div>
              <div className="state-item">
                <span>ω₀:</span>
                <span>{initialAngularVelocity.toFixed(2)} rad/s</span>
              </div>
              <div className="state-item">
                <span>α:</span>
                <span>{angularAcceleration.toFixed(2)} rad/s²</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCUASimulationPage;