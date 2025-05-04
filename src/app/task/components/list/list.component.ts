import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskTitlePipe } from '../../pipes/task-title.pipe';

@Component({
  selector: 'cgyir-list',
  imports: [TaskTitlePipe],
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
