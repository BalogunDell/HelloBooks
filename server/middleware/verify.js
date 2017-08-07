import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import model from '../models';

require('dotenv').config();

const secret = process.env.SECRET;

/**
 * @class verify user
 * @classdesc verifies if user is admin, user or other
 */
class VerifyRole {
  /**
   * @param { req } 
   * @param { res }
   * @returns { object }
   */
  static verifyUser(req, res) {
    // console.log(req.headers.authorization);
    const det = jwt.verify(req.headers.authorization, secret);
    console.log(det);
  }
}

export default VerifyRole;
