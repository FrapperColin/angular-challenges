import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <p>User is not Logged In</p>
    <button app-button routerLink="/">Logout</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoUserDashboardComponent {}
