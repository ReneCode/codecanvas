import { useEffect, useRef } from "react";
import "./Scene.css";
import { textToJSON } from "./utils";

type Prop = {
  code: string;
};

const Scene = ({ code }: Prop) => {
  const rCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (rCanvas.current) {
      const ctx = rCanvas.current.getContext("2d");
      if (!ctx) return;
      const { width, height } = rCanvas.current;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      try {
        const json = textToJSON(code);
        console.log(json);
        const obj = JSON.parse(json);
        console.log(obj);
      } catch (err) {
        console.error(err);
      }
    }
  }, [code]);
  return <canvas ref={rCanvas} className="scene"></canvas>;
};

export default Scene;
