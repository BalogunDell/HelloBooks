'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _helper = require('../middleware/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();

var userModel = _models2.default.users;
var borrowedBookModel = _models2.default.borrowedbooks;

/**
 * @class User
 *@classdesc creates a class User
 */

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: 'signup',

    /**
     * @param { object } req
     * @param { object } res
     * @returns { void }
     */
    value: function signup(req, res) {
      userModel.create(req.body).then(function (user) {
        var token = _helper2.default.generateToken(user.dataValues);
        res.status(201).json({ message: 'User created', data: user, token: token });
      }).catch(function (error) {
        if (error.name === 'SequelizeValidationError') {
          res.status(400).json({ message: error.errors[0].message });
        } else if (error.name === 'SequelizeUniqueConstraintError') {
          res.status(409).json({ message: 'A user with the email exists' });
        } else {
          res.json(error);
        }
      });
    }

    /**
     * @param { object } req
     * @param { object} res
     * @returns { object } response
     */

  }, {
    key: 'signin',
    value: function signin(req, res) {
      userModel.findOne({ where: { email: req.body.email } }).then(function (user) {
        if (user && _bcrypt2.default.compareSync(req.body.password, user.dataValues.password)) {
          var token = _helper2.default.generateToken(user.dataValues);
          var response = {
            message: 'signed in',
            data: { token: token }
          };
          res.status(200).json({ response: response });
        } else if (!req.body.email || !req.body.password) {
          res.status(404).json({ message: 'Email and password is required' });
        } else {
          res.status(404).json({ message: 'Invalid email or password' });
        }
      }).catch(function (err) {
        return res.send(err);
      });
    }

    /**
     * @param { object } req
     * @param { object } res
     * @returns { void }
     */

  }, {
    key: 'getUserBooks',
    value: function getUserBooks(req, res) {
      var returnStatus = req.query.returned;
      var query = {};

      if (returnStatus === undefined) {
        query.where = {
          userid: req.body.userid
        };
      } else if (returnStatus === 'false') {
        query.where = {
          $and: [{ userid: req.body.userid }, { returnstatus: false }]
        };
      } else {
        query.where = {
          $and: [{ userid: req.body.userid }, { returnstatus: true }]
        };
      }

      borrowedBookModel.findAll(query).then(function (response) {
        res.status(200).json({ books: response });
      }).catch(function (error) {
        res.status(404).json({ message: error });
      });
    }

    /**
     * @param { object } req
     * @param { object } res
     * @returns { void }
     */

  }, {
    key: 'booksReturned',
    value: function booksReturned(req, res) {
      var returnStatus = req.query.returned;
      borrowedBookModel.findAll({ where: { returnstatus: returnStatus } }).then(function (response) {
        if (response.length === 0) {
          res.status(200).json({ message: 'You have not returned any book' });
        } else {
          res.status(200).json({ returned: response });
        }
      }).catch(function (error) {
        res.status(404).json({ message: error });
      });
    }

    /**
     * @param { object } req
     * @param { object } res
     * @returns { object } response is an object of users
     */

  }, {
    key: 'getAllUsers',
    value: function getAllUsers(req, res) {
      userModel.findAll().then(function (response) {
        if (response) {
          res.status(200).json({ users: response });
        } else {
          res.status(404).json({ response: 'Database is empty' });
        }
      }).catch(function (error) {
        res.status(500).json({ response: error });
      });
    }
    /**
     * 
     * @param { object } req
     * @param { object } res
     * @returns { object } user detail
     */

  }, {
    key: 'profilePage',
    value: function profilePage(req, res) {
      if (!req.headers.Authorization) {
        res.status(401).json({ message: 'Invalid/Expired token' });
        // other implementations
      }
    }
  }]);

  return User;
}();

exports.default = User;