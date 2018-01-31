process.env.NODE_ENV = 'test'

import chai from 'chai';
import supertest from 'supertest';
import app from '../../server/index';
import mockdata from './mockData';
import jwt from 'jsonwebtoken';
import fakeUsers from '../../server/seeds/users';
import fakeBooks from '../../server/seeds/books';
import models from '../../server/models/index';
import categories from '../../server/seeds/category';

require('dotenv').config();

const expect = chai.expect;
const request = supertest(app);
const secret = process.env.SECRET;
let userToken;
let adminToken;
const api = '/api/v1';
const userAPI = '/api/v1/users';
let userId;
let generatedUrl= 'uFUhdjHDJjdf';
    


  //**********************************//
  //********TEST USER SIGNUP ******* //
  //**********************************//

  describe('User registration > ', () => {
    it('should register a user when valid data is given' , (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('responseData');
        expect(res.body.responseData).to.have.property('message');
        expect(res.body.responseData.message).to.equal('User created');
        expect(res.body.responseData).to.have.property('user');
        expect(res.body.responseData.user).to.have.property('username');
        expect(res.body.responseData.user.username).to.equal('abbey');
        expect(res.body.responseData.user).to.have.property('userId');
        expect(res.body.responseData.user.userId).to.equal(4);
        expect(res.body.responseData.user).to.have.property('userRole');
        expect(res.body.responseData.user.userRole).to.equal('user');
        expect(res.body.responseData.user).to.have.property('imageUrl');
        expect(res.body.responseData.user.imageUrl).to.equal(null);
        done();
      });
    });
  });


  describe('User Authentication > ', () => {
    it('should log a user with valid credentials into the app' , (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1Login)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('responseData');
        expect(res.body.responseData).to.have.property('token');
        expect(res.body.responseData).to.have.property('user');
        expect(res.body.responseData.user).to.have.property('username');
        expect(res.body.responseData.user.username)
          .to.equal(mockdata.user1Login.username);
        expect(res.body.responseData.user).to.have.property('userId')
        expect(res.body.responseData.user.userId).to.equal(4);
        expect(res.body.responseData.user).to.have.property('userRole');
        expect(res.body.responseData.user.userRole).to.equal('user');
        expect(res.body.responseData.user).to.have.property('imageUrl');
        expect(res.body.responseData.user.imageUrl).to.equal(null);
        done();
      });
    });

    it('should not log a user with invalid credentials in' , (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send({
        email: 'hellobooks@gmail.com',
        password: 'testtesttest'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.be.equal('Username and password are both required');
        done();
      });
    });

    it('should not log a user with empty username into the app' , (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send({
        username: '',
        password: 'testtesttest'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.be.equal('Username and password are both required');
        done();
      });
    });

    it('should check if username length is less than 2' , (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send({
        username: 'w',
        password: 'testtesttest'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.be.equal('Username should be two or more characters');
        done();
      });
    });


    it('should check if both login credentials are empty' , (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send({
        username: '',
        password: ''
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.be.equal('Username and password are both required');
        done();
      });
    });

    it('should not log a user with password length less than 5' , (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send({
        username: 'rweqrqer',
        password: 'erew'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.be.equal('Password should not be less than 5 characters');
        done();
      });
    });
  });


  describe('Admin Authentication > ' , () => {
    it('should be able to login with the right credentials', (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send(mockdata.adminSigninData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('responseData');
        expect(res.body.responseData).to.have.property('token');
        expect(res.body.responseData).to.have.property('user');
        expect(res.body.responseData.user).to.have.property('userId');
        expect(res.body.responseData.user).to.have.property('username');
        expect(res.body.responseData.user).to.have.property('userRole');
        expect(res.body.responseData).to.have.property('message');
        expect(res.body.responseData.message).to.equal('signed in');
        expect(res.body.responseData.user.username)
        .to.equal(mockdata.adminSigninData.username);
        done();
      });
    });
  });















