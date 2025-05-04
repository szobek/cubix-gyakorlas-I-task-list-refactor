import { Component, inject, Input } from '@angular/core';
import { TaskTitlePipe } from '../../pipes/task-title.pipe';
import { Task } from '../../models/task';
import { TaskDirective } from '../../directives/task.directive';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'cgyir-task-item',
  imports: [TaskTitlePipe,TaskDirective],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
@Input() task?: Task;
taskService:TaskService=inject(TaskService)
}
