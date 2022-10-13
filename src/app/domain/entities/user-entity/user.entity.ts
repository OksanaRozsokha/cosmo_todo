import { IUser } from '../interfaces/user.interface';

export class UserEntity implements IUser {
    constructor(
        public uid: string,
        public fullName: string,
        public email: string,
        public photoUrl: string,
        public emailVerified: boolean,
    ) { }
}
