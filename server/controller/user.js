import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import model from '../models';

require('dotenv').config();

const userModel = model.users;
const borrowedBookModel = model.borrowedbooks;
const bookModel = model.books;

const secret = process.env.SECRET;
/**
 * @class User
 *@classdesc creates a class User
 */
class User {
  /**
   * @param { object } req 
   * @param { object } res
   * @returns { void }
   */
  static signup(req, res) {
    userModel.create(req.body).then(() => {
      res.status(200).json({ message: 'User created' });
    }).catch((error) => {
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
  static signin(req, res) {
    userModel.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user && bcrypt.compareSync(req.body.password, user.dataValues.password)) {
          const token = jwt.sign({
            id: user.dataValues.id,
            email: user.dataValues.email,
            membership: user.dataValues.membership,
            role: user.dataValues.role
          }, secret, { expiresIn: '24h' });

          const response = {
            message: 'signed in',
            data: { token }
          };
          res.status(201).send(response);
        } else {
          res.status(404).send({ message: 'user does not exist' });
        }
      })
      .catch(err => res.send(err));
  }
  /**
   * @param { object } req
   * @param { object } res
   * @returns { void }
   */
  static borrowbook(req, res) {
    const decoded = jwt.verify(req.headers.authorization, secret);
    borrowedBookModel.findAndCountAll({ where: { userid: decoded.id,
      approvedreturn: false } }).then((response) => {
      // Check if user is silver and has 5 books that are yet to be returned
      if (decoded.membership === 'Silver' && response.count === 5) {
        console.log('You can not borrow any book again');
      } else {
        this.borrowBookHelper(req, res);
      }

      // Check if user is Bronze and has 1 books that is yet to be returned
      if (decoded.membership === 'Bronze' && response.count === 1) {
        console.log('You can not borrow any book again');
      } else {
        this.borrowBookHelper(req, res);
      }
      // Check if user is Gold and has 1 books that is yet to be returned
      if (decoded.membership === 'Gold' && response.count === 8) {
        console.log('You can not borrow any book again');
      } else {
        // borrowBookHelper(req, res);
      }
    });
  }

  /**
   * @param { object } req 
   * @param { object } res
   * @returns { void }
   */
  static booksNotReturned(req, res) {
    const returnStatus = req.query.returned;
    borrowedBookModel.findOne({ where: { returnstatus: returnStatus } }).then((response) => {
      res.status(200).json(response);
    }).catch((error) => {
      res.send(404).json({ message: error });
    });
  }
  /**
   * @param { object } req 
   * @param { object } res
   * @returns { object } returns object
   */
  static Returnbook(req, res) {
    borrowedBookModel.update({ approvedreturn: true },
      { where: { userid: req.body.userid, bookid: req.body.bookid } })
      .then((book) => {
        if (book) {
          res.status(200).json({ message: 'Return awaiting confirmation' });
        } else {
          res.status(401).json({ message: 'Book already approved' });
        }
      }).catch((error) => {
        res.send(404).json({ message: error });
      });
  }

  /**
   * @param { object } req 
   * @param { object } res
   * @returns { void }
   */
  static getAllUsers(req, res) {
    borrowedBookModel.findAll().then((response) => {
      res.status(200).json(response);
    }).catch((error) => {
      res.send(error.message);
    });
  }

  /**
   * 
   * @param {object} req -Request object 
   * @param {object} res - Response object
   * @returns { object} - returns an object
   */
  static borrowBookHelper(req, res) {
    // check books table if the quantity of (this) book is not 0
    bookModel.findOne({ where: { id: req.body.bookid } }).then((bookObject) => {
      if (bookObject.quantity !== 0) {
        //
        // If book is available in books table, 
        // check if user has already borrowed this book
        //
        borrowedBookModel.findOne({ where: { bookid: req.body.bookid } }).then((response) => {
          if (response == null) {
            //
            // If no, create book and set the expected return date to 5 days from borrow date
            //
            borrowedBookModel.create(req.body).then((bookSaved) => {
              if (bookSaved) {
                //
                // Once book is created in borrowed books table
                // update quantity in the books table
                //
                bookModel.update({ quantity: bookObject.quantity - 1 },
                  { where: { id: req.body.bookid } }).then(() => {
                  res.status(201).json({ message: 'You have borrowed a book' });
                });
              }
            });
          } else {
            // Show message if user has already borrowed the book
            res.status(409).json({ message: 'You can not borrow the same book', res: response });
          }
        });
      } else {
        // Show message if quantity is 0 in the books table
        res.status(404).json({ message: 'Book not available for borrow' });
      }
    });
  }
}

export default User;
