import bcrypt, { genSaltSync } from 'bcrypt';
import model from '../models';
import helper from '../middleware/helper';
import errorMessages from '../middleware/errorMessages';


require('dotenv').config();


const userModel = model.user;
const borrowedBookModel = model.borrowedbook;
const bookModel = model.book;


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
        res.status(201).json({ responseData: {
          message: 'User created',
          username: user.username,
          userID: user.id,
          userRole: user.role,
          image: user.image,
          token
        }
        });
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
            res.status(501).json({ error: messageObject.error });
        }
      });
  }


  /**
   * @param { object } req
   * @param { object} res
   * @returns { object } response
   */
  static signin(req, res) {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ message: 'Provide your username and password to login' });
    }
    return userModel.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (user !== null && bcrypt.compareSync(req.body.password, user.dataValues.password)) {
          const token = helper.generateToken(user.dataValues);
          const responseData = {
            message: 'signed in',
            token,
            username: user.username,
            userID: user.id,
            userRole: user.role,
            image: user.image };
          res.status(200).json({ responseData });
        } else {
          res.status(404).json({ message: 'Invalid username or password' });
        }
      })
      .catch(() => {
        res.status(404).json({ message: 'Invalid username or password' });
      });
  }

  /**
   * @param { object } req
   * @param { object } res
   * @returns { object } generated url for password reset
   */
  static generateResetPassUrl(req, res) {
    if (!req.body.email) {
      res.status(400).json({ message: 'Your registered email is required' });
    } else {
      const lastWord = req.body.email.substring(req.body.email.lastIndexOf('.') + 1);
      const dotPosition = req.body.email.lastIndexOf('.');
      const atPosition = req.body.email.indexOf('@');
      if (lastWord.length < 2 || dotPosition < atPosition || atPosition === -1) {
        res.status(400).json({ message: 'Invalid email' });
      } else {
        userModel.findOne({ where: { email: req.body.email } })
          .then((response) => {
            if (response) {
              const resetPassUrl = helper.urlGenerator(12, process.env.CHARACTERS);
              userModel.update({ passurl: resetPassUrl }, { where:
                { email: req.body.email } })
                .then(() => {
                  helper.generateMail(req.body.email, resetPassUrl)
                    .then((mailerResponse) => {
                      if (mailerResponse.accepted[0] === req.body.email) {
                        res.status(201).json({
                          message: 'A link for password reset has been sent to your email',
                          url: resetPassUrl });
                      }
                    })
                    .catch((mailerError) => {
                      res.status(501).json({ message: mailerError });
                    });
                })
                .catch((error) => {
                  res.status(201).json({ error });
                });
            } else {
              res.status(404).json({ message: 'This email does not exist in our database' });
            }
          })
          .catch((error) => {
            res.status(501).json({ message: error });
          });
      }
    }
  }


  /**
   * @param { object } req
   * @param { object } res
   * @returns { object } message that password has been changed
   */
  static resetPassword(req, res) {
    const resetUrl = req.params.resetUrl;
    const newPassword = req.body.password;
    if ((!newPassword) || (newPassword === '')) {
      res.status(400).json({ message: 'Please type in your new password' });
    } else if (newPassword.length < 6) {
      res.status(400).json({ message: 'Password should not be less than 5 characters' });
    } else {
      const hashP = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
      console.log(hashP);
      userModel.update({ password: hashP }, { where: { passurl: resetUrl },
        individualHooks: true },
      { fields: ['password'] })
        .then(() => {
          userModel.update({ passurl: '' }, { where: { passurl: resetUrl } })
            .then(() => {
              res.status(201).json({ message: 'Your password has been updated' });
            })
            .catch((err) => {
              res.status(500).json({ err });
            });
        })
        .catch((error) => {
          res.status(500).json({ error });
          console.log(error);
        });
    }
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
          { returnstatus: false },
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

    borrowedBookModel.findAll({ where: query.where, include: [{ model: bookModel }] })
      .then((response) => {
        if (response.length < 1) {
          res.status(200).json({ message: 'You have no books yet' });
        } else {
          res.status(200).json({ response });
        }
      }).catch((error) => {
        res.status(404).json({ message: error.errors[0].message });
      });
  }
  /**
   * 
   * @param { object } req
   * @param { object } res
   * @returns { object } user detail
   */
  static profilePage(req, res) {
    if (!req.headers.authorization) {
      res.status(401)
        .json({ message: 'Invalid/Expired token' });
      // other implementations
    } else {
      const userid = parseInt(req.params.userId, 10);
      userModel.findById(userid)
        .then((user) => {
          if (user) {
            res.status(200).json({ user });
          } else {
            res.status(404).json({ message: 'User not found' });
          }
        })
        .catch(() => {
          res.status(501).json({ message: 'Cannot implement request now, please try again' });
        });
    }
  }

  /**
   * 
   * @param { object } req
   * @param { object } res
   * @returns {object} object
   */
  static editProfile(req, res) {
    const userData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      image: req.body.image
    };
    const fieldsToUpdate = ['firstname', 'lastname', 'username', 'image'];
    userModel.update(userData, { where: { id: req.body.userid }, individualHooks: true },
      { fields: fieldsToUpdate }).then((response) => {
      res.status(201).json({ data: response[1] });
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
            res.status(501).json({ error: messageObject.error });
        }
      });
  }
}

export default User;
