import React from 'react';
import './styles/global.css';

function App() {
  return (
    <div className="app-container">
      <header style={{padding: '20px', backgroundColor: '#1e293b'}}>
        <h1>455TH FIGHTER SQUADRON COMMAND CENTER</h1>
      </header>
      <main style={{padding: '20px'}}>
        <div style={{
          background: '#334155', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <h2>Debug Mode</h2>
          <p>If you can see this, React is working!</p>
        </div>
      </main>
    </div>
  );
}

export default App;
