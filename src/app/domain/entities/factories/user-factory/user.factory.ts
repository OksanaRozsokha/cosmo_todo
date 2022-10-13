import { Injectable } from '@angular/core';
import { IFactory } from '../../interfaces/factory.interface';
import { IUser } from '../../interfaces/user.interface';
import { UserEntity } from '../../user-entity/user.entity';

@Injectable({
    providedIn: 'root'
})

export class UserFactory implements IFactory<IUser, UserEntity> {

    public create(argument: IUser): UserEntity {
        return new UserEntity(argument.uid, argument.fullName, argument.email, argument.photoUrl, argument.emailVerified);
    }
}