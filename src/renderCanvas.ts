import { NodeType, LineNode } from "./types";

export function renderCanvas(canvas: HTMLCanvasElement, nodes: NodeType[]) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const worldToScreenMatrix = "";

  const transformPoint = (x: number, y: number, m: any) => {
    return { x, y };
  };

  const renderLine = (line: LineNode) => {
    const { x1, y1, x2, y2, color, width } = line;
    const { x: sx1, y: sy1 } = transformPoint(x1, y1, worldToScreenMatrix);
    const { x: sx2, y: sy2 } = transformPoint(x2, y2, worldToScreenMatrix);
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.moveTo(sx1, sy1);
    ctx.lineTo(sx2, sy2);
    ctx.stroke();
  };

  const { width, height } = canvas;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  for (let node of nodes) {
    switch (node.type) {
      case "LINE":
        renderLine(node);
        break;
    }
  }
}
