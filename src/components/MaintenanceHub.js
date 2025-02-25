import React from 'react';
import '../styles/MaintenanceHub.css';

const RepairProgressCircle = ({ progress, repairPhase }) => {
  const phases = [
    "Diagnosing",
    "Fault Isolating",
    "Parts on Order",
    "Repair Being Made",
    "Repair Complete",
    "Safe for Flight"
  ];
  
  const currentPhaseIndex = phases.indexOf(repairPhase);
  const circumference = 2 * Math.PI * 45;
  
  return (
    <div className="repair-progress-container">
      <svg className="progress-ring" width="120" height="120">
        <circle
          className="progress-ring-background"
          stroke="#1e293b"
          strokeWidth="8"
          fill="transparent"
          r="45"
          cx="60"
          cy="60"
        />
        <circle
          className="progress-ring-circle"
          stroke="#3b82f6"
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
          r="45"
          cx="60"
          cy="60"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference - (progress / 100 * circumference),
            transition: "stroke-dashoffset 0.5s ease"
          }}
        />
        <text
          x="60"
          y="60"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="24"
          fontWeight="bold"
          fill="#f1f5f9"
        >
          {progress}%
        </text>
      </svg>
      
      <div className="repair-phases">
        {phases.map((phase, index) => (
          <div 
            key={phase}
            className={`phase-indicator ${index <= currentPhaseIndex ? 'completed' : ''}`}
          >
            <div className="phase-dot"></div>
            <span className="phase-label">{phase}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MaintenanceHub = ({ maintenanceData }) => {
  return (
    <div className="maintenance-hub">
      <div className="maintenance-header">
        <h2>Maintenance Hub</h2>
      </div>
      
      <div className="current-repairs">
        <h3>Current Repairs</h3>
        {maintenanceData.map(repair => (
          <div key={repair.id} className="repair-card">
            <div className="repair-info">
              <h4>{repair.aircraft}</h4>
              <div className="repair-details">
                <span className="system">{repair.system}</span>
                <span className="issue">{repair.issue}</span>
                <span className="technician">Tech: {repair.technician}</span>
                <span className="eta">ETA: {repair.estimatedTime}</span>
              </div>
            </div>
            <RepairProgressCircle 
              progress={repair.progress} 
              repairPhase={repair.phase}
            />
          </div>
        ))}
      </div>
      
      <div className="parts-status">
        <h3>Parts Status</h3>
        <div className="status-indicators">
          <div className="status-item in-stock">
            <span className="status-dot"></span>
            <span className="status-label">In Stock</span>
            <span className="status-count">245</span>
          </div>
          <div className="status-item on-order">
            <span className="status-dot"></span>
            <span className="status-label">On Order</span>
            <span className="status-count">13</span>
          </div>
          <div className="status-item critical">
            <span className="status-dot"></span>
            <span className="status-label">Critical</span>
            <span className="status-count">3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceHub;
