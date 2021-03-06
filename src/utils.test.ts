import { textToJSON } from "./utils";

describe("JsObjectToJSON", () => {
  it("basic", () => {
    const js = ' { "type": "LINE", "x": 3.14 }';
    const exp = '{ "type": "LINE", "x": 3.14 }';
    expect(textToJSON(js)).toBe(exp);
  });

  it("a1", () => {
    const js = ' { type: "LINE", "x": 3.14 }';
    const exp = '{ "type": "LINE", "x": 3.14 }';
    expect(textToJSON(js)).toBe(exp);
  });

  it("a2", () => {
    const js = ' { Type : "LINE" , x : 3.14 }';
    const exp = '{ "Type": "LINE" , "x": 3.14 }';
    expect(textToJSON(js)).toBe(exp);
  });

  it("value with :", () => {
    const js = ' { Type : "LINE:" , x : 3.14 }';
    const exp = '{ "Type": "LINE:" , "x": 3.14 }';
    expect(textToJSON(js)).toBe(exp);
  });

  it("value with :', ", () => {
    const js = ' { Type : "LINE:", x : 3.14 }';
    const exp = '{ "Type": "LINE:", "x": 3.14 }';
    expect(textToJSON(js)).toBe(exp);
  });

  it("larger', ", () => {
    const js = `{ type: 'LINE' , x1: 400, y1: 4, x2: 400, y2: 4, with: 0.25 }  `;
    const exp =
      '{ "type": "LINE" , "x1": 400, "y1": 4, "x2": 400, "y2": 4, "with": 0.25 }';
    expect(textToJSON(js)).toBe(exp);
  });

  it("with '", () => {
    const js = `{ type: 'LINE', x1: 400, y1: 4, x2: 400, y2: 4, with: 0.25 }  `;
    const exp =
      '{ "type": "LINE", "x1": 400, "y1": 4, "x2": 400, "y2": 4, "with": 0.25 }';
    expect(textToJSON(js)).toBe(exp);
  });

  it("polyline", () => {
    const js = `{ type: "POLYLINE", points: [ 100, 100, 150, 150, 100, 150, 150, 100, 125, 100 ] }`;
    const exp =
      '{ "type": "POLYLINE", "points": [ 100, 100, 150, 150, 100, 150, 150, 100, 125, 100 ] }';

    expect(textToJSON(js)).toBe(exp);
  });

  it("arc", () => {
    const js = `{ type: "ARC", x: 50, y: 50, r: 10, a1: 1, a2: 5 }`;
    const exp =
      '{ "type": "ARC", "x": 50, "y": 50, "r": 10, "a1": 1, "a2": 5 }';

    expect(textToJSON(js)).toBe(exp);
  });
});
