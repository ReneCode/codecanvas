import React, { useState } from "react";
import "./App.css";
import Code from "./Code";
import Scene from "./Scene";

const App = () => {
  const [code, setCode] = useState("");

  const onChangeCode = (text: string) => {
    setCode(text);
  };

  return (
    <div className="App">
      <Code onChange={onChangeCode}></Code>
      <Scene code={code}></Scene>
    </div>
  );
};

export default App;
