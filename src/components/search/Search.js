import React from "react";
import Button from "../button/Button";
//Import CSS
import "./Search.css";

const Search = props => {
    return (
      //Set a React attribute to call the get_weather function.
      <form name="search" onSubmit={props.get_weather}>
        <input
          type="text"
          name="city"
          className="input"
          placeholder="City"
          onChange={props.takecity}
          value={props.city}
        />
        <input
          type="text"
          name="country"
          className="input"
          placeholder="Country"
          onChange={props.takecountry}
          value={props.country}
        />
        <Button type="submit" btnText="Search" />
      </form>
    );
}
export default Search;