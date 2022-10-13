import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { of } from 'rxjs';
import { AngularFireAuthFacade } from './angular-fire-auth.facade';
import { UserEntity } from '../../../domain/entities/user-entity/user.entity';
import { UserFactory } from '../../../domain/entities/factories/user-factory/user.factory';

let fireAuthUserStub: User = {
  displayName: 'Oksana Rozsokha',
  email: 'email@email.com',
  phoneNumber: '',
  photoURL: 'http:/photourl',
  providerId: '',
  uid: 'uid',
  emailVerified: true,
  isAnonymous: false,
  metadata: {
      creationTime: '',
      lastSignInTime: '',
  },
  providerData: [
      {
          displayName: 'Oksana Rozsokha',
          email: 'email@email.com',
          phoneNumber: '',
          photoURL: 'http:/photourl',
          providerId: '',
          uid: 'uid',
      }
  ],
  refreshToken: '',
  tenantId: '',
  delete: () => Promise.resolve(),
  getIdToken: (forceRefresh: boolean) => Promise.resolve(''),
  getIdTokenResult: (forceRefresh: boolean) => Promise.resolve({
      authTime: '',
      expirationTime: '',
      issuedAtTime: '',
      signInProvider: '',
      signInSecondFactor: '',
      token: '',
      claims: {
          key: ''
      },
  }),
  reload: () => Promise.resolve(),
  toJSON: () => Object
}


describe('check AuthFacade', () => {
  let authFacade: AngularFireAuthFacade;
  const mockFireAuth: jasmine.SpyObj<AngularFireAuth> = jasmine.createSpyObj<AngularFireAuth>('mockFireAuth', ['signInWithPopup', 'signOut'], ['authState']);
  const mockUserFctory: jasmine.SpyObj<UserFactory> = jasmine.createSpyObj<UserFactory>('mockUserFactory', ['create']);

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [AngularFireAuthFacade,
            {provide: AngularFireAuth, useValue: mockFireAuth}
        ]
    });

    authFacade = TestBed.inject(AngularFireAuthFacade);
  });

  it('should be created', () => {
    expect(authFacade).toBeTruthy();
  });

  it('signInWithPopup of AngularFireAuth was called in signInWithGoogle()', () => {
    let mockedSignInMethod = mockFireAuth.signInWithPopup;
    mockedSignInMethod.calls.reset();
    mockedSignInMethod.and.resolveTo();
    authFacade.signInWithGoogle();
    expect(mockedSignInMethod).toHaveBeenCalledTimes(1);
  })

  it('signOut of AngularFireAuth was called in signOut()', () => {
    let mockedSignOutMethod = mockFireAuth.signOut;
    mockedSignOutMethod.calls.reset();
    mockedSignOutMethod.and.resolveTo();
    authFacade.signOut();
    expect(mockedSignOutMethod).toHaveBeenCalledTimes(1);
  })

  it('authFacade.getSignedInUser$() return UserEntity in subscription', done => {
    // @ts-ignore
    Object.getOwnPropertyDescriptor(mockFireAuth, 'authState')?.get?.and.returnValue(of(fireAuthUserStub));

    authFacade.getSignedInUser$().subscribe(result => {
      let mockCreateUserEntityMethod = mockUserFctory.create;
      mockCreateUserEntityMethod.and.returnValue(new UserEntity('uid', 'Oksana Rozsokha', 'email@email.com', 'http:/photourl', true));
      expect(result).toBeInstanceOf(UserEntity);
      done();
    });
  });

  it('authFacade.getSignedInUser$() return null in subscription', done => {
    // @ts-ignore
    Object.getOwnPropertyDescriptor(mockFireAuth, 'authState')?.get?.and.returnValue(of(null));

    authFacade.getSignedInUser$().subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });
});
