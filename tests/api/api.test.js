// process.env.NODE_ENV = 'test'

// import chai from 'chai';
// import supertest from 'supertest';
// import app from '../../server/index';
// import mockdata from './mockData';
// import jwt from 'jsonwebtoken';
// import fakeUsers from '../../server/seeds/users';
// import fakeBooks from '../../server/seeds/books';
// import models from '../../server/models/index';
// import categories from '../../server/seeds/category';
// import Helper from '../../server/middleware/Helper';

// require('dotenv').config();

// const expect = chai.expect;
// const request = supertest(app);
// const secret = process.env.SECRET;
// let userToken;
// let adminToken;
// const api = '/api/v1';
// const userAPI = '/api/v1/users';
// let userId;
// let generatedUrl= 'uFUhdjHDJjdf';
    

// // Seeds
// before((done) => {
//   models.sequelize.sync({force:true}, {individualHooks: true})
//   .then(() => {
//     done();
//   })
//   .catch((error) => {
   
//   })
// });

// // Save admin and normal user, sign them in and get token
// before((done) => {
//   models.User.bulkCreate(fakeUsers.users, {individualHooks: true})
//   .then(() => {
//     request
//     .post(`${userAPI}/signin`)
//     .send({
//       username: fakeUsers.users[0].username,
//       password: fakeUsers.users[0].password
//     })
//     .end((err, res) => {
//       adminToken=res.body.responseData.token;
//     });
//   })
//   .then(() => {
//     request
//     .post(`${userAPI}/signin`)
//     .send({
//       username: fakeUsers.users[1].username,
//       password: fakeUsers.users[1].password})
      
//     .end((err, res) => {
//       userToken=res.body.responseData.token;
//       userId = res.body.responseData.user.userId;
//       done();
//     });
//   });
// });

//  //Load sample category before test
//  before((done) => {
//   models.Category.bulkCreate(categories.categories, {individualHooks: true})
//   .then(() => {
//     done();
//   })
// });

// //Load sample book before test
// before((done) => {
//   models.Book.bulkCreate(fakeBooks.books, {individualHooks: true})
//   .then(() => {
//     done();
//   });
// });


// /** 
//  * 
//  * @description  ENDPOINT TEST
//  * 
//  * API TEST FOR ADMIN FEATURES
//  * 
//  * USER AUTHENTICATION 
//  * 
//  * AND USER FEATURES
//  * 
//  * @returns {json} Coverage report
//  * 
// */


// describe('Url Generator Function', () => {
//   it('should check if a random string is generated', () => {
//     const result = Helper.urlGenerator(12, process.env.CHARACTERS);
//     const resultLength = result.length;
//     expect(resultLength).to.equal(12);
//   });
// });



// describe('User registration:', () => {
//     it('should register a user when valid data is given' , (done) => {
//       request
//       .post(`${userAPI}/signup`)
//       .send('Accept', 'Application/json')
//       .send(mockdata.user1)
//       .end((err, res) => {
//         expect(res.status).to.equal(201);
//         expect(res.body).to.have.property('responseData');
//         expect(res.body.responseData).to.have.property('message');
//         expect(res.body.responseData.message).to.equal('User created');
//         expect(res.body.responseData).to.have.property('user');
//         expect(res.body.responseData.user).to.have.property('username');
//         expect(res.body.responseData.user.username).to.equal('abbey');
//         expect(res.body.responseData.user).to.have.property('userId');
//         expect(res.body.responseData.user.userId).to.equal(4);
//         expect(res.body.responseData.user).to.have.property('userRole');
//         expect(res.body.responseData.user.userRole).to.equal('user');
//         expect(res.body.responseData.user).to.have.property('imageUrl');
//         expect(res.body.responseData.user.imageUrl).to.equal(null);
//         done();
//       });
//     });
//   });


//   describe('User Authentication:', () => {
//     it('should log a user with valid credentials into the app' , (done) => {
//       request
//       .post(`${userAPI}/signin`)
//       .send('Accept', 'Application/json')
//       .send(mockdata.user1Login)
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.have.property('responseData');
//         expect(res.body.responseData).to.have.property('token');
//         expect(res.body.responseData).to.have.property('user');
//         expect(res.body.responseData.user).to.have.property('username');
//         expect(res.body.responseData.user.username)
//           .to.equal(mockdata.user1Login.username);
//         expect(res.body.responseData.user).to.have.property('userId')
//         expect(res.body.responseData.user.userId).to.equal(4);
//         expect(res.body.responseData.user).to.have.property('userRole');
//         expect(res.body.responseData.user.userRole).to.equal('user');
//         expect(res.body.responseData.user).to.have.property('imageUrl');
//         expect(res.body.responseData.user.imageUrl).to.equal(null);
//         done();
//       });
//     });

//     it('should not log a user with invalid credentials in' , (done) => {
//       request
//       .post(`${userAPI}/signin`)
//       .send('Accept', 'Application/json')
//       .send({
//         email: 'hellobooks@gmail.com',
//         password: 'testtesttest'
//       })
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.be.equal('Username and password are both required');
//         done();
//       });
//     });

