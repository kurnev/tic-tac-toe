import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import userEvent from "@testing-library/user-event";
import { Field } from "./Field";

test("first move is possible only on 0,0 cell", () => {
  render(
    <Provider store={store}>
      <Field />
    </Provider>
  );

  // click on cell, that is not 0,0 on first move
  const notFirstCell = screen.getByTestId("cell_10_10");
  expect(notFirstCell.textContent).toEqual("");
  userEvent.click(notFirstCell);
  // make sure it's value was not changed
  expect(notFirstCell.textContent).toEqual("");
  // click on 0,0 cell
  const firstCell = screen.getByTestId("cell_0_0");
  userEvent.click(firstCell);
  expect(firstCell.textContent).toEqual("X");
  // click again on notFirstCell
  userEvent.click(notFirstCell);
  // make sure it's value was changed to O
  expect(notFirstCell.textContent).toEqual("O");
});
