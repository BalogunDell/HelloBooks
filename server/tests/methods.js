process.env.NODE_ENV = 'test'

import { expect } from 'chai';
import { should } from 'chai';
import supertest from 'supertest';
import app from '../server/index';
import mockdata from '../server/utils/mockdata';
import jwt from 'jsonwebtoken';
import controller from '../server/controller/user';

require('dotenv').config();

const testApp = supertest(app);
const secret = process.env.SECRET;

describe('Methods', () => {
  it('should create a user', (done) => {
    testApp(controller.sigin())
    .set('Action', 'application/json')
    .send({ email: 'user1Email', password: 'user1password' })
    .expect(201, done);
    

  });
}); 