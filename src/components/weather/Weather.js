import React from "react";
import Headline from "../headline/Headline";


const Weather = props => {
    return (
      <div>
        {props.city && props.country && (
          <Headline pgTitle={props.city + ", " + props.country} />
        )}

        <div>
         {props.temp && (<p>{props.temp}°F</p>)}
          {props.desc && (<p>{props.desc}</p>)}
          {props.minTemp && (<p>Min Temp: {props.minTemp}°</p>)}
          {props.maxTemp && (<p>Max Temp: {props.maxTemp}°</p>)}
          {props.humidity && (<p>Humidity: {props.humidity}%</p>)}
          {props.windSpeed && props.winddeg && (<div><p>Wind:</p>
          <p>Speed: {props.windSpeed}mph</p>
          <p>Direction: {props.winddeg}°</p></div>)}
          {props.error && (<p>Error: {props.error}</p>)}
        </div>
      </div>
    );
  }
export default Weather;
