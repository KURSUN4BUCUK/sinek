import React, { useState } from 'react';
import MemeSubmission from './MemeSubmission';
import MemeVoting from './MemeVoting';
import '../styles/MemeDemo.css';

function MemeDemo() {
  const [currentView, setCurrentView] = useState('submission');

  return (
    <div className="meme-demo-container">
      {/* Demo Navigation */}
      <div className="demo-nav">
        <button 
          className={currentView === 'submission' ? 'active' : ''}
          onClick={() => setCurrentView('submission')}
        >
          Gönderim Ekranı
        </button>
        <button 
          className={currentView === 'voting' ? 'active' : ''}
          onClick={() => setCurrentView('voting')}
        >
          Oylama Ekranı
        </button>
      </div>

      {/* Content */}
      <div className="demo-content">
        {currentView === 'submission' ? (
          <MemeSubmission />
        ) : (
          <MemeVoting />
        )}
      </div>
    </div>
  );
}

export default MemeDemo;
