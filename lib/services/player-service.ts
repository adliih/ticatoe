import { Player } from "@lib/model/room";

export function createFirstPlayer({ id }: Pick<Player, "id">): Player {
  return {
    id,
    value: "O",
  };
}

export function createSecondPlayer({ id }: Pick<Player, "id">): Player {
  return {
    id,
    value: "X",
  };
}
