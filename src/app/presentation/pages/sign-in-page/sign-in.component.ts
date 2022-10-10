import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../domain/servicies/auth-service/auth.service';

@Component({
  template: `
  <section class="cosmo-sign-in">
    <div class="cosmo-intro mb-40">
      <h1 class="cosmo-title mb-20">CosmoTodo</h1>
      <p class="text cosmo-text">Your awesome tasks manager</p>
    </div>

    <button class="cosmo-btn" (click)="onSignIn()">
      <app-icon [icon]="iconName" [width]="35" [height]="35" class="mr-10"></app-icon>
      Sign In with Google</button>

  </section>

  `,
  styleUrls: ['./sign-in.component.scss']
})
export class SignInPage {
  iconName: string = 'google';
  constructor(public authService: AuthService, private router: Router) { }



  onSignIn(): void {
    this.authService.signInWithGoogle().then(((_) => {
      this.router.navigate(['/todo-board']);
    }))
  }

}
