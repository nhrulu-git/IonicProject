import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'builder',
    loadComponent: () => import('./builder/builder.page').then( m => m.BuilderPage)
  },
  {
    path: 'saved-builds',
    loadComponent: () => import('./saved-builds/saved-builds.page').then( m => m.SavedBuildsPage)
  },
];
