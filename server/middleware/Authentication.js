import jwt from 'jsonwebtoken';
import model from '../models';
import {
  findOneResource,
  findOneResourceById,
  findAllResources
} from '../utils/queryFinder';

require('dotenv').config();

const userModel = model.User;
const secret = process.env.SECRET;

/**
 * @class authentication
 * 
 * @classdesc creates an authentication class
 */
class Authentication {
  /**
   * @param { object } req   - request object
   * @param { object} res    - response object
   * @param { object } next  - method to pass action to next controller
   * 
   * @returns { object }     - response object
   */
  static verifyAdmin(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(403).json({
        errorMessage: 'Access Denied - You do not have the permission to access this page' });
    } else {
      const decoded = jwt.verify(authorization, secret);
      if (decoded.role === 'user') {
        res.status(403).json({
          message: 'Access Denied'
        });
      } else {
        next();
      }
    }
  }

  /**
   * @param { object } req  - request object
   * @param { object} res   - response object
   * @param { object } next - method to pass action to next controller
   * 
   * @returns { object } - modified body object
   */
  static verifyUser(req, res, next) {
    const { authorization } = req.headers;
    console.log(req.body);
    if (!authorization) {
      res.status(403).json({
        message: 'Access Denied - You do not have the permission to access this page'
      });
    } else {
      const decoded = jwt.verify(authorization, secret);
      findOneResource(userModel, { where:
        { email: decoded.email,
          id: decoded.id }
      }).then((user) => {
        if (user) {
          req.body.userId = decoded.id;
          req.membership = decoded.membership;
          next();
        } else {
          res.status(404).json({ message: 'User does not exist' });
        }
      }).catch(() => {
        res.status(500).json({
          message: 'Internal server error'
        });
      });
    }
  }
  /**
   * @param { object } req  - request object
   * @param { object } res  - response object
   * @param { object } next - method to pass action to next controller
   * 
   * @returns { object }    - modified body object
   */
  static verifyUrl(req, res, next) {
    if (req.params.resetUrl.length !== 12) {
      res.status(400).json({ message: 'This link is invalid' });
    } else {
      userModel.findOne({ where: { passwordReseturl: req.params.resetUrl } })
        .then((response) => {
          if (response.dataValues.passwordReseturl === '') {
            res.status(404).json({ message: 'This link has expired' });
          } else {
            next();
          }
        })
        .catch(() => {
          res.status(500).json({
            message: 'Internal server error'
          });
        });
    }
  }
}

export default Authentication;
