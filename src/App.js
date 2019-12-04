import React, {Component} from "react";
import "./App.css";

//Components
import Headline from "./components/headline/Headline";
class App extends Component {
  render(){
    return (
      <div>
        <Headline pgTitle="Weather Outlook" />
      </div>
    );
  }
};

export default App;
