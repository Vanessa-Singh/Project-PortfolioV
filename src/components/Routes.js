import React, { Component } from "react";
//React Router
import { Route, Switch } from "react-router-dom";
//Pages
import Main from "../pages/Main";

class Routes extends Component {
  render() {
    return (
      <section className="content main-content">
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
      </section>
    );
  }
}

export default Routes;
