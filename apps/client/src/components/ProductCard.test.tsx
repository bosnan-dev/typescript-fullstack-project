import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard';

jest.mock('@tanstack/react-router', () => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}));

test('it displays the product content.', async () => {
  render(
    <ProductCard
      product={{
        id: 1,
        name: 'Product Title',
        description: 'product description',
        image: 'image',
        price: 1250,
      }}
    />,
  );

  const title = await screen.findByText('Product Title');
  const description = await screen.findByText('product description');

  expect(title).toBeTruthy();
  expect(description).toBeTruthy();
});
