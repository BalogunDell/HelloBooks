import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import model from '../models';

require('dotenv').config();

const userModel = model.users;

const secret = process.env.SECRET;

/**
 * @class authentication
 * @classdesc creates an authentication class
 */
class Authentication {
  static signin(req, res) {
    userModel.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user && bcrypt.compare(req.body.password, user.dataValues.password)) {
          const token = jwt.sign({
            id: user.dataValues.id,
            email: user.dataValues.email,
            membership: user.dataValues.membership
          }, secret, { expiresIn: '24h' });

          const response = {
            message: 'signed in',
            data: { token }
          };

          res.status(200).send(response);
        } else {
          res.status(404).send({ message: 'user does not exist' });
        }
      })
      .catch(err => res.send(err));
  }
}

export default Authentication;
