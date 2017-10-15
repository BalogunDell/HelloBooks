process.env.NODE_ENV = 'test'

import { expect } from 'chai';
import supertest from 'supertest';
import app from '../server/index';
import mockdata from '../server/utils/mockdata';
import jwt from 'jsonwebtoken';
import fakeUsers from '../server/seeds/users';
import fakeBooks from '../server/seeds/books';
import models from '../server/models/index';
import categories from '../server/seeds/category';

require('dotenv').config();

const request = supertest(app);
const secret = process.env.SECRET;
let userToken;
let adminToken;
const api = '/api';
const userAPI = '/api/users';
let userId;

// Seeds


describe('Hellobooks API', () => {
  // Sync database
  before((done) => {
    models.sequelize.sync({force:true}, {individualHooks: true})
    .then(() => {
      done();
    })
  });

  // Save admin and normal user, sign them in and get token
  before((done) => {
    models.users.bulkCreate(fakeUsers.users, {individualHooks: true})
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
        userId = res.body.responseData.userID;
        console.log('user', userToken, 'admin', adminToken)
        done();
      });
    });
  })

  //Load sample category before test
  before((done) => {
    models.categories.bulkCreate(categories.categories, {individualHooks: true})
    .then(() => {
      done();
    })
  });


  //Load sample book before test
  before((done) => {
    models.books.bulkCreate(fakeBooks.books, {individualHooks: true})
    .then(() => {
      done();
    })
  });


  //**********************************//
  //********TEST THE HOME PAGE******* //
  //**********************************//

  describe('Homepage', () => {
    it('Should return welcome to libary api', (done) => {
      request
        .get(api)
        .expect(200, done);
    });
  });

  //**********************************//
  //********TEST GET BOOKS*********** //
  //**********************************//

  describe('Get books', () => {
    it('should return list of books', (done) => {
      request
      .get(`${api}/books/`)
      .end((err, res, body) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('books')
        done();
      });
    })
  });

  //**********************************//
  //********TEST USER SIGNUP ******* //
  //**********************************//

  describe('User registration', () => {
    it('should register a user' , (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('responseData');
        done();
      });
    });
  });

  //**********************************//
  //********TEST USER SIGNIN ******* //
  //**********************************//

  describe('User Sign in', () => {
    it('should log a user in' , (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1Login)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('responseData');
        expect(res.body.responseData).to.have.property('token');
        done();
      });
    });
  });

  //**********************************//
  //********TEST USER FEATURES ******* //
  //**********************************//

  describe('User Actions', () => {
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

    it('should allow user return a book', (done) => {
      request
      .put(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .send({bookid: 1})
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      })
    });

    it('should get user profile', (done) => {
      request
      .get(`${userAPI}/${userId}`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('firstname');
        expect(res.body).to.have.property('lastname');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('username');
        expect(res.body).to.have.property('password');
        expect(res.body).to.have.property('membership');
        expect(res.body).to.have.property('createdAt');
        expect(res.body).to.have.property('updatedAt');
        expect(res.body).to.have.property('image');
        done();
      });
    });

    it('should edit user profile', (done) => {
      request
      .put(`${userAPI}/${userId}`)
      .set('Authorization', userToken)
      .send(mockdata.userEdit)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data[0]).to.have.a.property('id');
        expect(res.body.data[0]).to.have.a.property('firstname');
        expect(res.body.data[0]).to.have.a.property('lastname');
        expect(res.body.data[0]).to.have.a.property('username');
        done();
      });
    })
  });
  describe('Admin Login' , () => {
    it('should be able to login ', (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send(mockdata.adminSigninData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('responseData');
        expect(res.body.responseData).to.have.property('token');
        expect(res.body.responseData).to.have.property('userID');
        expect(res.body.responseData).to.have.property('username');
        expect(res.body.responseData).to.have.property('userRole');
        expect(res.body.responseData).to.have.property('message');
        expect(res.body.responseData.message).to.equal('signed in');
        done();
      });
    });
  });

  describe('Admin' , () => {
    it('should upload a book', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.bookdata)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        done();
      });
    });

    it('should edit a book', (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.editBookdata)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book modified successfully');
        done();
      });
    });

    it('should get a book', (done) => {
      request
      .get(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message.id).to.equal(mockdata.editBookdata.id);
        done();
      })
    })

    it('should delete a book', (done) => {
      request
      .delete(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book has been successfully deleted');
        expect(res.body).to.have.property('updatedBooks');
        done();
      });
    });

    it('should restore deleted book', (done) => {
      request
      .post(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book has been published');
        done();
      });
    });
  });
});






















