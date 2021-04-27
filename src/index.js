import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "antd/dist/antd.css";

import "./assets/dark-theme.css";
import "./assets/index.css";
import "./assets/layout.css";
import "./assets/light-theme.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
