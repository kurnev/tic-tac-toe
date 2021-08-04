import { CellState, Player } from "./types";

export const getKeyForCell = (x: number, y: number) => `${x}_${y}`;

export const stateToPlayer = (state: CellState | null): Player | null => {
  if (state === null) {
    return null;
  }
  if (state === CellState.X) {
    return Player.First;
  }
  return Player.Second;
};
