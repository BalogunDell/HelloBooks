import chai from 'chai';
import supertest from 'supertest';
import app from '../../server/index';
import mockdata from './mockData';

require('dotenv').config();
const api = '/api/v1';
const expect = chai.expect;
const request = supertest(app);


describe('Google User Login > ' , () => {
    it('should log a new user in', (done) => {
      request
      .post(`${api}/googleuser`)
      .accept('Content-Type', 'Application/json')
      .send(mockdata.googleUser1)
      .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('responseData');
          expect(res.body.responseData).to.have.property('token');
          expect(res.body.responseData).to.have.property('message');
          expect(res.body.responseData).to.have.property('user');
          expect(res.body.responseData.user).to.have.property('userId');
        done();
      });
    });

    it('should log an old user in', (done) => {
        request
        .post(`${api}/googleuser`)
        .accept('Content-Type', 'Application/json')
        .send(mockdata.user1)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('responseData');
            expect(res.body.responseData).to.have.property('token');
            expect(res.body.responseData).to.have.property('message');
            expect(res.body.responseData).to.have.property('user');
            expect(res.body.responseData.user).to.have.property('userId');
          done();
        });
      });
  });