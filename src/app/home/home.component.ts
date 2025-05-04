import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'cgyir-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  authService: AuthService=inject(AuthService);
  router: Router=inject(Router);
  constructor() {
    this.authService.loadUser();
    if (this.authService.username()===undefined) {
      this.router.navigate(['/login']);
    }
  }
}
