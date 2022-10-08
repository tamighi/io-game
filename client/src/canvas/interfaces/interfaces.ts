export interface Player {
  x: number;
  y: number;
  dir: number;
  id: string;
}

export interface SentUpdate {
  time: number;
  me: Player;
}
