import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
authService=inject(AuthService);
protected username: string = '';

constructor() {
  if(this.authService.username() !== undefined){
    this.authService.router.navigate(['']);
  }
}
login(){
  this.authService.login(this.username);
  this.username = '';
}
}
