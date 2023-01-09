import { ageCalculator, birthDayCalculator } from '../utils/helpers/age.helper';

describe('age_helper_test', () => {
  test('age_calculator', async () => {
    expect(ageCalculator('1999-07-13')).toEqual(23);
  });

  test('birthday_calculator', async () => {
    expect(new Date(birthDayCalculator(23)).getFullYear()).toEqual(1999);
  });
});
