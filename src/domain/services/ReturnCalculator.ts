export class ReturnCalculator {

  calculate(initialClose: number, finalClose: number): number {
    if (initialClose <= 0) {
      throw new Error("Initial closing price must be greater than 0");
    }

    if (finalClose <= 0) {
      throw new Error("Final closing price must be greater than 0");
    }

    return (finalClose - initialClose) / initialClose;
  }
}
