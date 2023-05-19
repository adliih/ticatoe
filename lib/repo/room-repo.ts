import { Room } from "@lib/model/room";

export function createRoom({ id }: Pick<Room, "id">): Room {
  return {
    id,
  };
}
