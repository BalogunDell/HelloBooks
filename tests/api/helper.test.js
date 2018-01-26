import chai from 'chai';
import supertest from 'supertest';
import app from '../../server/index';
import jwt from 'jsonwebtoken';
import Helper from '../../server/middleware/Helper';
import models from '../../server/models/index';
import categories from '../../server/seeds/category';

require('dotenv').config();

const expect = chai.expect;

describe('Url Generator Function', () => {
    it('should check if a random string is generated', () => {
      const result = Helper.urlGenerator(12, process.env.CHARACTERS);
      const resultLength = result.length;
      expect(resultLength).to.equal(12);
    });
  });