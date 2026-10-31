# Política de segurança

## Versões suportadas

Só a versão no ar em [links.vinicgobbi.dev.br](https://links.vinicgobbi.dev.br), gerada a partir da branch `main`, recebe correções de segurança.

## Como relatar uma vulnerabilidade

**Não abra uma issue pública.** Relate de forma privada por um destes caminhos:

- [Relatório privado no GitHub](https://github.com/vinicgobbi/links/security/advisories/new) (preferido);
- e-mail para [vinicgobbi@gmail.com](mailto:vinicgobbi@gmail.com), com "Segurança" no assunto.

Se puder, inclua:

- o que encontrou e onde (URL, atalho, arquivo);
- os passos para reproduzir;
- o impacto que você imagina.

Respondo em até 7 dias e aviso quando a correção for publicada. Se quiser, você recebe o crédito pela descoberta.

## Escopo

Entram, por exemplo:

- os atalhos (`/<alias>`) e redirecionamentos, como um redirecionamento aberto para um domínio não listado em [`links.json`](public/assets/links.json);
- a edge function de Markdown ([`netlify/edge-functions/markdown.ts`](netlify/edge-functions/markdown.ts));
- XSS ou injeção de conteúdo na página;
- dependências vulneráveis que de fato afetem o site.

Ficam de fora problemas da própria Netlify ou do GitHub, ataques de negação de serviço e relatos automáticos sem um impacto demonstrado.
