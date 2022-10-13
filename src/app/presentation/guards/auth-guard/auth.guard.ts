import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/domain/servicies/auth-service/auth.service';
import { UserEntity } from 'src/app/domain/entities/user-entity/user.entity';
import { RouterConstants } from 'src/app/common/constants/router.constants';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authServise: AuthService,
              private router: Router) {}

  private _isUserSignedIn$(): Observable<boolean> {
    return this.authServise.getSignInUser$().pipe(
      map((user: UserEntity|null) => {
        let isSignedIn: boolean = user != null && user.uid.trim().length > 0 && user.emailVerified;
        return isSignedIn ? true : this._onNotSignedInUser();
      })
    )
  }

  private _onNotSignedInUser(): false {
    this.router.navigate([`/${RouterConstants.signInPage}`]);
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this._isUserSignedIn$().subscribe(isIt => {console.log('ISUSER_SIGNED_IN', isIt);
      })

    return this._isUserSignedIn$();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._isUserSignedIn$();
  }
}
