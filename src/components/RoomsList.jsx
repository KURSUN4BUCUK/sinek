import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import socketManager from '../socket/socketManager';
import RoomCard from './RoomCard';
import GameRoom from './GameRoom';
import CreateRoomModal from './CreateRoomModal';
import Header from './Header';
import '../styles/Rooms.css';

function RoomsList() {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { username, logout } = useUser();

  useEffect(() => {
    // Komponent mount edildiğinde odaları yükle
    loadRooms();

    socketManager.onRoomsUpdate((updatedRooms) => {
      setRooms(updatedRooms);
      setIsLoading(false);
    });

    socketManager.onError((errorMessage) => {
      setError(errorMessage);
      setIsLoading(false);
    });

    socketManager.onJoinRoom((roomId) => {
      setCurrentRoomId(roomId);
    });

    return () => {
      // Cleanup event listeners
    };
  }, []);

  // Odaları yüklemek için yardımcı fonksiyon
  const loadRooms = () => {
    setIsLoading(true);

    // Backend olmadığı için örnek odaları yükle
    setTimeout(() => {
      const demoRooms = [
        { id: 1, name: 'Komik Memeler', players: 2, maxPlayers: 3, isActive: true },
        { id: 2, name: 'Kedi Memeleri', players: 1, maxPlayers: 3, isActive: true },
        { id: 3, name: 'Programcı Memeleri', players: 3, maxPlayers: 3, isActive: true },
        { id: 4, name: 'Dank Memeler', players: 0, maxPlayers: 3, isActive: true },
        { id: 5, name: 'Tatlı Memeler', players: 2, maxPlayers: 3, isActive: true },
      ];
      setRooms(demoRooms);
      setIsLoading(false);
    }, 1000);
  };

  const handleJoinRoom = (roomId) => {
    socketManager.joinRoom(roomId);
    // The setCurrentRoomId will be handled by the socketManager.onJoinRoom callback
  };

  const handleLeaveRoom = () => {
    setCurrentRoomId(null);
  };

  const handleCreateRoom = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleRoomCreated = (roomName) => {
    // Burada normalde backend'e oda oluşturma isteği gönderilir
    // Şimdilik sadece modal'ı kapatıyoruz
    setShowCreateModal(false);
    alert(`"${roomName}" odası oluşturuldu!`);
  };

  const handleLogout = () => {
    socketManager.disconnect();
    logout();
  };

  if (currentRoomId) {
    return <GameRoom roomId={currentRoomId} onLeaveRoom={handleLeaveRoom} />;
  }

  if (isLoading) {
    return (
      <div className="rooms-container">
        <div className="loading-spinner">Loading rooms...</div>
      </div>
    );
  }

  return (
    <div className="rooms-container">
      <Header
        username={username}
        onLogout={handleLogout}
        showBackButton={false}
      />

      <main className="rooms-main">
        <div className="rooms-title-section">
          <h2>Mevcut Meme Odaları</h2>
          <p>Bir odaya katıl ve meme paylaşmaya başla!</p>

          <div className="rooms-actions">
            <button className="create-room-button" onClick={handleCreateRoom}>
              <span className="plus-icon">+</span> Yeni Oda Oluştur
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="rooms-grid">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onJoin={handleJoinRoom}
              />
            ))
          ) : (
            <div className="no-rooms-message">
              Şu anda mevcut oda bulunmuyor. Yeni bir oda oluşturabilirsin!
            </div>
          )}
        </div>
      </main>

      <footer className="rooms-footer">
        <p>© 2025 Eslem - Arkadaşlarınla gerçek zamanlı meme paylaş</p>
      </footer>

      {showCreateModal && (
        <CreateRoomModal
          onClose={handleCloseModal}
          onCreateRoom={handleRoomCreated}
        />
      )}
    </div>
  );
}

export default RoomsList;
