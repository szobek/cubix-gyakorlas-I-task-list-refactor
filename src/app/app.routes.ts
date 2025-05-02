import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    {path: 'tasks', loadChildren: () => import('./task/task.routes').then(m => m.routes) },
];
