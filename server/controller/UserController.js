import bcrypt from 'bcrypt';
import model from '../models';
import helper from '../middleware/Helper';
import errorMessages from '../middleware/errorMessages';
import paramValid from '../utils/paramValid';
import {
  findOneResourceById,
  findAllResources,
  findOneResource
} from '../utils/queryFinder';


require('dotenv').config();

const userModel = model.User;
const borrowedBookModel = model.BorrowedBook;
const bookModel = model.Book;
 

/**
 * @class User
 * 
 * @classdesc creates a class User
 */
class UserController {
  /**
   * @description This method handles a new user registration
   * 
   * @param { object } req - request object
   * @param { object } res - response object
   * 
   * @returns { object } server response 
   */
  static signup(req, res) {
    userModel.create(req.body)
      .then((user) => {
        const token = helper.generateToken(user.dataValues);
        res.status(201).json({ responseData: {
          message: 'User created',
          token,
          user: {
            username: user.username,
            userId: user.id,
            userRole: user.role,
            imageUrl: user.imageUrl,
          }
        }
        });
      })
      .catch((error) => {
        const messageObject = errorMessages(error);
        switch (messageObject.type) {
          case 'uniqueError':
            res.status(409).json({ errorMessage: messageObject.error });
            break;
          case 'validationError':
            res.status(400).json({ errorMessage: messageObject.error });
            break;
          default:
            res.status(500).json({
              errorMessage: 'Internal server error'
            });
        }
      });
  }

  /**
   * @description This method allows a user login with their google account
   * 
   * @param { object } req - request object
   * @param { object} res  - response object
   * 
   * @returns { object } user data with token
   */
  static newGoogleAccess(req, res) {
    findOneResource(userModel, { where:
      {
        email: req.body.email,
      }
    })
      .then((response) => {
        if (response) {
          const token = helper.generateToken(response.dataValues);
          const responseData = {
            message: 'signed in',
            token,
            user: {
              username: response.dataValues.username,
              userID: response.dataValues.id,
              userRole: response.dataValues.role,
              imageUrl: response.dataValues.imageUrl
            } };
          return res.status(200).json({ responseData });
        }
        return UserController.signup(req, res);
      })
      .catch(() => {
        return res.status(500)
          .json({
            errorMessage: 'Internal server error'
          });
      });
  }

  /**
   * @description This method signs a registered user in
   * 
   * @param { object } req - request object
   * @param { object} res  - response object
   * 
   * @returns { object } user data with token 
   */
  static signin(req, res) {
    return userModel.findOne({ where: {
      username: req.body.username
    }
    })
      .then((user) => {
        if (user !== null
          &&
          bcrypt.compareSync(req.body.password, user.dataValues.password)) {
          const token = helper.generateToken(user.dataValues);
          const responseData = {
            message: 'signed in',
            token,
            user: {
              username: user.username,
              userID: user.id,
              userRole: user.role,
              imageUrl: user.imageUrl
            }
          };
          return res.status(200).json({ responseData });
        }
        return res.status(401).json({
          errorMessages: 'Invalid username or password'
        });
      })
      .catch((error) => {
        const messageObject = errorMessages(error);
        switch (messageObject.type) {
          case 'validationError':
            res.status(400).json({
              errorMessage: messageObject.error
            });
            break;
          default:
            res.status(500).json({
              errorMessage: 'Internal server error'
            });
        }
      });
  }

  /**
   * @description For password reset, this method generates and sends emails
   * 
   * @param { object } req  - request object
   * @param { object } res  - response object
   * 
   * @returns { object }  - generated url for password reset
   */
  static generateResetPassUrl(req, res) {
    userModel.findOne({ where: { email: req.body.email } })
      .then((response) => {
        if (response) {
          const resetPassUrl = helper.urlGenerator(12, process.env.CHARACTERS);
          userModel.update({ passwordReseturl: resetPassUrl },
            { where: { email: req.body.email } })
            .then(() => {
              helper.generateMail(req.body.email, resetPassUrl)
                .then((mailerResponse) => {
                  if (mailerResponse.accepted[0] === req.body.email) {
                    res.status(201).json({
                      message: 'A password reset link has been sent to your email',
                      url: resetPassUrl });
                  }
                })
                .catch((mailerError) => {
                  res.status(500).json({
                    errorMessage: mailerError
                  });
                });
            })
            .catch((error) => {
              res.status(501).json({ errorMessage: error });
            });
        } else {
          res.status(404).json({
            errorMessage: 'This email does not exist in our database'
          });
        }
      })
      .catch(() => {
        res.status(500).json({ errorMessage: 'Internal server error' });
      });
  }


