import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // component: HomeComponent,
    loadComponent: () => import('./pages/home.component/home.component').then(m => m.HomeComponent),
    data: {title: 'Home', icon: 'home-icon', visibleInDashboard: true}
  },
  {
    path: 'games/tic-tac-toe', 
    // component: TicTacToeComponent,
    loadComponent: () => import('./games/tic-tac-toe/tic-tac-toe').then(m => m.TicTacToeComponent),
    data: {title: 'tic-tac-toe', icon: 'game-icon', visibleInDashboard: true}
  },
  {
    path: 'games/memory',
    // component: MemoryComponent,
    loadComponent: () => import('./games/memory/memory').then(m => m.MemoryComponent),
    data: {title: 'Memory', icon: 'game-icon', visibleInDashboard: true}
  },
  {
    path: '**',
    // component: NotFoundComponent
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFoundComponent),
  }
];
