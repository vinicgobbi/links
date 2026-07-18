import { Routes } from '@angular/router';
import { Section } from './components/section/section';
import { Redirect } from './components/redirect/redirect';

export const routes: Routes = [
  { path: '', component: Section },
  { path: ':alias', component: Redirect },
  { path: '**', redirectTo: '' },
];
