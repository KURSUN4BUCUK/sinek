import React from 'react';
import '../styles/MemeSubmission.css';

function MemeSubmission() {
  return (
    <div className="meme-submission-container">
      {/* Header */}
      <header className="meme-header">
        <div className="header-left">
          <div className="logo">MİM</div>
          <div className="breadcrumb">
            <span>Memül / Ağrı</span>
          </div>
        </div>
        <div className="header-right">
          <div className="progress-info">
            <div className="progress-text">Türkiş Tur: <span className="progress-count">3/5</span></div>
            <div className="progress-message">Memenizi etiketleyin</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="meme-content">
        {/* Sidebar */}
        <div className="meme-sidebar">
          <button className="sidebar-button">KESTANEMDEN KAÇIŞ</button>
        </div>

        {/* Main Area */}
        <div className="meme-main">
          <div className="cat-container">
            <img 
              src="https://i.imgur.com/XqQZ4KR.png" 
              alt="Kedi klavye kullanıyor" 
              className="cat-image" 
            />
          </div>
          
          <div className="submission-message">
            <h2 className="success-title">Eserinizi gönderdiniz</h2>
            <p className="waiting-text">Değerlerini bekliyorum...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemeSubmission;
