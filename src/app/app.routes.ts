import { Routes } from '@angular/router';
import { TicTacToeComponent } from './games/tic-tac-toe/tic-tac-toe';
import { HomeComponent } from './pages/home.component/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {title: 'Home', icon: 'home-icon', visibleInDashboard: true}
  },
  {
    path: 'games/tic-tac-toe', 
    component: TicTacToeComponent,
    data: {title: 'tic-tac-toe', icon: 'game-icon', visibleInDashboard: true}
  }
];
