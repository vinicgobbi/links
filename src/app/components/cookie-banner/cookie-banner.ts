import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { AnalyticsService } from '../../services/analytics';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieBanner {
  protected readonly analytics = inject(AnalyticsService);

  constructor() {
    afterNextRender(() => this.analytics.init());
  }
}
