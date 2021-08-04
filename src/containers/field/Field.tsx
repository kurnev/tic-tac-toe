import React, { useEffect, useMemo } from "react";

import styles from "./Field.module.css";
import { Cell } from "../../components/Cell";
import { getKeyForCell } from "./helpers";
import { GameInfo } from "../../components/GameInfo";
import { useAppSelector } from "../../app/hooks";
import { Player } from "./types";

export function Field() {
  const sidesLength = useAppSelector(
    (state) => state.field.gameFieldSideLength
  );

  const array = useMemo(() => Array(sidesLength).fill(null), [sidesLength]);

  const winner = useAppSelector((state) => state.field.winner);
  const gameFinished = useAppSelector((state) => state.field.gameFinished);

  const getField = useMemo(() => {
    return array.map((_, x) => (
      <div key={`row_${x}`} className={styles.row}>
        {array.map((_, y) => (
          <Cell key={getKeyForCell(x, y)} x={x} y={y} />
        ))}
      </div>
    ));
  }, [array]);

  useEffect(
    function checkWinner() {
      if (winner !== null) {
        alert(
          `Winner is ${
            winner === Player.First ? "first" : "second"
          } player! Congratulations`
        );
      } else if (gameFinished) {
        alert(`Game has finished!`);
      }
    },
    [winner, gameFinished]
  );

  return (
    <div className={styles.field}>
      {getField}
      <GameInfo />
    </div>
  );
}
