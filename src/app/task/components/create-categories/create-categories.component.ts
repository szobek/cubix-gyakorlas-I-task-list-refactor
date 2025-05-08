import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'cgyir-create-categories',
  imports: [FormsModule],
  templateUrl: './create-categories.component.html',
  styleUrl: './create-categories.component.scss',
})
export class CreateCategoriesComponent {
  taskService:TaskService=inject(TaskService);
  router:Router=inject(Router);

  category:Category={id:0,name:''}

  createCategory(): void {
    if (!this.category.name) {
      alert('Please enter a category name.');
      return;
    }
    if (this.category.name.length < 3) {
      alert('Category name must be at least 3 characters long.');
      return;
    }
    if (this.category.name.length > 20) {
      alert('Category name must be less than 20 characters long.');
      return;
    }
    if (!/^[a-zA-Z ]+$/.test(this.category.name)) {
      alert('Category name can only contain letters and spaces.');
      return;
    }
    if (this.category.name.trim() === '') {
      alert('Category name cannot be empty or whitespace.');
      return;
    }
    if(this.taskService.createCategory(this.category)){
      this.category = { name: '' } as Category;
      const url ="tasks/categories/list";
      this.router.navigateByUrl(url);
    }
    else{
      console.error('Error creating category');
      alert('Error creating category');
    }
  }
}
