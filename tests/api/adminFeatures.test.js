process.env.NODE_ENV = 'test'

import chai from 'chai';
import supertest from 'supertest';
import app from '../../server/index';
import mockdata from './mockData';
import jwt from 'jsonwebtoken';
import fakeUsers from '../../server/seeds/users';
import fakeBooks from '../../server/seeds/books';
import models from '../../server/models/index';
import categories from '../../server/seeds/category';

require('dotenv').config();

const expect = chai.expect;
const request = supertest(app);
const secret = process.env.SECRET;
let userToken;
let adminToken;
const api = '/api/v1';
const userAPI = '/api/v1/users';
let userId;
let generatedUrl= 'uFUhdjHDJjdf';

// Seeds
  before((done) => {
    models.sequelize.sync({force:true}, {individualHooks: true})
    .then(() => {
      done();
    })
  });

  // Save admin and normal user, sign them in and get token
  before((done) => {
    models.user.bulkCreate(fakeUsers.users, {individualHooks: true})
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
        userId = res.body.responseData.user.userID;
        done();
      });
    });
  })
  
  //Load sample category before test
  before((done) => {
    models.category.bulkCreate(categories.categories, {individualHooks: true})
    .then(() => {
      done();
    })
  });


  //Load sample book before test
  before((done) => {
    models.book.bulkCreate(fakeBooks.books, {individualHooks: true})
    .then(() => {
      done();
    })
  });


  //**********************************//
  //********TEST ADMIN FEATURES******* //
  //**********************************//
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
        expect(res.body).to.have.property('payload');
        expect(res.body.payload).to.have.property('id');
        expect(res.body.payload).to.have.property('isbn');
        expect(res.body.payload).to.have.property('title');
        expect(res.body.payload).to.have.property('author');
        expect(res.body.payload).to.have.property('pages');
        expect(res.body.payload).to.have.property('year');
        expect(res.body.payload).to.have.property('description');
        expect(res.body.payload).to.have.property('quantity');
        expect(res.body.payload).to.have.property('categoryid');
        expect(res.body.payload).to.have.property('visibility');
        expect(res.body.payload).to.have.property('imageUrl');
        expect(res.body.payload).to.have.property('pdfUrl');
        expect(res.body.payload.isbn).to.equal(`#${mockdata.bookdata.isbn}`);
        expect(res.body.payload.title).to.equal(mockdata.bookdata.title);
        expect(res.body.payload.author).to.equal(mockdata.bookdata.author);
        expect(res.body.payload.pages).to.equal(mockdata.bookdata.pages);
        expect(res.body.payload.year).to.equal(mockdata.bookdata.year);
        expect(res.body.payload.description).to.equal(mockdata.bookdata.description);
        expect(res.body.payload.quantity).to.equal(mockdata.bookdata.quantity);
        expect(res.body.payload.categoryid).to.equal(mockdata.bookdata.categoryid);
        expect(res.body.payload.visibility).to.equal(true);
        expect(res.body.payload.imageUrl).to.equal(mockdata.bookdata.imageUrl);
        expect(res.body.payload.pdfUrl).to.equal(mockdata.bookdata.pdfUrl); 
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('A book with this isbn exists');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Author is required');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Author name is not well formated');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Title is required');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Book page(s) is required');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Year is required');
        done();
      });
    });

    it('should check if length of book year is more than 4 before editing', (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.editBookdataYearlengthError)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Book year can only be 4 digits or less');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Book description is required');
        done();
      });
    });

    it('should check if description is well formatted before editing', (done) => {
      request
      .put(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.editBookdataDescriptionFormat)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Description is not well formatted');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Book quantity is required');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Please select a valid book image');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Invalid file selected');
        done();
      });
    });

    it('should get a book', (done) => {
      request
      .get(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.payload.id).to.equal(mockdata.editBookdata.id);
        expect(res.body.payload.author).to.equal('Nelson Brook');
        expect(res.body.payload.year).to.equal(2000);
        expect(res.body.payload.title).to.equal('React for Beginners');
        expect(res.body.payload.categoryid).to.equal(5);
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
        expect(res.body).to.have.property('updatedBooks');
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

    it('should restore deleted book', (done) => {
      request
      .post(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book has been published');
        done();
      });
    });

    it('should delete a book', (done) => {
      request
      .delete(`${api}/books/2`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Book has been successfully deleted');
        expect(res.body).to.have.property('updatedBooks');
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

    it('should get all books, deleted and not deleted', (done) => {
      request
      .get(`${api}/books/all`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.body).to.have.property('books');
        expect(res.body.books).to.be.an('array');
        expect(res.body.books[0]).to.have.property('id');
        expect(res.body.books[0]).to.have.property('isbn');
        expect(res.body.books[0]).to.have.property('pages');
        expect(res.body.books[0]).to.have.property('title');
        expect(res.body.books[0]).to.have.property('description');
        expect(res.body.books[0]).to.have.property('quantity');
        expect(res.body.books[0]).to.have.property('categoryid');
        expect(res.body.books[0]).to.have.property('visibility');
        expect(res.body.books[0].visibility).to.equal(false);
        done();
      });
    });
  });

  //**********************************//
  //******TEST CATEGORY FEATURES**** //
  //**********************************//

  describe('Create category:', () => {
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Category field cannot be empty');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Category is too short');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Category is too short');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Category cannot contain numbers');
        done();
      });
    });

    it('should check if user is not admin' , (done) => {
      request
      .post(`${api}/newcategory`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .send({category:123456})
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Access Denied');
        done();
      });
    })
  });

  //***********************************//
  //*****TEST FOR INVALID BOOK DATA***//
  //**********************************//
  describe('Admin Features Using Invalid Data', () => {
    it('should not create a book if isbn is missing', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidBookdata1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('ISBN is required');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Title is required');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('ISBN number should be 6 digits');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Author is required');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Author name is not well formated');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Book page(s) is required');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Year is required');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Book year can only be 4 digits or less');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Book description is required');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Description is not well formated');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Book quantity is required');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Book cover is required');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Please select a valid book image');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Select a pdf to be uploaded');
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
        expect(res.body).to.have.property('errorMessage');
        expect(res.body.errorMessage).to.equal('Invalid file selected');
        done();
      });
    });
  });





















