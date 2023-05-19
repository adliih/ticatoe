import {
  JOIN,
  TILE_CLICK,
  TILE_CLICKED,
  TURN_CHANGE,
} from "@/constants/SocketEvent";
import { Socket } from "socket.io";
import { getOrCreateRoom } from "./room-service";
import { createFirstPlayer, createSecondPlayer } from "./player-service";

export function attachHandlers(socket: Socket) {
  handleJoin(socket);
  handleTileClick(socket);
}

const QUOTA_PLAYER_PER_ROOM = 2;

function handleJoin(socket: Socket) {
  socket.on(JOIN, async (roomId, callback) => {
    const currentSocketsInRoom = await socket.in(roomId).fetchSockets();
    const currentPlayerIds = currentSocketsInRoom.map(({ id }) => id);

    console.log("Current players in the room: ", { roomId, currentPlayerIds });

    let currentPlayerCount = currentPlayerIds.length;

    if (currentPlayerCount >= QUOTA_PLAYER_PER_ROOM) {
      // already max
      return;
    }

    const room = await getOrCreateRoom(roomId);
    const player =
      currentPlayerCount == 0
        ? await createFirstPlayer({ id: socket.id })
        : await createSecondPlayer({ id: socket.id });

    socket.join(roomId);
    socket.data["player-data"] = player;

    currentPlayerCount += 1;

    callback({ room, player });

    if (currentPlayerCount !== QUOTA_PLAYER_PER_ROOM) {
      return;
    }
    // quota for each room is fullfilled. let's get started. start with player one's turn
    const [playerOneId] = currentPlayerIds;
    socket.to(roomId).emit(TURN_CHANGE, playerOneId);
  });
}

function handleTileClick(socket: Socket) {
  socket.on(TILE_CLICK, async (roomId, row, column, playerId, playerValue) => {
    const roomSocket = socket.in(roomId);
    // broadcast the tile click event to all player
    roomSocket.emit(TILE_CLICKED, row, column, playerValue);

    // find the next player
    const [nextPlayerSocket] = (await roomSocket.fetchSockets()).filter(
      (socket) => socket.id != playerId
    );

    // broadcast the turn change event with next player id param
    roomSocket.emit(TURN_CHANGE, nextPlayerSocket.id);
  });
}
