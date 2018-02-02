import faker from 'faker';

const users = [
  {
    firstName: 'admin',
    lastName: 'admin',
    username: 'adminusername',
    email: 'admin@mail.com',
    password: 'password',
    role: 'admin',
    membership: '',
    passwordResetUrl: 'uFUhdjHDJjdt',
  },
  {
    firstName: 'david',
    lastName: 'brook',
    email: 'david@mail.com',
    username: 'username',
    password: 'password',
    role: 'user',
    membership: 'bronze',
    passwordResetUrl: 'uFUhdjHDJjdg',
  },
  {
    firstName: 'daniel',
    lastName: 'doe',
    email: 'daniel@mail.com',
    username: 'username32',
    password: 'password',
    role: 'user',
    membership: 'silver',
    passwordResetUrl: 'uFUhdjHDJjdf'
  },
];

const invalidUsers = [
  {
    firstName: faker.firstName,
    lastName: '',
    email: 'admin@hellobooks.com',
    password: 'password',
    role: 'admin',
    membership: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'john',
    lastName: 'brook',
    email: 'john@hellobooks.com',
    password: 'password',
    role: 'user',
    membership: 'bronze',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'jane',
    lastName: 'doe',
    email: 'jane@hellobooks.com',
    password: 'password',
    role: 'user',
    membership: 'silver',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'mike',
    lastName: 'tyson',
    email: 'mike@hellobooks.com',
    password: 'password',
    role: 'user',
    membership: 'gold',
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

export default {
  users,
  invalidUsers
};

