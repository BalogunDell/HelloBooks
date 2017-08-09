import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import model from '../models';
import helper from '../middleware/helper';

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
  static getUserBooks(req, res) {
    const returnStatus = req.query.returned;
    const query = {};

    if (returnStatus === undefined) {
      query.where = {
        userid: req.userid
      };
    } else if (returnStatus === 'false') {
      query.where = {
        $and: [
          { userid: req.userid },
          { returnstatus: false }
        ]
      };
    } else {
      query.where = {
        $and: [
          { userid: req.userid },
          { returnstatus: true }
        ]
      };
    }

    borrowedBookModel.findAll(query)
      .then((response) => {
        // res.send(response);
        res.status(200).json(response);
      }).catch((error) => {
        res.status(404).json({ message: error });
      });
  }

  /**
   * @param { object } req 
   * @param { object } res
   * @returns { void }
   */
  static booksReturned(req, res) {
    const returnStatus = req.query.returned;
    borrowedBookModel.findAll({ where: { returnstatus: returnStatus } }).then((response) => {
      if (response.length === 0) {
        res.status(200).json({ message: 'You have not returned any book' });
      } else {
        res.status(200).json(response);
      }
    }).catch((error) => {
      res.send(404).json({ message: error });
    });
  }

  /**
   * @param { object } req 
   * @param { object } res
   * @returns { object } returns object
   */
  static returnBook(req, res) {
    borrowedBookModel.update({ approvedreturn: true },
      { where: { userid: req.body.userid, bookid: req.body.bookid } })
      .then((book) => {
        if (book) {
          res.status(200).json({ message: 'Book has been returned' });
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
}
export default User;