//     it('should not log a user with empty username into the app' , (done) => {
//       request
//       .post(`${userAPI}/signin`)
//       .send('Accept', 'Application/json')
//       .send({
//         username: '',
//         password: 'testtesttest'
//       })
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.be.equal('Username and password are both required');
//         done();
//       });
//     });

//     it('should check if username length is less than 2' , (done) => {
//       request
//       .post(`${userAPI}/signin`)
//       .send('Accept', 'Application/json')
//       .send({
//         username: 'w',
//         password: 'testtesttest'
//       })
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.be.equal('Username should be two or more characters');
//         done();
//       });
//     });


//     it('should check if both login credentials are empty' , (done) => {
//       request
//       .post(`${userAPI}/signin`)
//       .send('Accept', 'Application/json')
//       .send({
//         username: '',
//         password: ''
//       })
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.be.equal('Username and password are both required');
//         done();
//       });
//     });

//     it('should not log a user with password length less than 5' , (done) => {
//       request
//       .post(`${userAPI}/signin`)
//       .send('Accept', 'Application/json')
//       .send({
//         username: 'rweqrqer',
//         password: 'erew'
//       })
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.be.equal('Password should not be less than 5 characters');
//         done();
//       });
//     });
//   });


//   describe('Admin Authentication: ' , () => {
//     it('should be able to login with the right credentials', (done) => {
//       request
//       .post(`${userAPI}/signin`)
//       .send('Accept', 'Application/json')
//       .send(mockdata.adminSigninData)
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.have.property('responseData');
//         expect(res.body.responseData).to.have.property('token');
//         expect(res.body.responseData).to.have.property('user');
//         expect(res.body.responseData.user).to.have.property('userId');
//         expect(res.body.responseData.user).to.have.property('username');
//         expect(res.body.responseData.user).to.have.property('userRole');
//         expect(res.body.responseData).to.have.property('message');
//         expect(res.body.responseData.message).to.equal('signed in');
//         expect(res.body.responseData.user.username)
//         .to.equal(mockdata.adminSigninData.username);
//         done();
//       });
//     });
//   });


//   //************************************//
//   //*****TEST FOR INVALID SIGNUP DATA**//
//   //**********************************//

//   describe('INVALID DATA: ', () => {
//     it('should not register user if firstname contains numbers',
//       (done) => {
//         request
//         .post(`${userAPI}/signup`)
//         .send('Accept', 'Application/json')
//         .send(mockdata.user1InvalidDataFirstname)
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body).to.have.property('message');
//           expect(res.body.message)
//             .to.equal('Firstname can only contain alphabets');
//           done();
//         });
//       });

//     it('should not register user if firstname is empty', (done) => {
//       request
//       .post(`${userAPI}/signup`)
//       .send('Accept', 'Application/json')
//       .send(mockdata.user1InvalidDataFirstnameEmpty)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.equal('Firstname is required');
//         done();
//       });
//     });

//     it('should not register user if lastname is empty', (done) => {
//       request
//       .post(`${userAPI}/signup`)
//       .send('Accept', 'Application/json')
//       .send(mockdata.user1InvalidDataEmptyLastname)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Lastname is required');
//         done();
//       });
//     });

//     it('should check if the length of lastname is less than 2', (done) => {
//       request
//       .post(`${userAPI}/signup`)
//       .set('Content-Type', 'application/json')
//       .send(mockdata.user1InvalidDataEmptyLastname)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Lastname is required');
//         done();
//       });
//     });

//     it('should check if lastname contains numbers', (done) => {
//       request
//       .post(`${userAPI}/signup`)
//       .send('Accept', 'Application/json')
//       .send(mockdata.user1InvalidDataLastnamellength)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.equal('Lastname should be two or more characters');
//         done();
//       });
//     });
    
//     it('should check if email is invalid', (done) => {
//       request
//       .post(`${userAPI}/signup`)
//       .send('Accept', 'Application/json')
//       .send(mockdata.user1InvalidEmail)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Provided email is invalid');
//         done();
//       });
//     });

//     it('should not register user if email is empty', (done) => {
//       request
//       .post(`${userAPI}/signup`)
//       .send('Accept', 'Application/json')
//       .send(mockdata.user1EmptyEmail)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Email is required');
//         done();
//       });
//     });

//     it('should not register user if email is empty', (done) => {
//       request
//       .post(`${userAPI}/signup`)
//       .send('Accept', 'Application/json')
//       .send(mockdata.user1IncompleteData2)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Email is required');
//         done();
//       });
//     });

//       it('should check if email is not defined', (done) => {
//         request
//         .post(`${userAPI}/signup`)
//         .send('Accept', 'Application/json')
//         .send(mockdata.user1InvalidDataNoEmail)
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body).to.have.property('message');
//           expect(res.body.message).to.equal('Email is required');
//           done();
//         });
//     });

//     it('should not register user if username is empty', (done) => {
//       request
//       .post(`${userAPI}/signup`)
//       .send('Accept', 'Application/json')
//       .send(mockdata.user1IncompleteData4)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Username is required');
//         done();
//       });
//     });

