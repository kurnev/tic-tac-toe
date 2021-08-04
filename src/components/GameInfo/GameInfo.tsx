import React from "react";
import { useAppSelector } from "../../app/store";
import { Player } from "../../containers/field/types";

import styles from "./GameInfo.module.css";

export function GameInfo() {
  const initative = useAppSelector((state) => state.field.initiative);
  const winner = useAppSelector((state) => state.field.winner);
  const gameFinished = useAppSelector((state) => state.field.gameFinished);

  let winnerText = "";

  if (winner === Player.First) {
    winnerText = "first";
  } else if (winner === Player.Second) {
    winnerText = "second";
  }

  return (
    <div className={styles.panel}>
      <div>First move is always to left top cell with (0,0) coordinates.</div>
      <div>
        It's {initative === Player.First ? "first" : "second"} player's turn!
      </div>
      <div>Game finished: {gameFinished ? "yes" : "no"}</div>
      {winnerText && <div>Winner is: {winnerText} player!</div>}
    </div>
  );
}
