import React from "react";
import "./Button.css";

const Button = props => {
  return <button className="myBtn">{props.btnText}</button>;
};
export default Button;