//     // Check for invalid username
//     it('should not register user if usename is undefined ', (done) => {
//       request
//       .post(`${userAPI}/signup`)
//       .send('Accept', 'Application/json')
//       .send(mockdata.user1IncompleteDataMissingUsername)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Username is required');
//         done();
//       });
//     });


//     it('should check if username is already taken ', (done) => {
//       request
//       .post(`${userAPI}/signup`)
//       .send('Accept', 'Application/json')
//       .send(mockdata.user1IncompleteData6)
//       .end((err, res) => {
//         expect(res.status).to.equal(409);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Username taken, use another');
//         done();
//       });
//     });

//     it('should check if password is empty', (done) => {
//       request
//       .post(`${userAPI}/signup`)
//       .send('Accept', 'Application/json')
//       .send(mockdata.user1IncompleteData7)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Password is required');
//         done();
//       });
//     });

//     it('should check if password is less than 5 characters', (done) => {
//       request
//       .post(`${userAPI}/signup`)
//       .send('Accept', 'Application/json')
//       .send(mockdata.user1IncompleteData8)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.equal('Password should not be less than 5 characters');
//         done();
//       });
//     });

//     it('should check if password is less than 5 characters', (done) => {
//       request
//       .post(`${userAPI}/signup`)
//       .send('Accept', 'Application/json')
//       .send(mockdata.user1IncompleteDataMissingPass)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Password is required');
//         done();
//       });
//     });

//     it('should ensure access is not granted for wrong admin credentials',
//     (done) => {
//       request
//       .post(`${userAPI}/signin`)
//       .send('Accept', 'Application/json')
//       .send(mockdata.user1InvalidLogin)
//       .end((err, res) => {
//         expect(res.status).to.equal(401);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.be.equal('Invalid username or password');
//         done();
//       });
//     });
//   });

//   //***********************************//
//   //*****TEST FOR RESET PASSWORD*******//
//   //**********************************//

//   describe('Generate Unique Password Reset Url', () => {
//     it('should return a message when passed an empty email', (done) => {
//       request
//       .post(`${api}/resetpassword`)
//       .accept('Content-Type', 'Application/json')
//       .send({email: ''})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Email is required');
//         done();
//       });
//     });

//     it('should return a message when passed an invalid email', (done) => {
//       request
//       .post(`${api}/resetpassword`)
//       .accept('Content-Type', 'Application/json')
//       .send({email: 'invalidEmail'})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Provide your valid email');
//         done();
//       });
//     });

//     it('should return a message when passed an unregistered email', (done) => {
//       request
//       .post(`${api}/resetpassword`)
//       .accept('Content-Type', 'Application/json')
//       .send({email: 'tst@gmail.com'})
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.equal('This email does not exist in our database');
//         done();
//       });
//     });
//   });


//   describe('Google User Login' , () => {
//     it('should log a new user in', (done) => {
//       request
//       .post(`${api}/googleuser`)
//       .accept('Content-Type', 'Application/json')
//       .send(mockdata.user1Login)
//       .end((err, res) => {
//         done();
//       });
//     })
//   });
 
//   describe('Protected Routes:', () => {
//     it('should not allow users access these routes without token' , (done) => {
//       request
//       .post(`${api}/newcategory`)
//       .send({category: 'Health'})
//       .end((err, res) => {
//       expect(res.status).to.equal(403);
//       expect(res.body).to.have.property('message');
//       expect(res.body.message)
//         .to.equal('You do not have the permission to access this page');
//       done();
//       });
//     });

//     it('should not allow users access these routes without token' , (done) => {
//       request
//       .post(`${api}/books`)
//       .send(mockdata.bookdata)
//       .end((err, res) => {
//         expect(res.status).to.equal(403);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.equal('You do not have the permission to access this page');
//         done();
//       });
//     });

//     it('should not allow users access these routes without token' , (done) => {
//       request
//       .post(`${api}/googleuser/dfgddfgd`)
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('This is an invalid route');
//         done();
//       });
//     });

//     it('should not allow users access these routes without token' , (done) => {
//       request
//       .post(`${userAPI}/login/dfgddfgd`)
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('This is an invalid route');
//         done();
//       });
//     });

//     it('should not allow users access these routes without token' , (done) => {
//       request
//       .put(`${api}/books/${1}`)
//       .send(mockdata.editBookdata2)
//       .end((err, res) => {
//         expect(res.status).to.equal(403);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.equal('You do not have the permission to access this page');
//         done();
//       });
//     });

//     it('should not allow users access these routes without token' , (done) => {
//       request
//       .get(`${api}/books/${1}`)
//       .end((err, res) => {
//         expect(res.status).to.equal(403);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.equal('You do not have the permission to access this page');
//         done();
//       });
//     });

//     it('should not allow users access these routes without token' , (done) => {
//       request
//       .delete(`${api}/books/${1}`)
//       .end((err, res) => {
//         expect(res.status).to.equal(403);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.equal('You do not have the permission to access this page');
//         done();
//       });
//     });

//     it('should not allow users access these routes without token' , (done) => {
//       request
//       .get(`${api}/books/${1}`)
//       .end((err, res) => {
//         expect(res.status).to.equal(403);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.equal('You do not have the permission to access this page');
//         done();
//       });
//     });

