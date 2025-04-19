import '../styles/Rooms.css';

function RoomCard({ room, onJoin }) {
  const { id, name, players, maxPlayers, isActive } = room;
  // Oda bilgilerini görüntüle
  console.log('Room data:', room);

  return (
    <div className="room-card">
      <div className="room-info">
        <h3 className="room-name">{name}</h3>
        <div className="room-meta">
          <span className="room-participants">
            <i className="user-icon">👤</i> {players}/{maxPlayers}
          </span>
          <span className={`room-status ${isActive ? 'active' : 'inactive'}`}>
            {isActive ? 'Aktif' : 'Pasif'}
          </span>
        </div>
      </div>

      <button
        className="join-button"
        onClick={() => onJoin(id)}
        disabled={!isActive || players >= maxPlayers}
      >
        {players >= maxPlayers ? 'Oda Dolu' : 'Odaya Katıl'}
      </button>
    </div>
  );
}

export default RoomCard;
