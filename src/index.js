import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UpdateStates from "./components/updateStates";
import Login from "./components/Login";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />

        <Route path="/dashboard" exact component={App} />

        <Route path="/updateCases" exact component={UpdateStates} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
