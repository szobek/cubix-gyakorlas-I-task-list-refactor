import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Task } from '../models/task';
import { Category } from '../models/category.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
updateTask(task: Task) {
  this._tasks.update((tasks) =>
    tasks.map((t) => {
      if (t.id===task.id) {
        return { ...t, 
          title: task.title, 
          description: task.description, 
          important: task.important, 
          category: task.category 
        };
      }
      return t;
    })
  );
    this.saveTaskToLocalStorage();
}
private readonly router=inject(Router);
  private _tasks: WritableSignal<Task[]>=signal<Task[]>([]);
  private _categories: WritableSignal<Category[]>=signal<Category[]>([]);
  constructor() {
    this.loadTasksFromLocalStorage();
    this.loadCategoriesFromLocalStorage();
  }
  get tasks(): WritableSignal<Task[]> {
    return this._tasks;
  }
  get categories(): WritableSignal<Category[]> {
    return this._categories;
  }
  createTask(task: Task): Promise<void> {
    return new Promise<void>((resolve) => {
      const tasks = this._tasks();
      task.id = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
      this._tasks.update((tasks) => [...tasks, task]);
      this.saveTaskToLocalStorage();
      resolve();
    });
  }
  createCategory(category: Category): Promise<void> {
    return new Promise<void>((resolve,reject) => {
      const categories = this._categories();
      category.id = categories.length ? Math.max(...categories.map((c) => c.id)) + 1 : 1;
      if (categories.some((c) => c.name === category.name)) {
        reject('Category already exists');
        return;
      }
      this._categories.update((categories) => [...categories, category]);
      this.saveCategoriesToLocalStorage();
      resolve();
    });
  }
  saveTaskToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this._tasks()));
  }
  loadTasksFromLocalStorage(): void {
    this._tasks.set(JSON.parse(localStorage.getItem('tasks') || '[]'));
  }
  modifyTaskComplete(task: Task): void {
    this._tasks.update((tasks) =>
      tasks.map((t) => {
        if (t.id===task.id) {
          return { ...t, completed:!t.completed };
        }
        return t;
      })
    );
    this.saveTaskToLocalStorage();
  }
  deleteTaskById(id: number): void {
    if (!id) return;
    if(!confirm('Are you sure you want to delete this task?')) return;
    this._tasks.update((tasks) => tasks.filter((t) => t.id!==id));
    this.saveTaskToLocalStorage();
  }
  saveCategoriesToLocalStorage(): void {
    localStorage.setItem('categories', JSON.stringify(this._categories()));
  }
  loadCategoriesFromLocalStorage(): void {
    this._categories.set(JSON.parse(localStorage.getItem('categories') || '[{"name": "Default", "id": 1}]'));
  }
  deleteCategoryById(id: number): void {
    let lastCategoryName='';
    if (!id) return;
    if(!confirm('Are you sure you want to delete this category?')) return;
    if(id===1) {
      alert('You cannot delete the default category.');
      return;
    }
    this.categories().forEach((category: Category) => {
      if (category.id===id) {
        lastCategoryName=category.name;
      }
    });
    this.tasks.update((tasks) =>
      tasks.map((t) => {
        if (t.category===lastCategoryName) {
          return { ...t, category: 'Default' };
        }
        return t;
      })
    );
    this._categories.update((categories) => categories.filter((c) => c.id!==id));
    this.saveCategoriesToLocalStorage();
    this.saveTaskToLocalStorage();
    this.loadCategoriesFromLocalStorage();
    this.loadTasksFromLocalStorage();
  }

  updateCategory(lastCategory:string,category: Category) {
    try{
      this._categories.update((categories) =>
        categories.map((c) => {
          if (c.id===category.id) {
            return { ...c, name: category.name };
          }
          return c;
        })
      );
      this.saveCategoriesToLocalStorage();
      this.loadCategoriesFromLocalStorage();
      this.tasks.update((tasks) =>
        tasks.map((t) => {
          if (t.category===lastCategory) {
            return { ...t, category: category.name };
          }
          return t;
        })
      );
      this.saveTaskToLocalStorage();
      this.loadTasksFromLocalStorage();
      this.router.navigate(['/tasks/categories/list']);
      
    }catch(e) {
      console.error(e);
    }
    
  }
}
