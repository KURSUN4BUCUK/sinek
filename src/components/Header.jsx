import React from 'react';
import '../styles/Header.css';

function Header({ user, onLogout, showBackButton, onBack, roomId }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          {showBackButton && (
            <button className="back-button" onClick={onBack}>
              <span className="back-icon">←</span>
            </button>
          )}
          <h1 className="app-title eslem-title">Eslem</h1>
        </div>

        <div className="user-info">
          {roomId && <span className="room-name">Oda: {roomId}</span>}
          {user != null && <span className="username">Merhaba, {user.name}</span>}
          {onLogout && (
            <button className="logout-button" onClick={onLogout}>
              Çıkış Yap
            </button>
          )}
          {showBackButton && (
            <button className="leave-button" onClick={onBack}>
              Odadan Çık
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
