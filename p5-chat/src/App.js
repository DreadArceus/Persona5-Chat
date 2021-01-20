import React from "react";
import Chat from "./Chat";
import "./App.css";

const alternate_text = (text) => {
  const styles = [{ color: "white" }, { color: "red" }];
  const alt_text = [];
  var n = 0;
  for (const c of text) {
    alt_text.push(<span style={styles[n]}>{c}</span>);
    n = n === 1 ? 0 : 1;
  }
  return <div className="alt-text">{alt_text}</div>;
};

const App = () => {
  return (
    <div className="App">
      <div className="heading">{alternate_text("PERSONA 5 CHAT")}</div>
      <Chat />
    </div>
  );
};

export default App;
