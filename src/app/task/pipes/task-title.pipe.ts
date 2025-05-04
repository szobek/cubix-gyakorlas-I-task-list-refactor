import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskTitle'
})
export class TaskTitlePipe implements PipeTransform {

  transform(title: string,  ...args: unknown[]): unknown {
    return `${args[0]}: ${title}`;
  }

}
