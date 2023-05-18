import { createRoom, getRoom } from "@lib/repo/room-repo";

export function getOrCreateRoom(id: string) {
  return getRoom(id) || createRoom({ id });
}
