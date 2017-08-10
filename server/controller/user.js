import bcrypt from 'bcrypt';
import model from '../models';
import helper from '../middleware/helper';

require('dotenv').config();

const userModel = model.users;
const borrowedBookModel = model.borrowedbooks;

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
    userModel.create(req.body)
      .then((user) => {
        const token = helper.generateToken(user.dataValues);
        res.status(201).json({ message: 'User created', data: user, token });
      })
      .catch((error) => {
        if (error.name === 'SequelizeValidationError') {
          res.status(400).json({ message: error.errors[0].message });
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
          const token = helper.generateToken(user.dataValues);
          const response = {
            message: 'signed in',
            data: { token }
          };
          res.status(200).json({ response });
        } else {
          res.status(404).json({ message: 'Invalid email or password' });
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
        userid: req.body.userid
      };
    } else if (returnStatus === 'false') {
      query.where = {
        $and: [
          { userid: req.body.userid },
          { returnstatus: false }
        ]
      };
    } else {
      query.where = {
        $and: [
          { userid: req.body.userid },
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
