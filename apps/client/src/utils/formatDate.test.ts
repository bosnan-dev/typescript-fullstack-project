import { formatDate } from './formatDate';
import { isToday } from 'date-fns';

jest.mock('date-fns', () => ({
  isToday: jest.fn(),
}));

describe('formatDate', () => {
  test('should tell if it is today', () => {
    const mockedIsToday = jest.mocked(isToday);
    mockedIsToday.mockReturnValue(true);

    const result = formatDate(new Date('2024'));
    expect(result).toEqual('It is today');
  });

  test('should tell that it is not today', () => {
    const mockedIsToday = jest.mocked(isToday);
    mockedIsToday.mockReturnValue(false);

    const result = formatDate(new Date('2024'));
    expect(result).toEqual('it is not today');
  });
});
