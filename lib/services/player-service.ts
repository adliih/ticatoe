import { Player } from "@lib/model/room";

export async function createFirstPlayer({
  id,
}: Pick<Player, "id">): Promise<Player> {
  return {
    id,
    value: "O",
  };
}

export async function createSecondPlayer({
  id,
}: Pick<Player, "id">): Promise<Player> {
  return {
    id,
    value: "X",
  };
}
