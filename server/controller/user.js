import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import model from '../models';

require('dotenv').config();

const userModel = model.users;
const borrowedBookModel = model.borrowedbooks;

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
          console.log(bcrypt.compareSync(req.body.password, user.dataValues.password));
          const token = jwt.sign({
            id: user.dataValues.id,
            email: user.dataValues.email,
            membership: user.dataValues.membership
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
    borrowedBookModel.create(req.body).then(() => {
      res.status(200).json({ message: 'Book added' });
    }).catch((error) => {
      res.status(400).json({ message: error.message });
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
