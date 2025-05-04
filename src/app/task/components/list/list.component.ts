import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskDirective } from '../../directives/task.directive';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'cgyir-list',
  imports: [TaskItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  taskService:TaskService=inject(TaskService)
  incompletedTasks
  completedTasks
  constructor() {
    this.completedTasks=computed(()=>this.taskService.tasks().filter(task=>task.completed))
    this.incompletedTasks=computed(()=>this.taskService.tasks().filter(task=>!task.completed))
}
}
