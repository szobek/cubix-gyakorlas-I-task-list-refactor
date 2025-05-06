import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'cgyir-list-categories',
  imports: [],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.scss',
})
export class ListCategoriesComponent {
  taskService:TaskService=inject(TaskService);
  categories;
  constructor() {
    this.categories=this.taskService.categories();
  }
}
