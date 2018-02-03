import express from 'express';
import UserController from '../controller/UserController';
import BookController from '../controller/BookController';
import InputValidator from '../middleware/InputValidator';
import Authentication from '../middleware/Authentication';
import Helper from '../middleware/Helper';

const appRouter = express.Router();

/**
* @description This is the entry point of the API
* 
* @param  {string} '/api/v1/'
* @param  {object} req - request object
* @param  {object} res - response object
*/
appRouter.get('/', (req, res) => {
  res.status(200)
    .json({
      message: 'Welcome to library api'
    });
});


/**
* @description This route allow users signup 
*  
* @param  {string} '/api/v1/users/signup'
* @param  {method} signupValidator
* @param  {method} signup
*/
appRouter.post('/users/signup',
  InputValidator.signupValidator,
  UserController.signup);

/**
* @description This route allow users signin
* 
* @param  {string} '/api/v1/users/signin'
* @param  {method} loginValidator
* @param  {method} signin
*/
appRouter.post('/users/signin',
  InputValidator.loginValidator,
  UserController.signin);


/**
* @description This route allow admin create new and fetch existing categories
*
* @param  {string} '/api/v1/newcategory'
* @param  {method} checkCategoryPayload
* @param  {method} verifyAdmin
* @param  {method} addCategory
*/
appRouter.route('/categories')
  .post(
    InputValidator.checkCategoryPayload,
    Authentication.verifyAdmin,
    BookController.addCategory)
  .get(
    Authentication.verifyAdmin,
    BookController.getCategories);

/**
* @description This route allow users request for password reset link 
*
* @param  {string} '/api/v1/resetpassword'
* @param  {method} resetPassEmailVerifer
* @param  {method} generateResetPassUrl
*/
appRouter.post('/resetpassword',
  InputValidator.resetPassEmailVerifer,
  UserController.generateResetPassUrl);

/**
* @description This route allow users reset their password
*
* @param  {string} '/api/v1/resetpassword/:resetUrl'
* @param  {method} resetPassVerifier
* @param  {method} verifyUrl
* @param  {method} resetPassword
*/
appRouter.put('/resetpassword/:resetUrl',
  InputValidator.resetPassVerifier,
  Authentication.verifyUrl,
  UserController.resetPassword);

/**
* @description This route allow admin to create and fetch books in the database
* 
* @param  {string} '/api/v1/books/'
* @param  {method} confirmLibraryAccess
* @param  {method} getBooks
* @param  {method} bookPayloadChecker
* @param  {method} verifyAdmin
* @param {method} addBook
*/
appRouter.route('/books')
  .get(Authentication.confirmLibraryAccess,
    BookController.getBooks)

  .post(Authentication.verifyAdmin,
    InputValidator.bookPayloadChecker,
    BookController.addBook);

/**
* @description This route allow admin to fetch all borrowed books
* 
* @param  {string} '/api/v1/books/borrowedbooks'
* @param  {method} verifyAdmin
* @param  {method} getBorrowedBooks
*/
appRouter.get('/books/borrowedbooks',
  Authentication.verifyAdmin,
  BookController.getBorrowedBooks);

/**
* @description Route allows admin modify a book, delete a book and get a book
* 
* @param  {string} '/api/v1/books/:id'
* @param  {method} editBookVerifier
* @param  {method} verifyAdmin
* @param  {method} checkBookId
* @param  {method} modifyBook
* @param  {method} getBookById
* @param  {method} deleteBook
*/
appRouter.route('/books/:id')
  .put(
    InputValidator.editBookVerifier,
    Authentication.verifyAdmin,
    Helper.checkBookId,
    BookController.modifyBook)

  .get(
    Helper.checkBookId,
    Authentication.verifyAdmin,
    BookController.getBookById)

  .delete(
    Helper.checkBookId,
    Authentication.verifyAdmin,
    BookController.deleteBook);

/**
* @description Uers can borrow, return and get all their books using this
* 
* @param  {string} '/api/v1//users/:userId/book'
* @param  {method} verifyBookId
* @param  {method} verifyUser
* @param  {method} checkBook
* @param  {method} verifyBookLimit
* @param  {method} borrowBook
* @param  {method} getUserBooks
* @param  {method} returnBook
*/  
appRouter.route('/users/:userId/books')
  .post(
    InputValidator.verifyBookId,
    Authentication.verifyUser,
    Helper.checkBook,
    Helper.verifyBookLimit,
    BookController.borrowBook)

  .get(Authentication.verifyUser,
    UserController.getUserBooks)

  .put(
    InputValidator.verifyBookId,
    Authentication.verifyUser,
    BookController.returnBook);

/**
* @description This route allow users fetch and edit their profile details
* 
* @param  {string} '/api/v1/users/:userId/'
* @param  {method} verifyUser
* @param  {method} profilePage
* @param  {method} editProfile
*/ 
appRouter.route('/users/:userId/')
  .get(Authentication.verifyUser,
    UserController.profilePage)
  .put(InputValidator.editProfileVerifier,
    Authentication.verifyUser,
    UserController.editProfile
  );


/**
* @description This route handles change of password by users
* 
* @param  {string} '/api/v1/users/:userId/newpassword'
* @param  {method} verifyUser
* @param  {method} editPassword
*/ 
appRouter.put('/users/:userId/newpassword',
  InputValidator.editPasswordVerifier,
  Authentication.verifyUser,
  UserController.editPassword
);


/**
* @description This route fetches all trending books in the library
*
* @param  {string} '/api/v1/trendingbooks'
* @param  {method} fetchTrendingBooks
*/ 
appRouter.get('/trendingbooks',
  BookController.fetchTrendingBooks
);

/**
* @description This route handles google login
* 
* @param  {string} '/api/v1/googleuser'
* @param  {method} newGoogleAccess
*/ 
appRouter.post('/googleuser',
  InputValidator.signupValidator,
  UserController.newGoogleAccess);

/**
* @description This route every invalid route
* 
* @param  {string} '/api/v1/invalidroutes'
*/ 

appRouter.route('*')
  .post((req, res) => {
    res.status(404)
      .json({
        message: 'This is an invalid route'
      });
  })
  .get((req, res) => {
    res.status(404)
      .json({
        message: 'This is an invalid route'
      });
  });

export default appRouter;
