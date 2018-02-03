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

  