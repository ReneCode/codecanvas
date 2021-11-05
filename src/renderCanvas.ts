import { Matrix } from "./Matrix";
import {
  NodeType,
  LineNode,
  RectangleNode,
  PolylineNode,
  ArcNode,
} from "./types";

export function renderCanvas(
  canvas: HTMLCanvasElement,
  nodes: NodeType[],
  worldToScreenMatrix: Matrix,
  zoom: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const renderLine = (line: LineNode) => {
    const { x1, y1, x2, y2, width } = line;
    const { x: sx1, y: sy1 } = worldToScreenMatrix.transform({ x: x1, y: y1 });
    const { x: sx2, y: sy2 } = worldToScreenMatrix.transform({ x: x2, y: y2 });
    ctx.beginPath();
    ctx.lineWidth = width * zoom;
    ctx.moveTo(sx1, sy1);
    ctx.lineTo(sx2, sy2);
    ctx.stroke();
  };

  const renderRect = (rect: RectangleNode) => {
    const { x1, y1, x2, y2, width } = rect;
    const { x: sx1, y: sy1 } = worldToScreenMatrix.transform({ x: x1, y: y1 });
    const { x: sx2, y: sy2 } = worldToScreenMatrix.transform({ x: x2, y: y2 });
    ctx.beginPath();
    ctx.lineWidth = width * zoom;
    ctx.strokeRect(sx1, sy1, sx2 - sx1, sy2 - sy1);
    ctx.stroke();
  };

  const renderArc = (arc: ArcNode) => {
    ctx.beginPath();
    ctx.strokeStyle = arc.color;
    ctx.lineWidth = arc.width > 0 ? arc.width * zoom : 1;
    const { x, y } = worldToScreenMatrix.transform({
      x: arc.x,
      y: arc.y,
    });
    const r = zoom * arc.r;
    if (arc.a1 === 0 && arc.a1 === 0) {
    }
    ctx.arc(x, y, r, arc.a1, arc.a2);
    ctx.stroke();
  };

  const renderPolyline = (polyline: PolylineNode) => {
    ctx.beginPath();
    ctx.strokeStyle = polyline.color;
    ctx.lineWidth = polyline.width > 0 ? polyline.width * zoom : 1;
    const count = polyline.points.length - 1;
    for (let i = 0; i < count; i += 2) {
      const { x, y } = worldToScreenMatrix.transform({
        x: polyline.points[i],
        y: polyline.points[i + 1],
      });
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  };

  const { width, height } = canvas;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  for (let node of nodes) {
    ctx.save();
    switch (node.type) {
      case "LINE":
        renderLine(node);
        break;
      case "RECT":
        renderRect(node);
        break;

      case "POLYLINE":
        renderPolyline(node);
        break;

      case "ARC":
        renderArc(node);
        break;
    }
    ctx.restore();
  }
}
