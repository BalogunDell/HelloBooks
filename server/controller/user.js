import model from '../models';

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
   * @param { object } res
   * @returns { void }
   */
  static borrowbook(req, res) {
    borrowedBookModel.create(req.body).then(() => {
      res.status(200).json({ message: 'Book added' });
    }).catch((error) => {
      res.send(error.message);
    });
  }
}

export default User;
