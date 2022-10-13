import { UserEntity } from './user.entity';

describe('Check UserEntity', () => {
  let userEntity: UserEntity;

  beforeEach(() => {
    userEntity = new UserEntity('uid', 'Oksana Rozsokha', 'email@email.com', 'https://photourl', true);
  });

  it('should be created', () => {
    expect(userEntity).toBeTruthy();
  });
});