export function addExclamationToUserName(user: { name: string }) {
  return { ...user, name: user.name + '!' };
}

const user = { name: 'Michał' };

console.log(addExclamationToUserName(user));
