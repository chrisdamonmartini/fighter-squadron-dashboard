import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import './styles/global.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
