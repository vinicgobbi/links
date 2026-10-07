// Gera public/_redirects a partir de public/assets/links.json, para os atalhos
// (ex.: /gh) redirecionarem direto no servidor da Netlify, sem esperar o Angular carregar.
// Atalhos com acento ou para links não-HTTP (ex.: mailto:) continuam funcionando pelo
// fallback no Angular (componente Redirect).
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const links = JSON.parse(readFileSync(new URL('public/assets/links.json', root), 'utf8'));

const seen = new Set();
const lines = ['# Gerado por scripts/generate-redirects.mjs — não edite à mão.'];

for (const { name, link, alias = [] } of links) {
  if (!/^https?:\/\//.test(link)) continue;
  for (const candidate of [name, ...alias]) {
    const slug = candidate.toLowerCase().trim();
    if (!/^[a-z0-9-]+$/.test(slug) || seen.has(slug)) continue;
    seen.add(slug);
    lines.push(`/${slug}  ${link}  302`);
  }
}

writeFileSync(new URL('public/_redirects', root), lines.join('\n') + '\n');
console.log(`_redirects: ${seen.size} atalhos gerados`);
