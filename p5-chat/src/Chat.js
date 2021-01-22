import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
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
  display: "flex",
  flexDirection: "column-reverse",
  margin: "auto",
  width: "1000px",
  height: "485px",
  backgroundColor: "red",
  border: "2px solid white",
  borderRadius: "20px",
  padding: "20px",
  overflowY: "auto",
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
  const { register, handleSubmit, errors, setValue } = useForm();

  const onSubmit = (data) => {
    console.log(errors);
    socket.emit("send-message", data.msg);
    createMessage(data.msg, "right");
    setValue("msg", "", { shouldValidate: false });
  };

  const [history, setHistory] = useState([]);
  const createMessage = useCallback((msg, align) => {
    setHistory((old_history) => {
      console.log(old_history);
      return [
        ...old_history,
        <Message text={msg} align={align} key={getKey()} />,
      ];
    });
  }, []);
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
  const getChat = () => {
    return (
      <div style={chatbox_style}>
        <div>{history}</div>
      </div>
    );
  };
  return (
    <div>
      {getChat()}
      <div style={input_style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="msg"
            style={input_box}
            type="text"
            placeholder="Enter Message"
            ref={register({ required: true, maxLength: 80 })}
          />
          <input style={send_btn} type="submit" value="send" />
        </form>
      </div>
    </div>
  );
};

export default Chat;
