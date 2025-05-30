import React, { useRef, useState, useEffect } from 'react';
import CanvasComponent, { useMCUASimulator, type MCUASimulatorRef } from './CanvasComponent';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Activity, 
  Zap, 
  Settings,
  Info,
  Circle,
  TrendingUp
} from 'lucide-react';
import '../../../styles/simulator-mcua-component.css'

const MCUASimulationPage: React.FC = () => {
  const canvasRef = useRef<MCUASimulatorRef>(null);
  const simulator = useMCUASimulator(canvasRef);

  // Estados para los controles
  const [isPlaying, setIsPlaying] = useState(true);
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
      <header className='simulation-header'>
        
        <h1>Simulación de Movimiento Circular Uniforme Acelerado (MCUA)</h1>
        <p>Explora las relaciones entre velocidad angular, aceleración angular y los vectores de aceleración</p>

      </header>


      <div className="simulation-layout">
        <div className="visualization-panel">
          <CanvasComponent 
            ref={canvasRef}
            width={700}
            height={500}
            canvasId="mcua-simulator"
          />
          
          <div className="playback-controls">
            <button 
              onClick={handlePlayPause}
              className={`btn ${isPlaying ? 'btn-pause' : 'btn-play'}`}
            >
              {isPlaying ? (
                <>
                  <Pause size={16} />
                  Pausar
                </>
              ) : (
                <>
                  <Play size={16} />
                  Reproducir
                </>
              )}
            </button>
            
            <button 
              onClick={handleReset}
              className="btn btn-reset"
            >
              <RotateCcw size={16} />
              Reiniciar
            </button>

            <div className="preset-selector">
              <Settings size={16} className="mr-2" />
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

        <div className="controls-panel">
          <div className="control-section">
            <h3>
              <Settings size={20} className="inline mr-2" />
              Parámetros MCUA
            </h3>
            
            {/* Control de radio */}
            <div className="parameter-control">
              <label htmlFor="radius">
                <Circle size={16} className="inline mr-1" />
                Radio (px): <span className="parameter-value">{radius}</span>
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
                <Activity size={16} className="inline mr-1" />
                ω₀ (rad/s): <span className="parameter-value">{initialAngularVelocity.toFixed(2)}</span>
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
                <Zap size={16} className="inline mr-1" />
                α (rad/s²): <span className="parameter-value">{angularAcceleration.toFixed(2)}</span>
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

            <button 
              onClick={handleParameterChange}
              className="btn btn-apply"
            >
              <RotateCcw size={16} />
              Aplicar Cambios
            </button>
          </div>

          {/* Controles de visualización */}
          <div className="control-section">
            <h3>
              <Eye size={20} className="inline mr-2" />
              Visualización
            </h3>
            
            <div className="toggle-controls">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={showVectors}
                  onChange={handleToggleVectors}
                />
                {showVectors ? <Eye size={16} /> : <EyeOff size={16} />}
                <span>Mostrar vectores</span>
              </label>

              <label className="toggle">
                <input
                  type="checkbox"
                  checked={showTrail}
                  onChange={handleToggleTrail}
                />
                <Activity size={16} />
                <span>Mostrar trayectoria</span>
              </label>

              <label className="toggle">
                <input
                  type="checkbox"
                  checked={showAccelerationComponents}
                  onChange={handleToggleAccelerationComponents}
                />
                <TrendingUp size={16} />
                <span>Componentes de aceleración</span>
              </label>
            </div>

            {/* Leyenda de vectores mejorada */}
            <div className="vector-legend">
              <h4>
                <Info size={16} className="inline mr-1" />
                Leyenda de Vectores:
              </h4>
              <div className="legend-item">
                <Activity size={14} style={{ color: '#00ff00' }} />
                <span>Velocidad (V) - Verde</span>
              </div>
              {showAccelerationComponents ? (
                <>
                  <div className="legend-item">
                    <Zap size={14} style={{ color: '#ff4444' }} />
                    <span>Aceleración centrípeta (ac) - Rojo</span>
                  </div>
                  <div className="legend-item">
                    <TrendingUp size={14} style={{ color: '#ff8800' }} />
                    <span>Aceleración tangencial (at) - Naranja</span>
                  </div>
                  <div className="legend-item">
                    <Zap size={14} style={{ color: '#8800ff' }} />
                    <span>Aceleración total (atotal) - Morado</span>
                  </div>
                </>
              ) : (
                <div className="legend-item">
                  <Zap size={14} style={{ color: '#ff0000' }} />
                  <span>Aceleración (a) - Rojo</span>
                </div>
              )}
            </div>
          </div>

          {/* Estado actual mejorado */}
          <div className="control-section">
            <h3>
              <Info size={20} className="inline mr-2" />
              Estado Actual
            </h3>
            <div className="current-state">
              <div className="state-item">
                <span>
                  <Activity size={14} className="inline mr-1" />
                  Tipo de movimiento:
                </span>
                <span className={`movement-type ${
                  angularAcceleration === 0 ? 'uniform' : 
                  angularAcceleration > 0 ? 'accelerating' : 'decelerating'
                }`}>
                  {angularAcceleration === 0 ? 'MCU (Uniforme)' : 
                   angularAcceleration > 0 ? 'Acelerando' : 'Desacelerando'}
                </span>
              </div>
              <div className="state-item">
                <span>
                  <Circle size={14} className="inline mr-1" />
                  Radio:
                </span>
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