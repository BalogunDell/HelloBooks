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
 * @class UserController
 * 
 * @classdesc creates a UserController class that handles users actions
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
            googleUser: user.googleUser
          }
        }
        });
      })
      .catch((error) => {
        const messageObject = errorMessages(error);
        switch (messageObject.type) {
          case 'uniqueError':
            res.status(409).json({ message: messageObject.error });
            break;
          case 'validationError':
            res.status(400).json({ message: messageObject.error });
            break;
          default:
            res.status(500).json({
              message: 'Internal server error'
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

    const { email } = req.body;

    findOneResource(userModel, { where:
      {
        email,
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
              userId: response.dataValues.id,
              userRole: response.dataValues.role,
              imageUrl: response.dataValues.imageUrl,
              googleUser: response.dataValues.googleUser
            } };
          return res.status(200).json({ responseData });
        }
        return UserController.signup(req, res);
      })
      .catch(() => {
        return res.status(500)
          .json({
            message: 'Internal server error'
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
    const { username } = req.body;
    return userModel.findOne({ where: {
      username
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
              userId: user.id,
              userRole: user.role,
              imageUrl: user.imageUrl,
              googleUser: user.googleUser
            }
          };
          return res.status(200).json({ responseData });
        }
        return res.status(401).json({
          message: 'Invalid username or password'
        });
      })
      .catch((error) => {
        const messageObject = errorMessages(error);
        switch (messageObject.type) {
          case 'validationError':
            res.status(400).json({
              message: messageObject.error
            });
            break;
          default:
            res.status(500).json({
              message: 'Internal server error'
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
    const { email } = req.body;
    findOneResource(userModel, { where: { email } })
      .then((response) => {
        if (response) {
          const resetPasswordUrl = helper.urlGenerator(12,
            process.env.CHARACTERS);
          userModel.update({ passwordResetUrl: resetPasswordUrl },
            { where: { email } })
            .then(() => {
              helper.generateMail(req.body.email, resetPasswordUrl)
                .then((mailerResponse) => {
                  if (mailerResponse.accepted[0] === req.body.email) {
                    res.status(201).json({
                      message: 'A password reset link has been sent to your email',
                      url: resetPasswordUrl });
                  }
                })
                .catch((mailerError) => {
                  res.status(500).json({
                    message: mailerError
                  });
                });
            });
        } else {
          res.status(404).json({
            message: 'This email does not exist in our database'
          });
        }
      })
      .catch(() => {
        res.status(500).json({ message: 'Internal server error' });
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
    const { password } = req.body;
    const { resetUrl } = req.params;

    userModel.update({
      password }, { where: { passwordResetUrl: resetUrl },
      individualHooks: true },
    { fields: ['password'] })
      .then(() => {
        userModel.update({
          passwordResetUrl: ''
        }, { where: {
          passwordResetUrl: resetUrl
        }
        })
          .then(() => {
            res.status(200).json({
              message: 'Your password has been updated'
            });
          });
      })
      .catch(() => {
        res.status(500).json({
          message: 'Internal server error'
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
          { returnStatus: false },
        ]
      };
    } else {
      query.where = {
        $and: [
          { userId: req.body.userId },
          { returnStatus: true }
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
    if (paramValid(req.params.userId)) {
      return res.status(400)
        .json({
          message: 'Bad request' });
    }
    const userId = parseInt(req.params.userId, 10);
    findOneResourceById(userModel, userId)
      .then((user) => {
        if (user) {
          const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            imageUrl: user.imageUrl,
            membership: user.membership,
            googleUser: user.googleUser,
            role: user.role,
            createdAt: user.createdAt
          };
          return res.status(200).json({ userData });
        }
        return res.status(404).json({ message: 'User not found' });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Internal server error' });
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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      imageUrl: req.body.imageUrl
    };
    const fieldsToUpdate = ['firstName', 'lastName', 'username', 'imageUrl'];
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
      const {
        firstName,
        lastName,
        username,
        imageUrl,
        email,
        createdAt,
        updatedAt } = response[1][0];
      const user = {
        firstName,
        lastName,
        username,
        imageUrl,
        email,
        createdAt,
        updatedAt
      };
      res.status(200).json({ user });
    })
      .catch((error) => {
        const messageObject = errorMessages(error);
        switch (messageObject.type) {
          case 'uniqueError':
            res.status(409).json({ message: messageObject.error });
            break;
          case 'validationError':
            res.status(400).json({ message: messageObject.error });
            break;
          default:
            res.status(500).json({
              message: 'Internal server error'
            });
        }
      });
  }

  /**
   * @description This method allows a user edit his/her profile
   * 
   * @param { object } req requet object
   * @param { object } res response object
   * 
   * @returns { object } edited user profile
   */
  static editPassword(req, res) {
    const {
      currentPassword,
      newPassword } = req.body;
    const fieldToUpdate = ['password', 'googleUser'];
    const { userId } = req.body;

    findOneResourceById(userModel, userId)
      .then((response) => {
        const { password } = response.dataValues;
        if (password && bcrypt.compareSync(currentPassword, password)) {
          const hashedPassword = bcrypt.hashSync(newPassword,
            bcrypt.genSaltSync(10));
          userModel.update({
            password: hashedPassword,
            googleUser: false },
          { where: {
            id: userId
          },
          fieldToUpdate
          }).then(() => {
            res.status(200).json({
              message: 'Your password has been successfully changed'
            });
          }).catch(() => {
            res.status(500).json({
              message: 'Internal server error'
            });
          });
        } else {
          res.status(401).json({
            message: 'The password you provided is incorrect'
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          message: 'Internal server error'
        });
      });
  }
}

export default UserController;

