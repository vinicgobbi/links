import { Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';

/**
 * O tema inicial é aplicado por um script inline no index.html (preferência salva ou a do
 * sistema), antes do Angular carregar. Aqui só sincronizamos o estado e tratamos a troca.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly theme = signal<Theme>(
    document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark',
  );

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Armazenamento indisponível (ex.: modo privado): o tema vale só para esta visita.
    }
  }
}
