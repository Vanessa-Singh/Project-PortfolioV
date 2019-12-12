import React from "react";


const Weather = props => {
  console.log(props);
    return (
      <div key={props.id}>
        {props.val.date && (<p>{props.val.date}</p>)}
        {props.val.temperature && (<p>{props.val.temperature}°F</p>)}
        {props.val.description && (<p>{props.val.description}</p>)}
        {props.val.minTemp && (<p>Min Temp: {props.val.minTemp}°</p>)}
        {props.val.maxTemp && (<p>Max Temp: {props.val.maxTemp}°</p>)}
        {props.val.humidity && (<p>Humidity: {props.val.humidity}%</p>)}
        {props.val.windSpeed && props.val.winddeg && (
          <div>
            <p>Wind:</p>
            <p>Speed: {props.val.windSpeed}mph</p>
            <p>Direction: {props.val.winddeg}°</p>
          </div>
        )}
        {props.val.error && (<p>Error: {props.val.error}</p>)}
      </div>
    );
  }
export default Weather;
