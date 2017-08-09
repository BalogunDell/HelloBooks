'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _helper = require('../middleware/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();

var userModel = _models2.default.users;
var borrowedBookModel = _models2.default.borrowedbooks;
var bookModel = _models2.default.books;

var secret = process.env.SECRET;
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
      userModel.create(req.body).then(function () {
        res.status(200).json({ message: 'User created' });
      }).catch(function (error) {
        if (error.name === 'SequelizeValidationError') {
          res.status(400).json({ message: 'One or more fields are empty' });
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
          var token = _jsonwebtoken2.default.sign({
            id: user.dataValues.id,
            email: user.dataValues.email,
            membership: user.dataValues.membership,
            role: user.dataValues.role
          }, secret, { expiresIn: '24h' });

          var response = {
            message: 'signed in',
            data: { token: token }
          };
          res.status(201).send(response);
        } else {
          res.status(404).send({ message: 'user does not exist' });
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
          userid: req.userid
        };
      } else if (returnStatus === 'false') {
        query.where = {
          $and: [{ userid: req.userid }, { returnstatus: false }]
        };
      } else {
        query.where = {
          $and: [{ userid: req.userid }, { returnstatus: true }]
        };
      }

      borrowedBookModel.findAll(query).then(function (response) {
        // res.send(response);
        res.status(200).json(response);
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
          res.status(200).json(response);
        }
      }).catch(function (error) {
        res.send(404).json({ message: error });
      });
    }

    /**
     * @param { object } req 
     * @param { object } res
     * @returns { object } returns object
     */

  }, {
    key: 'returnBook',
    value: function returnBook(req, res) {
      borrowedBookModel.update({ approvedreturn: true }, { where: { userid: req.body.userid, bookid: req.body.bookid } }).then(function (book) {
        if (book) {
          res.status(200).json({ message: 'Book has been returned' });
        } else {
          res.status(401).json({ message: 'Book already approved' });
        }
      }).catch(function (error) {
        res.send(404).json({ message: error });
      });
    }

    /**
     * @param { object } req 
     * @param { object } res
     * @returns { void }
     */

  }, {
    key: 'getAllUsers',
    value: function getAllUsers(req, res) {
      borrowedBookModel.findAll().then(function (response) {
        res.status(200).json(response);
      }).catch(function (error) {
        res.send(error.message);
      });
    }
  }]);

  return User;
}();

exports.default = User;