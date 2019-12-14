import React from "react";
import "./Weather.css"

const Weather = props => {
  console.log(props);
    return (
      <div className="current forecast" key={props.id}>
        {props.val.temperature && <p>{props.val.temperature}°F</p>}
        {props.val.icon && (<p><img src={"http://openweathermap.org/img/wn/" + props.val.icon + "@2x.png"}
          alt={props.val.description}
        /></p>)}
        {props.val.date && <p>{props.val.date}</p>}
        {props.val.description && <p>{props.val.description}</p>}
        {props.val.minTemp && <p>Min Temp: {props.val.minTemp}°</p>}
        {props.val.maxTemp && <p>Max Temp: {props.val.maxTemp}°</p>}
        {props.val.humidity && <p>Humidity: {props.val.humidity}%</p>}
        {props.val.windSpeed && props.val.winddeg && (
          <div>
            <p>Wind:</p>
            <p>Speed: {props.val.windSpeed}mph</p>
            <p>Direction: {props.val.winddeg}°</p>
          </div>
        )}
        {props.val.error && <p>Error: {props.val.error}</p>}
      </div>
    );
  }
export default Weather;
