
import chai from 'chai';
import supertest from 'supertest';
import app from '../../server/index';
import mockdata from './mockData';
import jwt from 'jsonwebtoken';
import fakeUsers from '../../server/seeds/users';
import fakeBooks from '../../server/seeds/books';
import models from '../../server/models/index';
import categories from '../../server/seeds/category';
import mockData from './mockData';

require('dotenv').config();

const expect = chai.expect;
const request = supertest(app);
const secret = process.env.SECRET;
let userToken = 'hjgkkyftyftftuccfidtr';
let adminToken;
const api = '/api/v1';
const userAPI = '/api/v1/users';
let generatedUrl= 'uFUhdjHDJjdf';





 //**********************************//
  //******TEST CATEGORY FEATURES**** //
  //**********************************//

  describe('Create category:', () => {


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

    it('should fetch all categories' , (done) => {
      request
      .get(`${api}/categories`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.categories).to.be.an('array');
        expect(res.body.categories[0]).to.property('id');
        expect(res.body.categories[0]).to.property('category');
        expect(res.body.categories[0]).to.property('createdAt');
        expect(res.body.categories[0]).to.property('updatedAt');
        done();
      });
    })
    it('should check if category is empty' , (done) => {
      request
      .post(`${api}/newcategory`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send({category:''})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Category field cannot be empty');
        done();
      });
    });

    it('should check if length of typed category is less than 2' , (done) => {
      request
      .post(`${api}/newcategory`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send({category:'e'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Category is too short');
        done();
      });
    });


    it('should add a new category' , (done) => {
      request
      .post(`${api}/newcategory`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send({category:'category'})
      .end((err, res) => {
        if(res) {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Category created');
        }
        done();
      });
    })


    it('should not add an existing category' , (done) => {
      request
      .post(`${api}/newcategory`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send({category:'Business'})
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('This category exists');
        done();
      });
    })

    it('should not add category with length less than 3' , (done) => {
      request
      .post(`${api}/newcategory`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send({category:'w2'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Category is too short');
        done();
      });
    })

    it('should not add category if number is supplied as category' , (done) => {
      request
      .post(`${api}/newcategory`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send({category:'123456'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Category cannot contain numbers');
        done();
      });
    });

    it('should check if category is empty' , (done) => {
      request
      .post(`${api}/newcategory`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .send({category:123456})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Category cannot contain numbers');
        done();
      });
    });
      it('should not create category if user is not admin' , (done) => {
        request
        .post(`${api}/newcategory`)
        .send('Accept', 'Application/json')
        .send({category:'ghfgjjfd'})
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('message');
          expect(res.body.message)
            .to.equal('You do not have the permission to access this page');
          done();
        });
    });
  });
