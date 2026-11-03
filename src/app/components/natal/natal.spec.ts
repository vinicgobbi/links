import { dispensar, foiDispensado, isNatal, restaurar } from './natal';

describe('isNatal', () => {
  it('vale o mês de dezembro inteiro', () => {
    expect(isNatal(new Date(2026, 11, 1, 0, 0))).toBe(true);
    expect(isNatal(new Date(2026, 11, 25))).toBe(true);
    expect(isNatal(new Date(2026, 11, 31, 23, 59))).toBe(true);
    expect(isNatal(new Date(2026, 10, 30, 23, 59))).toBe(false);
    expect(isNatal(new Date(2027, 0, 1, 0, 0))).toBe(false);
  });
});

describe('dispensar', () => {
  beforeEach(() => localStorage.removeItem('natal-dispensado'));
  afterEach(() => localStorage.removeItem('natal-dispensado'));

  it('lembra de quem fechou a decoração só naquele ano', () => {
    expect(foiDispensado(2026)).toBe(false);
    dispensar(2026);
    expect(foiDispensado(2026)).toBe(true);
    expect(foiDispensado(2027)).toBe(false);
  });

  it('volta a mostrar a decoração depois de restaurar', () => {
    dispensar(2026);
    restaurar();
    expect(foiDispensado(2026)).toBe(false);
  });
});
