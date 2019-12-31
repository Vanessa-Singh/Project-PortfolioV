import React, { Component } from "react";
//React Router
import { Route, Switch } from "react-router-dom";
//Pages
import Main from "../pages/Main";
import Current from "../pages/Current";
import Forecast from "../pages/Forecast";
import Error404 from "../pages/Error404";


//Import CSS stylesheet
import "../App.css";
class Routes extends Component {
  render() {
    return (
      <section className="content main-content">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/Current" component={Current} />
          <Route exact path="/Forecast" component={Forecast} />
          <Route exact path="/Error404" component={Error404} />
        </Switch>
      </section>
    );
  }
}

export default Routes;
