import { Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly theme = signal<Theme>(
    (document.documentElement.getAttribute('data-bs-theme') as Theme | null) ?? 'dark',
  );

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    document.documentElement.setAttribute('data-bs-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
  }
}
