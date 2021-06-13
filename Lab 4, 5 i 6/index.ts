export class Fibonacci {
  calculate(n: number): number {
    if(n === 0) {
      return 0;
    }
    if(n === 1) {
      return 1;
    }
    return this.calculate(n - 1) + this.calculate(n - 2);
  }
}