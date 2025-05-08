import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cgyir-list-categories',
  imports: [RouterLink],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.scss',
})
export class ListCategoriesComponent {
  protected readonly taskService:TaskService=inject(TaskService);

  categories;
  
  constructor() {
    this.categories=computed(()=>
      this.taskService.categories().filter((category) => category.name !== '')
    );
  }
}
