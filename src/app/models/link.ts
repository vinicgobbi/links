export type LinkGroup = 'profissional' | 'social';

export interface Link {
  name: string;
  /** Texto curto exibido abaixo do nome (usuário, e-mail, etc.). */
  description?: string;
  link: string;
  /** Classe do Bootstrap Icons, ex.: "bi-github". */
  icon: string;
  group: LinkGroup;
  /** Destaque no topo da página. */
  featured?: boolean;
  /** Texto que o botão "copiar" coloca na área de transferência. */
  copy?: string;
  /** Fora da lista, mas o atalho (/alias) continua funcionando. */
  hidden?: boolean;
  /** Atalhos: links.vinicgobbi.dev.br/<alias> redireciona para o link. */
  alias?: string[];
}