  /**
   * @description This method resets the password using the sent link
   * 
   * @param { object } req request object
   * @param { object } res response object
   * 
   * @returns { object } message that password has been changed
   */
  static resetPassword(req, res) {
    const {
      password,
      passwordResetUrl
    } = req.body;

    userModel.update({
      password }, { where: { passwordResetUrl },
      individualHooks: true },
    { fields: ['password'] })
      .then(() => {
        userModel.update({
          passwordReseturl: ''
        }, { where: {
          passwordResetUrl
        }
        })
          .then(() => {
            res.status(200).json({
              message: 'Your password has been updated'
            });
          })
          .catch(() => {
            res.status(500).json({
              errorMessage: 'Internal server error'
            });
          });
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: 'Internal server error'
        });
      });
  }

  /**
   * @description This method gets all the books of a particular user
   * 
   * @param {object} req request object
   * @param {object} res response object
   * 
   * @returns {object} user books as response
   */
  static getUserBooks(req, res) {
    const { returned: returnStatus } = req.query;
    const { userId } = req.body;
    const query = {};
    if (returnStatus === undefined) {
      query.where = {
        userId
      };
    } else if (returnStatus === 'false') {
      query.where = {
        $and: [
          { userId: req.body.userId },
          { returnstatus: false },
        ]
      };
    } else {
      query.where = {
        $and: [
          { userId: req.body.userId },
          { returnstatus: true }
        ]
      };
    }
    findAllResources(borrowedBookModel, ({
      where: query.where,
      include: [{ model: bookModel }]
    }))
      .then((response) => {
        if (!response) {
          res.status(200).json({ message: 'You have no books yet' });
        } else {
          res.status(200).json({ response });
        }
      }).catch(() => {
        res.status(500).json({
          message: 'Internal server error'
        });
      });
  }
  /**
   * @description This method fetches the profile page of a user
   * 
   * @param {object} req request object
   * @param {object} res response object
   * 
   * @returns {object} user details
   */
  static profilePage(req, res) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403)
        .json({
          message: 'Access Denied - You do not have the permission to access this page' });
    }
    if (paramValid(req.params.userId)) {
      return res.status(400)
        .json({
          message: 'Bad request' });
    }
    const userId = parseInt(req.params.userId, 10);
    findOneResourceById(userModel, userId)
      .then((user) => {
        if (user) {
          return res.status(200).json({ user });
        }
        return res.status(404).json({ errorMessage: 'User not found' });
      })
      .catch(() => {
        res.status(500).json({ errorMessage: 'Internal server error' });
      });
  }

  /**
   * @description This method allows a user edit his/her profile
   * 
   * @param { object } req requet object
   * @param { object } res response object
   * 
   * @returns {object} edited user profile
   */
  static editProfile(req, res) {
    const userData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      imageUrl: req.body.imageUrl
    };
    const fieldsToUpdate = ['firstname', 'lastname', 'username', 'imageUrl'];
    const { userId } = req.body;
    findOneResourceById(userModel, userId).then(() => {
    });
    userModel.update(userData,
      {
        where: {
          id: userId
        },
        individualHooks: true
      },
      { fields: fieldsToUpdate }).then((response) => {
      res.status(200).json({ user: response[1][0] });
    })
      .catch((error) => {
        const messageObject = errorMessages(error);
        switch (messageObject.type) {
          case 'uniqueError':
            res.status(409).json({ error: messageObject.error });
            break;
          case 'validationError':
            res.status(400).json({ error: messageObject.error });
            break;
          default:
            res.status(500).json({
              error: 'Internal server error'
            });
        }
      });
  }
}

export default UserController;

