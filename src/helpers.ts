import {
  CellInfo,
  Coordinates,
  getKeyForCell,
} from "./containers/field/fieldSlice";

type CoordinatesCalcFuncType = (
  x: number,
  y: number,
  winCondition: number,
  i: number
) => Coordinates;

export const getAdjacentCells = (
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
      cellsResult.push({ ...cell, x: props.x, y: props.y });
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
  const props = { cells, x, y, winCondition };
  // left-to-right
  const diagonalLeftToRight = getAdjacentCells(props, (x, y, w, i) => ({
    x: x - w + i,
    y: y + w - i,
  }));
  // right-to-left
  const diagonalRightToLeft = getAdjacentCells(props, (x, y, w, i) => ({
    x: x - w + i,
    y: y - w + i,
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

  return false;
};

const hasWinnerInCells = (
  cells: CellInfo[],
  winCondition: number
): string[] | null => {
  return false;
};
