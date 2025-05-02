import { Component, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'cgyir-home',
  imports: [NavComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  authService=inject(AuthService);
constructor() { 
  this.authService.loadUser();
  if(this.authService.username() === undefined){
    this.authService.router.navigate(['/login']);
  }
}

}
