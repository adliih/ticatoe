import { Room } from "@lib/model/room";
import { createRoom } from "@lib/repo/room-repo";

export async function getOrCreateRoom(id: string): Promise<Room> {
  return createRoom({ id });
}
