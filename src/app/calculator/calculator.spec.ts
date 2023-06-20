import { Calculator } from './calculator';

describe('Pruebas de calculator', () => {
  it('#multiply should 9', () => {
    const calculator = new Calculator();

    const resp = calculator.multiply(3, 3);

    expect(resp).toEqual(9);
  });

  it('#divide should 3', () => {
    const calculator = new Calculator();

    const resp = calculator.dividir(9, 3);

    expect(resp).toEqual(3);
  });

  it('#dividir by 0 should return null', () => {
    const calculator = new Calculator();

    expect(calculator.dividir(4, 0)).toBeNull();
    expect(calculator.dividir(432194823049.924342, 0)).toBeNull();
    expect(calculator.dividir(4123123, 0)).toBeNull();
  });
});
