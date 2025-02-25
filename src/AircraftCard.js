import React, { useState } from 'react';

const AircraftCard = ({ aircraft, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = (e) => {
    e.stopPropagation(); // Prevent triggering onClick of card
    setIsFlipped(!isFlipped);
  };
  
  const handleSelect = () => {
    onClick(aircraft);
  };
  
  // Determine status class
  const getStatusClass = (status) => {
    switch(status) {
      case "Mission Ready": return "status-ready";
      case "Minor Issues": return "status-warning";
      case "In Repair": return "status-alert";
      case "In Mission": return "status-mission";
      default: return "";
    }
  };
  
  return (
    <div 
      className={`aircraft-card ${getStatusClass(aircraft.status)}`} 
      onClick={handleSelect}
    >
      <div className={`card-flip-container ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <div className="aircraft-header">
            <h3>{aircraft.tailNumber}</h3>
            <span className={`status-indicator ${getStatusClass(aircraft.status)}`}></span>
          </div>
          <div className="aircraft-thumbnail">
            <img src={`https://via.placeholder.com/100x60?text=${aircraft.tailNumber}`} alt={aircraft.tailNumber} />
            <div className={`status-ring ${getStatusClass(aircraft.status)}`}></div>
          </div>
          <div className="quick-stats">
            <div className="stat">
              <span className="label">Mission</span>
              <span className="value">{aircraft.nextMission || 'None'}</span>
            </div>
            <div className="stat">
              <span className="label">Status</span>
              <span className="value">{aircraft.status}</span>
            </div>
            <div className="stat">
              <span className="label">Next</span>
              <span className="value countdown">{aircraft.timeToNext || 'N/A'}</span>
            </div>
          </div>
          <button className="flip-btn" onClick={handleFlip}>Details</button>
        </div>
        
        <div className="card-back">
          <h3>Systems Status</h3>
          <ul className="systems-list">
            <li className="system-item operational">
              <span className="system-name">Propulsion</span>
              <span className="system-status">100%</span>
            </li>
            <li className="system-item operational">
              <span className="system-name">Avionics</span>
              <span className="system-status">100%</span>
            </li>
            <li className={`system-item ${aircraft.status === "Minor Issues" ? "issue" : "operational"}`}>
              <span className="system-name">Radar</span>
              <span className="system-status">{aircraft.status === "Minor Issues" ? "Degraded" : "100%"}</span>
            </li>
          </ul>
          <button className="flip-btn" onClick={handleFlip}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default AircraftCard;