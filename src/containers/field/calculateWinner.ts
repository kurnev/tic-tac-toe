import { getKeyForCell, stateToPlayer } from "./helpers";
import { CellInfo, Coordinates, Player } from "./types";

type CoordinatesCalcFuncType = (
  x: number,
  y: number,
  winCondition: number,
  i: number
) => Coordinates;

/**
 * Function `checkField` checks field for a winning condition.
 * It does not iterate over all cells, but rather receives
 * coordinates of last move and checks only cells adjacent to it.
 */
export const checkField = (
  cells: Record<string, CellInfo>,
  lastX: number,
  lastY: number,
  winCondition: number
): Player | null => {
  const props = { cells, x: lastX, y: lastY, winCondition };
  // left-to-right
  const diagonalLeftToRight = getAdjacentCells(props, (x, y, w, i) => ({
    x: x - w + i,
    y: y - w + i,
  }));
  // right-to-left
  const diagonalRightToLeft = getAdjacentCells(props, (x, y, w, i) => ({
    x: x - w + i,
    y: y + w - i,
  }));
  // horizontal
  const horizontal = getAdjacentCells(props, (x, y, w, i) => ({
    x: x - w + i,
    y,
  }));
  // vertical
  const vertical = getAdjacentCells(props, (x, y, w, i) => ({
    x,
    y: y - w + i,
  }));

  return (
    hasWinnerInCells(diagonalLeftToRight, winCondition).winner ??
    hasWinnerInCells(diagonalRightToLeft, winCondition).winner ??
    hasWinnerInCells(horizontal, winCondition).winner ??
    hasWinnerInCells(vertical, winCondition).winner
  );
};

const getAdjacentCells = (
  props: {
    cells: Record<string, CellInfo>;
    x: number;
    y: number;
    winCondition: number;
  },
  coordinatesCalcFunc: CoordinatesCalcFuncType
): (CellInfo & Coordinates)[] => {
  const cellsResult: (CellInfo & Coordinates)[] = [];

  for (let i = 0; i < props.winCondition * 2; i++) {
    const coordinates = coordinatesCalcFunc(
      props.x,
      props.y,
      props.winCondition,
      i
    );
    const key = getKeyForCell(coordinates.x, coordinates.y);
    const cell = props.cells[key];
    if (cell) {
      cellsResult.push({ ...cell, x: coordinates.x, y: coordinates.y });
    }
  }

  return cellsResult;
};

export const hasWinnerInCells = (
  cells: CellInfo[],
  winCondition: number
): {
  winningCells: CellInfo[];
  winner: Player | null;
} => {
  // arrays are popullated one-by-one, so
  // simply check `winCondition` cells
  // ticked by one player
  let iterator = 0;
  let lastIndex = 0;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].state !== null) {
      lastIndex = i;
      if (iterator > 0) {
        const isSameAuthor = cells[i - 1].state === cells[i].state;
        if (isSameAuthor) {
          iterator++;
        } else {
          iterator = 1;
        }
      } else {
        iterator++;
      }
    } else {
      iterator = 0;
    }

    if (iterator === winCondition) {
      return {
        winningCells: cells.slice(lastIndex, winCondition),
        winner: stateToPlayer(cells[lastIndex].state),
      };
    }
  }

  return {
    winningCells: [],
    winner: null,
  };
};
