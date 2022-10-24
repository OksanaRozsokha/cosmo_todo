import { UserFactory } from './user.factory';
import { UserEntity } from '../../user-entity/user.entity';

describe('Check UserFactory', () => {
  let userFactory: UserFactory;

  beforeEach(() => {
    userFactory = new UserFactory();
  });

  it('should be created', () => {

    expect(userFactory).toBeTruthy();
  });

  it ('create method make an instance of the UserEntity', () => {
    let createUser: UserEntity = userFactory.create({
       uid: 'uid',
       fullName: 'Oksana Rozsokha',
       email: 'email@email.com',
       emailVerified: true,
       photoUrl: 'https://photourl'
    });

    expect(createUser).toBeInstanceOf(UserEntity);
  });
});