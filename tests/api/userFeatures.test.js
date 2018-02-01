process.env.NODE_ENV = 'test'

import chai from 'chai';
import supertest from 'supertest';
import app from '../../server/index';
import mockdata from './mockData';

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


    it('should allow user borrow a book', (done) => {
      request
      .post(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .set('Content-Type', 'application/json')
      .send({bookId: 5})
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('returnDate');
        expect(res.body).to.have.property('bookBorrowed');
        expect(res.body.bookBorrowed).to.have.property('dateborrowed');
        expect(res.body.bookBorrowed).to.have.property('returnstatus');
        expect(res.body.bookBorrowed).to.have.property('id');
        expect(res.body.bookBorrowed).to.have.property('userId');
        expect(res.body.bookBorrowed).to.have.property('bookId');
        expect(res.body.bookBorrowed).to.have.property('expectedreturndate');
        expect(res.body.message).to.equal('You have successfully borrowed this book');
        expect(res.body).to.have.property('returnDate');
        expect(res.body).to.have.property('bookBorrowed');
        expect(res.body.bookBorrowed).to.have.property('id');
        expect(res.body.bookBorrowed.userId).to.equal(3);
        expect(res.body.bookBorrowed.bookId).to.equal(5);
        done();
      });
    });

    it('should not delete a borrowed book', (done) => {
      request
      .delete(`${api}/books/${5}`)
      .set('Authorization', adminToken)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.message).to
        .equal('This book has been borrowed and cannot be deleted');
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
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to
        .equal('You have either exhausted your book limit or you still have this book with you');
        done();
      });
    });

    it('should return Book not found for book not in the database ', (done) => {
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

    it('should not borrow a book with invalid id ', (done) => {
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
        expect(res.body.response[0]).to.have.property('id');
        expect(res.body.response[0]).to.have.property('userId');
        expect(res.body.response[0]).to.have.property('bookId');
        expect(res.body.response[0]).to.have.property('dateborrowed');
        expect(res.body.response[0]).to.have.property('expectedreturndate');
        expect(res.body.response[0]).to.have.property('returnstatus');
        expect(res.body.response[0]).to.have.property('approvedreturn');
        expect(res.body.response[0]).to.have.property('createdAt');
        expect(res.body.response[0]).to.have.property('updatedAt');
        expect(res.body.response[0]).to.have.property('Book');
        expect(res.body.response[0].Book).to.be.an('object');
        expect(res.body.response[0].id).to.be.a('number');
        expect(res.body.response[0].userId).to.be.a('number');
        expect(res.body.response[0].bookId).to.be.a('number');
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
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response');
        expect(res.body.response).to.be.an('array');
        expect(res.body.response[0]).to.have.property('id');
        expect(res.body.response[0]).to.have.property('userId');
        expect(res.body.response[0]).to.have.property('bookId');
        expect(res.body.response[0]).to.have.property('dateborrowed');
        expect(res.body.response[0]).to.have.property('expectedreturndate');
        expect(res.body.response[0]).to.have.property('returnstatus');
        expect(res.body.response[0]).to.have.property('approvedreturn');
        expect(res.body.response[0]).to.have.property('createdAt');
        expect(res.body.response[0]).to.have.property('updatedAt');
        expect(res.body.response[0]).to.have.property('Book');
        expect(res.body.response[0].Book).to.be.an('object');
        expect(res.body.response[0].id).to.be.a('number');
        expect(res.body.response[0].userId).to.be.a('number');
        expect(res.body.response[0].bookId).to.be.a('number');
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
      .set('Content-Type', 'Application/json')
      .send({bookId: 5})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      })
    });
    

    it('should check if book was borrowed by user', (done) => {
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

    it('should check if book id is valid', (done) => {
      request
      .put(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .set('Content-Type', 'Application/json')
      .send({bookId: 'dfdskjkdfja'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
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
        expect(res.body.user.firstname).to.equal('jane');
        expect(res.body.user.lastname).to.equal('ted');
        expect(res.body.user.email).to.equal('jane@mail.com');
        expect(res.body.user.username).to.equal('abbey3');
        expect(res.body.user.role).to.equal('user');
        expect(res.body.user.membership).to.equal('silver');
        expect(res.body.user.passwordResetUrl).to.equal('uFUhdjHDJjGf');
        done();
      });
    });

    it('should not get user profile details if no token is provided',
    (done) => {
      request
      .get(`${userAPI}/${userId}`)
      .end((err, res) => {
        expect(res.status).to.equal(403);
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
        expect(res.body.user).to.have.a.property('firstname');
        expect(res.body.user).to.have.a.property('lastname');
        expect(res.body.user).to.have.a.property('username');
        expect(res.body.user.firstname).to.equal(mockdata.userEdit.firstname);
        expect(res.body.user.lastname).to.equal(mockdata.userEdit.lastname);
        expect(res.body.user.username).to.equal(mockdata.userEdit.username);
        done();
      });
    });
  });
  



















