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
  const [gameState, setGameState] = useState("context"); // context, memeSelect, vote, result
  const { user } = useUser();
  const [participants, setParticipants] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [error, setError] = useState(null);
  const [host, setHost] = useState(null);
  const socketClient = useRef(null);
  const [context, setContext] = useState("");
  const [memes, setMemes] = useState({});
  const [votes, setVotes] = useState({});
  const [currentTurn, setCurrentTurn] = useState(0);


  const handleContextSubmit = (newContext) => {
    setContext(newContext);
    setGameState("memeSelect");
    socketClient.current.broadcastMessage({ type: "contextSet", context: newContext });
  };

  const handleMemeSubmit = (userId, memeUrl) => {
    setMemes((prev) => ({ ...prev, [userId]: memeUrl }));
    socketClient.current.broadcastMessage({ type: "memeSubmitted", data: { userId, memeUrl } });
    if (Object.keys(memes).length + 1 === participants.length) {
      setGameState("vote");
      socketClient.current.broadcastMessage({ type: "memesReady", memes: { ...memes, [userId]: memeUrl } });
    }
  };

  const handleVoteSubmit = (userId, votedFor) => {
    setVotes((prev) => ({ ...prev, [userId]: votedFor }));
    socketClient.current.broadcastMessage({ type: "voteSubmitted", data: { userId, votedFor } });
    if (Object.keys(votes).length + 1 === participants.length) {
      setGameState("result");
      socketClient.current.broadcastMessage({ type: "votesReady", votes: { ...votes, [userId]: votedFor } });
    }
  };

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
        score: 0,
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
      if(data.type == "gameStarted"){
        setGameStarted(true);
      }
      if(data.type == "contextSet"){
        setContext(data.context);
        setGameState("memeSelect");
      }
      if(data.type == "memesReady"){
        setGameState("vote");
      }
      if(data.type == "votesReady"){
        setGameState("result");
      }
      if(data.type == "memeSubmitted"){
        console.log("Meme submitted:", data.data);
        console.log("source", source, "data",data);
        setMemes((prev) => ({ ...prev, [data.data.userId]: data.data.memeUrl }));
      }
      if(data.type == "voteSubmitted"){
        console.log("Vote submitted:", data.data);
        setVotes((prev) => ({ ...prev, [data.data.userId]: data.data.votedFor }));
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
          <GameInterface participants={participants} user={user} gameState={gameState} context={context} memes={memes} votes={votes} handleContextSubmit={handleContextSubmit} handleVoteSubmit={handleVoteSubmit} handleMemeSubmit={handleMemeSubmit} currentTurn={currentTurn} />
        )}
      </main>
    </div>
  );
}

export default GameRoom;