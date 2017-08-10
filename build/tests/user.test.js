'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../models/index');

var _index4 = _interopRequireDefault(_index3);

var _books = require('../seeds/books');

var _books2 = _interopRequireDefault(_books);

var _users = require('../seeds/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = _users2.default.users;
var invalidUsers = _users2.default.invalidUsers;

var books = _books2.default.books;
var invalidBooks = _books2.default.invalidBooks;

var server = (0, _supertest2.default)(_index2.default);

describe('ADMIN REGISTRATION AND AUTHENTICATION', function () {
  before(function (done) {
    _index4.default.sequelize.sync({ force: true }).then(function () {
      return done();
    });
  });

  it('should be able to signup - Admin', function (done) {
    server.post('/api/users/signup').set('Accept', 'Application/json').send(users[1]).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equal(201);
      done();
    });
  });

  describe('ADMIN LOGIN AND AUTHENTICATION', function () {
    before(function (done) {
      _index4.default.sequelize.sync({ force: true }).then(function () {
        return done();
      });
    });

    before(function (done) {
      _index4.default.users.bulkCreate([users[0]], { individualHooks: true }).then(function () {
        return done();
      });
    });
  });

  it('should not able to signin - ADMIN', function (done) {
    server.post('/api/users/signin').set('Accept', 'Application/json').send(invalidUsers[0]).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equal(404);
      done();
    });
  });
});

describe('USER LOGIN AND AUTHENTICATION', function () {
  before(function (done) {
    _index4.default.sequelize.sync({ force: true }).then(function () {
      return done();
    });
  });

  before(function (done) {
    _index4.default.users.bulkCreate([users[1]], { individualHooks: true }).then(function () {
      return done();
    });
  });

  it('should be able to signin - User', function (done) {
    server.post('/api/users/signin').set('Accept', 'Application/json').send(users[1]).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equal(200);
      done();
    });
  });

  it('should not able to signin - User', function (done) {
    server.post('/api/users/signin').set('Accept', 'Application/json').send(invalidUsers[1]).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equal(404);
      done();
    });
  });
});