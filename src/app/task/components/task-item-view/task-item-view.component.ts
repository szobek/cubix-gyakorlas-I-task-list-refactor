import { Component, inject } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cgyir-task-item-view',
  templateUrl: './task-item-view.component.html',
  styleUrl: './task-item-view.component.scss',
})
export class TaskItemViewComponent {
  taskService: TaskService=inject(TaskService);
  activatedRoute: ActivatedRoute=inject(ActivatedRoute);

  id: string | null=null;
  currentTask: Task | undefined=undefined;

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    this.currentTask=this.taskService.getTaskById(Number(this.id))
  }
}
