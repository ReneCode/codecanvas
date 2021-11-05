import React, { useEffect, useMemo, useState } from "react";
import "./Code.css";
import { NodeType } from "./types";
import { debounce, textToJSON } from "./utils";

type Props = {
  onChange: (nodes: NodeType[]) => void;
};

const Code = ({ onChange }: Props) => {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  // useMemo to keep the debounce timer on re-render
  const applyChange = useMemo(
    () => debounce((nodes) => onChange(nodes), 500),
    [onChange]
  );

  const changeCode = (code: string) => {
    try {
      const json = textToJSON(code);
      let nodes = JSON.parse(json);
      if (!Array.isArray(nodes)) {
        nodes = [nodes];
      }
      applyChange(nodes);
    } catch (err) {
      console.error(err);

      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const t = `[ 
  { type: "LINE", x1: -40, y1: -40, x2: 40, y2: 40, width: 2 },
  { type: "RECT", x1: 10, y1: -70, x2: 100, y2: 70, width: 1 },
  { type: "POLYLINE", points: [100, 100, 150, 150, 100, 150, 150, 100, 125, 100] },
  { type: "ARC", x: 50, y: 50, r: 10, a1: 1, a2: 5, width: 1 }
]`;
    setText(t);
  }, []);

  const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = ev.target.value;
    setText(val);
    changeCode(val);
  };

  return (
    <textarea
      className={error ? "code error" : "code"}
      value={text}
      onChange={handleChange}
      placeholder="enter graphic objects as code here"
      autoFocus={true}
    ></textarea>
  );
};

export default Code;
