import data from '../../../public/assets/links.json';
import { Link, LinkGroup } from '../models/link';

/**
 * Fonte única: public/assets/links.json. O mesmo arquivo alimenta a página, os atalhos
 * gerados no build (scripts/generate-redirects.mjs) e a edge function de Markdown.
 */
export const LINKS = data as Link[];

export const GROUPS: { id: LinkGroup; titulo: string }[] = [
  { id: 'profissional', titulo: 'Profissional' },
  { id: 'social', titulo: 'Redes sociais' },
];

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

/** Procura pelo nome ou por um dos atalhos, ignorando maiúsculas e acentos. */
export function findByAlias(alias: string): Link | undefined {
  const wanted = normalize(alias);
  if (!wanted) return undefined;
  return LINKS.find(
    (item) =>
      normalize(item.name) === wanted || item.alias?.some((a) => normalize(a) === wanted),
  );
}

/** Atalho mais curto que funciona como URL (sem acentos), ex.: "gh" para o GitHub. */
export function shortcutFor(item: Link): string | undefined {
  return (item.alias ?? [])
    .filter((a) => /^[a-z0-9-]+$/.test(a))
    .sort((a, b) => a.length - b.length)[0];
}
