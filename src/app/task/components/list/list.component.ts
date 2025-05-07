import { Component, computed, HostListener, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'cgyir-list',
  imports: [TaskItemComponent,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  taskService: TaskService = inject(TaskService);
  router:Router=inject(Router);
  categoryValues = this.taskService.categories();
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
  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.code === 'KeyN' && event.altKey) {
      this.router.navigateByUrl('/tasks/create');
    }
  }
  
}
