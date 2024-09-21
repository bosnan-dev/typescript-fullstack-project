export function formatPrice(value: number) {
  // const formatter = Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  // });

  // return formatter.format(value / 100);

  return `$${(value / 100).toFixed(2)}`;
}