//     it('should not allow users access these routes without token' , (done) => {
//       request
//       .get(`${api}/books/borrowedbooks`)
//       .end((err, res) => {
//         expect(res.status).to.equal(403);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.equal('You do not have the permission to access this page');
//         done();
//       });
//     });

//     it('should not allow users access these routes without token' , (done) => {
//       request
//       .get(`${api}/users/${2}/books`)
//       .end((err, res) => {
//         expect(res.status).to.equal(403);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.equal('You do not have the permission to access this page');
//         done();
//       });
//     });

//     it('should send a message when users visits invalid routes' , (done) => {
//       request
//       .get(`${api}/jdfidjfdsf`)
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('This is an invalid route');
//         done();
//       });
//     });

//     it('should send a message when users visits invalid routes' , (done) => {
//       request
//       .get(`${api}/jgjkfjgjfgjfhgh`)
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('This is an invalid route');
//         done();
//       });
//     });

//     it('should send a message when users visits invalid routes' , (done) => {
//       request
//       .get(`${api}/users/dsfadfadsf`)
//       .end((err, res) => {
//         expect(res.status).to.equal(403);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message)
//           .to.equal('You do not have the permission to access this page');
//         done();
//       });
//     });
//   });




//   //**********************************//
//   //********TEST ADMIN FEATURES******* //
//   //**********************************//
//   describe('Admin' , () => {
//     it('should upload a book', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.bookdata)
//       .end((err, res) => {
//         expect(res.status).to.equal(201);
//         expect(res.body).to.have.property('message');
//         expect(res.body).to.have.property('payload');
//         expect(res.body.payload).to.have.property('id');
//         expect(res.body.payload).to.have.property('isbn');
//         expect(res.body.payload).to.have.property('title');
//         expect(res.body.payload).to.have.property('author');
//         expect(res.body.payload).to.have.property('pages');
//         expect(res.body.payload).to.have.property('year');
//         expect(res.body.payload).to.have.property('description');
//         expect(res.body.payload).to.have.property('quantity');
//         expect(res.body.payload).to.have.property('categoryId');
//         expect(res.body.payload).to.have.property('visibility');
//         expect(res.body.payload).to.have.property('imageUrl');
//         expect(res.body.payload).to.have.property('pdfUrl');
//         expect(res.body.payload.isbn).to.equal(`#${mockdata.bookdata.isbn}`);
//         expect(res.body.payload.title).to.equal(mockdata.bookdata.title);
//         expect(res.body.payload.author).to.equal(mockdata.bookdata.author);
//         expect(res.body.payload.pages).to.equal(mockdata.bookdata.pages);
//         expect(res.body.payload.year).to.equal(mockdata.bookdata.year);
//         expect(res.body.payload.description).to.equal(mockdata.bookdata.description);
//         expect(res.body.payload.quantity).to.equal(mockdata.bookdata.quantity);
//         expect(res.body.payload.categoryId).to.equal(mockdata.bookdata.categoryId);
//         expect(res.body.payload.visibility).to.equal(true);
//         expect(res.body.payload.imageUrl).to.equal(mockdata.bookdata.imageUrl);
//         expect(res.body.payload.pdfUrl).to.equal(mockdata.bookdata.pdfUrl); 
//         done();
//       });
//     })


//     it('should not upload the same book', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.bookdata)
//       .end((err, res) => {
//         expect(res.status).to.equal(409);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('A book with this isbn exists');
//         done();
//       });
//     });

//     it('should edit a book', (done) => {
//       request
//       .put(`${api}/books/${mockdata.editBookdata.id}`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.editBookdata2)
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Book modified successfully');
//         done();
//       });
//     });

//     it('should check if book author is valid before editing', (done) => {
//       request
//       .put(`${api}/books/${mockdata.editBookdata.id}`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.editBookdataAuthorError)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Author is required');
//         done();
//       });
//     });

//     it('should check if book author is well formatted', (done) => {
//       request
//       .put(`${api}/books/${mockdata.editBookdata.id}`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.editBookdataAuthorformat)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Author name is not well formated');
//         done();
//       });
//     });

//     it('should check if book title is valid before editing', (done) => {
//       request
//       .put(`${api}/books/${mockdata.editBookdata.id}`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.editBookdataTitleError)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Title is required');
//         done();
//       });
//     });

//     it('should check if book page is valid before editing', (done) => {
//       request
//       .put(`${api}/books/${mockdata.editBookdata.id}`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.editBookdataPageError)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Book page(s) is required');
//         done();
//       });
//     });

//     it('should check if book year is valid before editing', (done) => {
//       request
//       .put(`${api}/books/${mockdata.editBookdata.id}`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.editBookdataYearError)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Year is required');
//         done();
//       });
//     });

//     it('should check if length of book year is more than 4 before editing', 
//     (done) => {
//       request
//       .put(`${api}/books/${mockdata.editBookdata.id}`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.editBookdataYearlengthError)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to
//         .equal('Book year can only be 4 digits or less');
//         done();
//       });
//     });

//     it('should check if description is empty before editing', (done) => {
//       request
//       .put(`${api}/books/${mockdata.editBookdata.id}`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.editBookdataDescriptionError)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Book description is required');
//         done();
//       });
//     });

