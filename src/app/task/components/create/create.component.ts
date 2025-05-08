import { Component, inject } from '@angular/core';
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
  task:Task={
    id: 0,
    title: '',
    description: '',
    user: this.authService.username()?.toString() || '',
    completed: false,
    category: this.categoryValues[0].name,
    important: false,
  };
  ngOnInit(){
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.currentTask=this.taskService.getTaskById(Number(this.id))
    if(this.currentTask!==undefined) {
      Object.assign(this.task,this.currentTask)
    }
    
  }
  saveTask() {
    if (!this.task.title||!this.task.description) return;
    if (this.task.title.length>20||this.task.description.length>200)
      return;
    if (this.task.title.trim()===''||this.task.description.trim()==='')
      return;
    const task = { ...this.task };
    if(this.taskService.createTask(task)){
      this.task.title='';
      this.task.description='';
      this.router.navigateByUrl('/tasks/list');
    }
  }
  updateTask() {
    if (!this.task.title||!this.task.description) return;
    if (this.task.title.length>20||this.task.description.length>200)
      return;
    if (this.task.title.trim()===''||this.task.description.trim()==='')
      return;
    const task = { ...this.task };
    this.taskService.updateTask(task);
    this.router.navigateByUrl('/tasks/list');
    this.task.title='';
    this.task.description='';
  }
}
