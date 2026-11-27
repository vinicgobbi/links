import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { CookieBanner } from '@vinicgobbi/ui/consent';
import { Seasonal } from '@vinicgobbi/ui/seasonal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CookieBanner, Seasonal],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
