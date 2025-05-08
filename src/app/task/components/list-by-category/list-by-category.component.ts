import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
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
  importantTasks: WritableSignal<Task[]>=signal<Task[]>([]);
  notImportantTasks: WritableSignal<Task[]>=signal<Task[]>([]);
  tasksCountSignal = computed(() => {
    return this.importantTasks().length + this.notImportantTasks().length;
  });
  get taskCount() {
    return this.tasksCountSignal() === 1
      ? '1 task'
      : `${this.tasksCountSignal()} tasks`;
  }
  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.paramMap.get('category');
    this.importantTasks.set(
     this.taskService.tasks().filter((task) => task.important && task.category === this.category)
    )
    this.notImportantTasks.set(
     this.taskService.tasks().filter((task) => !task.important && task.category === this.category)
    )
  }
}
