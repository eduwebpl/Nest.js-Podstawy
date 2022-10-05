import { addExclamationToUserName } from './add-exclamation-to-user-name';

it('should add exclamation to user name', () => {
  // Arrange:
  const user = { name: 'Michał' };

  // Act:
  const endUser = addExclamationToUserName(user);

  // Assert:
  expect(endUser.name).toBe('Michał!');
});

it('should not mutate given object', () => {
  // Arrange:
  const user = { name: 'Michał' };

  // Act:
  const endUser = addExclamationToUserName(user);

  // Assert:
  expect(endUser).not.toBe(user);
});
