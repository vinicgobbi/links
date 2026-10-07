import { findByAlias, LINKS, shortcutFor } from './links';

describe('findByAlias', () => {
  it('encontra pelo atalho, ignorando maiúsculas e espaços', () => {
    expect(findByAlias('gh')?.name).toBe('GitHub');
    expect(findByAlias(' GH ')?.name).toBe('GitHub');
  });

  it('encontra pelo nome e ignora acentos', () => {
    expect(findByAlias('curriculo')?.name).toBe('Currículo');
    expect(findByAlias('currículo')?.name).toBe('Currículo');
    expect(findByAlias('portfolio')?.name).toBe('Portfólio');
  });

  it('mantém o atalho de links ocultos', () => {
    expect(findByAlias('blog')?.hidden).toBe(true);
  });

  it('retorna undefined para atalhos inexistentes', () => {
    expect(findByAlias('nao-existe')).toBeUndefined();
    expect(findByAlias('')).toBeUndefined();
  });

  it('não tem atalhos repetidos entre links diferentes', () => {
    const all = LINKS.flatMap((item) => (item.alias ?? []).map((a) => a.toLowerCase()));
    expect(new Set(all).size).toBe(all.length);
  });
});

describe('shortcutFor', () => {
  it('usa o atalho mais curto sem acentos', () => {
    expect(shortcutFor(findByAlias('github')!)).toBe('gh');
    expect(shortcutFor(findByAlias('curriculo')!)).toBe('cv');
    expect(shortcutFor(findByAlias('portfolio')!)).toBe('site');
  });
});
