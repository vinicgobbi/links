import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { CookieBanner } from './components/cookie-banner/cookie-banner';
import { Halloween } from './components/halloween/halloween';
import { Natal } from './components/natal/natal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CookieBanner, Halloween, Natal],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
