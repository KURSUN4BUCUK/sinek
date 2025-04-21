import io from "socket.io-client";

class SocketClient {
  constructor(namespace) {
    this.socket = io(`https://topluyo-510030293cd5.herokuapp.com/socket/public:${namespace}`, {
      path: "/socket/public:"+namespace,
      autoConnect: false,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ["websocket"],
    });
  }

  connect(user) {
    this.socket.connect();
    this.socket.emit("pass", user);
  }

  onConnect(callback) {
    this.socket.on("connect", callback);
  }

  onRoom(callback) {
    this.socket.on("room", callback);
  }

  onMessage(callback) {
    this.socket.on("message", callback);
  }

  sendMessage(to, data) {
    this.socket.emit("message", { to, data });
  }

  broadcastMessage(data) {
    this.socket.emit("broadcast", data);
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export default SocketClient;