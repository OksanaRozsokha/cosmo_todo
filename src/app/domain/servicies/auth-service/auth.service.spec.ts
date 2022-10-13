import { TestBed } from '@angular/core/testing';
import { UserEntity } from '../../../domain/entities/user-entity/user.entity';
import { AbstractAuthRepository } from '../../../domain/contracts/auth.repository';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthRepository } from 'src/app/data/repositiries/auth-repository/auth.repository';

const userEntity: UserEntity = new UserEntity('uid', 'Oksana Rozsokha', 'em@em', 'https://url', true);

describe('check AuthService', () => {
    let authService: AuthService;
    let mockAuthRepository: jasmine.SpyObj<AbstractAuthRepository> = jasmine.createSpyObj<AbstractAuthRepository>('mockAuthRepository', ['signInWithGoogle', 'signOut', 'getSignedInUser$'],)

    beforeEach( () => {
        TestBed.configureTestingModule({
            providers: [
              AuthService,
              {provide: AbstractAuthRepository, useValue: mockAuthRepository}
            ]
        });

        authService = TestBed.inject(AuthService);

    });

    it('should be created', () => {
        expect(authService).toBeTruthy();
    });

    it ('getSignedInUser$ should return UserEntity in subscription', done => {
      mockAuthRepository.getSignedInUser$.and.returnValue(of(userEntity));

      authService.getSignInUser$().subscribe(result => {
            expect(result).toEqual(userEntity);
            done();
        });
    });

    it('check signInWithGoogle', () => {
        let mockedSignInMethod = mockAuthRepository.signInWithGoogle;
        mockedSignInMethod.calls.reset();
        authService.signInWithGoogle();
        expect(mockedSignInMethod).toHaveBeenCalledTimes(1);
    });

    it('check signOut', () => {
        let mockedSignOutMethod = mockAuthRepository.signOut;
        mockedSignOutMethod.calls.reset();
        authService.signOut();
        expect(mockedSignOutMethod).toHaveBeenCalledTimes(1);
    });
});
