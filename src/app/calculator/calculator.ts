export class Calculator {
  dividir(a: number, b: number) {
    if (b === 0) {
      return null;
    }
    return a / b;
  }

  multiply(a: number, b: number) {
    return a * b;
  }
}
