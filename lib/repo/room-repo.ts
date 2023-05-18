import { Room } from "@lib/model/room";

let activeRooms = new Map<string, Room>();

export function getRoom(id: string): Room | undefined {
  return activeRooms.get(id);
}

export function createRoom({ id }: Pick<Room, "id">): Room {
  return {
    id,
    players: [],
  };
}
