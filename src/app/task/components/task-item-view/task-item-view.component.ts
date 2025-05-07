import { Component, inject } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cgyir-task-item-view',
  imports: [],
  templateUrl: './task-item-view.component.html',
  styleUrl: './task-item-view.component.scss',
})
export class TaskItemViewComponent {
  taskService: TaskService=inject(TaskService);
  activatedRoute: ActivatedRoute=inject(ActivatedRoute);
  id: string | null=null;
  currentTask: Task | null=null;
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.taskService.tasks().forEach((task: Task) => {
      if (task.id===Number(this.id)) {
        this.currentTask=task;
      }
    });
  }
}
