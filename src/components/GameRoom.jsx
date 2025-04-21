import { useState, useEffect, useRef } from "react";
import GameInterface from "./GameInterface";
import Header from "./Header";
import "../styles/GameRoom.css";
import "../styles/Transitions.css";
import SocketClient from "../socket/index";
import { useUser } from "../context/UserContext";
import ErrorPage from "./ErrorPage";

function GameRoom() {
  const roomId = new URLSearchParams(window.location.search).get("room");
  const { user, login } = useUser();
  const [participants, setParticipants] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [host, setHost] = useState(null);
  const socketClient = useRef(null);

  useEffect(() => {
    socketClient.current = new SocketClient(roomId);
    socketClient.current.connect(user);

    socketClient.current.onConnect(() => {
      console.log("Socket connected");
    });

    socketClient.current.onRoom((users) => {
      console.log("Room data received:", users);
      setParticipants(users.map((u) => ({
        id: u.id,
        name: u.user.name,
        img: u.user.img,
      })));

      // Host atama
      if (!host && users.length > 0) {
        const currentHost = users[0].user; // İlk kullanıcıyı host olarak ata
        setHost(currentHost);
      }
      if (user && users.filter((u) => u.user.name === user.name).length > 1) {
        console.log("User already in room");
        setError("Kullanıcı zaten odada.");
      }
    });

    socketClient.current.onMessage(({ source, data }) => {
      console.log(`Message from ${source}:`, data);
      if(data.type == "gameStarted"){
        setGameStarted(true);
      }
    });

    return () => {
      if (socketClient.current) {
        socketClient.current.disconnect();
      }
    };
  }, [roomId, user]);

  useEffect(() => {
    // Host çıkarsa yeni host belirle
    if (host && !participants.find((p) => p.id == host.id)) {
      const newHost = participants[0];
      if (newHost) {
        setHost(newHost);
      }
    }
  }, [participants, host, user]);

  const handleStartGame = () => {
    if (host.name == user.name) {
      setGameStarted(true);
      socketClient.current.broadcastMessage({ type: "gameStarted" });
    }
  };

  if(error) {
    return (<ErrorPage error={error} />)
  }

  return (
    <div className="game-room-container">
      <Header
        roomId={roomId}
        user={participants.find((p) => p.isCurrentUser)}
      />
      <main className="game-room-main">
        {!gameStarted ? (
          <div className="waiting-room">
            <h2>Oyuncular bekleniyor ({participants.length}/7)</h2>
            <p>Oyun 7 oyuncu katıldığında başlayacak</p>
            <div className="participants-list">
              {participants.map((participant, index) => (
                <div
                  className={`participant-item ${
                    participant.id === host?.id ? "host" : ""
                  }`}
                  key={index}
                >

                    <img className="participant-icon"
                      src={participant.img}
                      alt={`${participant.name}'s Avatar`}
                    />

                  <span className="participant-name">
                    {participant.name}{" "}
                    {participant.id === host?.id ? "(Host)" : ""}
                  </span>
                </div>
              ))}
            </div>
            {participants.length >= 3 && host?.name === user.name && (
              <button onClick={handleStartGame}>Start Game</button>
            )}
          </div>
        ) : (
          <GameInterface />
        )}
      </main>
    </div>
  );
}

export default GameRoom;