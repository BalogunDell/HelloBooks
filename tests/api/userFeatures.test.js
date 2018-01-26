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

// Seeds
  before((done) => {
    models.sequelize.sync({force:true}, {individualHooks: true})
    .then(() => {
      done();
    })
  });

  // Save admin and normal user, sign them in and get token
  before((done) => {
    models.user.bulkCreate(fakeUsers.users, {individualHooks: true})
    .then(() => {
      request
      .post(`${userAPI}/signin`)
      .send({
        username: fakeUsers.users[0].username,
        password: fakeUsers.users[0].password
      })
      .end((err, res) => {
        adminToken=res.body.responseData.token;
      });
    })
    .then(() => {
      request
      .post(`${userAPI}/signin`)
      .send({
        username: fakeUsers.users[1].username,
        password: fakeUsers.users[1].password})
        
      .end((err, res) => {
        userToken=res.body.responseData.token;
        userId = res.body.responseData.user.userID;
        done();
      });
    });
  })
  
  //Load sample category before test
  before((done) => {
    models.category.bulkCreate(categories.categories, {individualHooks: true})
    .then(() => {
      done();
    })
  });


  //Load sample book before test
  before((done) => {
    models.book.bulkCreate(fakeBooks.books, {individualHooks: true})
    .then(() => {
      done();
    })
  });


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

