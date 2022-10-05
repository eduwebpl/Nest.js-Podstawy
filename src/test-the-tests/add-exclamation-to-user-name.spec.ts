import { addExclamationToUserName } from './add-exclamation-to-user-name';

describe('addExclamationToUserName', () => {
  let user;

  beforeEach(() => {
    // Arrange:
    user = { name: 'Michał' };
  });

  it('should add exclamation to user name', () => {
    // Act:
    const endUser = addExclamationToUserName(user);

    // Assert:
    expect(endUser.name).toBe('Michał!');
  });

  it('should not mutate given object', () => {
    // Act:
    const endUser = addExclamationToUserName(user);

    // Assert:
    expect(endUser).not.toBe(user);
  });
});
