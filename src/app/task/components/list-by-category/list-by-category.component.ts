import { Component, computed, inject, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'cgyir-list-by-category',
  imports: [RouterLink],
  templateUrl: './list-by-category.component.html',
  styleUrl: './list-by-category.component.scss',
})
export class ListByCategoryComponent {
  category: string | null = null;
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly taskService: TaskService = inject(TaskService);
  private readonly tasks: Task[] = [];
  importantTasks;
  notImportantTasks;
  tasksCountSignal = computed(() => this.tasks.length);
  constructor() {
    this.importantTasks = computed(() =>
      this.tasks.filter((task) => task.important)
    );
    this.notImportantTasks = computed(() =>
      this.tasks.filter((task) => !task.important)
    );
  }
  get taskCount() {
    return this.tasksCountSignal() === 1
      ? '1 task'
      : `${this.tasksCountSignal()} tasks`;
  }
  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.paramMap.get('category');
    this.taskService.tasks().forEach((task: Task) => {
      if (task.category === this.category) {
        this.tasks.push(task);
      }
    });
  }
}
