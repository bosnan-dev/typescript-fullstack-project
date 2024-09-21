import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  test('should format price', () => {
    const result = formatPrice(1000);
    expect(result).toEqual('$10.00');
  });

  // test('should format negative values', () => {
  //   const result = formatPrice(-1000);
  //   expect(result).toEqual('-$10.00');
  // });
});
