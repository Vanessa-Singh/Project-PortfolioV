import React, { Component } from "react";
import Headline from "../components/headline/Headline";
import Search from "../components/search/Search";

class Main extends Component {
  
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
      <div>
        <Headline pgTitle="Weather Outlook" />
        {/* Set up a prop and set it's value to the get_weather function. */}
        <Search get_weather={this.get_weather} />
       
      </div>
    );
  }
}
export default Main;
