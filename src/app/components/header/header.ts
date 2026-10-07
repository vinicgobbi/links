import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ThemeService } from '../../services/theme';
import { PROFILE, SITE_URL } from '../../data/profile';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage],
  templateUrl: './header.html',
  styleUrls: ['./header.css', './share-dialog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly theme = inject(ThemeService);
  protected readonly profile = PROFILE;

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('shareDialog');
  protected readonly url = SITE_URL;
  protected readonly displayUrl = new URL(SITE_URL).host;
  protected readonly canShare = typeof navigator.share === 'function';
  protected readonly copied = signal(false);

  protected openShare(): void {
    this.copied.set(false);
    this.dialog().nativeElement.showModal();
  }

  protected closeShare(): void {
    this.dialog().nativeElement.close();
  }

  /** Fecha ao clicar fora do painel (no fundo escurecido). */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.closeShare();
  }

  protected copyUrl(): void {
    navigator.clipboard.writeText(this.url).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }

  protected async nativeShare(): Promise<void> {
    try {
      await navigator.share({ title: `${this.profile.nome} — Links`, url: this.url });
    } catch {
      // Compartilhamento cancelado pelo usuário.
    }
  }
}
