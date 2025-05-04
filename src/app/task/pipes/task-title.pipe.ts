import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskTitle'
})
export class TaskTitlePipe implements PipeTransform {

  transform(title: string,  prefix: string): string {
    return `${prefix}: ${title}`;
  }

}
