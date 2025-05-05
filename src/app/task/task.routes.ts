import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { TaskItemViewComponent } from './components/task-item-view/task-item-view.component';
import { ListByCategoryComponent } from './components/list-by-category/list-by-category.component';
export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'create', component: CreateComponent},
    { path: 'list', component: ListComponent},
    { path: ':id', component: TaskItemViewComponent},
    {path: 'category/:category', component: ListByCategoryComponent},

];