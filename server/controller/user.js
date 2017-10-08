import bcrypt from 'bcrypt';
import model from '../models';
import helper from '../middleware/helper';


require('dotenv').config();


const userModel = model.users;
const borrowedBookModel = model.borrowedbooks;
const booksModel = model.books;


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
        res.status(501).json({ message: error.errors[0].message });
      });
  }


  /**
   * @param { object } req
   * @param { object} res
   * @returns { object } response
   */
  static signin(req, res) {
    userModel.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (user && bcrypt.compareSync(req.body.password, user.dataValues.password)) {
          const token = helper.generateToken(user.dataValues);
          const responseData = {
            message: 'signed in',
            token,
            username: user.username,
            userID: user.id,
            userRole: user.role,
            image: user.image };
          res.status(200).json({ responseData });
        } else if (!req.body.username || !req.body.password) {
          res.status(404).json({ message: 'Username and password is required' });
        } else {
          res.status(404).json({ message: 'Invalid username or password' });
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
    const returnStatus = req.query;
    const query = {};

    if (returnStatus === {}) {
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

    borrowedBookModel.findAll({ query, include: [{ model: booksModel }] })
      .then((response) => {
        if (response.length < 1) {
          res.status(200).json({ message: 'You have no books yet' });
        } else {
          res.status(200).json({ response });
        }
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
        res.status(200).json({ returned: response });
      }
    }).catch((error) => {
      res.status(404).json({ message: error });
    });
  }

  /**
   * @param { object } req
   * @param { object } res
   * @returns { object } response is an object of users
   */
  static getAllUsers(req, res) {
    userModel.findAll()
      .then((response) => {
        if (response) {
          res.status(200).json({ users: response });
        } else {
          res.status(404).json({ response: 'Database is empty' });
        }
      }).catch((error) => {
        res.status(500).json({ response: error });
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
      userModel.findById(req.body.userid).then((user) => {
        res.send(user);
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
    userModel.update(req.body, { where: { id: req.body.userid }, individualHooks: true }).then((response) => {
      res.status(201).json({ data: response[1] });
    })
      .catch((error) => {
        res.status(501).json({ message: error.errors[0].message });
      });
  }
}

export default User;
