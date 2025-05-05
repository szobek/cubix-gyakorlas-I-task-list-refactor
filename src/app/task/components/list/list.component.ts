import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Categories } from '../../enums/categories.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cgyir-list',
  imports: [TaskItemComponent,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  taskService: TaskService = inject(TaskService);
  categoriesEnum = Categories;
  categoryValues = Object.values(Categories);
  incompletedTasks;
  completedTasks;
  constructor() {
    this.completedTasks = computed(() =>
      this.taskService.tasks().filter((task) => task.completed)
    );
    this.incompletedTasks = computed(() =>
      this.taskService.tasks().filter((task) => !task.completed)
    );
  }
}
