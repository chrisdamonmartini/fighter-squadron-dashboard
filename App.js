import React, { useState } from 'react';
import './App.css';

// Mock aircraft data
const aircraftData = [
  {
    id: "001",
    tailNumber: "F-35A-21-001",
    status: "Mission Ready",
    nextMission: "CAP 08:00",
    timeToNext: "1h 23m"
  },
  {
    id: "002",
    tailNumber: "F-35A-21-002",
    status: "Minor Issues",
    nextMission: "AI 14:30",
    timeToNext: "7h 53m"
  },
  {
    id: "003",
    tailNumber: "F-35A-21-003",
    status: "In Repair",
    nextMission: "CANCELLED",
    timeToNext: "N/A"
  }
];

// Simple aircraft card component
const AircraftCard = ({ aircraft, onClick }) => {
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
    <div className={`aircraft-card ${getStatusClass(aircraft.status)}`} onClick={onClick}>
      <h3>{aircraft.tailNumber}</h3>
      <div className="card-content">
        <div className="status-indicator"></div>
        <p>Status: {aircraft.status}</p>
        <p>Next Mission: {aircraft.nextMission}</p>
        <p>Time to Next: {aircraft.timeToNext}</p>
      </div>
    </div>
  );
};

function App() {
  const [selectedAircraft, setSelectedAircraft] = useState(null);

  return (
    <div className="App">
      <header className="dashboard-header">
        <h1>455th Fighter Squadron Command Center</h1>
        <div className="header-controls">
          <span className="time">Current Time: {new Date().toLocaleTimeString()}</span>
          <button>Settings</button>
        </div>
      </header>
      
      <main className="dashboard-content">
        <section className="fleet-status">
          <h2>Fleet Status</h2>
          <div className="aircraft-grid">
            {aircraftData.map(aircraft => (
              <AircraftCard 
                key={aircraft.id} 
                aircraft={aircraft} 
                onClick={() => setSelectedAircraft(aircraft)}
              />
            ))}
          </div>
        </section>
        
        <section className="mission-timeline">
          <h2>Mission Timeline</h2>
          <div className="timeline-container">
            <div className="timeline-scale">
              <span>06:00</span>
              <span>08:00</span>
              <span>10:00</span>
              <span>12:00</span>
              <span>14:00</span>
              <span>16:00</span>
              <span>18:00</span>
            </div>
            <div className="timeline-events">
              <div className="timeline-event" style={{left: '10%', width: '15%'}}>CAP Mission</div>
              <div className="timeline-event" style={{left: '40%', width: '20%'}}>AI Mission</div>
              <div className="timeline-event" style={{left: '70%', width: '15%'}}>TRN Mission</div>
            </div>
          </div>
        </section>
        
        {selectedAircraft && (
          <section className="aircraft-details">
            <h2>Aircraft Details: {selectedAircraft.tailNumber}</h2>
            <p>Status: {selectedAircraft.status}</p>
            <p>Next Mission: {selectedAircraft.nextMission}</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;