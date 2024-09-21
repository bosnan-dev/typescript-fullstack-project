import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CounterButton } from './CounterButton';
import userEvent from '@testing-library/user-event';

test('it displays the product content.', async () => {
  // setup
  render(<CounterButton />);

  // action
  const button = await screen.findByRole('button');
  expect(button.innerHTML).toEqual('Clicks: 0');

  await userEvent.click(button);

  // assertion
  expect(button.innerHTML).toEqual('Clicks: 1');
});
