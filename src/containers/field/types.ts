export type CellInfo = Coordinates & {
  state: CellState | null;
};

export enum Player {
  "First",
  "Second",
}

export enum CellState {
    'X',
    'O'
}

export type Coordinates = {
  x: number;
  y: number;
};
