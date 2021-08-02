import React from "react";

import styles from "./Field.module.css";
import { Cell } from "../../components/cell";

const GAME_FIELD_WIDTH = 100;
const GAME_FIELD_HEIGHT = 100;

export function Field() {
  let cells: Record<string, null | boolean> = {};

  for (let i = 0; i < GAME_FIELD_HEIGHT; i++) {
    for (let j = 0; j < GAME_FIELD_WIDTH; j++) {
      const key = `${i}_${j}`;
      cells[key] = null;
    }
  }

  return (
    <div className={styles.row}>
      {Object.values(cells).map((value) => (
        <Cell value={value} />
      ))}
    </div>
  );
}
