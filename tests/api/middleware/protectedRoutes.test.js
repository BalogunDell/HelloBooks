
import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server/index';
import mockdata from '../mock/mockData';

require('dotenv').config();
const api = '/api/v1';
const userAPI = '/api/v1/users';
const expect = chai.expect;
const request = supertest(app);



describe('Protected Routes:', () => {
    it('should not allow users access these routes without token' , (done) => {
      request
      .post(`${api}/newcategory`)
      .send({category: 'Health'})
      .end((err, res) => {
      expect(res.status).to.equal(403);
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
        expect(res.status).to.equal(403);
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
          .to.equal('You do not have the permission to access this page');
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
          .to.equal('You do not have the permission to access this page');
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
          .to.equal('You do not have the permission to access this page');
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
          .to.equal('You do not have the permission to access this page');
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
          .to.equal('You do not have the permission to access this page');
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
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message)
          .to.equal('You do not have the permission to access this page');
        done();
      });
    });
  });