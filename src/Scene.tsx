import React from "react";
import { Matrix } from "./Matrix";
import { renderCanvas } from "./renderCanvas";
import "./Scene.css";
import { NodeType } from "./types";

type Prop = {
  nodes: NodeType[];
};

class Scene extends React.Component<Prop> {
  canvas: HTMLCanvasElement | null = null;
  viewport = {
    zoom: 1,
    centerX: 0,
    centerY: 0,
  };
  worldToScreenMatrix = Matrix.create();
  screenToWorldMatrix = Matrix.create();

  componentDidMount() {
    window.addEventListener("resize", this.onResize.bind(this));
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  componentDidUpdate() {
    this.redraw();
  }

  onResize = () => {
    if (this.canvas) {
      const width = window.innerWidth;
      const height = window.innerHeight - 250;
      const elCanvas = document.getElementById("canvas") as HTMLCanvasElement;
      elCanvas.width = width;
      elCanvas.height = height;
      elCanvas.style.width = `${width}px;`;
      elCanvas.style.height = `${height}px;`;

      this.calcTransformationMatrix(width, height);

      this.redraw();
    }
  };

  private calcTransformationMatrix(width: number, height: number) {
    const m1 = Matrix.translate(-this.viewport.centerX, -this.viewport.centerY);
    const m2 = Matrix.scale(1, -1);
    const m3 = Matrix.scale(this.viewport.zoom, this.viewport.zoom);
    const m4 = Matrix.translate(width / 2, height / 2);
    // matrix operation from right to left
    this.worldToScreenMatrix = m4.multiply(m3).multiply(m2).multiply(m1);
    this.screenToWorldMatrix = this.worldToScreenMatrix.inverse();
  }

  private redraw = () => {
    if (this.canvas) {
      renderCanvas(
        this.canvas,
        this.props.nodes,
        this.worldToScreenMatrix,
        this.viewport.zoom
      );
    }
  };

  private handleCanvasRef = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas;
    if (canvas) {
      this.canvas.addEventListener("wheel", this.onWheel, {
        passive: false,
      });
    } else {
      // unmount
      this.canvas?.removeEventListener("wheel", this.onWheel);
    }
  };

  private onWheel = (event: WheelEvent) => {
    event.preventDefault();
    // note that event.ctrlKey is necessary to handle pinch zooming

    if (event.metaKey || event.ctrlKey) {
      const sx = event.clientX - this.canvas!.offsetLeft;
      const sy = event.clientY - this.canvas!.offsetTop;

      const { x: wx, y: wy } = this.screenToWorldMatrix.transform({
        x: sx,
        y: sy,
      });

      const MAX_DELTA = 10;
      let delta = Math.min(Math.abs(event.deltaY), MAX_DELTA);
      const sign = Math.sign(event.deltaY);
      delta *= sign;

      const oldZoom = this.viewport.zoom;
      const newZoom = oldZoom * (1 - delta / 100);

      this.viewport.centerX =
        (wx * newZoom - (wx * oldZoom - this.viewport.centerX * oldZoom)) /
        newZoom;
      this.viewport.centerY =
        (wy * newZoom - (wy * oldZoom - this.viewport.centerY * oldZoom)) /
        newZoom;
      this.viewport.zoom = newZoom;
    } else {
      const { deltaX, deltaY } = event;
      this.viewport.centerX =
        this.viewport.centerX + deltaX / this.viewport.zoom;
      this.viewport.centerY =
        this.viewport.centerY - deltaY / this.viewport.zoom;
    }

    if (this.canvas) {
      const { width, height } = this.canvas;
      this.calcTransformationMatrix(width, height);
      this.redraw();
    }
  };

  render() {
    return (
      <canvas id="canvas" ref={this.handleCanvasRef} className="scene"></canvas>
    );
  }
}

export default Scene;