// Seeds
  before((done) => {
    models.sequelize.sync({force:true}, {individualHooks: true})
    .then(() => {
      done();
    })
  });

  // Save admin and normal user, sign them in and get token
  before((done) => {
    models.user.bulkCreate(fakeUsers.users, {individualHooks: true})
    .then(() => {
      request
      .post(`${userAPI}/signin`)
      .send({
        username: fakeUsers.users[0].username,
        password: fakeUsers.users[0].password
      })
      .end((err, res) => {
        adminToken=res.body.responseData.token;
      });
    })
    .then(() => {
      request
      .post(`${userAPI}/signin`)
      .send({
        username: fakeUsers.users[1].username,
        password: fakeUsers.users[1].password})
        
      .end((err, res) => {
        userToken=res.body.responseData.token;
        userId = res.body.responseData.user.userID;
        done();
      });
    });
  })
  
  //Load sample category before test
  before((done) => {
    models.category.bulkCreate(categories.categories, {individualHooks: true})
    .then(() => {
      done();
    })
  });


  //Load sample book before test
  before((done) => {
    models.book.bulkCreate(fakeBooks.books, {individualHooks: true})
    .then(() => {
      done();
    })
  });


  //**********************************//
  //********TEST USER SIGNUP ******* //
  //**********************************//

  describe('User registration', () => {
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
        expect(res.body.responseData.user).to.have.property('userID');
        expect(res.body.responseData.user.userID).to.equal(4);
        expect(res.body.responseData.user).to.have.property('userRole');
        expect(res.body.responseData.user.userRole).to.equal('user');
        expect(res.body.responseData.user).to.have.property('imageUrl');
        expect(res.body.responseData.user.imageUrl).to.equal(null);
        done();
      });
    });
  });


  describe('User Authentication:', () => {
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
        expect(res.body.responseData.user).to.have.property('userID')
        expect(res.body.responseData.user.userID).to.equal(4);
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
        expect(res.body).to.have.property('error');
        expect(res.body.error)
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
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('error');
        expect(res.body.error)
          .to.be.equal('Provide your username and password to login');
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
        expect(res.body).to.have.property('error');
        expect(res.body.error)
          .to.be.equal('Username should be two or more characters');
        done();
      });
    });


    it('should check if login credentials are empty' , (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send({
        username: '',
        password: ''
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('error');
        expect(res.body.error)
          .to.be.equal('Provide your username and password to login');
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
        expect(res.body).to.have.property('error');
        expect(res.body.error)
          .to.be.equal('Password should not be less than 5 characters');
        done();
      });
    });
  });


  describe('Admin Authentication: ' , () => {
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
        expect(res.body.responseData.user).to.have.property('userID');
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


  //************************************//
  //*****TEST FOR INVALID SIGNUP DATA**//
  //**********************************//

  describe('Invalid User Signup', () => {
    it('should not register user if firstname contains numbers',
      (done) => {
        request
        .post(`${userAPI}/signup`)
        .send('Accept', 'Application/json')
        .send(mockdata.user1InvalidDataFirstname)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error)
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
        expect(res.body).to.have.property('error');
        expect(res.body.error)
          .to.equal('Firstname should be two or more characters');
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
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Lastname is required');
        done();
      });
    });

    it('should check if the length of lastname is less than 2', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1InvalidDataEmptyLastname)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Lastname is required');
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
        expect(res.body).to.have.property('error');
        expect(res.body.error)
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
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Provided email is invalid');
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
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Email is required');
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
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Email cannot be empty');
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
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Email is required');
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
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Username cannot be empty');
        done();
      });
    });

    // Check for invalid username
    it('should not register user if usename is undefined ', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1IncompleteDataMissingUsername)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Username is required');
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
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Username taken, use another');
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
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Password cannot be empty');
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
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Password cannot be empty');
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
        expect(res.body).to.have.property('error');
        expect(res.body.error)
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
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Password is required');
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

  //***********************************//
  //*****TEST FOR RESET PASSWORD*******//
  //**********************************//

  describe('Generate Unique Password Reset Url', () => {
    it('should return a message when passed an empty email', (done) => {
      request
      .post(`${api}/resetpassword`)
      .accept('Content-Type', 'Application/json')
      .send({email: ''})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Email is required');
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
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Provide your valid email');
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
 
  describe('Protected Routes:', () => {
    it('should not allow users access these routes without token' , (done) => {
      request
      .post(`${api}/newcategory`)
      .send({category: 'Health'})
      .end((err, res) => {
      expect(res.status).to.equal(403);
      expect(res.body).to.have.property('message');
      expect(res.body.message)
        .to.equal('Access Denied - You do not have the permission to access this page');
      done();
      });
    });

    it('should not allow users access these routes without token' , (done) => {
      request
      .post(`${api}/books`)
      .send(mockdata.bookdata)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.equal('Access Denied - You do not have the permission to access this page');
        done();
      });
    });

    it('should not allow users access these routes without token' , (done) => {
      request
      .post(`${api}/googleuser/dfgddfgd`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('This is an invalid route');
        done();
      });
    });

    it('should not allow users access these routes without token' , (done) => {
      request
      .post(`${userAPI}/login/dfgddfgd`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('This is an invalid route');
        done();
      });
    });

    it('should not allow users access these routes without token' , (done) => {
      request
      .put(`${api}/books/${1}`)
      .send(mockdata.editBookdata2)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.equal('Access Denied - You do not have the permission to access this page');
        done();
      });
    });

    it('should not allow users access these routes without token' , (done) => {
      request
      .post(`${api}/books/${1}`)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.equal('Access Denied - You do not have the permission to access this page');
        done();
      });
    });

    it('should not allow users access these routes without token' , (done) => {
      request
      .delete(`${api}/books/${1}`)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.equal('Access Denied - You do not have the permission to access this page');
        done();
      });
    });

    it('should not allow users access these routes without token' , (done) => {
      request
      .get(`${api}/books/${1}`)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.equal('Access Denied - You do not have the permission to access this page');
        done();
      });
    });

    it('should not allow users access these routes without token' , (done) => {
      request
      .get(`${api}/books/borrowedbooks`)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.equal('Access Denied - You do not have the permission to access this page');
        done();
      });
    });

    it('should not allow users access these routes without token' , (done) => {
      request
      .get(`${api}/books/all`)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.equal('Access Denied - You do not have the permission to access this page');
        done();
      });
    });

    it('should not allow users access these routes without token' , (done) => {
      request
      .get(`${api}/users/${2}/books`)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.equal('Access Denied - You do not have the permission to access this page');
        done();
      });
    });

    it('should send a message when users visits invalid routes' , (done) => {
      request
      .get(`${api}/jdfidjfdsf`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('This is an invalid route');
        done();
      });
    });

    it('should send a message when users visits invalid routes' , (done) => {
      request
      .get(`${api}/jgjkfjgjfgjfhgh`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('This is an invalid route');
        done();
      });
    });

    it('should send a message when users visits invalid routes' , (done) => {
      request
      .get(`${api}/users/dsfadfadsf`)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.equal('Access Denied - You do not have the permission to access this page');
        done();
      });
    });
  });






















  describe('User Features: ', () => {
    it('should fetch user books' , (done) => {
      request
      .get(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.have.equal('You have no books yet');
        done();
      });
    });

    it('should fetch books returned by users', (done) => {
      request
      .get(`${userAPI}/${userId}/books?returned=true`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('You have no books yet');
        done();
      })
    });

    it('should allow user borrow a book', (done) => {
      request
      .post(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .send({bookid: 1})
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('returnDate');
        done();
      });
    });

    it('should not allow user borrow the same book', (done) => {
      request
      .post(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .send({bookid: 1})
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('You have either exhausted your book limit or you still have this book with you');
        done();
      });
    });

    it('should check if a user can still borrow more books', (done) => {
      request
      .post(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .send({bookid: 2})
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('You have either exhausted your book limit or you still have this book with you');
        done();
      });
    });

    it('should not allow a user borrow a book that does not exist in database', (done) => {
      request
      .post(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .send({bookid: 20})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book not found')
        done();
      });
    });

    it('should fetch books borrowed by a user', (done) => {
      request
      .get(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response');
        expect(res.body.response).to.be.an('array');
        expect(res.body.response[0]).to.have.property('id');
        expect(res.body.response[0]).to.have.property('userid');
        expect(res.body.response[0]).to.have.property('bookid');
        expect(res.body.response[0]).to.have.property('dateborrowed');
        expect(res.body.response[0]).to.have.property('expectedreturndate');
        expect(res.body.response[0]).to.have.property('returnstatus');
        expect(res.body.response[0]).to.have.property('approvedreturn');
        expect(res.body.response[0]).to.have.property('createdAt');
        expect(res.body.response[0]).to.have.property('updatedAt');
        expect(res.body.response[0]).to.have.property('book');
        expect(res.body.response[0].book).to.be.an('object');
        expect(res.body.response[0].id).to.be.a('number');
        expect(res.body.response[0].userid).to.be.a('number');
        expect(res.body.response[0].bookid).to.be.a('number');
        expect(res.body.response[0].dateborrowed).to.be.a('string');
        expect(res.body.response[0].expectedreturndate).to.be.a('string');
        expect(res.body.response[0].returnstatus).to.be.a('boolean');
        expect(res.body.response[0].approvedreturn).to.be.a('boolean');     
        done();
      })
    });

    it('should fetch books borrowed by users and not returned', (done) => {
      request
      .get(`${userAPI}/${userId}/books?returned=false`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response');
        expect(res.body.response).to.be.an('array');
        expect(res.body.response[0]).to.have.property('id');
        expect(res.body.response[0]).to.have.property('userid');
        expect(res.body.response[0]).to.have.property('bookid');
        expect(res.body.response[0]).to.have.property('dateborrowed');
        expect(res.body.response[0]).to.have.property('expectedreturndate');
        expect(res.body.response[0]).to.have.property('returnstatus');
        expect(res.body.response[0]).to.have.property('approvedreturn');
        expect(res.body.response[0]).to.have.property('createdAt');
        expect(res.body.response[0]).to.have.property('updatedAt');
        expect(res.body.response[0]).to.have.property('book');
        expect(res.body.response[0].book).to.be.an('object');
        expect(res.body.response[0].id).to.be.a('number');
        expect(res.body.response[0].userid).to.be.a('number');
        expect(res.body.response[0].bookid).to.be.a('number');
        expect(res.body.response[0].dateborrowed).to.be.a('string');
        expect(res.body.response[0].expectedreturndate).to.be.a('string');
        expect(res.body.response[0].returnstatus).to.be.a('boolean');
        expect(res.body.response[0].approvedreturn).to.be.a('boolean');
        done();
      })
    });

    it('should allow user return a book', (done) => {
      request
      .put(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .send({bookid: 1})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      })
    });

    it('should fetch books returned by users', (done) => {
      request
      .get(`${userAPI}/${userId}/books?returned=true`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response');
        expect(res.body.response).to.be.an('array');
        expect(res.body.response[0].userid).to.equal(userId);
        expect(res.body.response[0].bookid).to.equal(1);

        done();
      })
    });

    it('should return user profile details', (done) => {
      request
      .get(`${userAPI}/${userId}`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('user');
        expect(res.body.user).to.have.property('id');
        expect(res.body.user).to.have.property('firstname');
        expect(res.body.user).to.have.property('lastname');
        expect(res.body.user).to.have.property('email');
        expect(res.body.user).to.have.property('username');
        expect(res.body.user).to.have.property('password');
        expect(res.body.user).to.have.property('membership');
        expect(res.body.user).to.have.property('createdAt');
        expect(res.body.user).to.have.property('updatedAt');
        expect(res.body.user).to.have.property('imageUrl');
        expect(res.body.user.firstname).to.equal('david');
        expect(res.body.user.lastname).to.equal('brook');
        expect(res.body.user.email).to.equal('david@mail.com');
        expect(res.body.user.username).to.equal('username');
        expect(res.body.user.role).to.equal('user');
        expect(res.body.user.membership).to.equal('bronze');
        expect(res.body.user.passwordReseturl).to.equal('uFUhdjHDJjdg');
        done();
      });
    });

    it('should not get user profile details if no token is provided', (done) => {
      request
      .get(`${userAPI}/${userId}`)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Access Denied - You do not have the permission to access this page');
        done();
      });
    });

    it('should edit user profile', (done) => {
      request
      .put(`${userAPI}/${userId}`)
      .set('Authorization', userToken)
      .send(mockdata.userEdit)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.user).to.have.a.property('id');
        expect(res.body.user).to.have.a.property('firstname');
        expect(res.body.user).to.have.a.property('lastname');
        expect(res.body.user).to.have.a.property('username');
        expect(res.body.user.id).to.be.a('number');
        expect(res.body.user.firstname).to.equal(mockdata.userEdit.firstname);
        expect(res.body.user.lastname).to.equal(mockdata.userEdit.lastname);
        expect(res.body.user.username).to.equal(mockdata.userEdit.username);
        done();
      });
    })
  });

  describe('Reset Password:', () => {

    it('it checks if new password is sent as body', (done) => {
      request
      .put(`${api}/resetpassword/${generatedUrl}`)
      .accept('Content-Type', 'Application/json')
      .send({password: ''})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Please type in your new password');
        done();
      });
    });

    it('it checks if new password length is between 6 and 30', (done) => {
      request
      .put(`${api}/resetpassword/${generatedUrl}`)
      .accept('Content-Type', 'Application/json')
      .send({password: '123'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Password should not be less than 5 characters');
        done();
      });
    });

    it('should update password if given valid request body', (done) => {
      request
      .put(`${api}/resetpassword/uFUhdjHDJjdg`)
      .accept('Content-Type', 'Application/json')
      .send({password: '123456'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Your password has been updated');
        done();
      });
    });

    it('should check if the given url is invalid', (done) => {
      request
      .put(`${api}/resetpassword/uFUhdDJjdg`)
      .accept('Content-Type', 'Application/json')
      .send({password: 'abeebyere'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('This link is invalid');
        done();
      });
    });
  });



















