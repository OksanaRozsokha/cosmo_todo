import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../../../domain/servicies/auth-service/auth.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserEntity } from 'src/app/domain/entities/user-entity/user.entity';
import { of, Observable } from 'rxjs';
import { RouterConstants } from 'src/app/common/constants/router.constants';

let mockUser = new UserEntity('uid', 'Oksana Rozsokha', 'email@email.com', 'http:/photourl', true);

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuthService: jasmine.SpyObj<AuthService> = jasmine.createSpyObj<AuthService>('mockAuthService', ['getSignInUser$']);
  let mockRouter: jasmine.SpyObj<Router> = jasmine.createSpyObj<Router>('mockRouter', ['navigate']);
  let mockRouteSnapshot: any = { snapshot: {}};
  let mockRouteStateSnapshot: any = { snapshot: {}, url: '/sign-in'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {provide: AuthService, useValue: mockAuthService},
        {provide: Router, useValue: mockRouter}
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });


  it('canActivate should return true with signedInUser', done => {
    mockAuthService.getSignInUser$.and.returnValue(of(mockUser));
    let canActivate$: Observable<boolean> = guard.canActivate(mockRouteSnapshot, mockRouteStateSnapshot) as Observable<boolean>;
    canActivate$.subscribe(result => {
      expect(result).toBeTrue();
      done();
    })
  });

  it('canActivate should return false and redirect to sign-in page with not signedInUser', done => {
    mockAuthService.getSignInUser$.and.returnValue(of(null));
    let canActivate$: Observable<boolean> = guard.canActivate(mockRouteSnapshot, mockRouteStateSnapshot) as Observable<boolean>;
    canActivate$.subscribe(result => {
      expect(mockRouter.navigate).toHaveBeenCalledWith([`/${RouterConstants.signInPage}`])
      expect(result).toBeFalse();
      done();
    })
  });

});
