# Links — Vinícius Gobbi

Minha página de links: portfólio, LinkedIn, GitHub, currículo, e-mail e redes sociais, em um só lugar.

🔗 [links.vinicgobbi.dev.br](https://links.vinicgobbi.dev.br)

## Stack

- [Angular](https://angular.dev/) (standalone components, signals)
- [@vinicgobbi/ui](https://github.com/vinicgobbi/vinicgobbi-ui): minha identidade visual (tokens, tema claro/escuro, fontes, aviso de cookies e decorações de datas comemorativas), compartilhada com o [portfólio](https://github.com/vinicgobbi/website) e o blog
- Netlify (hospedagem, redirects e edge function)

## Editando os links

Tudo vem de [`public/assets/links.json`](public/assets/links.json):

| Campo | Para quê |
|---|---|
| `name`, `link` | Nome exibido e destino |
| `description` | Texto curto abaixo do nome (usuário, e-mail…) |
| `icon` | Classe do [Bootstrap Icons](https://icons.getbootstrap.com/), ex.: `bi-github` |
| `group` | `profissional` ou `social` |
| `featured` | Destaque no topo da página |
| `copy` | Ao passar o mouse, o card oferece copiar esse texto (ex.: o e-mail) em vez do atalho |
| `hidden` | Some da página, mas o atalho continua funcionando |
| `alias` | Atalhos: `links.vinicgobbi.dev.br/<alias>` redireciona para o link |

O mesmo arquivo alimenta:

- **a página**, importada no build (sem requisição extra ao abrir);
- **os atalhos**: `scripts/generate-redirects.mjs` gera `public/_redirects` antes de cada build, e a Netlify redireciona direto no servidor (ex.: `/gh`, `/cv`). Atalhos com acento ou para links não-HTTP (como o e-mail) são resolvidos pelo Angular;
- **a versão em Markdown** da página ([`netlify/edge-functions/markdown.ts`](netlify/edge-functions/markdown.ts)), servida quando a requisição pede `Accept: text/markdown`.

## Desenvolvimento

O `@vinicgobbi/ui` vem do GitHub Packages, que exige token até para pacotes públicos. O pnpm 12 não lê credenciais do `.npmrc` do repositório, então o token fica na configuração do usuário. Uma vez só, no `~/.npmrc`:

```ini
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

E, antes do `pnpm install`, um token com o escopo `read:packages` (o do `gh` serve, depois de `gh auth refresh -s read:packages`):

```bash
export NODE_AUTH_TOKEN=$(gh auth token)
```

```bash
pnpm install
pnpm start      # http://localhost:4200
pnpm test       # testes unitários (Vitest)
pnpm run build  # gera os atalhos e o build em dist/docs/browser
```