//     it('should check if description is well formatted before editing', (
//       done) => {
//       request
//       .put(`${api}/books/${mockdata.editBookdata.id}`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.editBookdataDescriptionFormat)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Description is not well formatted');
//         done();
//       });
//     });

//     it('should check if quantity is valid before editing', (done) => {
//       request
//       .put(`${api}/books/${mockdata.editBookdata.id}`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.editBookdataQty)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Book quantity is required');
//         done();
//       });
//     });

//     it('should check if imageUrl is valid before editing', (done) => {
//       request
//       .put(`${api}/books/${mockdata.editBookdata.id}`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.editBookdataImageUrlFormatError)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Please select a valid book image');
//         done();
//       });
//     });

//     it('should check if imageUrl is valid before editing', (done) => {
//       request
//       .put(`${api}/books/${mockdata.editBookdata.id}`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.editBookdataPdfUrlFormatError)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Invalid file selected');
//         done();
//       });
//     });

//     it('should get a book', (done) => {
//       request
//       .get(`${api}/books/${mockdata.editBookdata.id}`)
//       .set('Authorization', adminToken)
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body.payload.id).to.equal(mockdata.editBookdata.id);
//         expect(res.body.payload.author).to.equal('Nelson Brook');
//         expect(res.body.payload.year).to.equal(2000);
//         expect(res.body.payload.title).to.equal('React for Beginners');
//         expect(res.body.payload.categoryId)
//           .to.equal(mockdata.editBookdata.categoryId);
//         done();
//       });
//     });

//     it('should return book not found for non-existing book', (done) => {
//       request
//       .get(`${api}/books/${100}`)
//       .set('Authorization', adminToken)
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to
//         .equal('This books is not available in our database')
//         done();
//       });
//     });

//     it('should delete a book', (done) => {
//       request
//       .delete(`${api}/books/${mockdata.editBookdata.id}`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body.message).to.equal('Book has been successfully deleted');
//         expect(res.body).to.have.property('bookId');
//           const id = parseInt(res.body.bookId, 10);
//         expect(id).to.equal(mockdata.editBookdata.id);
//         done();
//       });
//     });

//     it('should not delete a borrowed book', (done) => {
//       request
//       .delete(`${api}/books/${mockdata.editBookdata.id}`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Book not found in the database');
//         done();
//       });
//     });

//     it('should get all borrowed books', (done) => {
//       request
//       .get(`${api}/books/borrowedbooks`)
//       .set('Authorization', adminToken)
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.have.property('books');
//         expect(res.body.books).to.be.an('array');
//         const resultLength = res.body.books.length;
//         expect(resultLength).to.equal(0);
//         done();
//       });
//     });

//     it('should get all books', (done) => {
//       request
//       .get(`${api}/books/`)
//       .set('Authorization', adminToken)
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.have.property('books');
//         expect(res.body.books).to.be.an('array');
//         const resultLength = res.body.books.length;
//         expect(resultLength).to.equal(5);
//         done();
//       });
//     });
//   });

//   //**********************************//
//   //******TEST CATEGORY FEATURES**** //
//   //**********************************//

//   describe('Create category:', () => {
//     it('should fetch all categories' , (done) => {
//       request
//       .get(`${api}/categories`)
//       .set('Authorization', adminToken)
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.be.an('object');
//         expect(res.body.categories).to.be.an('array');
//         expect(res.body.categories[0]).to.property('id');
//         expect(res.body.categories[0]).to.property('category');
//         expect(res.body.categories[0]).to.property('createdAt');
//         expect(res.body.categories[0]).to.property('updatedAt');
//         done();
//       });
//     })

//     it('should check if category is empty' , (done) => {
//       request
//       .post(`${api}/newcategory`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send({category:''})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Category field cannot be empty');
//         done();
//       });
//     });

//     it('should check if length of typed category is less than 2' , (done) => {
//       request
//       .post(`${api}/newcategory`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send({category:'e'})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Category is too short');
//         done();
//       });
//     });


//     it('should add a new category' , (done) => {
//       request
//       .post(`${api}/newcategory`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send({category:'category'})
//       .end((err, res) => {
//         if(res) {
//           expect(res.status).to.equal(201);
//           expect(res.body).to.have.property('message');
//           expect(res.body.message).to.equal('Category created');
//         }
//         done();
//       });
//     })


//     it('should not add an existing category' , (done) => {
//       request
//       .post(`${api}/newcategory`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send({category:'Business'})
//       .end((err, res) => {
//         expect(res.status).to.equal(409);
//         expect(res.body).to.have.property('error');
//         expect(res.body.error).to.equal('This category exists');
//         done();
//       });
//     })

//     it('should not add category with length less than 3' , (done) => {
//       request
//       .post(`${api}/newcategory`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send({category:'w2'})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Category is too short');
//         done();
//       });
//     })

//     it('should not add category if number is supplied as category' , (done) => {
//       request
//       .post(`${api}/newcategory`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send({category:'123456'})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Category cannot contain numbers');
//         done();
//       });
//     });

