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

var _user = require('../server/controller/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'test';

require('dotenv').config();

var testApp = (0, _supertest2.default)(_index2.default);
var secret = process.env.SECRET;

describe('Methods', function () {
  it('should create a user', function (done) {
    testApp(_user2.default.sigin()).set('Action', 'application/json').send({ email: 'user1Email', password: 'user1password' }).expect(201, done);
  });
});