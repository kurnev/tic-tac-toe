import React, { useCallback } from "react";
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

  const renderValue = useCallback((value: CellState | null) => {
    if (value === CellState.X) {
      return "X";
    }
    if (value === CellState.O) {
      return "O";
    }
    return "";
  }, []);

  return (
    <button
      className={styles.cell}
      disabled={cellValue.state !== null}
      onClick={() => dispatch(playerMove({ x, y }))}
      data-testid={`cell_${x}_${y}`}
    >
      {renderValue(cellValue.state)}
    </button>
  );
};
