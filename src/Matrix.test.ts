import { Matrix } from "./Matrix";

describe("Matrix", () => {
  it("multiply", () => {
    const m1 = new Matrix(1, 2, 3, 4, 5, 6);
    const m2 = new Matrix(2, 3, 4, 5, 6, 7);
    const m = m1.multiply(m2);
    expect(m.value).toEqual([11, 16, 19, 28, 32, 46]);
  });

  it("transform", () => {
    const m = new Matrix(1, 2, 3, 4, 5, 6);
    expect(m.transform({ x: 10, y: 20 })).toEqual({ x: 75, y: 106 });
  });

  it("transform - translate-scale-translate", () => {
    const pt = { x: 10, y: 20 };
    const mTranslateA = Matrix.translate(50, 80);
    expect(mTranslateA.transform(pt)).toEqual({ x: 60, y: 100 });

    const mScale = Matrix.scale(0.5, 0.5);
    expect(mScale.multiply(mTranslateA).transform(pt)).toEqual({
      x: 30,
      y: 50,
    });

    const mTranslateB = Matrix.translate(2, 3);

    // multiply matrix:     from right to left
    // first operation on right
    // last operaton on left
    const m = mTranslateB.multiply(mScale).multiply(mTranslateA);
    expect(m.transform({ x: 10, y: 20 })).toEqual({ x: 32, y: 53 });
  });
});
