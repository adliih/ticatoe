import { JOIN } from "@/constants/SocketEvent";
import { Socket } from "socket.io";
import { getOrCreateRoom } from "./room-service";

export function handleJoin(socket: Socket) {
  socket.on(JOIN, (roomId, callback) => {
    socket.join(roomId);

    const room = getOrCreateRoom(roomId);

    callback(room);
  });
}
