import { Component } from '@angular/core';
import { NavComponent } from '../app/nav/nav.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cgyir-app-old',
  imports: [NavComponent,RouterModule],
  templateUrl: './app-old.component.html',
  styleUrl: './app-old.component.scss'
})
export class AppOldComponent {

}
