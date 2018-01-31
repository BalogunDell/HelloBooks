
import chai from 'chai';
import supertest from 'supertest';
import app from '../../server/index';
import mockdata from './mockData';

require('dotenv').config();

const api = '/api/v1';
const userAPI = '/api/v1/users';
const expect = chai.expect;
const request = supertest(app);
let generatedUrl= 'uFUhdjHDJjdf';




describe('Reset Password:', () => {

    it('checks if new password is sent as body', (done) => {
      request
      .put(`${api}/resetpassword/${generatedUrl}`)
      .accept('Content-Type', 'Application/json')
      .set('Content-Type', 'Application/json')
      .send({password: ''})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Please type in your new password');
        done();
      });
    });

    it('checks if new password length is between 5 and 30', (done) => {
      request
      .put(`${api}/resetpassword/${generatedUrl}`)
      .set('Content-Type', 'application/json')
      .send({password: '123'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to
          .equal('Password should not be less than 5 characters');
        done();
      });
    });

    it('should check if the given url is invalid', (done) => {
      request
      .put(`${api}/resetpassword/uFUhdDJjdg`)
      .set('Content-Type', 'Application/json')
      .send({password: 'abeebyere'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('This link is invalid');
        done();
      });
    });

    it('should reset the password', (done) => {
      request
      .put(`${api}/resetpassword/uFUhdjHDJjdf`)
      .set('Content-Type', 'Application/json')
      .send({password: 'abeebyere'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Your password has been updated');
        done();
      });
    });

    it('should not reset password twice', (done) => {
      request
      .put(`${api}/resetpassword/uFUhdjHDJjdf`)
      .set('Content-Type', 'Application/json')
      .send({password: 'abeebyere'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('This link has expired');
        done();
      });
    });

    it('should sigin a google user in', (done) => {
      request
      .put(`${api}/googleuser`)
      .set('Content-Type', 'Application/json')
      .send(mockdata.user1)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });