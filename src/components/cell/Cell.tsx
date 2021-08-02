import React from "react";

import styles from "./Cell.module.css";

const renderValue = (value: null | boolean) => {
  if (value === true) {
    return "X";
  }
  if (value === false) {
    return "O";
  }
  return "_";
};

type CellProps = {
  value: boolean | null;
};

export const Cell: React.FC<CellProps> = ({ value }) => {
  return <button className={styles.cell}>{renderValue(value)}</button>;
};
