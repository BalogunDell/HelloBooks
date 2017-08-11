'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();

var userModel = _models2.default.users;

var secret = process.env.SECRET;

/**
 * @class authentication
 * @classdesc creates an authentication class
 */

var Authentication = function () {
  function Authentication() {
    _classCallCheck(this, Authentication);
  }

  _createClass(Authentication, null, [{
    key: 'verifyAdmin',

    /**
     * @param { object } req 
     * @param { object} res 
     * @param { object } next
     * @returns { object } response
     */
    value: function verifyAdmin(req, res, next) {
      if (!req.headers.authorization) {
        res.status(401).json({ message: 'Unauthorized - Access Denied' });
      } else {
        var decoded = _jsonwebtoken2.default.verify(req.headers.authorization, secret);
        if (decoded.role === 'user') {
          res.status(401).json({ message: 'Unauthorized - Access Denied' });
        } else {
          next();
        }
      }
    }

    /**
     * @param { object } req --- request object
     * @param { object} res  ---response object
     * @returns { object } --- return object
     */

  }, {
    key: 'verifyUser',
    value: function verifyUser(req, res, next) {
      if (!req.headers.authorization) {
        res.status(401).json({ message: 'Invalid/expired token' });
      } else {
        var decoded = _jsonwebtoken2.default.verify(req.headers.authorization, secret);
        userModel.findOne({ where: { email: decoded.email, id: decoded.id } }).then(function (user) {
          if (user) {
            req.body.userid = decoded.id;
            req.membership = decoded.membership;
            next();
          } else {
            res.status(401).json({ message: 'User does not exist' });
          }
        }).catch(function () {
          res.status(401).json({ message: 'Invalid/expired token' });
        });
      }
    }
  }]);

  return Authentication;
}();

exports.default = Authentication;