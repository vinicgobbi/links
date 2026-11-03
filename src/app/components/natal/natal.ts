import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  Injector,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';

/** O mês de dezembro inteiro, no fuso de quem está visitando. */
export function isNatal(hoje = new Date()): boolean {
  return hoje.getMonth() === 11;
}

const STORAGE_KEY = 'natal-dispensado';

/**
 * Quem fechou a decoração continua sem ela nas próximas visitas, até trazê-la de volta pelo
 * botão ou até o dezembro seguinte.
 */
export function foiDispensado(ano: number): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === String(ano);
  } catch {
    return false;
  }
}

export function dispensar(ano: number): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(ano));
  } catch {
    // Armazenamento indisponível (ex.: modo privado): fecha só nesta visita.
  }
}

export function restaurar(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Armazenamento indisponível: nada foi salvo, então não há o que desfazer.
  }
}

interface Flake {
  id: number;
  left: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  sway: number;
}

interface Burst {
  id: number;
  icon: string;
  dx: string;
  dy: string;
  size: number;
  delay: number;
  spin: string;
}

const FLAKE_COUNT = 36;
const BURST_SIZE = 14;
const BURST_DURATION = 2400;
const BURST_ICONS = ['🎁', '⭐', '❄️', '🔔', '🎄'];

function random(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Decoração de Natal: neve, trenó, enfeites, saudação e acento vermelho (ver styles.css).
 * A data é checada no navegador, no fuso de quem está visitando.
 */
@Component({
  selector: 'app-natal',
  templateUrl: './natal.html',
  styleUrl: './natal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Natal {
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly closeButton = viewChild<ElementRef<HTMLElement>>('closeButton');
  private readonly restoreButton = viewChild<ElementRef<HTMLElement>>('restoreButton');
  private nextId = 0;

  /** Dezembro: a decoração, ou o botão para trazê-la de volta, está disponível. */
  protected readonly available = signal(false);
  protected readonly active = signal(false);
  protected readonly flakes = signal<Flake[]>([]);
  /** Revoada solta ao clicar no presente. */
  protected readonly burst = signal<Burst[]>([]);
  /** Rena virada para a direita, no sentido do voo. */
  protected readonly reindeer =
    'M3 21 C5 17 16 16 22 18 L27 9 L34 9 C36 9 37 11 36 12 L30 14 L27 23 ' +
    'C25 26 22 27 21 27 L25 36 L22 37 L17 28 L10 28 L6 37 L3 36 L5 27 C3 26 2 23 3 21 Z';
  protected readonly antlers = 'M28 9 L25 2 M26.5 5.5 L22 3.5 M31 9 L33 2 M32 5.5 L37 4';

  constructor() {
    afterNextRender(() => {
      const hoje = new Date();
      if (!isNatal(hoje)) return;
      this.available.set(true);
      if (!foiDispensado(hoje.getFullYear())) this.show();
    });
  }

  protected release(): void {
    const novos = Array.from({ length: BURST_SIZE }, () => ({
      id: this.nextId++,
      icon: BURST_ICONS[Math.floor(Math.random() * BURST_ICONS.length)],
      dx: `${Math.round(random(-5, 85))}vw`,
      dy: `${-Math.round(random(30, 90))}vh`,
      size: Math.round(random(16, 34)),
      delay: Math.round(random(0, 400)),
      spin: `${Math.round(random(-200, 200))}deg`,
    }));
    this.burst.update((atual) => [...atual, ...novos]);
    setTimeout(() => {
      this.burst.update((atual) => atual.filter((item) => !novos.includes(item)));
    }, BURST_DURATION + 400);
  }

  protected close(): void {
    dispensar(new Date().getFullYear());
    this.active.set(false);
    this.flakes.set([]);
    this.burst.set([]);
    this.document.documentElement.removeAttribute('data-natal');
    this.focusAfterRender(this.restoreButton);
  }

  protected restore(): void {
    restaurar();
    this.show();
    this.focusAfterRender(this.closeButton);
  }

  /** O botão clicado some da tela: leva o foco para o que o substitui, sem perder a posição. */
  private focusAfterRender(button: () => ElementRef<HTMLElement> | undefined): void {
    afterNextRender(() => button()?.nativeElement.focus(), { injector: this.injector });
  }

  private show(): void {
    this.flakes.set(this.createFlakes());
    this.active.set(true);
    this.document.documentElement.setAttribute('data-natal', '');
  }

  private createFlakes(): Flake[] {
    return Array.from({ length: FLAKE_COUNT }, () => {
      const duration = random(10, 22);
      return {
        id: this.nextId++,
        left: random(0, 100),
        size: random(3, 8),
        opacity: random(0.35, 0.85),
        duration,
        // Atraso negativo: a página já abre nevando, em vez de a neve surgir toda do topo.
        delay: -random(0, duration),
        sway: random(10, 40) * (Math.random() < 0.5 ? -1 : 1),
      };
    });
  }
}
