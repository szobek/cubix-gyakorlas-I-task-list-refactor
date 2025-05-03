import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'cgyir-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  taskService:TaskService=inject(TaskService)
completedTasks=computed(()=>this.taskService.tasks().filter(task=>task.completed))
incompletedTasks=computed(()=>this.taskService.tasks().filter(task=>!task.completed))
}
