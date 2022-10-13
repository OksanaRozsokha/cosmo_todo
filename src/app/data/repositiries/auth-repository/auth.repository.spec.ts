import { TestBed } from '@angular/core/testing';
import { UserEntity } from '../../../domain/entities/user-entity/user.entity';
import { AbstractAuthRepository } from '../../../domain/contracts/auth.repository';
import { AuthRepository } from './auth.repository';
import { AngularFireAuthFacade } from '../../firebase-facade/auth-facade/angular-fire-auth.facade';
import { of } from 'rxjs';

const userEntity: UserEntity = new UserEntity('uid', 'Oksana Rozsokha', 'em@em', 'https://url', true);

describe('check AuthRepository', () => {
    let authRepository: AbstractAuthRepository;
    let mockAuthFacade: jasmine.SpyObj<AngularFireAuthFacade> = jasmine.createSpyObj<AngularFireAuthFacade>('mockAuthFacade', ['signInWithGoogle', 'signOut', 'getSignedInUser$'],)

    beforeEach( () => {
        TestBed.configureTestingModule({
            providers: [
                AuthRepository,
                {provide: AngularFireAuthFacade, useValue: mockAuthFacade }
            ]
        });

        authRepository = TestBed.inject(AuthRepository);

    });

    it('should be created', () => {
        expect(authRepository).toBeTruthy();
    });

    it('check signInWithGoogle', () => {
        let mockedSignInMethod = mockAuthFacade.signInWithGoogle;
        mockedSignInMethod.calls.reset();
        authRepository.signInWithGoogle();
        expect(mockedSignInMethod).toHaveBeenCalledTimes(1);
    });

    it('check signOut', () => {
        let mockedSignOutMethod = mockAuthFacade.signOut;
        mockedSignOutMethod.calls.reset();
        authRepository.signOut();
        expect(mockedSignOutMethod).toHaveBeenCalledTimes(1);
    });

    it ('getSignedInUser$ should return UserEntity in subscription', done => {
        mockAuthFacade.getSignedInUser$.and.returnValue(of(userEntity));

        authRepository.getSignedInUser$().subscribe(result => {
            expect(result).toEqual(userEntity);
            done();
        });
    });

    it('getSignedInUser$ should return null in subscription', done => {
        mockAuthFacade.getSignedInUser$.and.returnValue(of(null));

        authRepository.getSignedInUser$().subscribe(result => {
            expect(result).toBeNull();
            done();
        });
    })
});
