'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../controller/user');

var _user2 = _interopRequireDefault(_user);

var _book = require('../controller/book');

var _book2 = _interopRequireDefault(_book);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _helper = require('../middleware/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();

// Api home
Router.get('/', function (req, res) {
  res.status(200).json({ message: 'Welcome to library api' });
});

// User Routes
Router.post('/users/signup', _user2.default.signup);

Router.post('/users/signin', _user2.default.signin);

// get all users
//Router.get('/users/', userController.verifyAdmin, userController.getAllUsers);

Router.route('/books').get(_book2.default.getBook).post(_auth2.default.verifyAdmin, _book2.default.addBook);

Router.put('/books/:id', _auth2.default.verifyAdmin, _book2.default.modifyBook);

// Routes allow user borrow book, check for books not returned and return book
Router.route('/users/:userId/books').post(_auth2.default.verifyUser, _helper2.default.checkBook, _helper2.default.verify, _book2.default.borrowbook).get(_auth2.default.verifyUser, _user2.default.getUserBooks).put(_auth2.default.verifyUser, _user2.default.returnBook);

// redirect every other address
Router.route('*').post(function (req, res) {
  res.send('This is an invalid route');
}).get(function (req, res) {
  res.send('This is an invalid route, does not exist');
});

exports.default = Router;