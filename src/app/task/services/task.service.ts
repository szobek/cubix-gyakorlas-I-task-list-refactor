import { Injectable, signal, WritableSignal } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
private _tasks: WritableSignal<Task[]> = signal<Task[]>([])
  constructor() {
    this.loadTasksFromLocalStorage();
   }
  get tasks() {
    return this._tasks;
  }
  createTask(task: Task) {
    const tasks = this._tasks();
    task.id = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    this._tasks.update(tasks => [...tasks, task]);
    this.saveTaskToLocalStorage();
  }

  saveTaskToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this._tasks()));
  }
  loadTasksFromLocalStorage() {
    this._tasks.set(JSON.parse(localStorage.getItem('tasks') || '[]'));
  }
}
