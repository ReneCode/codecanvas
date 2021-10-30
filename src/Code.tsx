import React, { useEffect, useMemo, useState } from "react";
import "./Code.css";
import { NodeType } from "./types";
import { debounce, textToJSON } from "./utils";

type Props = {
  onChange: (nodes: NodeType[]) => void;
};

const Code = ({ onChange }: Props) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const t = '{ type: "LINE", x1: 200, y1: 40, x2: 400, y2: 70, with: 0.25 }';
    setText(t);
    changeCode(t);
  }, []);

  // useMemo to keep the debounce timer on re-render
  const applyChange = useMemo(
    () => debounce((nodes) => onChange(nodes), 500),
    [onChange]
  );

  const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = ev.target.value;
    setText(val);
    changeCode(val);
  };

  const changeCode = (code: string) => {
    try {
      const json = textToJSON(code);
      console.log(json);
      let nodes = JSON.parse(json);
      if (!Array.isArray(nodes)) {
        nodes = [nodes];
      }
      applyChange(nodes);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <textarea className="code" value={text} onChange={handleChange}></textarea>
  );
};

export default Code;
