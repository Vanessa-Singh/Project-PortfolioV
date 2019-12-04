import React from "react";
import Button from "../button/Button";

const Search = props => {
    return (
        //Set a React attribute to call the get_weather function.
      <form onSubmit={props.get_weather}>
        <input type="text" name="city" placeholder="City" />
        <input type="text" name="country" placeholder="Country" />
        <Button type="submit" btnText="Search" />
      </form>
    );
}
export default Search;