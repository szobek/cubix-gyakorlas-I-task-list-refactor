import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService: AuthService=inject(AuthService);
  const router:Router=inject(Router);
  if (authService.username()===undefined) {
    router.navigate(['/login']);
  }
  return true;
};
