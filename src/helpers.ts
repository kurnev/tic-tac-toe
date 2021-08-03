import { CellInfo, getKeyForCell } from "./containers/field/fieldSlice";

export const getAdjacentDiagonalCells = (
  cells: Record<string, CellInfo>,
  x: number,
  y: number,
  direction: "left-to-right" | "right-to-left",
  winCondition: number
): CellInfo[] => {
  const cellsResults: CellInfo[] = [];

  // because we check all possible win considitons on diagonal line
  // from move cell
  for (let i = 0; i < winCondition * 2; i++) {
    if (direction === "left-to-right") {
      const key = getKeyForCell(x - winCondition + i, y + winCondition - i);
      const cell = cells[key];
      if (cell) {
        cellsResults.push(cell);
      }
    } else if (direction === "right-to-left") {
      const key = getKeyForCell(x - winCondition + i, y - winCondition + i);
      const cell = cells[key];
      if (cell) {
        cellsResults.push(cell);
      }
    }
  }

  return cellsResults;
};

export const getAdjacentHorizontalCells = (
  cells: Record<string, CellInfo>,
  x: number,
  y: number,
  winCondition: number
): CellInfo[] => {
  const cellsResult: CellInfo[] = [];

  for (let i = 0; i < winCondition * 2; i++) {
    const key = getKeyForCell(x - winCondition + i, y);
    const cell = cells[key];
    if (cell) {
      cellsResult.push(cell);
    }
  }

  return cellsResult;
};

export const getAdjacentVerticalCells = (
  cells: Record<string, CellInfo>,
  x: number,
  y: number,
  winCondition: number
): CellInfo[] => {
  const cellsResult: CellInfo[] = [];

  for (let i = 0; i < winCondition * 2; i++) {
    const key = getKeyForCell(x - winCondition + i, y);
    const cell = cells[key];
    if (cell) {
      cellsResult.push(cell);
    }
  }

  return cellsResult;
};

export const checkField = (
  cells: Record<string, CellInfo>,
  x: number,
  y: number,
  winCondition: number
) => {
  const leftToRightDiagonalResult = getAdjacentDiagonalCells(
    cells,
    x,
    y,
    "left-to-right",
    winCondition
  );
  const rightToLeftDiagonalResult = getAdjacentDiagonalCells(
    cells,
    x,
    y,
    "right-to-left",
    winCondition
  );
  const horizontalCells = getAdjacentHorizontalCells(cells, x, y, winCondition);
  const verticalCells = getAdjacentVerticalCells(cells, x, y, winCondition);

  return (
    leftToRightDiagonalResult ||
    rightToLeftDiagonalResult ||
    horizontalCells ||
    verticalCells
  );
};

const hasWinnerInCells = (_cells: CellInfo[], _winCondition: number) => {
  return false;
};
