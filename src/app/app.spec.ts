import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { LINKS } from './data/links';
import { Header } from './components/header/header';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  it('mostra os links visíveis, com o destaque primeiro', async () => {
    const harness = await RouterTestingHarness.create('/');
    const names = Array.from(
      (harness.routeNativeElement as HTMLElement).querySelectorAll('.card__name'),
    ).map((el) => el.textContent?.trim());

    const visible = LINKS.filter((item) => !item.hidden);
    expect(names.length).toBe(visible.length);
    expect(names[0]).toBe(visible.find((item) => item.featured)?.name);
    expect(names).not.toContain('Blog');
  });

  it('mostra o selo de disponibilidade e o painel de compartilhar com o QR code', async () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('.status')?.textContent).toContain('Aberto a novas oportunidades');
    expect(page.querySelector('dialog.share img.share__qr')?.getAttribute('src')).toBe(
      'assets/qrcode.svg',
    );
  });

  it('oferece copiar o atalho dos links que têm um', async () => {
    const harness = await RouterTestingHarness.create('/');
    const shortcuts = Array.from(
      (harness.routeNativeElement as HTMLElement).querySelectorAll('.shortcut'),
    ).map((el) => el.textContent?.trim());
    expect(shortcuts).toContain('/gh');
    expect(shortcuts).toContain('/cv');
  });

  it('usa links de verdade (âncoras com href), não botões', async () => {
    const harness = await RouterTestingHarness.create('/');
    const anchors = (harness.routeNativeElement as HTMLElement).querySelectorAll('a.card[href]');
    expect(anchors.length).toBe(LINKS.filter((item) => !item.hidden).length);
  });
});
