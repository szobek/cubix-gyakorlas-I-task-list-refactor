import { Component, inject } from '@angular/core';
import { Task } from '../../models/task';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cgyir-create',
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  taskService: TaskService = inject(TaskService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  task: Task = {
    id: 0,
    title: '',
    description: '',
    user: this.authService.username()?.toString() || '',
    completed: false,
  };
  saveTask() {
    if (!this.task.title || !this.task.description) return;
    if (this.task.title.length > 20 || this.task.description.length > 200)
      return;
    if (this.task.title.trim() === '' || this.task.description.trim() === '')
      return;
    const task = { ...this.task };
    this.taskService.createTask(task).then(() => {
      this.router.navigateByUrl('/tasks/list');
    });
    this.task.title = '';
    this.task.description = '';
  }
}
