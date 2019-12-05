import React, { Component } from "react";
import Headline from "../components/headline/Headline";
import Search from "../components/search/Search";
import Weather from "../components/weather/Weather";

//My API key
const apiKey = "24fce1779d99022f71c6aebca28a5f73";

class Main extends Component {
  state = {
    city: "",
    country: ""
  };

  //Data Binding
  takecity = e => {
    this.setState({ city: e.target.value });
  };
  takecountry = e => {
    this.setState({ country: e.target.value });
  };
  //API call function
  //use async await with the fetch method to make HTTP calls.
  get_weather = async e => {
    e.preventDefault();
    let city = this.state.city;
    let country = this.state.country;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=imperial`
    );
    //convert the response to JSON format
    const data = await api_call.json();
    console.log(data);
  };

  render() {
    return (
      <div>
        <Headline pgTitle="Weather Outlook" />
        {/* Set up a prop and set it's value to the get_weather function. */}
        <Search
          get_weather={this.get_weather}
          takecity={this.takecity}
          takecountry={this.takecountry}
        />
        <Weather />
      </div>
    );
  }
}
export default Main;
