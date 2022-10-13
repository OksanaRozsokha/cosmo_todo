import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, User } from 'firebase/auth';
import { map, Observable } from 'rxjs';
import { UserEntity } from 'src/app/domain/entities/user-entity/user.entity';
import { UserFactory } from '../../../domain/entities/factories/user-factory/user.factory';

@Injectable({
    providedIn: 'root'
})

export class AngularFireAuthFacade {
    constructor(
        private auth: AngularFireAuth,
        private usesrFactory: UserFactory) {}


    public signInWithGoogle(): Promise<void> {
        return this.auth.signInWithPopup(new GoogleAuthProvider()).then();
    }

    public signOut(): Promise<void> {
        return this.auth.signOut();
    }

    public getSignedInUser$(): Observable<UserEntity|null> {
        return this.auth.authState.pipe(map(firebaseUser => {
            console.log(firebaseUser)
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
 }