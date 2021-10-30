import React, { useState } from "react";
import "./App.css";
import Code from "./Code";
import Scene from "./Scene";
import { NodeType } from "./types";

const App = () => {
  const [nodes, setNodes] = useState<NodeType[]>([]);

  const onChangeNodes = (nodes: NodeType[]) => {
    setNodes(nodes);
  };

  return (
    <div className="App">
      <Code onChange={onChangeNodes}></Code>
      <Scene nodes={nodes}></Scene>
    </div>
  );
};

export default App;
