import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'cgyir-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly _menuOpen: WritableSignal<boolean> = signal(false);

  get menuOpen() {
    return this._menuOpen;
  }

  toggleMenu() {
    this._menuOpen.update((open) => !open);
  }

  ngOnInit() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
        this._menuOpen.update(() => false);
      });
  }
}
