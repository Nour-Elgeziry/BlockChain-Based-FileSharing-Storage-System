import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import RegisterUser from "./components/App";
import App from "./components/notApp";
import SignIn from "./components/Signin";
import * as serviceWorker from "./serviceWorker";
import uploadFile from "./components/uploadFile";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={RegisterUser} />
      <Route path="/SignIn" component={SignIn} />
      <Route path="/Upload File" component={uploadFile} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
