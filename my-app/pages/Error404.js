import React, { Component } from "react";
import Headline from "../components/headline/Headline";
import Search from "../components/search/Search";
//Import CSS
import "../App.css";
class Error404 extends Component {
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

  render() {
    return (
      <div className="main">
        <Headline pgTitle={this.props.location.state.error} />
        <div className="bkg">
          <p>
            <img
              alt="not found"
              src="https://media.giphy.com/media/d2jjuAZzDSVLZ5kI/source.gif"
            />{" "}
          </p>
          <div>
            <p className="errorMessage">
              It seems we don't have data for that location. <br /> Let's try
              one more time. Type the city and country of the location which you
              would like to see its weather.
            </p>
            <div className="searchContainer">
              {/* Set up a prop and set it's value to the get_weather function. */}
              <Search get_weather={this.get_weather} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Error404;
