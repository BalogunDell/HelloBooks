import chai from 'chai';
import supertest from 'supertest';
import app from '../../server/index';
import mockdata from './mockData';

require('dotenv').config();
const api = '/api/v1';
const expect = chai.expect;
const request = supertest(app);


describe('Google User Login' , () => {
    it('should log a new user in', (done) => {
      request
      .post(`${api}/googleuser`)
      .accept('Content-Type', 'Application/json')
      .send(mockdata.user1Login)
      .end((err, res) => {
        done();
      });
    })
  });