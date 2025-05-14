import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cgyir-create',
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  taskService: TaskService=inject(TaskService);
  authService: AuthService=inject(AuthService);
  activatedRoute: ActivatedRoute=inject(ActivatedRoute);
  router: Router=inject(Router);

  categoryValues=this.taskService.categories();
  id:string|null=null
  currentTask:Task|undefined=undefined;
  protected task:WritableSignal<Task>=signal<Task>({
    id: 0,
    title: '',
    description: '',
    user: this.authService.username()?.toString() || '',
    completed: false,
    category: this.categoryValues[0].name,
    important: false,
  });

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.currentTask=this.taskService.getTaskById(Number(this.id))
    if(this.currentTask!==undefined) {
      this.task.update((task) => {
        return { ...task, ...this.currentTask };
      }); 
    }
  }
  
  saveTask() {
    const task = { ...this.task() };
    if(this.checkTask(task)){
      return
    }
    if(this.taskService.createTask(task)){
      this.router.navigateByUrl('/tasks/list');
      this.resetTask()
    }
  }
  updateTask() {
    const task = { ...this.task() };
    if(this.checkTask(task)){
      return
    }
    if(this.taskService.updateTask(task)){
      this.router.navigateByUrl('/tasks/list');
      this.resetTask()
    }
  }
  
  checkTask(task:Task):boolean{
    return (task.title.length>20||task.title.length===0||task.title.length<3||
    task.description.length>200||
    task.title.trim()===''||
    task.description.trim()==='') ;

  }
  
  resetTask() {
    this.task().title='';
    this.task().description='';
  }
  
}