//     it('should check if category is empty' , (done) => {
//       request
//       .post(`${api}/newcategory`)
//       .set('Authorization', userToken)
//       .send('Accept', 'Application/json')
//       .send({category:123456})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Category cannot contain numbers');
//         done();
//       });
//     });
//       it('should not create category if user is not admin' , (done) => {
//         request
//         .post(`${api}/newcategory`)
//         .set('Authorization', userToken)
//         .send('Accept', 'Application/json')
//         .send({category:'ghfgjjfd'})
//         .end((err, res) => {
//           expect(res.status).to.equal(403);
//           expect(res.body).to.have.property('message');
//           expect(res.body.message)
//             .to.equal('You do not have the permission to access this page');
//           done();
//         });
//     });
//   });

//   //***********************************//
//   //*****TEST FOR INVALID BOOK DATA***//
//   //**********************************//
  
//   describe('Admin Features Using Invalid Data', () => {


//     it('should not all books if no token', (done) => {
//       request
//       .get(`${api}/books`)
//       .send('Content-Type', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(401);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to
//         .equal('Only logged in users can see all books')
//         done();
//       });
//     });


//     it('should fetch trending books', (done) => {
//       request
//       .get(`${api}/trendingbooks`)
//       .send('Content-Type', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.have.property('trendingBooks');
//         expect(res.body.trendingBooks).to.be.an('array');
//         const lengthOfArray = res.body.trendingBooks.length;
//         expect(lengthOfArray).to.equal(4);
//         done();
//       });
//     });

//     it('should not create a book if isbn is missing', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.invalidBookdata1)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('ISBN is required');
//         done();
//       });
//     });


//     it('should not create a book if isbn is less than 6', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.invalidBookdataTheee)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('ISBN is required');
//         done();
//       });
//     });

//     it('should not create a book if title is missing', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.invalidBookdata2)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Title is required');
//         done();
//       });
//     });

//     it('should check if isbn is less than 6 in length', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.invalidBookdataInvalidIsbn)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('ISBN number should be 6 digits');
//         done();
//       });
//     });

//     it('should check if book author is missing', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.invalidBookdata3)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Author is required');
//         done();
//       });
//     });

//     it('should check if author name is valid', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.invalidBookdataInvalidAuthor)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Author name is not well formated');
//         done();
//       });
//     });

//     it('should check book if page is missing', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.invalidBookdata4)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Book page(s) is required');
//         done();
//       });
//     });

//     it('should check if book year is missing', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.invalidBookdata5)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Year is required');
//         done();
//       });
//     });

//     it('should check if the length of book year is more than 4', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.invalidBookdataYearLength)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to
//         .equal('Book year can only be 4 digits or less');
//         done();
//       });
//     });

//     it('should check if description is empty', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.emptyDescription)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Book description is required');
//         done();
//       });
//     });

//     it('should check if description contain abnormal space', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.tooManySpaceDescription)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Description is not well formated');
//         done();
//       });
//     });

//     it('should check if there is no quantity', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.emptyQty)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Book quantity is required');
//         done();
//       });
//     });

//     it('should check if there is no imageUrl', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.emptyImageUrl)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Book cover is required');
//         done();
//       });
//     });

//     it('should check if imageUrl is valid', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.invalidImageUrl)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Please select a valid book image');
//         done();
//       });
//     });

//     it('should check if there is no pdfUrl', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.emptyPdfUrl)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Select a pdf to be uploaded');
//         done();
//       });
//     });

//     it('should check if pdfUrl is valid', (done) => {
//       request
//       .post(`${api}/books`)
//       .set('Authorization', adminToken)
//       .send('Accept', 'Application/json')
//       .send(mockdata.invalidPdfUrl)
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Invalid file selected');
//         done();
//       });
//     });
//   });



//     //**********************************//
//   //********TEST USER FEATURES ******* //
//   //**********************************//

//   describe('User Features: ', () => {
//     it('should fetch user books' , (done) => {
//       request
//       .get(`${userAPI}/${userId}/books`)
//       .set('Authorization', userToken)
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body.response).to.be.an('array');
//         expect(res.body.response).to.be.empty;
//         done();
//       });
//     });

//     it('should fetch user books' , (done) => {
//       request
//       .get(`${api}`)
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Welcome to library api');
//         done();
//       });
//     });

//     it('should fetch books returned by users', (done) => {
//       request
//       .get(`${userAPI}/${userId}/books?returned=true`)
//       .set('Authorization', userToken)
//       .set('Content-Type', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body.response).to.be.an('array');
//         expect(res.body.response).to.be.empty;
//         done();
//       })
//     });


//     it('should allow user borrow a book', (done) => {
//       request
//       .post(`${userAPI}/${userId}/books`)
//       .set('Authorization', userToken)
//       .set('Content-Type', 'application/json')
//       .send({bookId: 5})
//       .end((err, res) => {
//         expect(res.status).to.equal(201);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('message');
//         expect(res.body).to.have.property('returnDate');
//         expect(res.body).to.have.property('bookBorrowed');
//         expect(res.body.bookBorrowed).to.have.property('dateborrowed');
//         expect(res.body.bookBorrowed).to.have.property('returnstatus');
//         expect(res.body.bookBorrowed).to.have.property('id');
//         expect(res.body.bookBorrowed).to.have.property('userId');
//         expect(res.body.bookBorrowed).to.have.property('bookId');
//         expect(res.body.bookBorrowed).to.have.property('expectedreturndate');
//         expect(res.body.message).to.equal('You have successfully borrowed this book');
//         expect(res.body).to.have.property('returnDate');
//         expect(res.body).to.have.property('bookBorrowed');
//         expect(res.body.bookBorrowed).to.have.property('id');
//         expect(res.body.bookBorrowed.userId).to.equal(2);
//         expect(res.body.bookBorrowed.bookId).to.equal(5);
//         done();
//       });
//     });

