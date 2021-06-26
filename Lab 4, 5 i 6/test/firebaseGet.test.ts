/**
 * @jest-environment jsdom
 */
import { isITimestamp, ITimestamp } from '../src/IFirebaseGet';
 
describe('firebase interface', () => {
  it('is ITimestamp interface', () => {
    const object: ITimestamp = { nanoseconds: 123456789, seconds: 1234567 };
    const actualValue = isITimestamp(object);

    expect(actualValue).toBeTruthy();
  });
});