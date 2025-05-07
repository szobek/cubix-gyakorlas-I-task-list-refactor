import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { TaskItemViewComponent } from './components/task-item-view/task-item-view.component';
import { ListByCategoryComponent } from './components/list-by-category/list-by-category.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { CreateCategoriesComponent } from './components/create-categories/create-categories.component';
import { ModifyCategoriesComponent } from './components/modify-categories/modify-categories.component';
export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'create', component: CreateComponent},
    { path: 'modify/:id', component: CreateComponent},
    { path: 'list', component: ListComponent},
    { path: ':id', component: TaskItemViewComponent},
    {path: 'categories/list', component: ListCategoriesComponent},
    {path: 'categories/create', component: CreateCategoriesComponent},
    {path: 'category/:category', component: ListByCategoryComponent},
    {path: 'category/modify/:category', component: ModifyCategoriesComponent},


];