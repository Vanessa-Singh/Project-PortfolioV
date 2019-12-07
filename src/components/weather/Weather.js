import React from "react";
import Headline from "../headline/Headline";


const Weather = props => {
    return (
      <div>
        {props.city && props.country && (
          <Headline pgTitle={props.city + ", " + props.country} />
        )}

        <div>
         {props.temp && (<p>{props.temp}</p>)}
          {props.desc && (<p>{props.desc}</p>)}
          {props.humidity && (<p>Humidity: {props.humidity}</p>)}
        </div>
      </div>
    );
  }
export default Weather;
