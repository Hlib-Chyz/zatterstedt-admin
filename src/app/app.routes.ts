import { Routes } from '@angular/router';
import { Path } from './shared/types/path.types';

export const routes: Routes = [
    {
        path: Path.Login,
        loadComponent: () => import('./pages/login/login.component'),
    },
    {
        path: Path.Home,
        loadComponent: () => import('./pages/home/home.component'),
    },
    { path: '**', redirectTo: Path.Home },
];
