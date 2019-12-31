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
    forecast: []
  };

  componentDidMount() {
    (async e => {
      let location;
      //Retrieve a value by the key from Storage
      if (sessionStorage.getItem("location")) {
        //Declare a var to read the data as string then convert to JSON object
        location = JSON.parse(sessionStorage.getItem("location"));
      }

      const thecall = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${location.city},${location.country}&appid=${apiKey}&units=imperial`
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
  //Set all the keys and values from within forecast with the updated values to the state.
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
        forecast: fivedays
      });
    } 
  };

  render() {
    let headline = this.state.forecast.map((data, key) => {
      if (key < 1) {
        return <Headline key={0} pgTitle={data.city + ", " + data.country} />;
      }
      return "";
    });
    //Populate the forecast data to be render
    let fiveDaysForecast = this.state.forecast.map((data, key) => {
      //Validate if the forecast doesn't have any data then notify user
      return <Weather val={data} key={key} />;
    });
    return (
      <div>
        <div className="searchContainer">
          <Search get_weather={this.get_weather} />
        </div>
        {headline}
        <div className="dataContainer">
          <nav className="navContainer">
            <NavLink className="myBtn" to="/Current">
              Current Weather
            </NavLink>
            <NavLink className="myBtn" to="/Forecast">
              5-days Forecast
            </NavLink>
          </nav>
          <span className="fivedays">{fiveDaysForecast}</span>
        </div>
      </div>
    );
  }
}
export default Forecast;
