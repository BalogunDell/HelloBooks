import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server/index';
import mockdata from '../mock/mockData';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const expect = chai.expect;
const request = supertest(app);
const secret = process.env.SECRET;
const api = '/api/v1';
const userAPI = '/api/v1/users';

let userToken;
let adminToken;
let uploadedBook;
let generatedUrl= 'uFUhdjHDJjdf';





//***********************************//
  //*****TEST FOR INVALID BOOK DATA***//
  //**********************************//
  
  describe('Admin Features Using Invalid Data', () => {

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


    it('should not all books if no token', (done) => {
      request
      .get(`${api}/books`)
      .send('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to
        .equal('Only logged in users can see all books')
        done();
      });
    });


    it('should fetch trending books', (done) => {
      request
      .get(`${api}/trendingbooks`)
      .send('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('trendingBooks');
        expect(res.body.trendingBooks).to.be.an('array');
        const lengthOfArray = res.body.trendingBooks.length;
        expect(lengthOfArray).to.equal(4);
        done();
      });
    });

    it('should not create a book if isbn is missing', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidBookdata1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('ISBN is required');
        done();
      });
    });


    it('should not create a book if isbn is less than 6', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidBookdataTheee)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('ISBN is required');
        done();
      });
    });

    it('should not create a book if title is missing', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidBookdata2)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Title is required');
        done();
      });
    });

    it('should check if isbn is less than 6 in length', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidBookdataInvalidIsbn)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('ISBN number should be 6 digits');
        done();
      });
    });

    it('should check if book author is missing', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidBookdata3)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Author is required');
        done();
      });
    });

    it('should check if author name is valid', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidBookdataInvalidAuthor)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Author name is not well formated');
        done();
      });
    });

    it('should check book if page is missing', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidBookdata4)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book page(s) is required');
        done();
      });
    });

    it('should check if book year is missing', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidBookdata5)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Year is required');
        done();
      });
    });

    it('should check if the length of book year is more than 4', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidBookdataYearLength)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to
        .equal('Book year can only be 4 digits or less');
        done();
      });
    });

    it('should check if description is empty', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.emptyDescription)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book description is required');
        done();
      });
    });

    it('should check if description contain abnormal space', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.tooManySpaceDescription)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Description is not well formated');
        done();
      });
    });

    it('should check if there is no quantity', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.emptyQty)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book quantity is required');
        done();
      });
    });

    it('should check if there is no imageUrl', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.emptyImageUrl)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book cover is required');
        done();
      });
    });

    it('should check if imageUrl is valid', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidImageUrl)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Please select a valid book image');
        done();
      });
    });

    it('should check if there is no pdfUrl', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.emptyPdfUrl)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Select a pdf to be uploaded');
        done();
      });
    });

    it('should check if pdfUrl is valid', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidPdfUrl)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Invalid file selected');
        done();
      });
    });
  });