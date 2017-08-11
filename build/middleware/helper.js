'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _limits = require('../utils/limits');

var _limits2 = _interopRequireDefault(_limits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();

var secret = process.env.SECRET;
var borrowedBookModel = _models2.default.borrowedbooks;
var userModel = _models2.default.users;
var bookModel = _models2.default.books;

/**
 * 
 * @param {object} req -Request object 
 * @param {object} res - Response object
 * @returns { object} - returns an object
 */

var Helper = function () {
  function Helper() {
    _classCallCheck(this, Helper);
  }

  _createClass(Helper, null, [{
    key: 'countBooks',

    /** 
     * @param { object } req 
     * @param { object } res 
     * @returns { object } books with count and rows
     */
    value: function countBooks(req, res) {
      borrowedBookModel.findAndCountAll({ where: { bookid: req.body.bookid } }).then(function (books) {
        res.status(201).json({ message: books });
      });
    }

    /** 
    * @param { object } req 
    * @param { object } res 
    * @returns { object } books with count and rows
    */

  }, {
    key: 'checkBook',
    value: function checkBook(req, res, next) {
      bookModel.findById(parseInt(req.body.bookid, 10)).then(function (book) {
        if (!book) return res.status(404).send({ msg: 'Book not found' });
        if (!book.dataValues.quantity) return res.status('404').json({ msg: 'This book is currently unavailable' });
        req.book = book;
        next();
      }).catch(function (error) {
        return res.status(500).json({ msg: error });
      });
    }

    /** 
    * @param { object } req 
    * @param { object } res
    * @param { object } next
    * @returns { object } books with count and rows
    * 
    */

  }, {
    key: 'verify',
    value: function verify(req, res, next) {
      var query = {
        where: {
          $and: [{ userid: req.body.userid }, { returnstatus: false }]
        }
      };
      borrowedBookModel.findAndCountAll(query).then(function (response) {
        if (response.count < _limits2.default[req.membership.toLowerCase()].limit && !response.rows.find(function (book) {
          return book.dataValues.id === req.body.bookid;
        })) {
          req.body = Helper.composeRequest(req);
          next();
        } else {
          res.status(501).send({ msg: 'You have either exhausted your book limit or you still have this book with you' });
        }
      });
    }

    /**
     * 
     * @param { object} req
     * @returns { object } body
     * 
     */

  }, {
    key: 'composeRequest',
    value: function composeRequest(req) {
      var body = {
        bookid: req.body.bookid,
        userid: req.body.userid,
        expectedreturndate: (0, _moment2.default)().add(_limits2.default[req.membership.toLowerCase()].limit, 'days').format('YYYY-MM-DD')
      };
      return body;
    }

    /**
     * 
     * @param { Object } user
     * @returns { string } tokens
     */

  }, {
    key: 'generateToken',
    value: function generateToken(user) {
      var token = _jsonwebtoken2.default.sign({
        id: user.id,
        email: user.email,
        membership: user.membership,
        role: user.role
      }, secret, { expiresIn: '24h' });

      return token;
    }
  }]);

  return Helper;
}();

exports.default = Helper;