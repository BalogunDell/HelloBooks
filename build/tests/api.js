'use strict';

var _chai = require('chai');

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _index = require('../server/index');

var _index2 = _interopRequireDefault(_index);

var _mockdata = require('../server/utils/mockdata');

var _mockdata2 = _interopRequireDefault(_mockdata);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'test';

require('dotenv').config();

var request = (0, _supertest2.default)(_index2.default);
var secret = process.env.SECRET;
var userToken = void 0;
var adminToken = void 0;

/**
 * @desc describes and tests the home route
 * @return 200 succes
 */

describe('Homepage', function () {
  it('Should return welcome to libary api', function (done) {
    request.get('/api').set('Accept', 'Application/json').expect(200, done);
  });
});

/**
 * @desc describes and tests the signup api route
 * @return 200 succes
 */

describe('User signup', function (done) {

  // test for success with valid data for user
  it('should be able to signup - User', function (done) {
    request.post('/api/users/signup').set('Accept', 'Application/json').send(_mockdata2.default.user1).expect(200, done);
  });

  // test for success with valid data for admin
  it('Should be able to signup - Admin', function (done) {
    request.post('/api/users/signup').set('Accept', 'Application/json').send(_mockdata2.default.adminData).expect(200, done);
  });
});

describe('User signin', function (done) {

  // test for user sign in
  it('Should be able to sign it and get a token - User', function (done) {
    request.post('/api/users/signin').set('Accept', 'Application/json').send(_mockdata2.default.user1Login).end(function (error, res) {
      userToken = res.body.data.token;
      done();
    });
  });

  // test for admin sign in
  it('Should be able to sign it and get a token - Admin', function (done) {
    request.post('/api/users/signin').set('Accept', 'Application/json').send(_mockdata2.default.adminLogin).end(function (error, res) {
      adminToken = res.body.data.token;
      done();
    });
  });
});

describe('Unathorized User', function () {
  it('Should not be able to access this page', function (done) {
    request.post('/api/books').set('Authorization', userToken).send(_mockdata2.default.bookdata).expect(401).end(function (error, res) {
      if (error) return done(error);
      done();
    });
  });
});
describe('Upload books', function () {
  it('Should be able to upload books', function (done) {
    request.post('/api/books').set('Authorization', adminToken).send(_mockdata2.default.bookdata).expect(201, done);
  });
});
describe('Get books - Admin', function () {
  it('Should be able to get books without signing in', function (done) {
    request.get('/api/books').set('Authorization', adminToken).expect('Content-Type', /json/).expect(200, done);
  });
});
describe('Modify books - Admin', function () {
  it('Should be able to modify books', function (done) {
    request.put('/api/books/1').set('Authorization', adminToken).send(_mockdata2.default.modifyBookData).expect('Content-Type', /json/).expect(200, done);
  });
});
describe('Get books - User', function () {
  it('Should be able to get books without signing in', function (done) {
    request.get('/api/books').set('Authorization', userToken).expect('Content-Type', /json/).expect(200, done);
  });
});
describe('Get books - User', function () {
  it('Should be able to get books after signing in', function (done) {
    request.get('/api/users/:id/books').set('Authorization', userToken).send(_mockdata2.default.userID).expect('Content-Type', /json/).expect(200, done);
  });
});
describe('Borrow Books', function () {
  it('Should allow users borrow books', function (done) {
    request.post('/api/users/:id/books').set('Authorization', userToken).send(_mockdata2.default.borrowBook).expect('Content-Type', /json/).expect(201, done);
  });
});
describe('Unauthorized Access', function () {
  it('Should not allow users without token to borrow books', function (done) {
    request.post('/api/users/:id/books').set('Authorization', '').send(_mockdata2.default.borrowBook).expect('Content-Type', /json/).expect(401, done);
  });
});
describe('Return Books', function () {
  it('Should allow users return books', function (done) {
    request.put('/api/users/:id/books').set('Authorization', userToken).send(_mockdata2.default.borrowBook).expect('Content-Type', /json/).expect(200, done);
  });
});
describe('Unauthorized Access', function () {
  it('Should not allow users without token to return books', function (done) {
    request.put('/api/users/:id/books').set('Authorization', '').send(_mockdata2.default.borrowBook).expect('Content-Type', /json/).expect(401, done);
  });
});