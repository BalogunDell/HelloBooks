
import model from '../models';
import {
  findOneResource,
} from '../utils/queryFinder';
import Helper from './Helper';

require('dotenv').config();

const userModel = model.User;

/**
 * @class authentication
 * 
 * @classdesc creates an authentication class
 */
class Authentication {
  /**
   * @description This method here verifies if the user is an administrator
   * 
   * @member Authentication 
   * 
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
        errorMessage: 'You do not have the permission to access this page' });
    } else {
      const decoded = Helper.decodeToken(authorization);
      if (decoded.role === 'user') {
        res.status(403).json({
          errorMessage: 'You do not have the permission to access this page'
        });
      } else {
        next();
      }
    }
  }

  /**
   * @description This method verifies if a user is a regular user
   * 
   * @member Authentication 
   * 
   * @param { object } req  - request object
   * @param { object} res   - response object
   * @param { object } next - method to pass action to next controller
   * 
   * @returns { object } - modified body object
   */
  static verifyUser(req, res, next) {
    const { authorization } = req.headers;
    const { userId } = req.params;

    if (!authorization) {
      return res.status(403).json({
        errorMessage: 'You do not have the permission to access this page'
      });
    }
    const decoded = Helper.decodeToken(authorization);
    if (parseInt(userId, 10) !== decoded.id) {
      return res.status(403).json({
        errorMessage: 'You do not have the permission to access this page'
      });
    }
    findOneResource(userModel, { where:
      { email: decoded.email,
        id: decoded.id,
        role: decoded.role }
    }).then((user) => {
      if (user) {
        req.body.userId = decoded.id;
        req.membership = decoded.membership;
        return next();
      }
    }).catch(() => {
      res.status(500).json({
        errorMessage: 'Internal server error'
      });
    });
  }
  /**
   * @description This method verifies if the given url is valid
   * 
   * @member Authentication 
   * 
   * @param { object } req  - request object
   * @param { object } res  - response object
   * @param { object } next - method to pass action to next controller
   * 
   * @returns { object }    - modified body object
   */
  static verifyUrl(req, res, next) {
    const { resetUrl } = req.params;
    if (resetUrl.length !== 12) {
      res.status(400).json({ message: 'This link is invalid' });
    } else {
      findOneResource(userModel, { where: { passwordReseturl: resetUrl } })
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

  /**
   * @description This method checks if a user can see all books in the libary
   * 
   * @param { object } req  - request object
   * @param { object } res  - response object
   * @param { object } next - method to pass action to next controller
   * 
   * @method Authentication
   * 
   * @returns { object }    - modified body object
   */
  static confirmLibraryAccess(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({
        errorMessage: 'Only logged in users can see all books' });
    } else {
      findOneResource(userModel, { where:
        { passwordReseturl: req.params.resetUrl } })
        .then((response) => {
          const decoded = Helper.decodeToken(authorization);
          findOneResource(userModel, { where: { id: decoded.id } });
          if (response.dataValues.id === decoded.id) {
            return res.status(401).json({
              message: 'Only logged in users can see all books' });
          }
          return next();
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
