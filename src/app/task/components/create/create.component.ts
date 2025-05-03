import { Component, inject } from '@angular/core';
import { Task } from '../../models/task';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'cgyir-create',
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  taskService: TaskService = inject(TaskService);
  authService: AuthService = inject(AuthService);
  task: Task = {
    id: 0,
    title: '',
    description: '',
    user: this.authService.username()?.toString() || '',
    completed: false,
  };
  saveTask() {
    this.taskService.createTask(this.task);
    this.task.title = '';
    this.task.description = '';
  }
}
