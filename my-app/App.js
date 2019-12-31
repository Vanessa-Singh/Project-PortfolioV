import React, { Component } from "react";
import "./App.css";
import Routes from "../src/components/Routes";

//React Router
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
