import React from 'react';
import Header from './components/Header';
import './styles/global.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main style={{padding: '20px'}}>
        <div style={{
          background: '#334155', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <h2>Dashboard Content</h2>
          <p>The Header component is working! Next we'll add the Dashboard.</p>
        </div>
      </main>
    </div>
  );
}

export default App;
