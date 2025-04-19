import { useState } from 'react';
import '../styles/GameInterface.css';
// Örnek meme resmi
const memeUrl = 'https://i.imgur.com/DJOJO.jpg';

function GameInterface({ memeImage, onSubmitCaption }) {
  const [caption, setCaption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (caption.trim()) {
      onSubmitCaption(caption);
      setCaption('');
    }
  };

  return (
    <div className="game-interface-container">
      <div className="meme-section">
        <h2 className="meme-title">Steve Harvey Cringe</h2>
        <div className="meme-image-wrapper">
          <div className="meme-image-container">
            <img
              src={memeImage || memeUrl}
              alt="Meme"
              className="meme-image"
            />
            <div className="meme-caption-overlay">Metin 1</div>
          </div>
        </div>
        <div className="meme-actions">
          <button className="meme-action-button">
            <span className="action-icon">🔄</span> MEME DEĞİŞTİR
          </button>
        </div>
      </div>

      <div className="caption-section">
        <div className="caption-content">
          <div className="caption-icon">
            <img src="https://i.imgur.com/Jx8pTZZ.png" alt="Su bardağı" className="milk-icon" />
          </div>
          <h3 className="caption-prompt">Bir şey komik yaz. Şimdi.</h3>
          <form onSubmit={handleSubmit} className="caption-form">
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="İşerin 1..."
              className="caption-input"
              maxLength={100}
            />
            <button
              type="submit"
              className="caption-submit-button"
              disabled={!caption.trim()}
            >
              TAMAMLADUM!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GameInterface;
