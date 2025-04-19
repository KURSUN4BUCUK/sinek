import { useState, useEffect, useRef } from 'react';
import socketManager from '../socket/socketManager';
import GameInterface from './GameInterface';
import Header from './Header';
import '../styles/GameRoom.css';
import '../styles/Transitions.css';

function GameRoom({ roomId, onLeaveRoom }) {
  const [participants, setParticipants] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [memeImage] = useState('https://i.imgur.com/DJOJO.jpg'); // Placeholder image
  const [showTransition, setShowTransition] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Ses dosyasını önceden yükle
    if (audioRef.current) {
      audioRef.current.load();
      console.log('Ses dosyası yüklendi');
    }

    // Set up socket event listeners
    socketManager.onParticipantsUpdate((updatedParticipants) => {
      setParticipants(updatedParticipants);
      setIsLoading(false);
    });

    socketManager.onGameStart(() => {
      // Önce geçiş animasyonunu göster
      setShowTransition(true);

      // Ses dosyasını çal
      playSound();

      // Animasyon bittikten sonra oyunu başlat
      setTimeout(() => {
        setShowTransition(false);
        setGameStarted(true);
      }, 1500);
    });

    // Force-trigger getting participants for this room
    // This ensures we don't get stuck on loading
    const currentParticipants = socketManager.getMockParticipants(roomId);
    setParticipants(currentParticipants);
    setIsLoading(false);

    // Clean up event listeners on unmount
    return () => {
      // In a real implementation, you would remove event listeners here
    };
  }, [roomId]);

  const handleSubmitCaption = (captionText) => {
    alert(`Caption submitted: ${captionText}`);
    // In a real implementation, this would send the caption to the server
  };

  // Ses çalma yardımcı fonksiyonu
  const playSound = () => {
    try {
      console.log('Ses çalma deneniyor...');
      if (audioRef.current) {
        // Ses seviyesini ayarla
        audioRef.current.volume = 0.7;

        // Ses dosyasını başa al
        audioRef.current.currentTime = 0;

        // Çal
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => console.log('Ses başarıyla çalındı'))
            .catch(e => console.error('Ses çalma hatası:', e));
        }
      } else {
        console.error('Audio referansı bulunamadı');
      }
    } catch (error) {
      console.error('Ses çalma sırasında hata:', error);
    }
  };

  const handleLeaveRoom = () => {
    onLeaveRoom();
  };

  if (isLoading) {
    return (
      <div className="game-room-container">
        <div className="loading-spinner">Oyun odası yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="game-room-container">
      {/* Ses dosyası */}
      <audio ref={audioRef} src="/gamestart.mp3" preload="auto" controls={false}></audio>

      {/* Geçiş animasyonu */}
      {showTransition && (
        <div className="game-transition">
          <div className="transition-content">
            <h2>Oyun Başlıyor!</h2>
            <div className="transition-loader"></div>
          </div>
        </div>
      )}
      <Header
        roomId={roomId}
        showBackButton={true}
        onBack={handleLeaveRoom}
        username={participants.find(p => p.isCurrentUser)?.name}
      />

      <main className="game-room-main">
        {!gameStarted ? (
          <div className="waiting-room">
            <h2>Oyuncular bekleniyor ({participants.length}/3)</h2>
            <p>Oyun 3 oyuncu katıldığında başlayacak</p>

            <div className="participants-list">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className={`participant-item ${participant.isCurrentUser ? 'current-user' : ''}`}
                >
                  <span className="participant-icon">👤</span>
                  <span className="participant-name">
                    {participant.name} {participant.isCurrentUser ? '(Sen)' : ''}
                  </span>
                </div>
              ))}

              {Array(3 - participants.length).fill(0).map((_, index) => (
                <div key={`empty-${index}`} className="participant-item empty">
                  <span className="participant-icon">👤</span>
                  <span className="participant-name">Oyuncu bekleniyor...</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="game-layout">
            <GameInterface
              memeImage={memeImage}
              onSubmitCaption={handleSubmitCaption}
            />

            <div className="players-sidebar">
              <h3>Oyuncular</h3>
              <div className="players-list">
                {participants.map((participant) => {
                  const isCurrentUser = participant.isCurrentUser;
                  return (
                    <div
                      key={participant.id}
                      className={`player-item ${isCurrentUser ? 'current-user' : ''}`}
                    >
                      <span className="player-icon">👤</span>
                      <span className="player-name">
                        {participant.name} {isCurrentUser ? '(Sen)' : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default GameRoom;
