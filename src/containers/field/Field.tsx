import React, { useMemo } from "react";

import styles from "./Field.module.css";
import { Cell } from "../../components/cell";
import { RootState } from "../../app/store";
import { getKeyForCell } from "./fieldSlice";
import { useSelector } from "react-redux";

export function Field() {
  const sidesLength = useSelector(
    (state: RootState) => state.field.gameFieldSideLength
  );

  const array = useMemo(() => Array(sidesLength).fill(null), [sidesLength]);

  const getField = useMemo(() => {
    return array.map((_, x) => (
      <div key={`row_${x}`} className={styles.row}>
        {array.map((_, y) => (
          <Cell
            key={getKeyForCell(x, y)}
            uniqueKey={getKeyForCell(x, y)}
            x={x}
            y={y}
          />
        ))}
      </div>
    ));
  }, [array]);

  return <div className={styles.field}>{getField}</div>;
}
