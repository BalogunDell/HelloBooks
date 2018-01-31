import moment from 'moment';
import jwt from 'jsonwebtoken';
import nodeMailer from 'nodemailer';
import model from '../models';
import util from '../utils/limits';
import emailTemplate from '../utils/emailTemplate';
import {
  findOneResourceById,
} from '../utils/queryFinder';
import paramValid from '../utils/paramValid';

require('dotenv').config();

const secret = process.env.SECRET;
const mailPassword = process.env.PASSWORD;
const borrowedBookModel = model.BorrowedBook;
const bookModel = model.Book;

/**
 * @class authentication
 * 
 * @classdesc creates an authentication class
 */
class Helper {
/** 
 * @description This method checks if a book exists. It is a middleware
 * 
 * @param { object } req - request object
 * @param { object } res - response object
 * @param { object } next - passes action to following controller
 * 
 * @returns { object } - books with count and rows
 */
  static checkBook(req, res, next) {
    const { bookId } = req.body;

    findOneResourceById(bookModel, (parseInt(bookId, 10)))
      .then((book) => {
        if (!book) return res.status(404).json({ message: 'Book not found' });
        if (!book.dataValues.quantity) {
          return res.status(200).json({
            message: 'This book is currently unavailable'
          });
        }
        req.book = book;
        next();
      })
      .catch(() => {
        res.status(500).json({
          message: 'Internal server error'
        });
      });
  }

  /**
   * @description This metho verifies the book limit of a user
   * 
   * @param { object } req  - request object
   * @param { object } res  - response object 
   * @param { object } next - passes action to following controller
   * 
   * @returns { object } - books with count and rows
  */
  static verifyBookLimit(req, res, next) {
    const { bookId, userId } = req.body;
    const query = {
      where: {
        $and: [
          { userId },
          { returnstatus: false }
        ]
      }
    };
    borrowedBookModel.findAndCountAll(query)
      .then((response) => {
        const userBooklimit = util[req.membership.toLowerCase()].limit;
        if (response.count < userBooklimit
            &&
          !response.rows
            .find(book => book.dataValues.bookId === parseInt(bookId, 10))) {
          req.body = Helper.composeRequest(req);
          next();
        } else {
          res.status(401).json({
            message: 'You have either exhausted your book limit or you still have this book with you'
          });
        }
      }).catch((error) => {
        res.status(500).json({
          message: error
        });
      });
  }

  /**
   * @description This method composes a request to be used in another route
   * @param { object} req - request object
   * @param { object} res - response object
   * 
   * @returns { object } request body
   */
  static composeRequest(req, res) {
    const { bookId } = req.body;
    if (!bookId) return res.status(400).json({ message: 'Provide a book id' });
    const body = {
      bookId: req.body.bookId,
      userId: req.body.userId,
      expectedreturndate: moment()
        .add(util[req.membership.toLowerCase()].limit, 'days')
        .format('YYYY-MM-DD')
    };
    return body;
  }

  /**
   * @description This generates a token
   * 
   * @param { Object } user - user payload
   * 
   * @returns { string }  - generated token
   */
  static generateToken(user) {
    const {
      id,
      email,
      membership,
      role } = user;
    const token = jwt.sign({
      id,
      email,
      membership,
      role
    }, secret, { expiresIn: '3600' });

    return token;
  }


  /**
   * @description This decodes a token
   * 
   * @param { Object } token - user token
   * 
   * @returns { object }  - decoded token
   */
  static decodeToken(token) {
    return jwt.verify(token, secret);
  }

  /**
   * @description checks if supplied Id is valid
   * 
   * @param { Object } req - request object
   * @param { Object } res - response object
   * @param { Object } next
   * 
   * @returns { object }  - decoded token
   */
  static checkBookId(req, res, next) {
    const { id } = req.params;

    if (paramValid(id)) {
      return res.status(400).json({
        message: 'You have provided an invalid id'
      });
    }
    const bookId = parseInt(id, 10);
    req.body.id = bookId;
    return next();
  }


  /**
   * @description This method generates a string to be used for password reset
   * 
   * @param { number } arg - the number of characters
   * @param { string } characters - the actual characters
   * 
   * @returns { string } urlstring
   */
  static urlGenerator(arg, characters) {
    let urlString = '';
    for (let i = 0; i < arg; ++i) { //eslint-disable-line
      urlString += characters[Math.round(Math.random(arg) * (arg * 2))];
    }
    return urlString;
  }

  /**
   * @description This method generates email to be sent for password reset
   * 
   * @param { string } userEmail  - email destination
   * @param { string } passwordUrl - generated url
   * 
   * @returns { Function } sendMail method
   */
  static generateMail(userEmail, passwordUrl) {
    const mailCourier = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'delighteddell@gmail.com',
        pass: mailPassword
      }
    });

    const mailOptions = {
      from: 'delighteddell@gmail.com',
      to: userEmail,
      subject: 'Password Reset',
      html: emailTemplate(passwordUrl, userEmail)
    };

    const result = mailCourier.sendMail(mailOptions);
    return result;
  }
}

export default Helper;
