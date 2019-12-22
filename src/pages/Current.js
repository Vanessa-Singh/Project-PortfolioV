import React, { Component } from "react";
import Headline from "../components/headline/Headline";
import Search from "../components/search/Search";
import Weather from "../components/weather/Weather";
//Import CSS
import "../App.css";
//React Router
import { NavLink } from "react-router-dom";

//My API key
const apiKey = "24fce1779d99022f71c6aebca28a5f73";

class Current extends Component {
  state = {
    forecast: []
  };
  componentDidMount() {
    (async e => {
      //Retrieve a value by the key from Storage
      if (sessionStorage.getItem("location")) {
        //Declare a var to read the data as string then convert to JSON object
        let location = JSON.parse(sessionStorage.getItem("location"));

        const thecall = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.country}&appid=${apiKey}&units=imperial`
        );
        if (thecall.status !== 200) {
          //redirect to a 404 page.
          this.props.history.push({
            pathname: "/Error404",
            state: {
              error: `Error ${thecall.status}: City ${thecall.statusText}`
            }
          });
        } else {
          //convert the response to JSON format
          const data = await thecall.json();
          this.change_state(data);
        }
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

    const thecall = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=imperial`
    );
    if (thecall.status !== 200) {
      //redirect to a 404 page.
      this.props.history.push({
        pathname: "/Error404",
        state: {
          error: `Error ${thecall.status}: City ${thecall.statusText}`
        }
      });
    } else {
      //convert the response to JSON format
      const data = await thecall.json();
      this.change_state(data);
    }
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
    if (data.name && data.sys.country) {
      this.setState({
        //Set all the keys and values from within forecast with the updated values to the state.
        forecast: [
          {
            date: `${new Date().getDate()} ${this.month_name(new Date())}`,
            icon: data.weather[0].icon,
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            minTemp: Math.round(data.main.temp_min),
            maxTemp: Math.round(data.main.temp_max),
            city: data.name,
            country: data.sys.country,
            humidity: Math.round(data.main.humidity),
            windSpeed: Math.round(data.wind.speed),
            winddeg: Math.round(data.wind.deg)
          }
        ]
      });
    }
  };

  render() {
    //Populate the headline with the city and country that it was searched
    let headline = this.state.forecast.map((data, key) => {
      return <Headline key={key} pgTitle={data.city + ", " + data.country} />;
    });
    //Populate the forecast data to be render
    let weather = this.state.forecast.map((data, key) => {
      return <Weather val={data} key={key} id={key} />;
    });
    return (
      <div>
        <div className="searchContainer">
          <Search get_weather={this.get_weather} />
        </div>

        {headline}
        <div className="dataContainer">
          <nav className="navContainer">
            <NavLink className="myBtn" to="/">
              Current Weather
            </NavLink>
            <NavLink className="myBtn" to="/Forecast">
              5-days Forecast
            </NavLink>
          </nav>
          {weather}
        </div>
      </div>
    );
  }
}
export default Current;