//     it('should  delete a borrowed book', (done) => {
//       request
//       .delete(`${api}/books/${5}`)
//       .set('Authorization', adminToken)
//       .set('Content-Type', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(422);
//         expect(res.body.message).to
//         .equal('This book has been borrowed and cannot be deleted');
//         done();
//       });
//     });

//     it('should not allow user borrow the same book', (done) => {
//       request
//       .post(`${userAPI}/${userId}/books`)
//       .set('Authorization', userToken)
//       .set('Content-Type', 'application/json')
//       .send({bookId: 5})
//       .end((err, res) => {
//         expect(res.status).to.equal(401);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to
//         .equal('You have either exhausted your book limit or you still have this book with you');
//         done();
//       });
//     });

//     it('should return Book not found for book not in the database ', (done) => {
//       request
//       .post(`${userAPI}/${userId}/books`)
//       .set('Authorization', userToken)
//       .set('Content-Type', 'application/json')
//       .send({bookId: 80})
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Book not found');
//         done();
//       });
//     });

//     it('should not borrow a book with invalid id ', (done) => {
//       request
//       .post(`${userAPI}/${userId}/books`)
//       .set('Authorization', userToken)
//       .set('Content-Type', 'application/json')
//       .send({bookId: '80'})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Please provide a valid book id');
//         done();
//       });
//     });

//     it('should fetch books borrowed by a user', (done) => {
//       request
//       .get(`${userAPI}/${userId}/books`)
//       .set('Authorization', userToken)
//       .set('Content-type', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.have.property('response');
//         expect(res.body.response).to.be.an('array');
//         expect(res.body.response[0]).to.have.property('id');
//         expect(res.body.response[0]).to.have.property('userId');
//         expect(res.body.response[0]).to.have.property('bookId');
//         expect(res.body.response[0]).to.have.property('dateborrowed');
//         expect(res.body.response[0]).to.have.property('expectedreturndate');
//         expect(res.body.response[0]).to.have.property('returnstatus');
//         expect(res.body.response[0]).to.have.property('approvedreturn');
//         expect(res.body.response[0]).to.have.property('createdAt');
//         expect(res.body.response[0]).to.have.property('updatedAt');
//         expect(res.body.response[0]).to.have.property('Book');
//         expect(res.body.response[0].Book).to.be.an('object');
//         expect(res.body.response[0].id).to.be.a('number');
//         expect(res.body.response[0].userId).to.be.a('number');
//         expect(res.body.response[0].bookId).to.be.a('number');
//         expect(res.body.response[0].dateborrowed).to.be.a('string');
//         expect(res.body.response[0].expectedreturndate).to.be.a('string');
//         expect(res.body.response[0].returnstatus).to.be.a('boolean');
//         expect(res.body.response[0].approvedreturn).to.be.a('boolean');     
//         done();
//       })
//     });

//     it('should fetch books borrowed by users and not returned', (done) => {
//       request
//       .get(`${userAPI}/${userId}/books?returned=false`)
//       .set('Authorization', userToken)
//       .set('Content-Type', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.have.property('response');
//         expect(res.body.response).to.be.an('array');
//         expect(res.body.response[0]).to.have.property('id');
//         expect(res.body.response[0]).to.have.property('userId');
//         expect(res.body.response[0]).to.have.property('bookId');
//         expect(res.body.response[0]).to.have.property('dateborrowed');
//         expect(res.body.response[0]).to.have.property('expectedreturndate');
//         expect(res.body.response[0]).to.have.property('returnstatus');
//         expect(res.body.response[0]).to.have.property('approvedreturn');
//         expect(res.body.response[0]).to.have.property('createdAt');
//         expect(res.body.response[0]).to.have.property('updatedAt');
//         expect(res.body.response[0]).to.have.property('Book');
//         expect(res.body.response[0].Book).to.be.an('object');
//         expect(res.body.response[0].id).to.be.a('number');
//         expect(res.body.response[0].userId).to.be.a('number');
//         expect(res.body.response[0].bookId).to.be.a('number');
//         expect(res.body.response[0].dateborrowed).to.be.a('string');
//         expect(res.body.response[0].expectedreturndate).to.be.a('string');
//         expect(res.body.response[0].returnstatus).to.be.a('boolean');
//         expect(res.body.response[0].approvedreturn).to.be.a('boolean');
//         done();
//       })
//     });

//     it('should allow user return a book', (done) => {
//       request
//       .put(`${userAPI}/${userId}/books`)
//       .set('Authorization', userToken)
//       .set('Content-Type', 'Application/json')
//       .send({bookId: 5})
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('message');
//         done();
//       })
//     });
    

