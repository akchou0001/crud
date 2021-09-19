import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddUser from "./components/AddUser";
import { Switch, Route } from "react-router-dom";
import AddEmail from "./components/AddEmail";
import AllUsers from "./components/AllUsers";
import User from "./components/User";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <AddEmail />
        </Route>
        <Route path="/addinfo">
          <AddUser />
        </Route>
        <Route path="/users">
          <AllUsers />
        </Route>
        <Route path="/user">
          <User />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
