process.env.NODE_ENV = 'test'

import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server/index';
import mockdata from '../mock/mockData';
import jwt from 'jsonwebtoken';
import mockData from '../mock/mockData';

require('dotenv').config();

const expect = chai.expect;
const request = supertest(app);
const secret = process.env.SECRET;
let userToken;
let adminToken;
const api = '/api/v1';
const userAPI = '/api/v1/users';
let userId;

 

  describe('User Features > ', () => {

    it('should log user in to get a token', (done) => {
      request
      .post(`${userAPI}/signin`)
      .set('Content-Type', 'application/json')
      .send({
        username: "abbey3",
        password: "password"
      })
      .end((err, res) => {
        userToken=res.body.responseData.token;
        userId = res.body.responseData.user.userId
        done();
      }); 
    });

    it('should log admin in to get a token', (done) => {
      request
      .post(`${userAPI}/signin`)
      .set('Content-Type', 'application/json')
      .send({
        username: "adminusername",
        password: "password"
      })
      .end((err, res) => {
        adminToken=res.body.responseData.token;
        done();
      }); 
    });

    it('should fetch user books' , (done) => {
      request
      .get(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.response).to.be.an('array');
        expect(res.body.response).to.be.empty;
        done();
      });
    });

    it('should fetch user books' , (done) => {
      request
      .get(`${api}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Welcome to library api');
        done();
      });
    });

    it('should fetch books returned by users', (done) => {
      request
      .get(`${userAPI}/${userId}/books?returned=true`)
      .set('Authorization', userToken)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.response).to.be.an('array');
        expect(res.body.response).to.be.empty;
        done();
      })
    });


    it('allows a user borrow a book when book Id is supplied', (done) => {
      request
      .post(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .set('Content-Type', 'application/json')
      .send({bookId: 5})
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('You have successfully borrowed this book');
        expect(res.body.bookBorrowed.userId).to.equal(3);
        expect(res.body.bookBorrowed.bookId).to.equal(5);
        done();
      });
    });
    
    it('should not allow user borrow the same book', (done) => {
      request
      .post(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .set('Content-Type', 'application/json')
      .send({bookId: 5})
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to
        .equal('You have either exhausted your book limit or you still have this book with you');
        done();
      });
    });

    it('should not find a book that has not been uploaded', (done) => {
      request
      .post(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .set('Content-Type', 'application/json')
      .send({bookId: 80})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book not found');
        done();
      });
    });

    it('returns error message on borrow book action if book Id is invalid ',
    (done) => {
      request
      .post(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .set('Content-Type', 'application/json')
      .send({bookId: '80'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Please provide a valid book id');
        done();
      });
    });

    it('should fetch books borrowed by a user', (done) => {
      request
      .get(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .set('Content-type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response');
        expect(res.body.response).to.be.an('array');
        const fetchedBooks = res.body.response.length
        expect(fetchedBooks).to.not.equal(0);    
        done();
      })
    });

    it('should fetch books borrowed by users and not returned', (done) => {
      request
      .get(`${userAPI}/${userId}/books?returned=false`)
      .set('Authorization', userToken)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response');
        expect(res.body.response).to.be.an('array');
        expect(res.body.response[0].userId).to.equal(userId);
        expect(res.body.response[0].returnStatus).to.equal(false);
        done();
      })
    });

    it('allows user return a borrowed book', (done) => {
      request
      .put(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .set('Content-Type', 'Application/json')
      .send({bookId: 5})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      })
    });
    

    it('should check if a non existing book was borrowed by user', (done) => {
      request
      .put(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .set('Content-Type', 'Application/json')
      .send({bookId: 65})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.
        equal('This book is not in your latest borrow history');
        done();
      })
    });

    it('returns error message when book id is invalid', (done) => {
      request
      .put(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .set('Content-Type', 'Application/json')
      .send({bookId: 'dfdskjkdfja'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.
        equal('Please provide a valid book id');
        done();
      })
    });

    it('should fetch books returned by users', (done) => {
      request
      .get(`${userAPI}/${userId}/books?returned=true`)
      .set('Authorization', userToken)
      .set('Content-Type', 'Application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response');
        expect(res.body.response).to.be.an('array');
        expect(res.body.response[0].userId).to.equal(userId);
        expect(res.body.response[0].bookId).to.equal(5);
        done();
      })
    });

    it('fetches user profile with valid user Id', (done) => {
      request
      .get(`${userAPI}/${userId}`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.userData.firstName).to.equal('jane');
        expect(res.body.userData.lastName).to.equal('ted');
        expect(res.body.userData.email).to.equal('jane@mail.com');
        expect(res.body.userData.username).to.equal('abbey3');
        expect(res.body.userData.role).to.equal('user');
        expect(res.body.userData.membership).to.equal('silver');
        done();
      });
    });

    it('should return no response if no authentication token',
    (done) => {
      request
      .get(`${userAPI}/${userId}`)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to
        .equal('You do not have the permission to access this page');
        done();
      });
    });

    it('should edit user profile', (done) => {
      request
      .put(`${userAPI}/${userId}`)
      .set('Authorization', userToken)
      .set('Content-Type', 'Application/json')
      .send(mockdata.userEdit)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.user.firstName).to.equal(mockdata.userEdit.firstName);
        expect(res.body.user.lastName).to.equal(mockdata.userEdit.lastName);
        expect(res.body.user.username).to.equal(mockdata.userEdit.username);
        done();
      });
    });

    it('edits user password if user exists', (done) => {
      request
      .put(`${userAPI}/${userId}/password`)
      .set('Authorization', userToken)
      .set('Content-Type', 'Application/json')
      .send({
        currentPassword: 'password',
        newPassword: 'password'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to
          .equal('Your password has been successfully changed')
        done();
      });
    });

    it('should not edit user password if currentpassword is wrong',
    (done) => {
      request
      .put(`${userAPI}/${userId}/password`)
      .set('Authorization', userToken)
      .set('Content-Type', 'Application/json')
      .send({
        currentPassword: 'wrongPassword',
        newPassword: 'password'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to
          .equal('The password you provided is incorrect')
        done();
      });
    });

    it('should not edit user password without authentication token',
    (done) => {
      request
      .put(`${userAPI}/${userId}/password`)
      .set('Content-Type', 'Application/json')
      .send({
        currentPassword: 'wrongPassword',
        newPassword: 'password'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to
          .equal('You do not have the permission to access this page')
        done();
      });
    });
  });
  
  describe('Reset Password:', () => {

    it('checks if new password is sent as body', (done) => {
      request
      .put(`${api}/resetpassword/uFUhdjHDJjdf`)
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
      .put(`${api}/resetpassword/uFUhdjHDJjdf`)
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

    it('should check if the unique url is invalid', (done) => {
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

    it('should reset the password using the link once', (done) => {
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

    it('should not reset password using the same link ', (done) => {
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
  });

  //***********************************//
//*****TEST FOR RESET PASSWORD*******//
//**********************************//

describe('Password Reset > ', () => {
  it('returns error message if password reset body is empty', (done) => {
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

describe('Google User Login > ' , () => {
  it('should log a new user in', (done) => {
    request
    .post(`${api}/googleuser`)
    .accept('Content-Type', 'Application/json')
    .send(mockdata.googleUser1)
    .end((err, res) => {
        expect(res.status).to.equal(201);
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
        expect(res.body.responseData.user.username).to
          .equal(mockdata.user1.username);
          expect(res.body.responseData.user.userRole).to
          .equal('user');
          expect(res.body.responseData.user.imageUrl).to
          .equal(null);
        done();
      });
    });
});













