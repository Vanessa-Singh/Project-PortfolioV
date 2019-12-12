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
      {
        date: "",
        icon: "",
        temperature: "",
        description: "",
        minTemp: "",
        maxTemp: "",
        city: "",
        country: "",
        humidity: "",
        windSpeed: "",
        winddeg: ""
      }
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

    //redirect to Current page after submitting the form.
    this.props.history.push("/Current");
  };

  change_state = data => {
    if (data) {
      let fivedays = [];
      for (let i = 0; i < 5; i++) {
        fivedays[i] = {
          date: data.list[i].dt_txt,
          temperature: data.list[i].main.temp,
          description: data.list[i].weather[0].description,
          minTemp: data.list[i].main.temp_min,
          maxTemp: data.list[i].main.temp_max,
          city: data.city.name,
          country: data.city.country,
          humidity: data.list[i].main.humidity,
          windSpeed: data.list[i].wind.speed,
          winddeg: data.list[i].wind.deg
        };
      }
      this.setState({
        forecast: fivedays,
        error: ""
      });
    } else {
      this.setState({
        temperature: "",
        error: "City not found"
      });
    }
  };

  render() {
    //Populate the forecast data to be render
    let fiveDaysForecast = this.state.forecast.map((key, data) => {
      return <Weather val={key} key={data} />;
    });
    return (
      <div>
        {/* Set it's value to the get_weather function. */}
        <Search get_weather={this.get_weather} />
        <Headline pgTitle="5-days Forecast" />

        <nav className="navcontainer">
          <NavLink to="/Current">Current Weather</NavLink>
          <NavLink to="/Forecast">5-days Forecast</NavLink>
        </nav>

        {fiveDaysForecast}

        {/*
        <Weather
          date={this.state.forecast.date}
          temp={this.state.forecast.temperature}
          desc={this.state.forecast.description}
          minTemp={this.state.forecast.minTemp}
          maxTemp={this.state.forecast.maxTemp}
          city={this.state.forecast.city}
          country={this.state.forecast.country}
          humidity={this.state.forecast.humidity}
          windSpeed={this.state.forecast.windSpeed}
          winddeg={this.state.forecast.winddeg}
          error={this.state.error}
        />
        */}
      </div>
    );
  }
}
export default Forecast;
