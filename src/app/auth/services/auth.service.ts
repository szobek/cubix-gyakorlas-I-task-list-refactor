import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _username: string | undefined = undefined;
router=inject(Router);
  constructor() { }

  login(){
    this._username = 'admin';
  }

  logout(){
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }
}
