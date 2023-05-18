import { Server } from "socket.io";
import { handleJoin } from "../../lib/services/socket-service";

const ioHandler = (req, res) => {
  const server = res.socket.server;

  if (!server.io) {
    console.log("*First use, starting socket.io");
    const io = new Server(server);

    io.on("connection", async (socket) => {
      socket.broadcast.emit("a user connected");

      handleJoin(socket);
    });

    server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export default ioHandler;
