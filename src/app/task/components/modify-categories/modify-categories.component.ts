import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Category } from '../../models/category.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cgyir-modify-categories',
  imports: [FormsModule],
  templateUrl: './modify-categories.component.html',
  styleUrl: './modify-categories.component.scss'
})
export class ModifyCategoriesComponent {
  protected readonly taskService: TaskService=inject(TaskService);
  private readonly activatedRoute: ActivatedRoute=inject(ActivatedRoute);
  id: string | null=null;
  currentCategory: Category | null=null;
  lastCategoryName: string ='';
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('category');
    this.taskService.categories().forEach((category: Category) => {
      if (category.id===Number(this.id)) {
        this.currentCategory=category;
        this.lastCategoryName=category.name;
      }
    });
  }
}
