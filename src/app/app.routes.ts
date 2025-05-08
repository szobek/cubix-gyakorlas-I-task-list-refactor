import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },   
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent},
    {path: 'tasks', canActivate: [authGuard], loadChildren: () => import('./task/task.routes').then(m => m.routes) },
    { path: '**', redirectTo: 'home' }
];
