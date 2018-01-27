import moment from 'moment';
import jwt from 'jsonwebtoken';
import nodeMailer from 'nodemailer';
import model from '../models';
import util from '../utils/limits';
import emailTemplate from '../utils/emailTemplate';
import {
  findOneResourceById,
} from '../utils/queryFinder';

require('dotenv').config();

const secret = process.env.SECRET;
const mailPassword = process.env.PASSWORD;
const borrowedBookModel = model.Borrowedbook;
const bookModel = model.Book;

/**
 * 
 * @param {object} req - request object 
 * @param {object} res - response object
 * 
 * @returns { object} - returns an object
 */
class Helper {
/** 
 * @param { object } req - request object
 * @param { object } res - response object
 * @param { object } next - passes action to following controller
 * 
 * @returns { object } - books with count and rows
 */
  static checkBook(req, res, next) {
    findOneResourceById(bookModel, (parseInt(req.body.bookid, 10)))
      .then((book) => {
        console.log(book);
        if (!book) return res.status(404).json({ errorMessage: 'Book not found' });
        if (!book.dataValues.quantity) {
          return res.status(200).json({
            errorMessage: 'This book is currently unavailable'
          });
        }
        req.book = book;
        next();
      })
      .catch((error) => {
        res.status(500).json({
          errorMessage: 'Internal server error'
        });
        console.log(error);
      });
  }

  /** 
 * @param { object } req  - request object
 * @param { object } res  - response object 
 * @param { object } next - passes action to following controller
 * 
 * @returns { object } - books with count and rows
 * 
 */
  static verify(req, res, next) {
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
          msg: error
        });
      });
  }

  /**
   * @param { object} req - request object
   * @param { object} res - response object
   * 
   * @returns { object } request body
   */
  static composeRequest(req, res) {
    const { bookId } = req.body;
    if (!bookId) return res.status(400).json({ message: 'Provide a book id' });
    const body = {
      bookid: req.body.bookId,
      userid: req.body.userId,
      expectedreturndate: moment()
        .add(util[req.membership.toLowerCase()].limit, 'days')
        .format('YYYY-MM-DD')
    };
    return body;
  }

  /**
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
    }, secret, { expiresIn: '24h' });

    return token;
  }


  /**
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
   * 
   * @param { string } userEmail  - email destination
   * @param { string } passwordUrl - generated url
   * 
   * @returns { Function } sendMail method
   */
  static generateMail(userEmail, passwordUrl) {
    // Define email transporter
    const mailCourier = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'delighteddell@gmail.com',
        pass: mailPassword
      }
    });

    // Define email content and optiobs
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
