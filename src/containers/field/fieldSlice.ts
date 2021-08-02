import { createSlice } from "@reduxjs/toolkit";

type Cell = {
  x: number;
  y: number;
  // null means empty
  // true crossed
  state: boolean | null;
  author: Player;
};

enum Player {
  "First",
  "Second",
}

export interface FieldState {
  initiative: Player;
  field: Record<string, Cell>;
}

const initialState: FieldState = {
  initiative: Player.First,
  field: {},
};

export const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    playerMove: (state: FieldState, x: number, y: number, who: Player) => {
      const key = `${x}_${y}`;
      const cellValue = state.field[key];
      if (cellValue) {
        if (cellValue.state !== null) {
          cellValue.state = !cellValue.state;
        } else {
          cellValue.state = true;
        }
      }
    },
  },
});

export const { playerMove } = fieldSlice.actions;

export default fieldSlice.reducer;
