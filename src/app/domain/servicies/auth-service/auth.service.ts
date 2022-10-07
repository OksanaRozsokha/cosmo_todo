import { Injectable } from '@angular/core';
import { AbstractAuthRepository } from '../../contracts/auth.repository';
import { UserEntity } from '../../entities/user.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private authRepository: AbstractAuthRepository) { }

  public getSignInUser$(): Observable<UserEntity|null> {
    return this.authRepository.getSignedInUser$();
  }

  public signInWithGoogle() : Promise<void> {
    return this.authRepository.signInWithGoogle();
  }

  public signOut(): Promise<void> {
    return this.authRepository.signOut();
  }
}
