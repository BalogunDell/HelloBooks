'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = [{
  firstname: 'admin',
  lastname: 'admin',
  email: 'admin@mail.com',
  password: 'password',
  role: 'admin',
  membership: ''
}, {
  firstname: 'david',
  lastname: 'brook',
  email: 'david@mail.com',
  password: 'password',
  role: 'user',
  membership: 'bronze'
}, {
  firstname: 'daniel',
  lastname: 'doe',
  email: 'daniel@mail.com',
  password: 'password',
  role: 'user',
  membership: 'silver'
}];

var invalidUsers = [{
  firstname: _faker2.default.firstname,
  lastname: '',
  email: 'admin@hellobooks.com',
  password: 'password',
  role: 'admin',
  membership: 'admin',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  firstname: 'john',
  lastname: 'brook',
  email: 'john@hellobooks.com',
  password: 'password',
  role: 'user',
  membership: 'bronze',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  firstname: 'jane',
  lastname: 'doe',
  email: 'jane@hellobooks.com',
  password: 'password',
  role: 'user',
  membership: 'silver',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  firstname: 'mike',
  lastname: 'tyson',
  email: 'mike@hellobooks.com',
  password: 'password',
  role: 'user',
  membership: 'gold',
  createdAt: new Date(),
  updatedAt: new Date()
}];

exports.default = {
  users: users,
  invalidUsers: invalidUsers
};