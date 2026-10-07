import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { findByAlias } from '../../data/links';

/**
 * Fallback dos atalhos (/gh, /cv...). Em produção, a maioria já é redirecionada pela Netlify
 * (public/_redirects); este componente cobre o servidor de desenvolvimento, atalhos com acento
 * e links não-HTTP como o mailto.
 */
@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.html',
  styleUrl: './redirect.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Redirect {
  protected readonly alias: string;
  protected readonly target?: string;

  constructor() {
    const router = inject(Router);
    this.alias = inject(ActivatedRoute).snapshot.paramMap.get('alias') ?? '';
    const match = findByAlias(this.alias);

    if (match) {
      this.target = match.link;
      // replace: o botão "voltar" não cai de novo no atalho.
      location.replace(match.link);
    } else {
      router.navigate(['/'], { replaceUrl: true, state: { notFound: this.alias } });
    }
  }
}
