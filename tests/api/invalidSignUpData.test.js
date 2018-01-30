

import chai from 'chai';
import supertest from 'supertest';
import app from '../../server/index';
import mockdata from './mockData';

require('dotenv').config();

const expect = chai.expect;
const request = supertest(app);
const api = '/api/v1';
const userAPI = '/api/v1/users';
let userId = 3;


//************************************//
  //*****TEST FOR INVALID SIGNUP DATA**//
  //**********************************//

  describe('INVALID DATA: ', () => {
    it('should not register user if firstname contains numbers',
      (done) => {
        request
        .post(`${userAPI}/signup`)
        .send('Accept', 'Application/json')
        .send(mockdata.user1InvalidDataFirstname)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message)
            .to.equal('Firstname can only contain alphabets');
          done();
        });
      });

    it('should not register user if firstname is empty', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1InvalidDataFirstnameEmpty)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.equal('Firstname is required');
        done();
      });
    });

    it('should not register user if lastname is empty', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1InvalidDataEmptyLastname)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Lastname is required');
        done();
      });
    });

    it('should check if the length of lastname is less than 2', (done) => {
      request
      .post(`${userAPI}/signup`)
      .set('Content-Type', 'application/json')
      .send(mockdata.user1InvalidDataEmptyLastname)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Lastname is required');
        done();
      });
    });

    it('should check if lastname contains numbers', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1InvalidDataLastnamellength)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.equal('Lastname should be two or more characters');
        done();
      });
    });
    
    it('should check if email is invalid', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1InvalidEmail)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Provided email is invalid');
        done();
      });
    });

    it('should not register user if email is empty', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1EmptyEmail)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Email is required');
        done();
      });
    });

    it('should not register user if email is empty', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1IncompleteData2)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Email is required');
        done();
      });
    });

      it('should check if email is not defined', (done) => {
        request
        .post(`${userAPI}/signup`)
        .send('Accept', 'Application/json')
        .send(mockdata.user1InvalidDataNoEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Email is required');
          done();
        });
    });

    it('should not register user if username is empty', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1IncompleteData4)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Username is required');
        done();
      });
    });

    it('should not register user if usename is undefined ', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1IncompleteDataMissingUsername)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Username is required');
        done();
      });
    });


    it('should check if username is already taken ', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1IncompleteData6)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Username taken, use another');
        done();
      });
    });

    it('should check if password is empty', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1IncompleteData7)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Password is required');
        done();
      });
    });

    it('should check if password is less than 5 characters', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1IncompleteData8)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.equal('Password should not be less than 5 characters');
        done();
      });
    });

    it('should check if password is less than 5 characters', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1IncompleteDataMissingPass)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Password is required');
        done();
      });
    });

    it('should ensure access is not granted for wrong admin credentials',
    (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1InvalidLogin)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal('Invalid username or password');
        done();
      });
    });
  });