//     it('should check if book was borrowed by user', (done) => {
//       request
//       .put(`${userAPI}/${userId}/books`)
//       .set('Authorization', userToken)
//       .set('Content-Type', 'Application/json')
//       .send({bookId: 65})
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.
//         equal('This book is not in your latest borrow history');
//         done();
//       })
//     });

//     it('should check if book id is valid', (done) => {
//       request
//       .put(`${userAPI}/${userId}/books`)
//       .set('Authorization', userToken)
//       .set('Content-Type', 'Application/json')
//       .send({bookId: 'dfdskjkdfja'})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.
//         equal('Please provide a valid book id');
//         done();
//       })
//     });

//     it('should fetch books returned by users', (done) => {
//       request
//       .get(`${userAPI}/${userId}/books?returned=true`)
//       .set('Authorization', userToken)
//       .set('Content-Type', 'Application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.have.property('response');
//         expect(res.body.response).to.be.an('array');
//         expect(res.body.response[0].userId).to.equal(userId);
//         expect(res.body.response[0].bookId).to.equal(5);
//         done();
//       })
//     });

//     it('should return user profile details', (done) => {
//       request
//       .get(`${userAPI}/${userId}`)
//       .set('Authorization', userToken)
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.have.property('user');
//         expect(res.body.user).to.have.property('id');
//         expect(res.body.user).to.have.property('firstname');
//         expect(res.body.user).to.have.property('lastname');
//         expect(res.body.user).to.have.property('email');
//         expect(res.body.user).to.have.property('username');
//         expect(res.body.user).to.have.property('password');
//         expect(res.body.user).to.have.property('membership');
//         expect(res.body.user).to.have.property('createdAt');
//         expect(res.body.user).to.have.property('updatedAt');
//         expect(res.body.user).to.have.property('imageUrl');
//         expect(res.body.user.firstname).to.equal('david');
//         expect(res.body.user.lastname).to.equal('brook');
//         expect(res.body.user.email).to.equal('david@mail.com');
//         expect(res.body.user.username).to.equal('username');
//         expect(res.body.user.role).to.equal('user');
//         expect(res.body.user.membership).to.equal('bronze');
//         expect(res.body.user.passwordReseturl).to.equal('uFUhdjHDJjdg');
//         done();
//       });
//     });

//     it('should not get user profile details if no token is provided',
//     (done) => {
//       request
//       .get(`${userAPI}/${userId}`)
//       .end((err, res) => {
//         expect(res.status).to.equal(403);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to
//         .equal('You do not have the permission to access this page');
//         done();
//       });
//     });

//     it('should edit user profile', (done) => {
//       request
//       .put(`${userAPI}/${userId}`)
//       .set('Authorization', userToken)
//       .set('Content-Type', 'Application/json')
//       .send(mockdata.userEdit)
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.be.an('object');
//         expect(res.body.user).to.have.a.property('id');
//         expect(res.body.user).to.have.a.property('firstname');
//         expect(res.body.user).to.have.a.property('lastname');
//         expect(res.body.user).to.have.a.property('username');
//         expect(res.body.user.id).to.be.a('number');
//         expect(res.body.user.firstname).to.equal(mockdata.userEdit.firstname);
//         expect(res.body.user.lastname).to.equal(mockdata.userEdit.lastname);
//         expect(res.body.user.username).to.equal(mockdata.userEdit.username);
//         done();
//       });
//     });

    
//   });
//   describe('Reset Password:', () => {

//     it('checks if new password is sent as body', (done) => {
//       request
//       .put(`${api}/resetpassword/${generatedUrl}`)
//       .accept('Content-Type', 'Application/json')
//       .set('Content-Type', 'Application/json')
//       .send({password: ''})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Please type in your new password');
//         done();
//       });
//     });

//     it('checks if new password length is between 5 and 30', (done) => {
//       request
//       .put(`${api}/resetpassword/${generatedUrl}`)
//       .set('Content-Type', 'application/json')
//       .send({password: '123'})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to
//           .equal('Password should not be less than 5 characters');
//         done();
//       });
//     });

//     it('should check if the given url is invalid', (done) => {
//       request
//       .put(`${api}/resetpassword/uFUhdDJjdg`)
//       .set('Content-Type', 'Application/json')
//       .send({password: 'abeebyere'})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('This link is invalid');
//         done();
//       });
//     });

//     it('should reset the password', (done) => {
//       request
//       .put(`${api}/resetpassword/uFUhdjHDJjdf`)
//       .set('Content-Type', 'Application/json')
//       .send({password: 'abeebyere'})
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Your password has been updated');
//         done();
//       });
//     });

//     it('should not reset password twice', (done) => {
//       request
//       .put(`${api}/resetpassword/uFUhdjHDJjdf`)
//       .set('Content-Type', 'Application/json')
//       .send({password: 'abeebyere'})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('This link has expired');
//         done();
//       });
//     });

//     it('should sigin a google user in', (done) => {
//       request
//       .put(`${api}/googleuser`)
//       .set('Content-Type', 'Application/json')
//       .send(mockdata.user1)
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         done();
//       });
//     });
    
//   });

