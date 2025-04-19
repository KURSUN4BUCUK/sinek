// This is a placeholder for the actual socket implementation
// In a real implementation, you would use a library like socket.io-client

class SocketManager {
  constructor() {
    this.connected = false;
    this.username = null;
    this.currentRoom = null;
    this.roomParticipants = [];
    this.callbacks = {
      onRoomsUpdate: () => {},
      onJoinRoom: () => {},
      onParticipantsUpdate: () => {},
      onGameStart: () => {},
      onError: () => {}
    };
  }

  connect(username) {
    this.username = username;
    this.connected = true;
    console.log(`Socket connected for user: ${username}`);

    setTimeout(() => {
      this.callbacks.onRoomsUpdate(this.getMockRooms());
    }, 500);

    return Promise.resolve();
  }

  disconnect() {
    this.connected = false;
    this.username = null;
    console.log('Socket disconnected');
    return Promise.resolve();
  }

  reconnect() {
    if (this.username) {
      return this.connect(this.username);
    }
    return Promise.resolve();
  }

  joinRoom(roomId) {
    console.log(`Joining room: ${roomId}`);
    this.currentRoom = roomId;

    // Simulate getting room participants
    const mockParticipants = this.getMockParticipants(roomId);
    this.roomParticipants = mockParticipants;

    // Notify about joining the room
    this.callbacks.onJoinRoom(roomId);

    // Notify about participants
    this.callbacks.onParticipantsUpdate(mockParticipants);

    // Simulate game starting when exactly 3 participants are in the room
    console.log(`Katılımcı sayısı: ${mockParticipants.length}`);

    if (mockParticipants.length === 3) {
      console.log('Oyun başlıyor! 3 katılımcı var.');
      setTimeout(() => {
        this.callbacks.onGameStart(roomId);
      }, 1000);
    }

    return Promise.resolve();
  }

  onRoomsUpdate(callback) {
    this.callbacks.onRoomsUpdate = callback;
  }

  onJoinRoom(callback) {
    this.callbacks.onJoinRoom = callback;
  }

  onParticipantsUpdate(callback) {
    this.callbacks.onParticipantsUpdate = callback;
  }

  onGameStart(callback) {
    this.callbacks.onGameStart = callback;
  }

  onError(callback) {
    this.callbacks.onError = callback;
  }

  getMockRooms() {
    return [
      { id: 1, name: 'Komik Memeler', players: 2, maxPlayers: 3, isActive: true },
      { id: 2, name: 'Kedi Memeleri', players: 1, maxPlayers: 3, isActive: true },
      { id: 3, name: 'Programcı Memeleri', players: 3, maxPlayers: 3, isActive: true },
      { id: 4, name: 'Dank Memeler', players: 0, maxPlayers: 3, isActive: true },
      { id: 5, name: 'Tatlı Memeler', players: 2, maxPlayers: 3, isActive: true }
    ];
  }

  // Exposed for direct access when needed
  getMockParticipants(roomId) {
    // Generate random participants for the room
    const participants = [];

    // Add the current user
    participants.push({
      id: 'user_' + Date.now(),
      name: this.username,
      isCurrentUser: true
    });

    // Add some mock participants based on the room
    const mockNames = ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma', 'Ali', 'Veli', 'Zeynep'];
    const roomData = this.getMockRooms().find(room => room.id === roomId);

    // If room has 3 or more players, it's ready to start
    if (roomData && roomData.players >= 3) {
      // Add enough participants to reach 3 (minus the current user)
      for (let i = 0; i < 2; i++) {
        participants.push({
          id: 'user_' + (i + 1),
          name: mockNames[i],
          isCurrentUser: false
        });
      }
    } else {
      // Otherwise, return the current number of players
      const playerCount = roomData ? roomData.players : 0;
      for (let i = 0; i < playerCount; i++) {
        participants.push({
          id: 'user_' + (i + 1),
          name: mockNames[i],
          isCurrentUser: false
        });
      }
    }

    return participants;
  }
}

export default new SocketManager();
