import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RouterConstants } from 'src/app/common/constants/router.constants';
import { UserEntity } from 'src/app/domain/entities/user-entity/user.entity';
import { AuthService } from 'src/app/domain/servicies/auth-service/auth.service';

import { NotAuthGuard } from './not-auth.guard';

let mockUser = new UserEntity('uid', 'Oksana Rozsokha', 'email@email.com', 'http:/photourl', true);

describe('NotAuthGuard', () => {
  let guard: NotAuthGuard;
  let mockAuthService: jasmine.SpyObj<AuthService> = jasmine.createSpyObj<AuthService>('mockAuthService', ['getSignInUser$']);
  let mockRouter: jasmine.SpyObj<Router> = jasmine.createSpyObj<Router>('mockRouter', ['navigate']);
  let mockRouteSnapshot: any = { snapshot: {}};
  let mockRouteStateSnapshot: any = { snapshot: {}, url: '/sign-in'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotAuthGuard,
        {provide: AuthService, useValue: mockAuthService},
        {provide: Router, useValue: mockRouter}
      ]
    });
    guard = TestBed.inject(NotAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate should return true with not signedInUser', done => {
    mockAuthService.getSignInUser$.and.returnValue(of(null));
    let canActivate$: Observable<boolean> = guard.canActivate(mockRouteSnapshot, mockRouteStateSnapshot) as Observable<boolean>;
    canActivate$.subscribe(result => {
      expect(result).toBeTrue();
      done();
    })
  });

  it('canActivate should return false and redirect to todo-board page with signedInUser', done => {
    mockAuthService.getSignInUser$.and.returnValue(of(mockUser));
    let canActivate$: Observable<boolean> = guard.canActivate(mockRouteSnapshot, mockRouteStateSnapshot) as Observable<boolean>;
    canActivate$.subscribe(result => {
      expect(mockRouter.navigate).toHaveBeenCalledWith([`/${RouterConstants.todoBoardPage}`]);
      expect(result).toBeFalse();
      done();
    })
  });
});


