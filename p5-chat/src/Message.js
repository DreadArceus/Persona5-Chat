import React from "react";
import joker from "./user-icons/Joker_ico.png";

const Message = (props) => {
  const container_style = {
    float: props.align,
    clear: "both",
    padding: "25px",
  };
  const icon = {
    float: "left",
    width: "60px",
    height: "60px",
    transform: "skewX(-14deg) rotate(-20deg)",
    border: "6px solid white"
  };
  const displayIcon = () => {
    if (props.align === "left") {
      return <img src={joker} alt="user-icon" style={icon}></img>;
    }
    return;
  };
  const lightining_style = {
    float: props.align,
    transform: `${props.align === "left" ? "" : "scaleX(-1)"}`,
    marginTop: `30px`,
    marginRight: `${props.align === "left" ? -15 : 0}px`,
    marginLeft: `${props.align === "left" ? 0 : -15}px`,
  };
  const triangle = {
    width: "0",
    height: "0",
    transform: "rotate(0deg)",
    borderLeft: "3px solid transparent",
    borderRight: "25px solid transparent",
    borderBottom: `10px solid ${props.align === "left" ? "black" : "white"}`,
  };
  const triangle_bg = {
    float: props.align,
    width: "0",
    height: "0",
    transform: `rotate(150deg)`,
    //   props.align === "left" ? "rotate(150deg)" : "rotate(210deg) scaleX(-1)"
    borderLeft: "4px solid transparent",
    borderRight: "27px solid transparent",
    borderBottom: `12px solid ${props.align === "left" ? "white" : "black"}`,
    marginLeft: `${props.align === "left" ? "-45px" : "0px"}`,
    marginRight: `${props.align === "left" ? "0px" : "-15px"}`,
  };
  const rectangle = {
    float: props.align,
    width: "24px",
    height: "12px",
    transform: `rotate(-10deg)`,
    background: `${props.align === "left" ? "black" : "white"}`,
    // marginRight: `${props.align === "left" ? "0px" : "20px"}`,
    borderTop: `4px solid ${props.align === "left" ? "white" : "black"}`,
    borderLeft: `3px solid ${props.align === "left" ? "white" : "black"}`,
    borderBottom: `5px solid ${props.align === "left" ? "white" : "black"}`,
  };
  const msg_box = {
    float: props.align,
    transform: `${props.align === "left" ? "rotate(0deg)" : "scaleX(-1)"}`,
  };
  const bg_box = {
    backgroundColor: `${props.align === "left" ? "white" : "black"}`,
    width: "197px",
    height: "55px",
    paddingLeft: "5px",
    paddingTop: "3px",
    paddingBottom: "2px",
    transform: "skewX(-14deg) rotate(4deg)",
  };
  const box = {
    textIndent: "10px",
    textAlign: "left",
    color: `${props.align === "left" ? "white" : "black"}`,
    backgroundColor: `${props.align === "left" ? "black" : "white"}`,
    width: "190px",
    height: "52px",
    transform: `skewX(6deg) rotate(0deg) ${
      props.align === "left" ? "" : "scaleX(-1)"
    }`,
    marginTop: "2px",
  };
  const bg_tri_top = {
    width: "0",
    height: "0",
    borderLeft: "204.6px solid transparent",
    borderRight: "-0px solid transparent",
    borderBottom: `20px solid ${props.align === "left" ? "white" : "black"}`,
    transform: "skewX(-14deg) rotate(4deg)",
    marginBottom: "-0.8px",
    marginLeft: "10px",
  };
  const tri_top = {
    width: "0",
    height: "0",
    transform: "rotate(0deg)",
    borderLeft: "185.83px solid transparent",
    borderRight: "2px solid transparent",
    borderBottom: `18px solid ${props.align === "left" ? "black" : "white"}`,
    marginTop: "-17px",
    marginBottom: "-3px",
  };
  return (
    <div style={container_style}>
      {displayIcon()}
      <div style={lightining_style}>
        <div style={rectangle}></div>
        <div style={triangle_bg}>
          <div style={triangle}></div>
        </div>
      </div>
      <div style={msg_box}>
        <div style={bg_tri_top}></div>
        <div style={bg_box}>
          <div style={tri_top}></div>
          <div style={box}>{props.text}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
