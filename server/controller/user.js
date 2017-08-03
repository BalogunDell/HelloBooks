import model from '../models';

const userModel = model.users;

/**
 * @class User
 *@desc creates a class User
 */
class User {
  /*
   * @param {Object} req
   * @param {Object} res
   * @return null
   */
  static signup(req, res) {
    userModel.create(req.body).then(() => {
      res.status(201).json({ message: 'User created' });
    }).catch((error) => {
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ message: 'One or more fields are empty' });
      } else {
        res.json(error);
      }
    });
  }
}


export default User;
