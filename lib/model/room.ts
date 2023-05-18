export type PlayerValue = "X" | "O";

export type Player = {
  value: PlayerValue;
};

export type Room = {
  id: string;
  players: Player[];
};
