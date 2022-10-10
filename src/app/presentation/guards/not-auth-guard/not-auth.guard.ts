import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RouterConstants } from 'src/app/common/constants/router.constants';
import { UserEntity } from 'src/app/domain/entities/user.entity';
import { AuthService } from 'src/app/domain/servicies/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class NotAuthGuard implements CanActivate {
  constructor(private authServise: AuthService,
    private router: Router) {}

  private _isUserNotSignedIn$(): Observable<boolean> {
    return this.authServise.getSignInUser$().pipe(
      map((user: UserEntity|null) => {
        let isSignedIn: boolean = user != null && user.uid.trim().length > 0 && user.emailVerified;
        return !isSignedIn ? true : this._onSignedInUser();
      })
    )
  }

  private _onSignedInUser(): false {
    this.router.navigate([`/${RouterConstants.todoBoardPage}`]);
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._isUserNotSignedIn$();
  }
}
