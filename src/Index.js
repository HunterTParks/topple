import React, { Component } from "react";
import ReactDOM from "react-dom";

import App from "./App";

console.log(`App is running in ${process.env.NODE_ENV} mode `);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
