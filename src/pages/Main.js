import React, { Component } from "react";
import Headline from "../components/headline/Headline";
import Search from "../components/search/Search";
import Weather from "../components/weather/Weather";

//My API key
const apiKey = "24fce1779d99022f71c6aebca28a5f73";

class Main extends Component {
    state = {
        temperature: "",
        city: "",
        country: "",
        humidity: "",
        description: "",
        error: ""
    }
  //API call function
  //use async await with the fetch method to make HTTP calls.
  get_weather = async e => {
    e.preventDefault();
    //Get the value from the search input
    const city = e.target[0].value;
    const country = e.target[1].value;

    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=imperial`
    );
    //convert the response to JSON format
    const data = await api_call.json();
    console.log(data); 
    this.setState({ 
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: "City not found"
     });
    //redirect to Current page after submitting the form.
    //this.props.history.push("/Current");
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
export default Main;
