import React, { Component } from "react";
import Headline from "../components/headline/Headline";
import Search from "../components/search/Search";
import Weather from "../components/weather/Weather";

//React Router
import { NavLink } from "react-router-dom";

//My API key
const apiKey = "24fce1779d99022f71c6aebca28a5f73";

class Forecast extends Component {
  state = {
    forecast: [
      { temperature: "", city: "", country: "", humidity: "", description: "" }
    ],
    error: ""
  };
  componentDidMount() {
    (async e => {
      //Retrieve a value by the key from Storage
      if (sessionStorage.getItem("location")) {
        //Declare a var to read the data as string then convert to JSON object
        let location = JSON.parse(sessionStorage.getItem("location"));
        console.log(location);

        const api_call = await fetch(
          `http://api.openweathermap.org/data/2.5/forecast?q=${location.city},${location.country}&appid=${apiKey}&units=imperial`
        );
        //convert the response to JSON format
        const data = await api_call.json();
        this.change_state(data);
        console.log(data);
      }
    })();
  }
  //API call function
  //use async await with the fetch method to make HTTP calls.
  get_weather = async e => {
    e.preventDefault();
    //Get the value from the search input
    const city = e.target[0].value;
    const country = e.target[1].value;

    //Add to session storage
    let location = { city: city, country: country };
    sessionStorage.setItem("location", JSON.stringify(location));

    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=imperial`
    );
    //convert the response to JSON format
    const data = await api_call.json();
    this.change_state(data);
  };

  change_state = data => {
    if (data) {
      let fivedays = [];
      for (let i = 0; i < 5; i++) {
        fivedays[i] = {
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description
        };
      }
      this.setState({
          forecast: fivedays,
          error: ""
      })

    } else {
      this.setState({
        temperature: "",
        error: "City not found"
      });
    }
  };

  render() {
    return (
      <div>
        {/* Set it's value to the get_weather function. */}
        <Search get_weather={this.get_weather} />
        <Headline pgTitle="5-days Forecast" />

        <nav className="navcontainer">
          <NavLink to="/Current">Current Weather</NavLink>
          <NavLink to="/Forecast">5-days Forecast</NavLink>
        </nav>

        <Weather
          temp={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          desc={this.state.description}
          error={this.state.error}
        />
      </div>
    );
  }
}
export default Forecast;
