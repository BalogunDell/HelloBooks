import faker from 'faker';

const users = [
  {
    firstname: 'admin',
    lastname: 'admin',
    username: 'adminUsername12',
    email: 'admin@mail.com',
    password: 'password',
    role: 'admin',
    membership: '',
    passurl: 'uFUhdjHDJjdt',
  },
  {
    firstname: 'david',
    lastname: 'brook',
    email: 'david@mail.com',
    username: 'username22',
    password: 'password',
    role: 'user',
    membership: 'bronze',
    passurl: 'uFUhdjHDJjdg',
  },
  {
    firstname: 'daniel',
    lastname: 'doe',
    email: 'daniel@mail.com',
    username: 'username32',
    password: 'password',
    role: 'user',
    membership: 'silver',
    passurl: 'uFUhdjHDJjdf'
  },
];

const invalidUsers = [
  {
    firstname: faker.firstname,
    lastname: '',
    email: 'admin@hellobooks.com',
    password: 'password',
    role: 'admin',
    membership: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstname: 'john',
    lastname: 'brook',
    email: 'john@hellobooks.com',
    password: 'password',
    role: 'user',
    membership: 'bronze',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstname: 'jane',
    lastname: 'doe',
    email: 'jane@hellobooks.com',
    password: 'password',
    role: 'user',
    membership: 'silver',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstname: 'mike',
    lastname: 'tyson',
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

