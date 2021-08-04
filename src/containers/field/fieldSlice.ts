import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkField } from "./calculateWinner";
import { getKeyForCell } from "./helpers";
import { CellInfo, CellState, Coordinates, Player } from "./types";

const GAME_FIELD_SIDES_LENGTH = 100;

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
            x: indexRow,
            y: indexColumn,
          };
        });
    });
  return cells;
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
        cellValue.state =
          state.initiative === Player.First ? CellState.X : CellState.O;
        if (cellValue.state !== null) {
          cellValue.state =
            cellValue.state === CellState.X ? CellState.O : CellState.X;
        } else {
          cellValue.state = CellState.X;
        }
      }

      if (cellValue.state !== null) {
        state.cellsWithValues++;
      }

      // check if someone has won the game
      // check area with sides of win_condition from last move

      state.winner = checkField(
        state.cells,
        action.payload.x,
        action.payload.y,
        state.winCondition
      );

      if (state.winner !== null) {
        state.gameFinished = true;
      }

      // if there are no moves left - finish game

      if (state.cellsWithValues === GAME_FIELD_SIDES_LENGTH ** 2) {
        state.gameFinished = true;
      }
    },
  },
});

export const { playerMove } = fieldSlice.actions;

export default fieldSlice.reducer;
