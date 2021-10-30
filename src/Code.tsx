import React, { useEffect, useMemo, useState } from "react";
import "./Code.css";
import { NodeType } from "./types";
import { debounce, textToJSON } from "./utils";

type Props = {
  onChange: (nodes: NodeType[]) => void;
};

const Code = ({ onChange }: Props) => {
  const [text, setText] = useState("");

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
    }
  };

  useEffect(() => {
    const t =
      '[ { type: "LINE", x1: 200, y1: 40, x2: 400, y2: 70, width: 0.25 } ]';
    setText(t);
  }, []);

  const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = ev.target.value;
    setText(val);
    changeCode(val);
  };

  return (
    <textarea
      className="code"
      value={text}
      onChange={handleChange}
      placeholder="enter graphic objects as code here"
      autoFocus={true}
    ></textarea>
  );
};

export default Code;
