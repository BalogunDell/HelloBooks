process.env.NODE_ENV = 'test'

import chai from 'chai';
import supertest from 'supertest';
import app from '../server/index';
import mockdata from '../server/utils/mockdata';
import jwt from 'jsonwebtoken';
import fakeUsers from '../server/seeds/users';
import fakeBooks from '../server/seeds/books';
import models from '../server/models/index';
import categories from '../server/seeds/category';

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


describe('Hellobooks API', () => {
  // Sync database
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
        userId = res.body.responseData.userID;
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
  //********TEST THE HOME PAGE******* //
  //**********************************//

  describe('Homepage', () => {
    it('Should return welcome to libary api', (done) => {
      request
        .get(api)
        .expect(200, done);
    });
  });

  //**********************************//
  //********TEST GET BOOKS*********** //
  //**********************************//

  describe('Get books', () => {
    it('should return list of books', (done) => {
      request
      .get(`${api}/books/`)
      .end((err, res, body) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('books')
        done();
      });
    })
  });

  //**********************************//
  //********TEST USER SIGNUP ******* //
  //**********************************//

  describe('User registration', () => {
    it('should register a user' , (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('responseData');
        done();
      });
    });
  });

  //**********************************//
  //********TEST USER SIGNIN ******* //
  //**********************************//

  describe('User Sign in', () => {
    it('should log a user in' , (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1Login)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('responseData');
        expect(res.body.responseData).to.have.property('token');
        done();
      });
    });

    it('should not be able to log in' , (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send({
        email: 'hellobooks@gmail.com',
        password: 'testtesttest'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal('Username and password is required');
        done();
      });
    });

    it('should not be able to log in' , (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send({
        username: '',
        password: 'testtesttest'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal('Username and password is required');
        done();
      });
    });

    it('should not be able to log in' , (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send({
        username: '',
        password: ''
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal('Username and password is required');
        done();
      });
    });
  });

  //**********************************//
  //********TEST USER FEATURES ******* //
  //**********************************//

  describe('User Actions', () => {
    it('should fetch user books' , (done) => {
      request
      .get(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.have.equal('You have no books yet');
        done();
      });
    });

    it('should fetch books returned by users', (done) => {
      request
      .get(`${userAPI}/${userId}/books?returned=true`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('You have no books yet');
        done();
      })
    });

    it('should allow user borrow a book', (done) => {
      request
      .post(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .send({bookid: 1})
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('returnDate');
        done();
      });
    });

    it('should not allow a user borrow a book that does not exist', (done) => {
      request
      .post(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .send({bookid: 20})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('msg');
        expect(res.body.msg).to.equal('Book not found')
        done();
      });
    });

    it('should fetch books borrowed by users', (done) => {
      request
      .get(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response');
        expect(res.body.response).to.be.an('array');
        expect(res.body.response[0]).to.have.property('id');
        expect(res.body.response[0]).to.have.property('userid');
        expect(res.body.response[0]).to.have.property('bookid');
        expect(res.body.response[0]).to.have.property('dateborrowed');
        expect(res.body.response[0]).to.have.property('expectedreturndate');
        expect(res.body.response[0]).to.have.property('returnstatus');
        expect(res.body.response[0]).to.have.property('approvedreturn');
        expect(res.body.response[0]).to.have.property('createdAt');
        expect(res.body.response[0]).to.have.property('updatedAt');
        expect(res.body.response[0]).to.have.property('book');
        done();
      })
    });

    it('should fetch books returned by users', (done) => {
      request
      .get(`${userAPI}/${userId}/books?returned=true`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('You have no books yet');
        done();
      })
    });

    it('should fetch books borrowed by users and not returned', (done) => {
      request
      .get(`${userAPI}/${userId}/books?returned=false`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response');
        expect(res.body.response).to.be.an('array');
        expect(res.body.response[0]).to.have.property('id');
        expect(res.body.response[0]).to.have.property('userid');
        expect(res.body.response[0]).to.have.property('bookid');
        expect(res.body.response[0]).to.have.property('dateborrowed');
        expect(res.body.response[0]).to.have.property('expectedreturndate');
        expect(res.body.response[0]).to.have.property('returnstatus');
        expect(res.body.response[0]).to.have.property('approvedreturn');
        expect(res.body.response[0]).to.have.property('createdAt');
        expect(res.body.response[0]).to.have.property('updatedAt');
        expect(res.body.response[0]).to.have.property('book');
        done();
      })
    });

    it('should allow user return a book', (done) => {
      request
      .put(`${userAPI}/${userId}/books`)
      .set('Authorization', userToken)
      .send('Accept', 'Application/json')
      .send({bookid: 1})
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      })
    });

    it('should get user profile', (done) => {
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
        expect(res.body.user).to.have.property('image');
        done();
      });
    });

    it('should get user profile', (done) => {
      request
      .get(`${userAPI}/${userId}`)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Invalid/expired token');
        done();
      });
    });

    it('should edit user profile', (done) => {
      request
      .put(`${userAPI}/${userId}`)
      .set('Authorization', userToken)
      .send(mockdata.userEdit)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data[0]).to.have.a.property('id');
        expect(res.body.data[0]).to.have.a.property('firstname');
        expect(res.body.data[0]).to.have.a.property('lastname');
        expect(res.body.data[0]).to.have.a.property('username');
        done();
      });
    })
  });

  describe('Admin Login' , () => {
    it('should be able to login ', (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send(mockdata.adminSigninData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('responseData');
        expect(res.body.responseData).to.have.property('token');
        expect(res.body.responseData).to.have.property('userID');
        expect(res.body.responseData).to.have.property('username');
        expect(res.body.responseData).to.have.property('userRole');
        expect(res.body.responseData).to.have.property('message');
        expect(res.body.responseData.message).to.equal('signed in');
        done();
      });
    });
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
        expect(res.body).to.have.property('data');
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
      .send(mockdata.editBookdata)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Book modified successfully');
        done();
      });
    });

    it('should get a book', (done) => {
      request
      .get(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message.id).to.equal(mockdata.editBookdata.id);
        done();
      })
    })

    it('should delete a book', (done) => {
      request
      .delete(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.body.message).to.equal('Book has been successfully deleted');
        expect(res.body).to.have.property('updatedBooks');
        done();
      });
    });

    it('should restore deleted book', (done) => {
      request
      .post(`${api}/books/${mockdata.editBookdata.id}`)
      .set('Authorization', adminToken)
      .end((err, res) => {
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
        expect(res.body).to.have.property('books');
        expect(res.body.books).to.be.an('array');
        expect(res.body.books[0]).to.have.property('id');
        expect(res.body.books[0]).to.have.property('userid');
        expect(res.body.books[0]).to.have.property('bookid');
        expect(res.body.books[0]).to.have.property('dateborrowed');
        expect(res.body.books[0]).to.have.property('expectedreturndate');
        expect(res.body.books[0]).to.have.property('returnstatus');
        expect(res.body.books[0]).to.have.property('book');
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
    it('should display all categories' , (done) => {
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

    it('should not add category with length less than 4' , (done) => {
      request
      .post(`${api}/newcategory`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send({category:'qw'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Category should between 4-30 characters long');
        done();
      });
    })

    it('should not add category if invalid' , (done) => {
      request
      .post(`${api}/newcategory`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send({category:123456})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Category should be words');
        done();
      });
    })

    it('should not add category if separated with space' , (done) => {
      request
      .post(`${api}/newcategory`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send({category:'ola sugar'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Category should be words separated with -');
        done();
      });
    })

    it('should delete a category' , (done) => {
      request
      .delete(`${api}/category`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send({id:1})
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Category deleted');
        done();
      });
    })
  });

  //************************************//
  //*****TEST FOR INVALID SIGNUP DATA**//
  //**********************************//

  describe('Invalid User Signup', () => {
    it('given invalid signup data, should not be able to signup', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1InvalidDataFirstname)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Firstname can only contain strings');
        done();
      });
    });

    it('given invalid signup data, should not be able to signup', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1InvalidDataEmptyLastname)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Lastname cannot be empty');
        done();
      });
    });

    
    it('given invalid signup data, should not be able to signup', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1InvalidDataDigitLastname)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Lastname can only contain strings');
        done();
      });
    });
    // Check for last name
    it('given invalid signup data, should not be able to signup', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1IncompleteData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Lastname cannot be empty');
        done();
      });
    });
    // Check for empty email
    it('given invalid signup data, should not be able to signup', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1IncompleteData2)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Email cannot be empty');
        done();
      });
    });

    // Check for invalid email
    it('given invalid signup data, should not be able to signup', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1IncompleteData3)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Field must contain a valid email address');
        done();
      });
    });

    // Check for empty username
    it('given invalid signup data, should not be able to signup', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1IncompleteData4)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Username cannot be empty');
        done();
      });
    });

    // Check for invalid username
    it('given invalid signup data, should not be able to signup', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1IncompleteData5)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Username must start with letter(s) and end with digit(s)');
        done();
      });
    });

    // Check for existing username
    it('given invalid signup data, should not be able to signup', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1IncompleteData6)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Username taken, use another');
        done();
      });
    });

    // Check for empty password
    it('given invalid signup data, should not be able to signup', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1IncompleteData7)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Password cannot be empty');
        done();
      });
    });

    // Check for empty password
    it('given invalid signup data, should not be able to signup', (done) => {
      request
      .post(`${userAPI}/signup`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1IncompleteData8)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Password should be 6 to 30 characters long');
        done();
      });
    });
  });

  //***********************************//
  //*****TEST FOR INVALID LOGIN DATA**//
  //**********************************//
  describe('Invalid user login' , () => {
    it('given invalid user data, should not be able to login', (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1InvalidLogin)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal('Invalid username or password');
        done();
      });
    });

    it('given no username, should not be able to login', (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send({username:'empty', password:'abeyt '})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal('Invalid username or password');
        done();
      });
    });

    it('given invalid admin data, should not be able to login', (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send(mockdata.user1InvalidLogin)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal('Invalid username or password');
        done();
      });
    });

    it('given no data, user should not be able to login', (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal('Username and password is required');
        done();
      });
    });

    it('given incomplete data, user should not be able to login', (done) => {
      request
      .post(`${userAPI}/signin`)
      .send('Accept', 'Application/json')
      .send({username: '', password:'abbey2'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal('Username and password is required');
        done();
      });
    });
  });

  //***********************************//
  //*****TEST FOR INVALID BOOK DATA***//
  //**********************************//
  describe('Invalid Book Upload Data', () => {
    it('given that book isbn is missing, it should not create a book', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidBookdata1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Isbn field cannot be empty');
        done();
      });
    });

    it('given that book title is missing, it should not create a book', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidBookdata2)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Title field cannot be empty');
        done();
      });
    });

    it('given that book author is missing, it should not create a book', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidBookdata3)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Author field cannot be empty');
        done();
      });
    });

    it('given that book pages is missing, it should not create a book', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidBookdata4)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Pages field cannot be empty');
        done();
      });
    });

    it('given that book year is missing, it should not create a book', (done) => {
      request
      .post(`${api}/books`)
      .set('Authorization', adminToken)
      .send('Accept', 'Application/json')
      .send(mockdata.invalidBookdata5)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Year cannot be empty');
        done();
      });
    });
  });

  //***********************************//
  //*****TEST FOR RESET PASSWORD*******//
  //**********************************//

  describe('Generate Unique Password Reset Url', () => {
    it('should return a message when passed an empty email', (done) => {
      request
      .post(`${api}/resetpassword`)
      .accept('Content-Type', 'Application/json')
      .send({email: ''})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Your registered email is required');
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
        expect(res.body.message).to.equal('Invalid email');
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
        expect(res.body.message).to.equal('This email does not exist in our database');
        done();
      });
    });
  });

  describe('Reset Password:', () => {

    it('it checks if new password is sent as body', (done) => {
      request
      .put(`${api}/resetpassword/${generatedUrl}`)
      .accept('Content-Type', 'Application/json')
      .send({password: ''})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Please type in your new password');
        done();
      });
    });

    it('it checks if new password length is between 6 and 30', (done) => {
      request
      .put(`${api}/resetpassword/${generatedUrl}`)
      .accept('Content-Type', 'Application/json')
      .send({password: '123'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Password should be 6 to 30 characters long');
        done();
      });
    });

    it('it updates password with valid request body', (done) => {
      request
      .put(`${api}/resetpassword/${generatedUrl}`)
      .accept('Content-Type', 'Application/json')
      .send({password: '123456'})
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Your password has been updated');
        done();
      });
    });

    it('it checks if the given url is invalid', (done) => {
      request
      .put(`${api}/resetpassword/fhrndhjrewkw`)
      .accept('Content-Type', 'Application/json')
      .send({password: 'abeebyere'})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('This link has expired');
        done();
      });
    });
  });
});






















