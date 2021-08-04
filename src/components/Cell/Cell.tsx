import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/store";
import { playerMove } from "../../containers/field/fieldSlice";
import { getKeyForCell } from "../../containers/field/helpers";
import { CellState, Coordinates } from "../../containers/field/types";
import styles from "./Cell.module.css";

export const Cell: React.FC<Coordinates> = ({ x, y }) => {
  const dispatch = useDispatch();
  const cellValue = useAppSelector(
    (state) => state.field.cells[getKeyForCell(x, y)]
  );
  const gameFinished = useAppSelector((state) => state.field.gameFinished);
  const firstCellState = useAppSelector(
    (state) => state.field.cells[getKeyForCell(0, 0)]
  );

  const renderValue = useCallback((value: CellState | null) => {
    if (value === CellState.X) {
      return "X";
    }
    if (value === CellState.O) {
      return "O";
    }
    return "";
  }, []);

  // TODO: do not disable all buttons for first move or game end
  const isDisabled = useMemo(
    () =>
      cellValue.state !== null ||
      gameFinished ||
      (firstCellState.state === null && (x !== 0 || y !== 0)),
    [cellValue, gameFinished, firstCellState]
  );

  return (
    <button
      className={styles.cell}
      disabled={isDisabled}
      onClick={() => dispatch(playerMove({ x, y }))}
    >
      {renderValue(cellValue.state)}
    </button>
  );
};
