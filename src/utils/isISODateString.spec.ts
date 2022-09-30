import isISODateString from './isISODateString';

it('should return true for valid ISO date strings', () => {
  expect(isISODateString('2019-01-01')).toBe(true);
  expect(isISODateString('2019-01-01T00:00:00.000Z')).toBe(true);
  expect(isISODateString('2019-01-01T00:00:00.000+01:00')).toBe(true);
});

it('should return false for invalid ISO date strings', () => {
  expect(isISODateString('2019-01-01T00:00:00.000+01')).toBe(false);
  expect(isISODateString('2019-01-01T00:00:00.000+0100')).toBe(false);
  expect(isISODateString('2019-01-01T00:00:00.000+01:000')).toBe(false);
  expect(isISODateString('2019-01-01T00:00:00.000+01:00:00')).toBe(false);
  expect(isISODateString('2019-01-01T00:00:00.000+01:00:00.000')).toBe(false);
  expect(isISODateString('2019-01-01T00:00:00.000+01:00:00.000Z')).toBe(false);
});
