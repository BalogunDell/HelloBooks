

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
const api = '/api/v1';
const userAPI = '/api/v1/users';

let userToken;
let userId;
let adminToken;
let uploadedBook;
let generatedUrl= 'uFUhdjHDJjdf';


  //**********************************//
  //********TEST ADMIN FEATURES******* //
  //**********************************//
  describe('Book Controller > ' , () => {

    it('logs admin in when credentials are valid', (done) => {
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


    it('logs admin in when credentials are valid', (done) => {
      request
        .post(`${userAPI}/signin`)
        .set('Content-Type', 'application/json')
        .send({
          username: "abbey2",
          password: "password"
        })
        .end((err, res) => {
          userToken=res.body.responseData.token;
          userId = res.body.responseData.user.userId
          done();
        }); 
  });


    it('creates a book when create book method is triggered ', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .set('Accept', 'Application/json')
      .send(mockdata.bookdata)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('payload');
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

    it('fetches a book when a valid id is supplied', (done) => {
      request
      .get(`${api}/books/${uploadedBook.id}`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.payload.id).to.equal(uploadedBook.id);
        expect(res.body.payload.author).to.equal(uploadedBook.author);
        expect(res.body.payload.year).to.equal(uploadedBook.year);
        expect(res.body.payload.title).to.equal(uploadedBook.title);
        expect(res.body.payload.description).to.equal(uploadedBook.description);
        expect(res.body.payload.quantity).to.equal(uploadedBook.quantity);
        expect(res.body.payload.PDFUrl).to.equal(uploadedBook.PDFUrl);
        expect(res.body.payload.imageUrl).to.equal(uploadedBook.imageUrl);
        expect(res.body.payload.categoryId)
          .to.equal(uploadedBook.categoryId);
        done();
      });
    });


    it('returns error message on upload if isbn already exists', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .set('Accept', 'Application/json')
      .send(mockdata.bookdata)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('A book with this isbn exists');
        done();
      });
    });

    it('edits a book when given valid book data ', (done) => {
      request
      .put(`${api}/books/${3}`)
      .set('Authorization', adminToken)
      .set('Accept', 'Application/json')
      .send(mockdata.editBookdata)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book modified successfully');
        const editedBook = res.body.payload
        expect(editedBook.title).to.equal(mockdata.editBookdata.title);
        expect(editedBook.year).to.equal(mockdata.editBookdata.year);
        expect(editedBook.pages).to.equal(mockdata.editBookdata.pages);
        expect(editedBook.quantity).to.equal(mockdata.editBookdata.quantity);
        expect(editedBook.description).to
          .equal(mockdata.editBookdata.description);
        expect(editedBook.imageUrl).to.equal(mockdata.editBookdata.imageUrl);
        expect(editedBook.PDFUrl).to.equal(mockdata.editBookdata.PDFUrl);
        done();
      });
    });

    it('should not edit a book if non-existing book id is given ', (done) => {
      request
      .put(`${api}/books/${300}`)
      .set('Authorization', adminToken)
      .set('Accept', 'Application/json')
      .send(mockdata.editBookdata)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message');
        done();
      });
    });

    it('returns error message is when book author is invalid', (done) => {
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

    it('should return error message when author name is invalid ', (done) => {
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

    it('should return error message when book title is invalid', (done) => {
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

    it('should return error message if book year is invalid', (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .set('Accept', 'Application/json')
      .send(mockdata.editBookdataYearError)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Year is required');
        
        done();
      });
    });

    it('should check if book page is valid before editing', (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .set('Accept', 'Application/json')
      .send(mockdata.editBookdataPageError)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book page(s) is required');
        done();
      });
    });

    it('should check if length of book year is more than 4 before editing', 
    (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .set('Accept', 'Application/json')
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
      .set('Accept', 'Application/json')
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
      .set('Accept', 'Application/json')
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
      .set('Accept', 'Application/json')
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
      .set('Accept', 'Application/json')
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
      .set('Accept', 'Application/json')
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

    it('deletes a book when a valid book Id given', (done) => {
      request
      .delete(`${api}/books/${mockdata.editBookdata2.id}`)
      .set('Authorization', adminToken)
      .set('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Book has been successfully deleted');
        expect(res.body).to.have.property('bookId');
          const id = parseInt(res.body.bookId, 10);
        expect(id).to.equal(mockData.editBookdata2.id);
        done();
      });
    });

    it('check for deleted book after delete action', (done) => {
      request
      .get(`${api}/books/${mockdata.editBookdata2.id}`)
      .set('Authorization', adminToken)
      .set('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to
        .equal('This books is not available in our database');
        done();
      });
    });

    it('allows user borrow a book to test if borrowed book can be deleted'
    , (done) => {
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
          expect(res.body.message).to.equal('You have successfully borrowed this book');
          expect(res.body.bookBorrowed.userId).to.equal(2);
          expect(res.body.bookBorrowed.bookId).to.equal(5);
          done();
        });
      });
      

    it('should not delete a borrowed book', (done) => {
      request
      .delete(`${api}/books/${5}`)
      .set('Authorization', adminToken)
      .set('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to
          .equal('This book has been borrowed and cannot be deleted');
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
        expect(resultLength).to.equal(1);
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
        const fetchedCategoryLength = res.body.categories.length;
        expect(fetchedCategoryLength).to.equal(6)
        done();
      });
    })
    it('should not create category if category field is empty' , (done) => {
      request
      .post(`${api}/categories`)
      .set('Authorization', adminToken)
      .set('Accept', 'Application/json')
      .send({category:''})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Category field cannot be empty');
        done();
      });
    });

    it('should not create category if provided characters is less than 2'
    , (done) => {
      request
      .post(`${api}/categories`)
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


    it('creates a new category' , (done) => {
      request
      .post(`${api}/categories`)
      .set('Authorization', adminToken)
      .set('Accept', 'Application/json')
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
      .post(`${api}/categories`)
      .set('Authorization', adminToken)
      .set('Accept', 'Application/json')
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
      .post(`${api}/categories`)
      .set('Authorization', adminToken)
      .set('Accept', 'Application/json')
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
      .post(`${api}/categories`)
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
      .post(`${api}/categories`)
      .set('Authorization', userToken)
      .set('Accept', 'Application/json')
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
        .post(`${api}/categories`)
        .set('Accept', 'Application/json')
        .send({category:'ghfgjjfd'})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('message');
          expect(res.body.message)
            .to.equal('You do not have the permission to access this page');
          done();
        });
    });
  });




















