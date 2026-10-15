import { DOCUMENT, Injectable, inject, signal } from '@angular/core';

export type Consent = 'granted' | 'denied';

const MEASUREMENT_ID = 'G-KV981LY6QB';
const STORAGE_KEY = 'analytics-consent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * O Google Analytics só é carregado depois que a pessoa aceita o aviso de cookies (LGPD).
 * Sem resposta ou com recusa, nenhum script do Google é baixado e nenhum cookie é gravado.
 */
@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly document = inject(DOCUMENT);
  private loaded = false;

  readonly consent = signal<Consent | null>(null);
  readonly bannerOpen = signal(false);

  /** Lê a escolha salva. Chamar só no navegador (ex.: em afterNextRender). */
  init(): void {
    const saved = readConsent();
    this.consent.set(saved);
    this.bannerOpen.set(saved === null);
    if (saved === 'granted') {
      this.load();
    }
  }

  choose(choice: Consent): void {
    this.consent.set(choice);
    this.bannerOpen.set(false);
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Armazenamento indisponível (ex.: modo privado): a escolha vale só para esta visita.
    }
    if (choice === 'granted') {
      this.load();
    } else {
      this.revoke();
    }
  }

  openPreferences(): void {
    this.bannerOpen.set(true);
  }

  private load(): void {
    const win = this.document.defaultView;
    if (!win) return;
    (win as unknown as Record<string, unknown>)[`ga-disable-${MEASUREMENT_ID}`] = false;
    if (this.loaded) return;
    this.loaded = true;

    win.dataLayer = win.dataLayer ?? [];
    const dataLayer = win.dataLayer;
    win.gtag = function () {
      // O gtag.js espera o objeto `arguments`, não um array.
      // eslint-disable-next-line prefer-rest-params
      dataLayer.push(arguments);
    };
    win.gtag('js', new Date());
    win.gtag('config', MEASUREMENT_ID);

    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    this.document.head.appendChild(script);
  }

  /** Para a coleta nesta visita e apaga os cookies _ga* já gravados. */
  private revoke(): void {
    const win = this.document.defaultView;
    if (!win) return;
    (win as unknown as Record<string, unknown>)[`ga-disable-${MEASUREMENT_ID}`] = true;

    // O GA grava os cookies no domínio mais alto possível; tenta apagar em cada nível.
    const parts = win.location.hostname.split('.');
    const domains = [''];
    for (let i = 0; i < parts.length - 1; i++) {
      domains.push(`; domain=.${parts.slice(i).join('.')}`);
    }
    for (const cookie of this.document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim();
      if (!name.startsWith('_ga')) continue;
      for (const domain of domains) {
        this.document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
      }
    }
  }
}

function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}
