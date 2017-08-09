import moment from 'moment';
import model from '../models';
import util from '../utils/limits';

const borrowedBookModel = model.borrowedbooks;
const userModel = model.users;
const bookModel = model.books;

/**
 * 
 * @param {object} req -Request object 
 * @param {object} res - Response object
 * @returns { object} - returns an object
 */
class Helper {
/** 
 * @param { object } req 
 * @param { object } res 
 * @returns { object } books with count and rows
 */
  static countBooks(req, res) {
    borrowedBookModel.findAndCountAll({ where: { bookid: req.body.bookid } }).then((books) => {
      res.status(201).json({ message: books });
    });
  }

  /** 
 * @param { object } req 
 * @param { object } res 
 * @returns { object } books with count and rows
 */
  static checkBook(req, res, next) {
    bookModel.findById(parseInt(req.body.bookid, 10))
      .then((book) => {
        if (!book) return res.status(404).send({ msg: 'Book not found' });
        if (!book.dataValues.quantity) return res.status('404').json({ msg: 'This book is currently unavailable' });
        req.book = book;
        next();
      })
      .catch(error => res.status(500).json({ msg: error }));
  }

  /** 
 * @param { object } req 
 * @param { object } res 
 * @returns { object } books with count and rows
 */
  static verify(req, res, next) {
    const query = {
      where: {
        $and: [
          { userid: req.userid },
          { returnstatus: false }
        ]
      }
    };

    borrowedBookModel.findAndCountAll(query)
      .then((response) => {
        if (response.count < util[req.membership.toLowerCase()].limit
          && !response.rows.find(book => book.dataValues.id === req.body.bookId)) {
          req.body = Helper.composeRequest(req);
          next();
        } else {
          res.status(501).send({ msg: 'You have either exhausted your book limit or you still have this book with you' });
        }
      });
  }

  static composeRequest(req) {
    const body = {
      bookid: req.body.bookid,
      userid: req.userid,
      expectedreturndate: moment().add(util[req.membership.toLowerCase()].limit, 'days').format('YYYY-MM-DD')
    };
    return body;
  }
}

export default Helper;
