import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'cgyir-creatw-categories',
  imports: [FormsModule],
  templateUrl: './create-categories.component.html',
  styleUrl: './create-categories.component.scss',
})
export class CreateCategoriesComponent {
  taskService: TaskService = inject(TaskService);
  router: Router = inject(Router);
  category:Category = { name: '' } as Category;
  createCategory(): void {
    this.taskService.createCategory(this.category).then(() => {
      this.category = { name: '' } as Category;
    }).then(() => {
      const url ="tasks/categories/list";
      this.router.navigateByUrl(url);
    }).catch((error) => {
      console.error('Error creating category:', error);
      alert(error);
    });
  }
}
