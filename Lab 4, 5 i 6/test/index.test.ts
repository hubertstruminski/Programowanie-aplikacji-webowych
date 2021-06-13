import { Fibonacci } from '../index';

describe('Fibonacci', () => {
  let fib: Fibonacci;
  const fibTestValues = [[0, 0], [1, 1], [6, 8]];

  beforeAll(() => {
    fib = new Fibonacci();
  });

  test.each(fibTestValues)('calculate fib', (n, expectedRet) => {
    const ret = fib.calculate(n);
    expect(ret).toBe(expectedRet);
  });
});