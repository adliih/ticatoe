import {
  ENEMY_JOINED,
  JOIN,
  PLAYERS_UPDATED,
  TILE_CLICK,
  TILE_CLICKED,
} from "@/constants/SocketEvent";
import { Server, Socket } from "socket.io";
import { createFirstPlayer, createSecondPlayer } from "./player-service";

export function attachHandlers(io: Server, socket: Socket) {
  handleJoin(io, socket);
  handleTileClick(io, socket);
}

const QUOTA_PLAYER_PER_ROOM = 2;

function handleJoin(io: Server, socket: Socket) {
  socket.on(JOIN, async (roomId) => {
    const currentSocketsInRoom = await socket.in(roomId).fetchSockets();
    const currentPlayerIds = currentSocketsInRoom.map(({ id }) => id);

    console.log("Current players in the room: ", { roomId, currentPlayerIds });

    if (currentPlayerIds.length >= QUOTA_PLAYER_PER_ROOM) {
      // already max
      return;
    }

    socket.join(roomId);

    await updatePlayers(io, roomId);

    if (currentPlayerIds.length + 1 !== QUOTA_PLAYER_PER_ROOM) {
      return;
    }
    // quota for each room is fullfilled. let's get started.
    socket.to(roomId).emit(ENEMY_JOINED);
  });
}

async function updatePlayers(io: Server, roomId: string) {
  const sockets = await io.in(roomId).fetchSockets();

  const players = sockets.map(({ id }, index) => {
    if (index == 0) {
      return createFirstPlayer({ id });
    } else {
      return createSecondPlayer({ id });
    }
  });

  console.log("updatePlayers", { sockets, players });

  io.to(roomId).emit(PLAYERS_UPDATED, { players });
}

function handleTileClick(io: Server, socket: Socket) {
  socket.on(TILE_CLICK, async ({ roomId, ...params }) => {
    const roomSocket = socket.in(roomId);
    // broadcast the tile click event to other player
    roomSocket.emit(TILE_CLICKED, params);
  });
}
