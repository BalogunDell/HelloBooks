process.env.NODE_ENV = 'test'

import { expect } from 'chai';
import supertest from 'supertest';
import app from '../server/index';
import mockdata from '../server/utils/mockdata';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const request = supertest(app);
const secret = process.env.SECRET;
let userToken;
let adminToken;

/**
 * @desc describes and tests the home route
 * @return 200 succes
 */

 describe('Homepage', () => {
  it('Should return welcome to libary api', (done) => {
    request
      .get('/api/')
      .set('Accept', 'Application/json')
      .expect(200, done);
  });
});

/**
 * @desc describes and tests the signup api route
 * @return 201 succes
 */

describe('User signup', (done) => {

  // test for success with valid data for user
  it('should be able to signup - User', (done) => {
    request
    .post('/api/users/signup')
    .set('Accept', 'Application/json')
    .send(mockdata.user1)
    .expect(201, done) 
    });

    // test for success with valid data for admin
  it('Should be able to signup - Admin', (done) => {
    request
    .post('/api/users/signup')
    .set('Accept', 'Application/json')
    .send(mockdata.adminData)
    .expect(201, done) 
    });

 });
describe('User signin', (done) => {

  // test for user sign in
  it('Should be able to sign in and get a token - User', (done) => {
    request
    .post('/api/users/signin')
    .set('Accept', 'Application/json')
    .send(mockdata.user1Login)
    .end((error, res) =>{
      userToken = res.body.response.data.token;
    done()
    }); 
});



describe('User signin', (done) => {

  // test for user sign in
  it('should not allow login with invalid email', (done) => {
    request
    .post('/api/users/signin')
    .set('Accept', 'Application/json')
    .send(mockdata.invalidadmin)
      .end((error, res) => {
          expect({ message: 'Invalid email or password'});
          expect(401, done);
          done();
      }); 
    });

  // test for user sign in
  it('should not allow login with invalid email', (done) => {
    request
    .post('/api/users/signin')
    .set('Accept', 'Application/json')
    .send(mockdata.invaliduser)
      .end((error, res) => {
          expect({ message: 'Invalid email or password'});
          expect(401);
          done();
      }); 
    });

});

describe('Wrong User Credentials', (done) => {

  it('Should not be able to sign in - User', (done) => {
    request
    .post('/api/users/signin')
    .set('Accept', 'Application/json')
    .set('authorization', '')
    .expect(404, done);
      }); 
    });

  
  it('Should be able to sign it and get a token - Admin', (done) => {
    request
    .post('/api/users/signin')
    .set('Accept', 'Application/json')
    .send(mockdata.adminLogin)
    .end((error, res) =>{
      adminToken = res.body.response.data.token;
      console.log(res.body);
      expect(200);
    done();
      }); 
    });
 });



describe('Unathorized User' , () => {
 it('Should not be able to access this page', (done) => {
    request
    .post('/api/books')
    .set('Authorization', userToken)
    .send(mockdata.bookdata)
    .expect(401)
    .end((error, res) => {
        if(error) return done(error);
        done();
    });
   });
 });

describe('Upload books' , () => {
 it('Should be able to upload books', (done) => {
    request
    .post('/api/books')
    .set('Authorization', adminToken)
    .send(mockdata.bookdata)
    .expect(201, done);
   });
});

describe('Get books - Admin' , () => {
 it('Should be able to get books without signing in', (done) => {
    request
    .get('/api/books')
    .set('Authorization', adminToken)
    .expect('Content-Type', /json/)
    .expect(200, done);
   });
});

describe('Modify books - Admin' , () => {
 it('Should be able to modify books', (done) => {
    request
    .put('/api/books/1')
    .set('Authorization', adminToken)
    .send(mockdata.modifyBookData)
    .expect('Content-Type', /json/)
    .expect(200, done);
   });
});

describe('Get books - User' , () => {
 it('Should be able to get books without signing in', (done) => {
    request
    .get('/api/books')
    .set('Authorization', userToken)
    .expect('Content-Type', /json/)
    .expect(200, done);
   });
});

describe('Get books - User' , () => {
 it('Should be able to get books after signing in', (done) => {
    request
    .get('/api/users/:id/books')
    .set('Authorization', userToken)
    .send(mockdata.userID)
    .expect('Content-Type', /json/)
    .expect(200, done);
   });
});

describe('Borrow Books' , () => {
 it('Should allow users borrow books', (done) => {
    request
    .post('/api/users/:id/books')
    .set('Authorization', userToken)
    .send(mockdata.borrowBook)
    .expect('Content-Type', /json/)
    .expect(201, done);
   });
});

describe('Unauthorized Access' , () => {
 it('Should not allow users without token to borrow books', (done) => {
    request
    .post('/api/users/:id/books')
    .set('Authorization', '')
    .send(mockdata.borrowBook)
    .expect('Content-Type', /json/)
    .expect(401, done);
   });
});

describe('Return Books' , () => {
 it('Should allow users return books', (done) => {
    request
    .put('/api/users/:id/books')
    .set('Authorization', userToken)
    .send(mockdata.borrowBook)
    .expect('Content-Type', /json/)
    .expect(200, done);
   });
});

describe('Unauthorized Access' , () => {
 it('Should not allow users without token to return books', (done) => {
    request
    .put('/api/users/:id/books')
    .set('Authorization', '')
    .send(mockdata.borrowBook)
    .expect('Content-Type', /json/)
    .expect(401, done);
   });
});


describe('Borrow book' , () => {
 it('Should not allow users to borrow book when the body is malformatted', (done) => {
    request
    .put('/api/users/:id/books')
    .set('Authorization', userToken)
    .send(mockdata.failborrowBook)
    .expect('Content-Type', /json/)
    .expect(400, done());
   });
});

describe('Validate book details' , () => {
 it('Should Validate book details before create', (done) => {
    request
    .post('/api/users/:id/books')
    .set('Authorization', adminToken)
    .send(mockdata.invalidBookdata)
    .expect('Content-Type', /json/)
    .expect(400, done());
   });

   it('Should Validate book details before create', (done) => {
    request
    .post('/api/books')
    .set('Authorization', adminToken)
    .send(mockdata.invalidBookdata2)
    .expect('Content-Type', /json/)
    .expect(400, done());
   });

  it('Should Validate book details before create', (done) => {
    request
    .post('/api/books')
    .set('Authorization', adminToken)
    .send(mockdata.invalidBookdata3)
    .expect('Content-Type', /json/)
    .expect(400, done());
   });
});
























