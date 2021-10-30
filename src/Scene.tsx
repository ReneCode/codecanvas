import { useEffect, useRef } from "react";
import { renderCanvas } from "./renderCanvas";
import "./Scene.css";
import { NodeType } from "./types";

type Prop = {
  nodes: NodeType[];
};

const Scene = ({ nodes }: Prop) => {
  const rCanvas = useRef<HTMLCanvasElement>(null);

  const onResize = () => {
    console.log(nodes);
    if (rCanvas.current) {
      const width = window.innerWidth;
      const height = window.innerHeight - 250;

      const elCanvas = document.getElementById("canvas") as HTMLCanvasElement;

      elCanvas.width = width;
      elCanvas.height = height;
      elCanvas.style.width = `${width}px;`;
      elCanvas.style.height = `${height}px;`;
      redraw();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    redraw();
  }, [nodes]);

  const redraw = () => {
    if (rCanvas.current) {
      renderCanvas(rCanvas.current, nodes);
    }
  };

  return <canvas id="canvas" ref={rCanvas} className="scene"></canvas>;
};

export default Scene;
