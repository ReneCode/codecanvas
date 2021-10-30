//

/**
 * @description
 * | a c e |
 * | b d f |
 * | 0 0 1 |
 * e,f translate
 * a,d scale
 */
export class Matrix {
  constructor(
    private a: number,
    private b: number,
    private c: number,
    private d: number,
    private e: number,
    private f: number
  ) {}

  public get value() {
    return [this.a, this.b, this.c, this.d, this.e, this.f];
  }

  public static create() {
    return new Matrix(1, 0, 0, 1, 0, 0);
  }

  public static scale(scaleX: number, scaleY: number) {
    return new Matrix(scaleX, 0, 0, scaleY, 0, 0);
  }

  public static translate(dx: number, dy: number) {
    return new Matrix(1, 0, 0, 1, dx, dy);
  }

  public inverse() {
    const det = this.a * this.d - this.b * this.c;
    return new Matrix(
      this.d / det,
      -this.b / det,
      -this.c / det,
      this.a / det,
      (this.c * this.f - this.d * this.e) / det,
      (this.b * this.e - this.a * this.f) / det
    );
  }

  public multiply(rightMatrix: Matrix) {
    return new Matrix(
      this.a * rightMatrix.a + this.c * rightMatrix.b,
      this.b * rightMatrix.a + this.d * rightMatrix.b,
      this.a * rightMatrix.c + this.c * rightMatrix.d,
      this.b * rightMatrix.c + this.d * rightMatrix.d,
      this.a * rightMatrix.e + this.c * rightMatrix.f + this.e,
      this.b * rightMatrix.e + this.d * rightMatrix.f + this.f
    );
  }

  public transform(pt: { x: number; y: number }) {
    return {
      x: this.a * pt.x + this.c * pt.y + this.e,
      y: this.b * pt.x + this.d * pt.y + this.f,
    };
  }
}
