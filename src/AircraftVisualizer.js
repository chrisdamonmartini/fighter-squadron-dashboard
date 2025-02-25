import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import '../styles/AircraftVisualizer.css';

// Aircraft 3D model component
const Aircraft = ({ aircraft, highlightSystems }) => {
  const gltf = useLoader(GLTFLoader, '/models/f35.glb');
  const modelRef = useRef();
  
  useEffect(() => {
    if (gltf && highlightSystems && aircraft.errors.length > 0) {
      // Reset materials
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.userData.originalMaterial) {
          child.material = child.userData.originalMaterial.clone();
        }
      });
      
      // Apply highlight to error areas
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          // Store original material if not already stored
          if (!child.userData.originalMaterial) {
            child.userData.originalMaterial = child.material.clone();
          }
          
          // Check if this mesh corresponds to a system with an error
          aircraft.errors.forEach(error => {
            if (child.name.includes(error.system.toLowerCase())) {
              // Create highlight material
              const highlightMaterial = new THREE.MeshStandardMaterial({
                color: new THREE.Color('#ef4444'),
                emissive: new THREE.Color('#ef4444'),
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.8,
              });
              
              child.material = highlightMaterial;
            }
          });
        }
      });
    }
  }, [gltf, aircraft, highlightSystems]);
  
  useFrame(() => {
    if (modelRef.current) {
      // Gentle automatic rotation
      modelRef.current.rotation.y += 0.002;
    }
  });
  
  return (
    <group ref={modelRef}>
      <primitive object={gltf.scene} scale={[0.5, 0.5, 0.5]} position={[0, -1, 0]} />
    </group>
  );
};

const AircraftVisualizer = ({ selectedAircraft }) => {
  const [highlightSystems, setHighlightSystems] = React.useState(true);
  const [viewMode, setViewMode] = React.useState('normal');
  
  const toggleHighlight = () => {
    setHighlightSystems(!highlightSystems);
  };
  
  const changeViewMode = (mode) => {
    setViewMode(mode);
  };
  
  return (
    <div className="aircraft-visualizer">
      <div className="visualizer-header">
        <h2>Aircraft Visualizer</h2>
        <div className="selected-info">
          <span className="tail-number">{selectedAircraft.tailNumber}</span>
          <span className={`status ${selectedAircraft.status.replace(/\s+/g, '-').toLowerCase()}`}>
            {selectedAircraft.status}
          </span>
        </div>
      </div>
      
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <Aircraft 
            aircraft={selectedAircraft} 
            highlightSystems={highlightSystems} 
          />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          <Environment preset="sunset" />
        </Canvas>
        
        {selectedAircraft.errors.length > 0 && (
          <div className="error-indicators">
            {selectedAircraft.errors.map(error => (
              <div key={error.id} className="error-indicator">
                <span className="error-system">{error.system}</span>
                <span className="error-message">{error.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="visualizer-controls">
        <button 
          className={`control-btn ${highlightSystems ? 'active' : ''}`}
          onClick={toggleHighlight}
        >
          Highlight Issues
        </button>
        <button 
          className={`control-btn ${viewMode === 'xray' ? 'active' : ''}`}
          onClick={() => changeViewMode('xray')}
        >
          X-Ray View
        </button>
        <button 
          className={`control-btn ${viewMode === 'exploded' ? 'active' : ''}`}
          onClick={() => changeViewMode('exploded')}
        >
          Exploded View
        </button>
        <button 
          className={`control-btn ${viewMode === 'normal' ? 'active' : ''}`}
          onClick={() => changeViewMode('normal')}
        >
          Normal View
        </button>
      </div>
    </div>
  );
};

export default AircraftVisualizer;