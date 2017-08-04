import model from '../models';

const userModel = model.users;

/**
 * @class User
 *@classdesc creates a class User
 */
class User {
  /**
   * @param { 0bject } req 
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
}

export default User;
