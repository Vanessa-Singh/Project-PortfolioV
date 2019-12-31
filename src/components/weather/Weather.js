import React from "react";
import "./Weather.css";

const Weather = props => {
console.log(props);
  let cName = "forecast";
  if(props.id === 0){
    cName = "current";
  }
  return (
    <div className={cName} key={props.id} id={props.id}>
      <span>
        {props.val.icon && (
          <p className="icon">
            <img
              src={
                "http://openweathermap.org/img/wn/" + props.val.icon + "@2x.png"
              }
              alt={props.val.description}
            />
          </p>
        )}
        {props.val.temperature && (
          <p className="temp">{props.val.temperature}°F</p>
        )}
      </span>
      <span>
        {props.val.date && <p>{props.val.date}</p>}
        {props.val.description && (
          <p className="descrip">{props.val.description}</p>
        )}
        {props.val.minTemp && (
          <p className="minTemp">
            Min Temp: <span className="dataValue">{props.val.minTemp}°</span>
          </p>
        )}
        {props.val.maxTemp && (
          <p className="maxTemp">
            Max Temp: <span className="dataValue">{props.val.maxTemp}°</span>
          </p>
        )}
        {props.val.humidity && (
          <p>
            Humidity: <span className="dataValue">{props.val.humidity}%</span>
          </p>
        )}
        {props.val.windSpeed && props.val.winddeg && (
          <div>
            <p>Wind:</p>
            <p className="speed">
              Speed: <span className="dataValue">{props.val.windSpeed}mph</span>
            </p>
            <p className="direc">
              Direction: <span className="dataValue">{props.val.winddeg}°</span>
            </p>
          </div>
        )}
      </span>
    </div>
  );
};
export default Weather;
