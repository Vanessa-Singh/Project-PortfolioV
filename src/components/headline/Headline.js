import React from "react";
import "./Headline.css";

const Headline = props => {
  return <div key={props.id}>
  {props.pgTitle && <h1>{props.pgTitle}</h1>}
  </div>;
};
export default Headline;
