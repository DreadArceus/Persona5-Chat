import React, { useState, useEffect, useCallback } from "react";
import socketIOClient from "socket.io-client";
import Message from "./Message";
const ENDPOINT = "http://127.0.0.1:8000";
let socket;

const getKey = () => {
  var key = "";
  for (var i = 0; i < 20; i++) {
    key += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }
  return key;
};

const chatbox_style = {
  display: "block",
  margin: "auto",
  width: "1000px",
  height: "485px",
  backgroundColor: "red",
  border: "2px solid white",
  borderRadius: "20px",
  padding: "20px",
  overflowY: "scroll",
};

const input_style = {
  display: "block",
  margin: "auto",
  width: "1000px",
  height: "fit-content",
  backgroundColor: "black",
  padding: "7px",
};

const input_box = {
  width: "800px",
  height: "20px",
};

const send_btn = {
  border: "0px",
  backgroundColor: "black",
  fontFamily: "P5",
  fontSize: "40px",
  color: "white",
};

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [history, setHistory] = useState([]);
  const createMessage = useCallback((msg, align) => {
    setHistory((old_history) => {
      old_history.push(<Message text={msg} align={align} key={getKey()} />);
      console.log(old_history);
      return old_history;
    });
  }, []);
  const send_msg = useCallback((event) => {
    event.preventDefault();
    socket.emit("send-message", msg);
    createMessage(msg, "right");
  }, [createMessage, msg]);
  useEffect(() => {
    socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
    socket.emit("new-user-joined", "bruh");
    socket.on("recieve", (data) => {
      createMessage(data.message, "left");
    });
    socket.on("user-joined", (name) => {
      createMessage(`${name} joined`, "left");
    });
    socket.on("user-disconnected", (name) => {
      createMessage(`${name} left`, "left");
    });
    return () => socket.disconnect();
  }, [createMessage]);
  // const getChat = useCallback(() => {
  //   return <div style={chatbox_style}>{history}</div>;
  // }, [history]);
  const getChat = () => {
    return <div style={chatbox_style}>{history}</div>;
  };
  return (
    <div>
      {getChat()}
      <div style={input_style}>
        <form>
          <input
            style={input_box}
            onChange={(event) => {
              setMsg(event.target.value);
            }}
          ></input>
          <input
            value="Send"
            type="submit"
            style={send_btn}
            onClick={(event) => send_msg(event)}
          >
          </input>
        </form>
      </div>
    </div>
  );
};

export default Chat;
