import React from "react";
import ReactDOM from "react-dom";
import MyApp from "./App";
const App = () => {
  return <MyApp />;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
