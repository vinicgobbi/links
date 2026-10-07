import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GROUPS, LINKS, shortcutFor } from '../../data/links';
import { SITE_URL } from '../../data/profile';
import { Link } from '../../models/link';

@Component({
  selector: 'app-home',
  imports: [NgTemplateOutlet],
  templateUrl: './home.html',
  styleUrls: ['./home.css', './shortcut.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly visible = LINKS.filter((item) => !item.hidden);

  protected readonly featured = this.visible.filter((item) => item.featured);
  protected readonly groups = GROUPS.map((group) => ({
    ...group,
    links: this.visible.filter((item) => item.group === group.id && !item.featured),
  })).filter((group) => group.links.length);

  /** Atalho que não existe: o Redirect volta para cá informando qual foi. */
  protected readonly notFound = signal<string | null>(history.state?.notFound ?? null);
  protected readonly copied = signal<string | null>(null);

  protected readonly shortcutFor = shortcutFor;

  protected shortcutUrl(alias: string): string {
    return `${SITE_URL}/${alias}`;
  }

  protected isExternal(item: Link): boolean {
    return item.link.startsWith('http');
  }

  protected copy(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied.set(text);
      setTimeout(() => {
        if (this.copied() === text) this.copied.set(null);
      }, 2000);
    });
  }
}
