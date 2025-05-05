import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'cgyir-list-by-category',
  imports: [RouterLink],
  templateUrl: './list-by-category.component.html',
  styleUrl: './list-by-category.component.scss'
})
export class ListByCategoryComponent {
category: string | null = null;
activatedRoute: ActivatedRoute = inject(ActivatedRoute);
taskService: TaskService = inject(TaskService);
tasks:Task[] = [];

ngOnInit(): void {
  this.category = this.activatedRoute.snapshot.paramMap.get('category');
  this.taskService.tasks().forEach((task: Task) => {
    if (task.category === this.category) {
      this.tasks.push(task);
    }
  });
}
}
