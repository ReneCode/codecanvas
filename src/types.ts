export type NodeType = LineNode | RectangleNode;
export type LineNode = {
  type: "LINE";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  color: string;
};

export type RectangleNode = {
  type: "RECT";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  color: string;
};
