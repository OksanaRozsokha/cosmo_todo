import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { map, Observable } from 'rxjs';
import { UserEntity } from 'src/app/domain/entities/user.entity';
import { UserFactory } from '../../domain/entities/factories/user.factory';

@Injectable({
    providedIn: 'root'
})

export class AngularFireAuthFacade {
    constructor(
        private auth: AngularFireAuth,
        private usesrFactory: UserFactory) {}

    private _userId?: string|null;

    public signInWithGoogle(): Promise<void> {
        return this.auth.signInWithPopup(new GoogleAuthProvider()).then(
            response => {
                console.log('SignInResult', response);
                console.log('User Id in Sin I WRAPPER', this._userId)
                this._userId = response.user?.uid ?? null;
                console.log('User Id in Sin I WRAPPER', this._userId)
            }
        )
    }

    public signOut(): Promise<void> {
        return this.auth.signOut();
    }

    public getSignedInUser$(): Observable<UserEntity|null> {
        return this.auth.authState.pipe(map(firebaseUser => {
            if (!firebaseUser) return null;
            return this.usesrFactory.create(
                {
                    uid: firebaseUser!.uid,
                    fullName: firebaseUser!.displayName ?? '',
                    email: firebaseUser!.email ?? '',
                    photoUrl: firebaseUser!.photoURL ?? '',
                    emailVerified: firebaseUser!.emailVerified
                }
            )
        }));
    }

    public getUserId(): string|null {
        return this._userId ?? null;
    }
 }