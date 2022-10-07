import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../domain/servicies/auth-service/auth.service';

@Component({
  template: `
    <button (click)="onSignIn()">Sign In with Google</button>
  `,
  styleUrls: ['./sign-in.component.scss']
})
export class SignInPage implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignIn(): void {
    this.authService.signInWithGoogle().then(((_) => {
      this.router.navigate(['/todo-board']);
    }))
  }

}
