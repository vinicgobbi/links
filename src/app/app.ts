import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Section } from './components/section/section';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Section],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'vini-links';
}
