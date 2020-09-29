import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import useGlobalState from "./hooks/useGlobalState";
import Context from "./hooks/Context";

const Index = () => {
  const store = useGlobalState();
  return (
    <Context.Provider value={store}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
