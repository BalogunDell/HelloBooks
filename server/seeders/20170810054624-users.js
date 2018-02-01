const bcrypt = require('bcrypt');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@mail.com',
        userName: 'adminusername',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        role: 'admin',
        membership: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'john',
        lastName: 'doe',
        email: 'john@mail.com',
        userName: 'abbey2',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        role: 'user',
        membership: 'gold',
        imageUrl: '',
        passwordResetUrl: 'uFUhdjHDJjdf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'jane',
        lastName: 'ted',
        email: 'jane@mail.com',
        userName: 'abbey3',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        role: 'user',
        membership: 'silver',
        imageUrl: '',
        passwordResetUrl: 'uFUhdjHDJjGf',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { individualHooks: true });
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
