import chai from 'chai';
import supertest from 'supertest';
import app from '../../server/index';
import mockdata from './mockData';

require('dotenv').config();
const api = '/api/v1';
const userAPI = '/api/v1/users';
const expect = chai.expect;
const request = supertest(app);


//***********************************//
//*****TEST FOR RESET PASSWORD*******//
//**********************************//

  describe('Password Reset > ', () => {
    it('should return a message when passed an empty email', (done) => {
      request
      .post(`${api}/resetpassword`)
      .accept('Content-Type', 'Application/json')
      .send({email: ''})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Email is required');
        done();
      });
    });

    it('should return a message when passed an invalid email', (done) => {
      request
      .post(`${api}/resetpassword`)
      .accept('Content-Type', 'Application/json')
      .send({email: 'invalidEmail'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Provide your valid email');
        done();
      });
    });

    it('should return a message when passed an unregistered email', (done) => {
      request
      .post(`${api}/resetpassword`)
      .accept('Content-Type', 'Application/json')
      .send({email: 'tst@gmail.com'})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.equal('This email does not exist in our database');
        done();
      });
    });
  });