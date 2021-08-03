import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkField } from "../../helpers";

const GAME_FIELD_SIDES_LENGTH = 100;

// TODO: do smth better?
const initCellsState = () => {
  const cells: Record<string, CellInfo> = {};
  Array(GAME_FIELD_SIDES_LENGTH)
    .fill(null)
    .forEach((_, indexRow) => {
      Array(GAME_FIELD_SIDES_LENGTH)
        .fill(null)
        .forEach((_, indexColumn) => {
          const key = `${indexRow}_${indexColumn}`;
          cells[key] = {
            state: null,
            author: null,
          };
        });
    });
  return cells;
};

export const getKeyForCell = (x: number, y: number) => `${x}_${y}`;

export type CellInfo = {
  // null means empty
  // true crossed
  // TODO: make proper comments
  state: boolean | null;
  author: Player | null;
};

enum Player {
  "First",
  "Second",
}

export type Coordinates = {
  x: number;
  y: number;
};

export interface FieldState {
  initiative: Player;
  cells: Record<string, CellInfo>;
  gameFieldSideLength: number;
  winCondition: number; // how many to cross
  winner: Player | null;
  cellsWithValues: number;
  gameFinished: boolean;
}

const initialState: FieldState = {
  initiative: Player.First,
  cells: initCellsState(),
  gameFieldSideLength: GAME_FIELD_SIDES_LENGTH,
  winCondition: parseInt(process.env.REACT_APP_WIN_CONDITION!, 10),
  winner: null,
  gameFinished: false,
  cellsWithValues: 0,
};

export const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    playerMove: (state: FieldState, action: PayloadAction<Coordinates>) => {
      // change initiative
      state.initiative =
        state.initiative === Player.First ? Player.Second : Player.First;

      const key = getKeyForCell(action.payload.x, action.payload.y);
      const cellValue = state.cells[key];
      if (cellValue) {
        cellValue.author = state.initiative;
        if (cellValue.state !== null) {
          cellValue.state = !cellValue.state;
        } else {
          cellValue.state = true;
        }
      }

      if (cellValue.state !== null) {
        state.cellsWithValues++;
      }

      // check if someone has won the game
      // check area with sides of win_condition from last move

      const result = checkField(
        state.cells,
        action.payload.x,
        action.payload.y,
        state.winCondition
      );
      // if there are no moves left - finish game

      if (state.cellsWithValues === GAME_FIELD_SIDES_LENGTH ** 2) {
        state.gameFinished = true;
      }
    },
  },
});

export const { playerMove } = fieldSlice.actions;

export default fieldSlice.reducer;
