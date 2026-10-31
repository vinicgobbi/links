import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';

/** Só no dia 31 de outubro, no fuso de quem está visitando. */
export function isHalloween(hoje = new Date()): boolean {
  return hoje.getMonth() === 9 && hoje.getDate() === 31;
}

interface SwarmBat {
  id: number;
  dx: string;
  dy: string;
  size: number;
  delay: number;
}

const SWARM_SIZE = 14;
const SWARM_DURATION = 2400;

/**
 * Decoração de Halloween: morcegos, aranha, saudação e acento laranja (ver styles.css).
 * A data é checada no navegador para valer apenas no próprio dia.
 */
@Component({
  selector: 'app-halloween',
  imports: [NgTemplateOutlet],
  templateUrl: './halloween.html',
  styleUrl: './halloween.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Halloween {
  private readonly document = inject(DOCUMENT);
  private nextId = 0;

  protected readonly active = signal(false);
  protected readonly bats = [1, 2, 3, 4];
  /** Revoada solta ao clicar na abóbora. */
  protected readonly swarm = signal<SwarmBat[]>([]);
  /** Asa esquerda, presa ao ombro; a direita é a mesma espelhada. */
  protected readonly wing =
    'M-3 -4 C-12 -16 -30 -19 -47 -10 C-41 -7 -39 -2 -39 3 C-34 -1 -29 -1 -26 4 ' +
    'C-22 0 -16 0 -13 5 C-10 1 -6 1 -3 4 Z';

  constructor() {
    afterNextRender(() => {
      if (!isHalloween()) return;
      this.active.set(true);
      this.document.documentElement.setAttribute('data-halloween', '');
    });
  }

  protected release(): void {
    const novos = Array.from({ length: SWARM_SIZE }, () => ({
      id: this.nextId++,
      dx: `${Math.round(Math.random() * 90 - 5)}vw`,
      dy: `${-Math.round(30 + Math.random() * 60)}vh`,
      size: Math.round(24 + Math.random() * 28),
      delay: Math.round(Math.random() * 400),
    }));
    this.swarm.update((atual) => [...atual, ...novos]);
    setTimeout(() => {
      this.swarm.update((atual) => atual.filter((bat) => !novos.includes(bat)));
    }, SWARM_DURATION + 400);
  }

  protected close(): void {
    this.active.set(false);
    this.swarm.set([]);
    this.document.documentElement.removeAttribute('data-halloween');
  }
}
