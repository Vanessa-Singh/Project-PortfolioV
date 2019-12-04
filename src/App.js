import React, {Component} from "react";
import "./App.css";

//Components
import Headline from "./components/headline/Headline";
import Search from "./components/search/Search";
import Weather from "./components/weather/Weather";
class App extends Component {
  render(){
    return (
      <div>
        <Headline pgTitle="Weather Outlook" />
        <Search />
        <Weather />
      </div>
    );
  }
};

export default App;
