const bcrypt = require('bcrypt');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        firstname: 'admin',
        lastname: 'admin',
        email: 'admin@mail.com',
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
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        role: 'user',
        membership: 'gold',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'jane',
        lastname: 'ted',
        email: 'jane@mail.com',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        role: 'user',
        membership: 'silver',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { individualHooks: true });
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
