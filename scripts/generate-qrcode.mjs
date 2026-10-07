// Gera public/assets/qrcode.svg com o endereço da página e a foto de perfil no centro,
// usado no painel "Compartilhar". Fica no build (e não no navegador) para não adicionar a
// biblioteca ao JavaScript da página.
import { readFileSync, writeFileSync } from 'node:fs';
import QRCode from 'qrcode';

// Mantenha igual a SITE_URL em src/app/data/profile.ts.
const url = 'https://links.vinicgobbi.dev.br';
const assets = new URL('../public/assets/', import.meta.url);

// Correção de erro "H" (~30%): o código continua legível com a foto cobrindo o centro.
const qr = QRCode.create(url, { errorCorrectionLevel: 'H' });
const size = qr.modules.size;
const margin = 1;
const total = size + margin * 2;

// Desenha os módulos escuros, pulando os que ficam atrás da foto.
// Mesma paridade do código, para a área limpa ficar exatamente centralizada.
let logo = Math.round(size * 0.3);
if ((size - logo) % 2) logo += 1;
const logoStart = (size - logo) / 2;
const logoEnd = logoStart + logo;
const behindLogo = (x, y) => x >= logoStart && x < logoEnd && y >= logoStart && y < logoEnd;

let path = '';
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if (qr.modules.get(x, y) && !behindLogo(x, y)) path += `M${x + margin} ${y + margin}h1v1h-1z`;
  }
}

const photo = readFileSync(new URL('qrcode-avatar.jpg', assets)).toString('base64');
const center = total / 2;
const radius = logo / 2;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" shape-rendering="crispEdges">
<rect width="${total}" height="${total}" fill="#ffffff"/>
<path fill="#0b0f14" d="${path}"/>
<clipPath id="avatar"><circle cx="${center}" cy="${center}" r="${radius - 0.4}"/></clipPath>
<circle cx="${center}" cy="${center}" r="${radius}" fill="#14b8a6" shape-rendering="geometricPrecision"/>
<image href="data:image/jpeg;base64,${photo}" x="${center - radius}" y="${center - radius}" width="${logo}" height="${logo}" clip-path="url(#avatar)" preserveAspectRatio="xMidYMid slice"/>
</svg>
`;

writeFileSync(new URL('qrcode.svg', assets), svg);
console.log(`qrcode.svg: ${url} (${size}x${size}, foto no centro)`);
