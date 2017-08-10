'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bookModel = _models2.default.books;
var borrowedBooks = _models2.default.borrowedbooks;

/**
 * @class Book
 * @classdesc creates a Book classs
 */

var Book = function () {
  function Book() {
    _classCallCheck(this, Book);
  }

  _createClass(Book, null, [{
    key: 'addBook',

    /**
     * @param {object} req 
     * @param {object} res
     * @returns {void}
     */
    value: function addBook(req, res) {
      bookModel.create(req.body).then(function (book) {
        res.status(201).json({ message: 'Book created', data: book });
      }).catch(function (error) {
        // check if all fields are supplied.
        if (error.name === 'SequelizeValidationError') {
          res.status(400).json({ message: 'One or more fields are empty' });
          // check if a duplicate request was made.
        } else if (error.name === 'SequelizeUniqueConstraintError') {
          res.status(409).json({ message: 'A book with is ISBN already exists' });
        } else {
          res.send(error);
        }
      });
    }

    /**
     * @param {object} req 
     * @param {object} res
     * @returns {void}
     */

  }, {
    key: 'deleteBook',
    value: function deleteBook(req, res) {
      console.log(req.body);
      bookModel.destroy({ where: { id: req.body.id } }).then(function (book) {
        res.status(200).json({ message: 'Book deleted', data: book });
      }).catch(function (error) {
        res.status(500).json({ message: 'Book Cannot be deleted', data: error });
      });
    }

    /**
     * @param {object} req 
     * @param {object} res
     * @returns { object } resposnse
     */

  }, {
    key: 'getBook',
    value: function getBook(req, res) {
      bookModel.findAll().then(function (response) {
        res.send(response);
      }).catch(function (error) {
        res.send(404).json({ message: error.message });
      });
    }
    /**
    * @param {object} req 
    * @param {object} res
    * @returns { object } resposnse
    */

  }, {
    key: 'modifyBook',
    value: function modifyBook(req, res) {
      var query = {
        where: {
          id: parseInt(req.params.id, 10)
        }
      };
      var bookData = {
        pages: req.body.pages,
        author: req.body.author,
        year: req.body.year,
        title: req.body.title,
        description: req.body.description,
        quantity: req.body.quantity
      };

      bookModel.findOne(query).then(function (book) {
        if (!book) return res.status(404).send({ msg: 'Book not found' });
        book.update(bookData).then(function (updated) {
          if (updated) {
            res.status(200).json({ message: 'Book modified successfully', data: updated });
          }
        }).catch(function (error) {
          res.status(404).json({ message: error.body });
        });
      }).catch(function (error) {
        return res.status(500).json({ msg: error });
      });
    }

    /**
     * @param { object } req
     * @param { object } res
     * @returns { void }
     */

  }, {
    key: 'borrowbook',
    value: function borrowbook(req, res) {
      borrowedBooks.create(req.body).then(function (response) {
        bookModel.update({ quantity: req.book.dataValues.quantity - 1 }, { where: { id: response.dataValues.bookid } }).then(function () {
          res.status(201).json({ message: 'Book Added',
            returnDate: req.body.expectedreturndate });
        }).catch(function () {
          res.status(400).json({ message: 'Book not added' });
        }).catch();
      }).catch(function (error) {
        res.status(401).json({ message: error });
      });
    } // end of method

    /**
     * @param { object } req 
     * @param { object } res
     * @returns { object } returns object
     */

  }, {
    key: 'returnBook',
    value: function returnBook(req, res) {
      borrowedBooks.findOne({ where: {
          userid: req.body.userid,
          bookid: req.body.bookid,
          returnstatus: false } }).then(function (response) {
        if (response === null) {
          res.status(404).json({
            message: 'This book is not in your latest borrow history' });
        } else {
          borrowedBooks.update({ returnstatus: true }, { where: { id: response.dataValues.id } }).then(function () {
            res.status(200).json({ message: 'Book has been returned' });
          });
        }
      });
    }
  }]);

  return Book;
}();

exports.default = Book;