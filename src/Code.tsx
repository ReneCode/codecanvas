import React, { useMemo, useState } from "react";
import "./Code.css";
import { debounce } from "./utils";

type Props = {
  onChange: (text: string) => void;
};

const Code = ({ onChange }: Props) => {
  const [text, setText] = useState(
    '{ type: "LINE", x1: 400, y1: 4, x2: 400, y2: 4, with: 0.25 }'
  );

  // useMemo to keep the debounce timer on re-render
  const applyChange = useMemo(
    () => debounce((val) => onChange(val), 500),
    [onChange]
  );

  const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = ev.target.value;
    setText(val);
    applyChange(val);
  };

  return (
    <textarea className="code" value={text} onChange={handleChange}></textarea>
  );
};

export default Code;
