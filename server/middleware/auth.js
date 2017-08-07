import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import model from '../models';

require('dotenv').config();

const userModel = model.users;
const borrowedBookModel = model.borrowedbooks;

const secret = process.env.SECRET;

/**
 * @class authentication
 * @classdesc creates an authentication class
 */
class Authentication {
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
   * @param { object} res 
   * @returns { object } response
   */
  static verifyAdmin(req, res) {
    // console.log(req.headers.authorization);
    const decoded = jwt.verify(req.headers.authorization, secret);
    if (decoded.membership !== 'admin') {
      console.log('you cannot access this route');
    } else {
      console.log('welcome');
    }
  }

  /**
   * @param { object } req --- request object
   * @param { object} res  ---response object
   * @returns { object } --- return object
   */
  static verifyUser(req, res, next) {
    console.log(req.headers.authorization);
    const decoded = jwt.verify(req.headers.authorization, secret);
    userModel.findOne({ where: { email: decoded.email, id: decoded.id } }).then((user) => {
      if (user) {
        req.body.userid = user.id;
        next();
      } else {
        res.status(401).json({ message: 'User does not exist' });
      }
    }).catch((error) => {
      console.log(error);
      res.status(401).json({ message: 'Invalid/expired token' });
    });
  }
}

export default Authentication;
