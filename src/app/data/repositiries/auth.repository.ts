import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuthFacade } from "src/app/data/firebase-facade/angular-fire-auth.facade";
import { AbstractAuthRepository } from "src/app/domain/contracts/auth.repository";
import { UserEntity } from "src/app/domain/entities/user.entity";

@Injectable({
    providedIn: 'root'
})

export class AuthRepository implements AbstractAuthRepository {

    constructor(private authFacade: AngularFireAuthFacade) {}

    public signInWithGoogle(): Promise<void> {
        return this.authFacade.signInWithGoogle();
    }

    public signOut(): Promise<void> {
        return this.authFacade.signOut();
    }

    public getSignedInUser$(): Observable<UserEntity|null> {
        return this.authFacade.getSignedInUser$()
    }
}