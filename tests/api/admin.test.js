

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
const api = '/api/v1';
const userAPI = '/api/v1/users';

let userToken;
let adminToken;
let uploadedBook;
let generatedUrl= 'uFUhdjHDJjdf';


  //**********************************//
  //********TEST ADMIN FEATURES******* //
  //**********************************//
  describe('Admin Features > ' , () => {

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


    it('should upload a book', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.bookdata)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('payload');
        expect(res.body.payload).to.have.property('id');
        expect(res.body.payload).to.have.property('isbn');
        expect(res.body.payload).to.have.property('title');
        expect(res.body.payload).to.have.property('author');
        expect(res.body.payload).to.have.property('pages');
        expect(res.body.payload).to.have.property('year');
        expect(res.body.payload).to.have.property('description');
        expect(res.body.payload).to.have.property('quantity');
        expect(res.body.payload).to.have.property('categoryId');
        expect(res.body.payload).to.have.property('visibility');
        expect(res.body.payload).to.have.property('imageUrl');
        expect(res.body.payload).to.have.property('pdfUrl');
        expect(res.body.payload.isbn).to.equal(`#${mockdata.bookdata.isbn}`);
        expect(res.body.payload.title).to.equal(mockdata.bookdata.title);
        expect(res.body.payload.author).to.equal(mockdata.bookdata.author);
        expect(res.body.payload.pages).to.equal(mockdata.bookdata.pages);
        expect(res.body.payload.year).to.equal(mockdata.bookdata.year);
        expect(res.body.payload.description).to
        .equal(mockdata.bookdata.description);
        expect(res.body.payload.quantity).to.equal(mockdata.bookdata.quantity);
        expect(res.body.payload.categoryId).to
        .equal(mockdata.bookdata.categoryId);
        expect(res.body.payload.visibility).to.equal(true);
        expect(res.body.payload.imageUrl).to
        .equal(mockdata.bookdata.imageUrl);
        expect(res.body.payload.pdfUrl).to.equal(mockdata.bookdata.pdfUrl); 
        uploadedBook = res.body.payload;
        done();
      });
    })

    it('should check for the uploaded book', (done) => {
      request
      .get(`${api}/books/${uploadedBook.id}`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.payload.id).to.equal(uploadedBook.id);
        expect(res.body.payload.author).to.equal(uploadedBook.author);
        expect(res.body.payload.year).to.equal(uploadedBook.year);
        expect(res.body.payload.title).to.equal(uploadedBook.title);
        expect(res.body.payload.categoryId)
          .to.equal(uploadedBook.categoryId);
        done();
      });
    });


    it('should get a book by id', (done) => {
      request
      .get(`${api}/books/${mockdata.foundBook.id}`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.payload.id).to.equal(mockdata.foundBook.id);
        expect(res.body.payload.author).to.equal(mockdata.foundBook.author);
        expect(res.body.payload.year).to.equal(mockdata.foundBook.year);
        expect(res.body.payload.title).to.equal(mockdata.foundBook.title);
        expect(res.body.payload.categoryId)
          .to.equal(mockdata.foundBook.categoryId);
        done();
      });
    });

    it('should not upload the same book', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.bookdata)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('A book with this isbn exists');
        done();
      });
    });

    it('should edit a book', (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.editBookdata2)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book modified successfully');
        done();
      });
    });

    it('should check if book author is valid before editing', (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.editBookdataAuthorError)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Author is required');
        done();
      });
    });

    it('should check if book author is well formatted', (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.editBookdataAuthorformat)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Author name is not well formated');
        done();
      });
    });

    it('should check if book title is valid before editing', (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.editBookdataTitleError)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Title is required');
        done();
      });
    });

    it('should check if book page is valid before editing', (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.editBookdataPageError)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book page(s) is required');
        done();
      });
    });

    it('should check if book year is valid before editing', (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.editBookdataYearError)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Year is required');
        done();
      });
    });

    it('should check if length of book year is more than 4 before editing', 
    (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.editBookdataYearlengthError)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to
        .equal('Book year can only be 4 digits or less');
        done();
      });
    });

    it('should check if description is empty before editing', (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.editBookdataDescriptionError)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book description is required');
        done();
      });
    });

    it('should check if description is well formatted before editing', (
      done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.editBookdataDescriptionFormat)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Description is not well formatted');
        done();
      });
    });

    it('should check if quantity is valid before editing', (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.editBookdataQty)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book quantity is required');
        done();
      });
    });

    it('should check if imageUrl is valid before editing', (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.editBookdataImageUrlFormatError)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Please select a valid book image');
        done();
      });
    });

    it('should check if imageUrl is valid before editing', (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.editBookdataPdfUrlFormatError)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Invalid file selected');
        done();
      });
    });

    it('should return book not found for non-existing book', (done) => {
      request
      .get(`${api}/books/${100}`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to
        .equal('This books is not available in our database')
        done();
      });
    });

    it('should delete a book', (done) => {
      request
      .delete(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Book has been successfully deleted');
        expect(res.body).to.have.property('bookId');
          const id = parseInt(res.body.bookId, 10);
        expect(id).to.equal(mockData.editBookdata.id);
        done();
      });
    });

    it('should not delete a borrowed book', (done) => {
      request
      .delete(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book not found in the database');
        done();
      });
    });

    it('should get all borrowed books', (done) => {
      request
      .get(`${api}/books/borrowedbooks`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('books');
        expect(res.body.books).to.be.an('array');
        const resultLength = res.body.books.length;
        expect(resultLength).to.equal(0);
        done();
      });
    });

    it('should get all books', (done) => {
      request
      .get(`${api}/books/`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('books');
        expect(res.body.books).to.be.an('array');
        const resultLength = res.body.books.length;
        expect(resultLength).to.equal(6);
        done();
      });
    });
  });





















