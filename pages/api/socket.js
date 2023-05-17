import { Server } from "socket.io";

const ioHandler = (req, res) => {
  const server = res.socket.server;

  if (!server.io) {
    console.log("*First use, starting socket.io");
    const io = new Server(server);

    io.on("connection", (socket) => {
      socket.broadcast.emit("a user connected");
      socket.on("hello", (msg) => {
        socket.emit("hello", "world!");
      });
    });

    // io.listen();

    server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export default ioHandler;
