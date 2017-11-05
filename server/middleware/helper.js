import moment from 'moment';
import jwt from 'jsonwebtoken';
import nodeMailer from 'nodemailer';
import model from '../models';
import util from '../utils/limits';

require('dotenv').config();

const secret = process.env.SECRET;
const mailPassword = process.env.PASSWORD;
const borrowedBookModel = model.borrowedbooks;
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
 * @param { object } next
 * @returns { object } books with count and rows
 * 
 */
  static verify(req, res, next) {
    const query = {
      where: {
        $and: [
          { userid: req.body.userid },
          { returnstatus: false }
        ]
      }
    };
    borrowedBookModel.findAndCountAll(query)
      .then((response) => {
        // const foundBook = );
        // let dbug = {
        //   response,
        //   foundBook,
        //   rows: response.rows[0].dataValues
        // };
        // return console.log(dbug);
        if (response.count < util[req.membership.toLowerCase()].limit
          && !response.rows.find(book => book.dataValues.bookid === parseInt(req.body.bookid, 10))) {
          req.body = Helper.composeRequest(req);
          next();
        } else {
          res.status(501).json({ msg: 'You have either exhausted your book limit or you still have this book with you' });
        }
      });
  }

  /**
   * @param { object} req
   * @param { object} res
   * @returns { object } body
   */
  static composeRequest(req, res) {
    if (!req.body.bookid) return res.status(400).json({ message: 'provide a book id' });
    const body = {
      bookid: req.body.bookid,
      userid: req.body.userid,
      expectedreturndate: moment().add(util[req.membership.toLowerCase()].limit, 'days').format('YYYY-MM-DD')
    };
    return body;
  }

  /**
   * 
   * @param { Object } user
   * @returns { string } tokens
   */
  static generateToken(user) {
    const token = jwt.sign({
      id: user.id,
      email: user.email,
      membership: user.membership,
      role: user.role
    }, secret, { expiresIn: '24h' });

    return token;
  }


  /**
   * 
   * @param { number } arg
   * @param { string } characters
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
   * @param { string } userEmail
   * @param { string } passwordUrl
   * @returns { string } email
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
      subject: 'Password reset link',
      html: `<h1>RESET YOUR PASSWORD</h1>
      <p>You requested to reset your password</p>
      <p><a href="mylife/${passwordUrl}">Click here to reset your password</a></p>`
    };

    mailCourier.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });
  }
}

export default Helper;
