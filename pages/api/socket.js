import { Server } from "socket.io";
import { attachHandlers } from "../../lib/services/socket-service";

const ioHandler = (req, res) => {
  const server = res.socket.server;

  if (!server.io) {
    console.log("*First use, starting socket.io");
    const io = new Server(server, {
      connectionStateRecovery: true,
    });

    io.on("connection", async (socket) => {
      socket.broadcast.emit("a user connected");

      attachHandlers(socket);
    });

    server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export default ioHandler;
