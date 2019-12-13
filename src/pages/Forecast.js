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
    forecast: [],
    error: ""
  };
  componentDidMount() {
    (async e => {
      //Retrieve a value by the key from Storage
      if (sessionStorage.getItem("location")) {
        //Declare a var to read the data as string then convert to JSON object
        let location = JSON.parse(sessionStorage.getItem("location"));

        const api_call = await fetch(
          `http://api.openweathermap.org/data/2.5/forecast?q=${location.city},${location.country}&appid=${apiKey}&units=imperial`
        );
        //convert the response to JSON format
        const data = await api_call.json();
        this.change_state(data);
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
  //change month number to month name
  month_name = date => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return months[date.getMonth()];
  };
  change_state = data => {
    if (data) {
      let fivedays = [];
      for (let i = 0; i < 40; i += 8) {
        fivedays[i] = {
          date: `${new Date(data.list[i].dt_txt).getDate()} ${this.month_name(
            new Date(data.list[i].dt_txt)
          )}`,
          icon: data.list[i].weather[0].icon,
          temperature: Math.round(data.list[i].main.temp),
          description: data.list[i].weather[0].description,
          minTemp: Math.round(data.list[i].main.temp_min),
          maxTemp: Math.round(data.list[i].main.temp_max),
          city: data.city.name,
          country: data.city.country,
          humidity: Math.round(data.list[i].main.humidity),
          windSpeed: Math.round(data.list[i].wind.speed),
          winddeg: Math.round(data.list[i].wind.deg)
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
    let headline = this.state.forecast.map((data, key) => {
      if (key < 1) {
        return <Headline key={0} pgTitle={data.city + ", " + data.country} />;
      }
      return undefined;
    });
    //Populate the forecast data to be render
    let fiveDaysForecast = this.state.forecast.map((key, data) => {
      return <Weather val={key} key={data} />;
    });
    return (
      <div>
        {/* Set it's value to the get_weather function. */}
        <Search get_weather={this.get_weather} />
        {headline}
        <nav className="navcontainer">
          <NavLink to="/Current">Current Weather</NavLink>
          <NavLink to="/Forecast">5-days Forecast</NavLink>
        </nav>
        {fiveDaysForecast}
      </div>
    );
  }
}
export default Forecast;
