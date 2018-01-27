const bcrypt = require('bcrypt');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        firstname: 'admin',
        lastname: 'admin',
        email: 'admin@mail.com',
        username: 'adminusername',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        role: 'admin',
        membership: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'john',
        lastname: 'doe',
        email: 'john@mail.com',
        username: 'abbey2',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        role: 'user',
        membership: 'gold',
        passwordReseturl: 'uFUhdjHDJjdf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'jane',
        lastname: 'ted',
        email: 'jane@mail.com',
        username: 'abbey3',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        role: 'user',
        membership: 'silver',
        passwordReseturl: 'uFUhdjHDJjGf',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { individualHooks: true });
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
