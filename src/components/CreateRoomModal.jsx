import { useState } from 'react';
import '../styles/Modal.css';

function CreateRoomModal({ onClose, onCreateRoom }) {
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!roomName.trim()) {
      setError('Lütfen bir oda adı girin');
      return;
    }
    
    onCreateRoom(roomName);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Yeni Oda Oluştur</h2>
          <button className="modal-close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-input-group">
            <label htmlFor="roomName">Oda Adı</label>
            <input
              type="text"
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Oda adını girin"
              maxLength={30}
              autoFocus
            />
            {error && <p className="modal-error">{error}</p>}
          </div>
          
          <div className="modal-actions">
            <button 
              type="button" 
              className="modal-cancel-button"
              onClick={onClose}
            >
              İptal
            </button>
            <button 
              type="submit" 
              className="modal-submit-button"
            >
              Oda Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRoomModal;
