import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _username: WritableSignal<string | undefined>=signal(undefined);
  private readonly router=inject(Router);
  constructor() {
    this.loadUser();
  }
  loadUser() {
    if (this._username()===undefined) {
      this._username.set(localStorage.getItem('username') || undefined);
    }
  }
  get username() {
    return this._username;
  }
  login(username: string) {
    if (username.length > 0) {
      localStorage.setItem('username', username);
      this._username.set(username);
      this.router.navigate(['']);
    }
  }
  logout() {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
    this._username.set(undefined);
  }
}
