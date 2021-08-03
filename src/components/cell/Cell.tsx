import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/store";
import {
  Coordinates,
  getKeyForCell,
  playerMove,
} from "../../containers/field/fieldSlice";

// TODO: make file with typings

import styles from "./Cell.module.css";

type CellProps = Coordinates & { uniqueKey: string };

export const Cell: React.FC<CellProps> = ({ x, y }) => {
  const dispatch = useDispatch();
  const cellValue = useAppSelector(
    (state) => state.field.cells[getKeyForCell(x, y)]
  );

  const renderValue = useCallback((value: null | boolean) => {
    if (value === true) {
      return "X";
    }
    if (value === false) {
      return "O";
    }
    return "_";
  }, []);

  return (
    <button
      className={styles.cell}
      onClick={() => dispatch(playerMove({ x, y }))}
    >
      {renderValue(cellValue.state)}
      <span className={styles.coordinates}>
        {x}:{y}
      </span>
      <span className={styles.coordinates}>{cellValue.author}</span>
    </button>
  );
};
