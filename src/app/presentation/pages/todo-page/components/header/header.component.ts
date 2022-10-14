import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../../../../domain/servicies/auth-service/auth.service';
import { UserEntity } from '../../../../../domain/entities/user-entity/user.entity';
import { Observable } from 'rxjs';
import { RouterConstants } from '../../../../../common/constants/router.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <header class="cosmo-header">
      <div class="container content-wrapper grid-row grid-row--space-between-h grid-row--center-v">
      <ul data-menu-test *ngIf="isUserMenuVisible" class="cosmo-menu">
        <li class="cosmo-menu__item">
          <button data-sign-out-button-test class="cosmo-menu__item-btn text--thin" (click)="signOut()">
          <app-icon [icon]="iconName" [fill]="iconColor"  [width]="20" [height]="15"></app-icon>Sign Out</button>
        </li>
      </ul>
      <div class="cosmo-greeting-wrapper">
        <p class="cosmo-greeting mr-15" data-element-test>Hey, <span class="text--bold">{{ (user$ | async)?.fullName }}</span> 🙃</p>
        <p class="cosmo-greeting mr-10">Welcome to</p>
        <h1 class="cosmo-logo">CosmoTodo</h1>
      </div>

      <button data-button-test class="cosmo-avatar" [id]="avatarWrapperId">
        <img data-image-avatar-test class="cosmo-avatar__img" [id]="avatarImgId" src="{{ (user$ | async)?.photoUrl}} " alt="user avatar">
      </button>

      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  user$: Observable<UserEntity|null> = this.authService.getSignInUser$();
  isUserMenuVisible: boolean = false;
  signInPageRoute: string = RouterConstants.signInPage;
  iconColor: string = '#fff'
  iconName: string = 'sign-out';
  avatarWrapperId: string = 'avatarWrapper';
  avatarImgId: string = 'avatarImg';

  @HostListener('document:click', ['$event'])
    documentClick(event: MouseEvent) {
      let target: HTMLElement = event.target as HTMLElement;
      if (target.id === this.avatarWrapperId || target.id === this.avatarImgId) {
        this.toggleUserMenuVisibility(true);
      } else {
        this.toggleUserMenuVisibility(false);
      }
    }

  constructor(private authService: AuthService,
              private router: Router
    ) { }


  signOut(): void {
    this.authService.signOut().then(_ => {
      this.toggleUserMenuVisibility(false);
      this.router.navigate([`/${RouterConstants.signInPage}`]);
    });
  }

  toggleUserMenuVisibility(isVisible: boolean) {
    this.isUserMenuVisible = isVisible;
  }
}
