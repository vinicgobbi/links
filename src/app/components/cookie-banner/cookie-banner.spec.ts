import { TestBed } from '@angular/core/testing';
import { CookieBanner } from './cookie-banner';

const GTAG_SELECTOR = 'script[src*="googletagmanager.com/gtag/js"]';

describe('CookieBanner', () => {
  beforeEach(() => {
    localStorage.removeItem('analytics-consent');
    document.querySelectorAll(GTAG_SELECTOR).forEach((el) => el.remove());
  });

  async function render(): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(CookieBanner);
    fixture.detectChanges(); // dispara o afterNextRender, que lê a escolha salva
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  function button(el: HTMLElement, label: string): HTMLButtonElement {
    return Array.from(el.querySelectorAll('button')).find(
      (btn) => btn.textContent?.trim() === label,
    ) as HTMLButtonElement;
  }

  it('pergunta antes de carregar o Analytics', async () => {
    const el = await render();
    expect(el.querySelector('.consent')).not.toBeNull();
    expect(document.querySelector(GTAG_SELECTOR)).toBeNull();
  });

  it('carrega o Analytics só depois de aceitar', async () => {
    const el = await render();
    button(el, 'Aceitar').click();
    expect(localStorage.getItem('analytics-consent')).toBe('granted');
    expect(document.querySelector(GTAG_SELECTOR)).not.toBeNull();
  });

  it('não carrega nada ao recusar, nem na próxima visita', async () => {
    const el = await render();
    button(el, 'Recusar').click();
    expect(localStorage.getItem('analytics-consent')).toBe('denied');
    expect(document.querySelector(GTAG_SELECTOR)).toBeNull();

    TestBed.resetTestingModule();
    const again = await render();
    expect(again.querySelector('.consent')).toBeNull();
    expect(document.querySelector(GTAG_SELECTOR)).toBeNull();
  });
});
