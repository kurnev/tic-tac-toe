import React from "react";
import { Provider } from "react-redux";

import { Field } from "./containers/field/Field";
import "./App.css";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Field />
      </div>
    </Provider>
  );
}
export default App;
