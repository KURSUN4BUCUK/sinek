import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import socketManager from '../socket/socketManager';
import '../styles/Welcome.css';

function WelcomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [randomName, setRandomName] = useState('');
  const { login } = useUser();

  // Bileşen yüklenirken rastgele isim oluştur
  useEffect(() => {
    const adjectives = ['Neşeli', 'Komik', 'Sakin', 'Hızlı', 'Havalı', 'Muhteşem', 'Zeki', 'Akıllı', 'Keyifli', 'Tuhaf'];
    const nouns = ['Memeci', 'Komedyen', 'Panda', 'Kaplan', 'Aslan', 'Unicorn', 'Ejderha', 'Büyücü', 'Ninja', 'Korsan'];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000);

    setRandomName(`${randomAdjective}${randomNoun}${randomNumber}`);
  }, []);

  const handleJoinClick = async () => {
    setIsLoading(true);
    setError('');

    try {
      await socketManager.connect(randomName);
      login(randomName);
    } catch (err) {
      setError('Bağlantı başarısız. Lütfen tekrar deneyin.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="logo-container">
          <h1 className="app-title">Eslem</h1>
          <p className="app-subtitle">Arkadaşlarınla gerçek zamanlı meme paylaş</p>
        </div>

        <div className="welcome-content">
          <div className="random-name-display">
            <p className="name-label">Rastgele kullanıcı adınız:</p>
            <h3 className="random-name">{randomName}</h3>
            {error && <p className="error-message">{error}</p>}
          </div>

          <button
            onClick={handleJoinClick}
            className="primary-button"
            disabled={isLoading}
          >
            {isLoading ? 'Bağlanıyor...' : 'Eğlenceye Katıl'}
          </button>
        </div>

        <div className="welcome-footer">
          <p>Hesap oluşturmaya gerek yok! Sadece tıkla ve meme paylaşmaya başla.</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
