import chai from 'chai';
import jwt from 'jsonwebtoken';
import Helper from '../../../server/middleware/Helper';

require('dotenv').config();
const expect = chai.expect;

describe('Url Generator Function > ', () => {
    it('should check if a random string is generated', () => {
      const result = Helper.urlGenerator(12, process.env.CHARACTERS);
      const resultLength = result.length;
      expect(resultLength).to.equal(12);
    });
  });

  describe('Generate Token and Decode Token > ', () => {
    it('should generate valid token', () => {
     const user = {
      id:2,
      email: "test@gmail.com",
      membership:"bronze",
      role: "user"

      }
      const result = Helper.generateToken(user)
      Helper.decodeToken(result).then((decoded) => {
        expect(decoded.id).to.equal(user.id)
        expect(decoded.email).to.equal(user.email)
        expect(decoded.membership).to.equal(user.membership)
        expect(decoded.role).to.equal(user.role)
      })
      .catch((error) => {

      });
    });
  });

  