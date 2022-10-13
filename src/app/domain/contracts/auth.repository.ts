import { Observable } from "rxjs";
import { UserEntity } from "../entities/user-entity/user.entity";

export abstract class AbstractAuthRepository {
    public abstract signInWithGoogle(): Promise<void>;
    public abstract signOut(): Promise<void>;
    public abstract getSignedInUser$(): Observable<UserEntity|null>;
}