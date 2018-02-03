
import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server/index';
import mockdata from '../mock/mockData';

require('dotenv').config();
const api = '/api/v1';
const userAPI = '/api/v1/users';
let userId;
let userToken;
const expect = chai.expect;
const request = supertest(app);



describe('Protected Routes:', () => {
  it('should not grant access to create category if no token is provided' ,
  (done) => {
    request
    .post(`${api}/categories`)
    .send({category: 'Health'})
    .end((err, res) => {
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('message');
    expect(res.body.message)
      .to.equal('You do not have the permission to access this page');
    done();
    });
  });

  it('should not allow users access these routes without token' , (done) => {
    request
    .post(`${api}/books`)
    .send(mockdata.bookdata)
    .end((err, res) => {
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message)
        .to.equal('You do not have the permission to access this page');
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

  it('should return error message for invalid routes' , (done) => {
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
    .send(mockdata.editBookdata)
    .end((err, res) => {
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message)
        .to.equal('You do not have the permission to access this page');
      done();
    });
  });

  it('should not allow users access these routes without token' , (done) => {
    request
    .get(`${api}/books/${1}`)
    .end((err, res) => {
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message)
        .to.equal('You do not have the permission to access this page');
      done();
    });
  });

  it('should not allow users access these routes without token' , (done) => {
    request
    .delete(`${api}/books/${1}`)
    .end((err, res) => {
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message)
        .to.equal('You do not have the permission to access this page');
      done();
    });
  });

  it('should not allow users access these routes without token' , (done) => {
    request
    .get(`${api}/books/${1}`)
    .end((err, res) => {
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message)
        .to.equal('You do not have the permission to access this page');
      done();
    });
  });

  it('should not allow users access these routes without token' , (done) => {
    request
    .get(`${api}/books/borrowedbooks`)
    .end((err, res) => {
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message)
        .to.equal('You do not have the permission to access this page');
      done();
    });
  });

  it('should not allow users access these routes without token' , (done) => {
    request
    .get(`${api}/users/${2}/books`)
    .end((err, res) => {
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message)
        .to.equal('You do not have the permission to access this page');
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
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message)
        .to.equal('You do not have the permission to access this page');
      done();
    });
  });
});

  describe('User Forbidden Routes > ', () => {

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

    it('should not fetch categories with user token', (done) => {
      request
      .get(`${api}/categories`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to
          .equal('You do not have the permission to access this page');
      done();
    });
  });

  it('should not fetch categories with user token', (done) => {
    request
    .post(`${api}/categories`)
    .set('Authorization', userToken)
    .send({
      category: "hfshdfaaa"
    })
    .end((err, res) => {
      expect(res.status).to.equal(403);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to
        .equal('You do not have the permission to access this page');
      done();
    });
  });

  it('should not get all borrowed books with user token', (done) => {
    request
    .get(`${api}/books/borrowedbooks`)
    .set('Authorization', userToken)
    .end((err, res) => {
      expect(res.status).to.equal(403);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to
        .equal('You do not have the permission to access this page');
      done();
    });
  });

  it('should not get all borrowed books with user token', (done) => {
    request
    .post(`${api}/books/`)
    .set('Authorization', userToken)
    .send(mockdata.bookdata)
    .end((err, res) => {
      expect(res.status).to.equal(403);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to
        .equal('You do not have the permission to access this page');
      done();
    });
  });

  it('should not get all borrowed books with user token', (done) => {
    request
    .delete(`${api}/books/${1}`)
    .set('Authorization', userToken)
    .end((err, res) => {
      expect(res.status).to.equal(403);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to
        .equal('You do not have the permission to access this page');
      done();
    });
  });
});