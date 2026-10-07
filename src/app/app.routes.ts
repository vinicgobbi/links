import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Redirect } from './components/redirect/redirect';

export const routes: Routes = [
  { path: '', component: Home, title: 'Vinícius Gobbi — Links' },
  { path: ':alias', component: Redirect, title: 'Redirecionando… — Vinícius Gobbi' },
  { path: '**', redirectTo: '' },
];
