import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskTitlePipe } from '../../pipes/task-title.pipe';
import { TaskDirective } from '../../directives/task.directive';

@Component({
  selector: 'cgyir-list',
  imports: [TaskTitlePipe,TaskDirective],
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
  console.log(this.taskService.tasks())
}
}
