import React, { useState, useEffect } from 'react';
import '../styles/MemeVoting.css';

function MemeVoting() {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [progress, setProgress] = useState(65); // Başlangıç ilerleme yüzdesi

  // İlerleme çubuğunu canlandırmak için
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        // Rastgele ilerleme değişimi (60-70 arasında)
        const newProgress = Math.floor(Math.random() * 10) + 60;
        return newProgress;
      });
    }, 3000); // Her 3 saniyede bir güncelle

    return () => clearInterval(interval);
  }, []);

  const handleReaction = (reaction) => {
    setSelectedReaction(reaction);
  };

  const handleDownload = () => {
    // Sadece görünüm amaçlı
    console.log('Meme indiriliyor...');
  };

  const handleSave = () => {
    // Sadece görünüm amaçlı
    console.log('Meme kaydediliyor...');
  };

  return (
    <div className="meme-voting-container">
      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="meme-card">
        {/* Meme Image */}
        <div className="meme-image-container">
          <img
            src="https://i.imgur.com/example.jpg"
            alt="Meme"
            className="meme-image"
            style={{
              display: 'none'
            }}
          />
          <div className="meme-placeholder" style={{
            backgroundImage: `url('https://i.makeitmeme.com/template/billy-madison.jpg')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '300px'
          }}></div>
          <div className="meme-caption">
            <h2>SINIFTA OSURUP KİMSE ANLAMAYINCA</h2>
          </div>
        </div>

        {/* Reaction Buttons */}
        <div className="meme-actions">
          <div className="reaction-buttons">
            <button
              className={`reaction-button smile ${selectedReaction === 'smile' ? 'active' : ''}`}
              onClick={() => handleReaction('smile')}
            >
              <span role="img" aria-label="Smile">😀</span>
            </button>

            <button
              className={`reaction-button meh ${selectedReaction === 'meh' ? 'active' : ''}`}
              onClick={() => handleReaction('meh')}
            >
              <span className="meh-text">¯\_(ツ)_/¯<br/>Meh</span>
            </button>

            <button
              className={`reaction-button dislike ${selectedReaction === 'dislike' ? 'active' : ''}`}
              onClick={() => handleReaction('dislike')}
            >
              <span role="img" aria-label="Dislike">👎</span>
            </button>
          </div>

          <div className="action-buttons">
            <button className="download-button" onClick={handleDownload}>
              <span className="download-icon">📤</span>
              <span>İndir</span>
            </button>

            <button className="save-button" onClick={handleSave}>
              <span className="save-icon">⭐</span>
              <span>Kaydet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemeVoting;
