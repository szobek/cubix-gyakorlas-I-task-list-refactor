import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly router=inject(Router);

  private _tasks: WritableSignal<Task[]>=signal<Task[]>([]);
  private _categories: WritableSignal<Category[]>=signal<Category[]>([]);
  private readonly _CATEGORY_KEY='categories';
  private readonly _TASK_KEY='tasks';
  private readonly _MESSAGES={
    default_category_delete: 'You cannot delete the default category.',
  };
  private readonly _CONFIRMS={
    delete_category: 'Are you sure you want to delete this category?',
    delete_task: 'Are you sure you want to delete this task?',
    update_category: 'Are you sure you want to update this category?',
    update_task: 'Are you sure you want to update this task?',
  };
  private readonly _DEFAULT_CATEGORY:string='[{"name": "Default", "id": 1}]';
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

  updateTask(task: Task): boolean {
    if (!confirm(this._CONFIRMS.update_task)) {
      return false;
    }
    if (
      !task ||
      !task.title ||
      !task.description ||
      task.title.length>20 ||
      task.description.length>200 ||
      task.title.trim()==='' ||
      task.description.trim()===''
    ) {
      return false;
    }
    try {
      this._tasks.update((tasks) =>
        tasks.map((t) => {
          if (t.id===task.id) {
            return {
              ...t,
              title: task.title,
              description: task.description,
              important: Boolean(task.important),
              category: task.category,
            };
          }
          return t;
        })
      );
      this.saveTaskToLocalStorage();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  createTask(task: Task): boolean {
    if (!task) {return false};
    try {
      const tasks=this._tasks();
      task.id=tasks.length ? Math.max(...tasks.map((t) => t.id))+1 : 1;
      this._tasks.update((tasks) => [...tasks, task]);
      this.saveTaskToLocalStorage();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  createCategory(category: Category): boolean {
    if (!category) return false;
    const categories=this._categories();
    if (categories.some((c) => c.name===category.name)) {
      return false;
    }
    try {
      category.id=categories.length
        ? Math.max(...categories.map((c) => c.id)) + 1
        : 1;
      this._categories.update((categories) => [...categories, category]);
      this.saveCategoriesToLocalStorage();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  saveTaskToLocalStorage(): void {
    localStorage.setItem(this._TASK_KEY, JSON.stringify(this._tasks()));
  }

  loadTasksFromLocalStorage(): void {
    this._tasks.set(JSON.parse(localStorage.getItem('tasks') || '[]'));
  }

  modifyTaskComplete(task: Task): void {
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

  deleteTaskById(id: number): void {
    if (!id) {
      return;
    }
    if (!confirm(this._CONFIRMS.delete_task)) {
      return;
    }
    this._tasks.update((tasks) => tasks.filter((t) => t.id!==id));
    this.saveTaskToLocalStorage();
  }

  saveCategoriesToLocalStorage(): void {
    localStorage.setItem(
      this._CATEGORY_KEY,
      JSON.stringify(this._categories())
    );
  }

  loadCategoriesFromLocalStorage(): void {
    this._categories.set(
      JSON.parse(
        localStorage.getItem(this._CATEGORY_KEY) || this._DEFAULT_CATEGORY
      )
    );
  }

  deleteCategoryById(id: number): void {
    let lastCategoryName='';
    if (!id) {
      return;
    }
    if (!confirm(this._CONFIRMS.delete_category)) {
      return;
    }
    if (id===1) {
      alert(this._MESSAGES.default_category_delete);
      return;
    }
    lastCategoryName=this.getCategoryById(id)?.name || '';
    this.tasks.update((tasks) =>
      tasks.map((t) => {
        if (t.category === lastCategoryName) {
          return { ...t, category: 'Default' };
        }
        return t;
      })
    );
    this._categories.update((categories) =>
      categories.filter((c) => c.id!==id)
    );
    this.saveCategoriesToLocalStorage();
    this.saveTaskToLocalStorage();
  }

  updateCategory(lastCategory: string, category: Category): void {
    try {
      if (!confirm(this._CONFIRMS.update_category)) {
        return;
      }
      this._categories.update((categories) =>
        categories.map((c) => {
          if (c.id===category.id) {
            return { ...c, name: category.name };
          }
          return c;
        })
      );
      this.tasks.update((tasks) =>
        tasks.map((t) => {
          if (t.category===lastCategory) {
            return { ...t, category: category.name };
          }
          return t;
        })
      );
      this.saveTaskToLocalStorage();
      this.saveCategoriesToLocalStorage();
      this.router.navigate(['/tasks/categories/list']);
    } catch (e) {
      console.error(e);
    }
  }

  getCategoryById(id: number): Category | undefined {
    return this._categories().find((category) => category.id===id);
  }

  getTaskById(id: number): Task | undefined {
    return this._tasks().find((task) => task.id===id);
  }
  getImportantTasksByCategory(category: string): Task[] {
    return this._tasks().filter((task) => {
      task.category===category && task.important;
    });
  }
}
