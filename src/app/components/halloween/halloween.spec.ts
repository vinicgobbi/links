import { isHalloween } from './halloween';

describe('isHalloween', () => {
  it('vale só no dia 31 de outubro', () => {
    expect(isHalloween(new Date(2026, 9, 31, 0, 0))).toBe(true);
    expect(isHalloween(new Date(2026, 9, 31, 23, 59))).toBe(true);
    expect(isHalloween(new Date(2026, 9, 30))).toBe(false);
    expect(isHalloween(new Date(2026, 10, 1))).toBe(false);
  });
});
