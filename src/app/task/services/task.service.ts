import { Injectable, signal, WritableSignal } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks: WritableSignal<Task[]> = signal<Task[]>([]);
  constructor() {
    this.loadTasksFromLocalStorage();
  }
  get tasks() {
    return this._tasks;
  }
  createTask(task: Task) {
    return new Promise<void>((resolve, reject) => {
      const tasks = this._tasks();
      task.id = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
      this._tasks.update((tasks) => [...tasks, task]);
      this.saveTaskToLocalStorage();
      resolve();
    });
  }

  saveTaskToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this._tasks()));
  }
  loadTasksFromLocalStorage() {
    this._tasks.set(JSON.parse(localStorage.getItem('tasks') || '[]'));
  }
  modifyTaskComplete(task: Task) {
    this._tasks.update((tasks) =>
      tasks.map((t) => {
        if (t.id === task.id) {
          return { ...t, completed: !t.completed };
        }
        return t;
      })
    );
    this.saveTaskToLocalStorage();
  }
  deleteTaskById(id: number) {
    if (!id) return;
    if(!confirm('Are you sure you want to delete this task?')) return;
    this._tasks.update((tasks) => tasks.filter((t) => t.id !== id));
    this.saveTaskToLocalStorage();
  }
}
