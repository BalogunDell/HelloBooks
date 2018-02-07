
import model from '../models';
import { findOneResource } from '../utils/queryFinder';
import Helper from './Helper';

require('dotenv').config();

const userModel = model.User;

/**
 * @class Authentication
 * 
 * @classdesc creates an Authentication class used as middleware
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
      res.status(401).json({
        message: 'You do not have the permission to access this page' });
    } else {
      Helper.decodeToken(authorization)
        .then((decoded) => {
          if (!decoded) {
            return res.status(401).json({
              message: 'You do not have the permission to access this page'
            });
          }
          if (decoded.role !== process.env.ACCESS_GRANTOR) {
            return res.status(403).json({
              message: 'You do not have the permission to access this page'
            });
          }
          return next();
        })
        .catch((err) => {
          const { name } = err;
      
          if (name === 'TokenExpiredError') {
            res.status(401).json({
              message: 'Session Expired!'
            });
          }
        });
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
  static async verifyUser(req, res, next) {
    const { authorization } = req.headers;
    const { userId } = req.params;
    if (!authorization) {
      return res.status(401).json({
        message: 'You do not have the permission to access this page'
      });
    }
    Helper.decodeToken(authorization)
      .then((decoded) => {
        if (parseInt(userId, 10) !== decoded.id) {
          return res.status(403).json({
            message: 'You do not have the permission to access this page'
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
          res.status(401).json({
            message: 'You do not have the permission to access this page'
          });
        });
      })
      .catch((err) => {
        const { name } = err;

        if (name === 'TokenExpiredError') {
          res.status(401).json({
            message: 'Session Expired!'
          });
        }
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
      findOneResource(userModel, { where: { passwordResetUrl: resetUrl } })
        .then((response) => {
          if (!response) {
            res.status(400).json({ message: 'This link has expired' });
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
   * @memberof Authentication
   * 
   * @returns { object }    - modified body object
   */
  static confirmLibraryAccess(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        message: 'Only logged in users can see all books' });
    }
    Helper.decodeToken(authorization)
      .then((decoded) => {
        if (!decoded) {
          return res.status(401).json({
            message: 'Your token is either invalid or it has expired' });
        }
        findOneResource(userModel, { where: { id: decoded.id } })
          .then((reply) => {
            if (reply.dataValues.id === decoded.id) {
              return next();
            }
          }).catch(() => {
            return res.status(401).json({
              message: 'Only logged in users can see all books' });
          }).catch(() => {
            res.status(500).json({
              message: 'Internal server error'
            });
          });
      })
      .catch((err) => {
        const { name } = err;

        if (name === 'TokenExpiredError') {
          res.status(401).json({
            message: 'Session Expired!'
          });
        }
      });
  }
}

export default Authentication;

