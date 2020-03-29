import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./components/App";
import Home from "./components/Home"
import * as serviceWorker from "./serviceWorker";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

/*const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/SignIn" component={SignIn} />
      <Route path="/Upload File" component={UploadFile} />
    </div>
  </Router>
);*/

ReactDOM.render(<Home/>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
