import { hasWinnerInCells } from "./calculateWinner";
import { CellState, Player } from "./types";

describe("hasWinnerInCells()", () => {
  it("correctly detects winner if there is one", () => {
    const cells = [
      {
        state: null,
        x: 0,
        y: 0,
      },
      {
        state: null,
        x: 1,
        y: 1,
      },
      {
        state: CellState.X,
        x: 2,
        y: 2,
      },
      {
        state: CellState.X,
        x: 3,
        y: 3,
      },
      {
        state: CellState.X,
        x: 4,
        y: 4,
      },
      {
        state: CellState.X,
        x: 5,
        y: 5,
      },
      {
        state: CellState.X,
        x: 6,
        y: 6,
      },
    ];

    const cells2 = [
      {
        state: CellState.X,
        x: 0,
        y: 0,
      },
      {
        state: CellState.X,
        x: 1,
        y: 1,
      },
      {
        state: CellState.X,
        x: 2,
        y: 2,
      },
      {
        state: CellState.X,
        x: 3,
        y: 3,
      },
      {
        state: CellState.X,
        x: 4,
        y: 4,
      },
      {
        state: null,
        x: 5,
        y: 5,
      },
      {
        state: null,
        x: 6,
        y: 6,
      },
      {
        state: null,
        x: 7,
        y: 7,
      },
      {
        state: null,
        x: 8,
        y: 8,
      },
    ];

    const cells3 = [
      {
        state: CellState.O,
        x: 0,
        y: 0,
      },
      {
        state: CellState.X,
        x: 1,
        y: 1,
      },
      {
        state: CellState.X,
        x: 2,
        y: 2,
      },
      {
        state: CellState.X,
        x: 3,
        y: 3,
      },
      {
        state: CellState.X,
        x: 4,
        y: 4,
      },
      {
        state: CellState.X,
        x: 5,
        y: 5,
      },
      {
        state: null,
        x: 6,
        y: 6,
      },
      {
        state: null,
        x: 7,
        y: 7,
      },
      {
        state: null,
        x: 8,
        y: 8,
      },
    ];

    expect(hasWinnerInCells(cells, 5).winner).toEqual(Player.First);
    expect(hasWinnerInCells(cells2, 5).winner).toEqual(Player.First);
    expect(hasWinnerInCells(cells3, 5).winner).toEqual(Player.First);
  });

  it("correctly detects no winners if there are one", () => {
    const cells = [
      {
        state: null,
        x: 0,
        y: 0,
      },
      {
        state: CellState.X,
        x: 2,
        y: 2,
      },
      {
        state: null,
        x: 3,
        y: 3,
      },
      {
        state: CellState.X,
        x: 4,
        y: 4,
      },
    ];
    expect(hasWinnerInCells(cells, 5).winner).toEqual(null);
  });

  it("correctly detects no winners if cells were crossed by different players", () => {
    const cells = [
      {
        state: null,
        x: 0,
        y: 0,
      },
      {
        state: null,
        x: 1,
        y: 1,
      },
      {
        state: CellState.X,
        x: 2,
        y: 2,
      },
      {
        state: CellState.X,
        x: 3,
        y: 3,
      },
      {
        state: CellState.O,
        x: 4,
        y: 4,
      },
      {
        state: CellState.X,
        x: 5,
        y: 5,
      },
      {
        state: CellState.X,
        x: 6,
        y: 6,
      },
    ];
    expect(hasWinnerInCells(cells, 5).winner).toEqual(null);
  });
});
