export type NodeType = LineNode | RectangleNode | PolylineNode | ArcNode;

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

export type PolylineNode = {
  type: "POLYLINE";
  color: "black";
  width: 1;
  points: number[];
};

export type ArcNode = {
  type: "ARC";
  color: "black";
  width: 1;
  x: number;
  y: number;
  r: number;
  a1: 0;
  a2: Math["PI"];
};
