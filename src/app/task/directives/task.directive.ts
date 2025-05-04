import { Directive, ElementRef, inject, Input } from '@angular/core';
import { Task } from '../models/task';

@Directive({
  selector: '[cgyirTask]'
})
export class TaskDirective {
@Input('cgyirTask') task?:Task
private readonly el: ElementRef=inject(ElementRef)
  
   ngOnInit() {
    if (this.task?.completed) {
      this.el.nativeElement.style.backgroundColor = 'green';
    }else{
      this.el.nativeElement.style.backgroundColor = 'red';
    }
   }

}
