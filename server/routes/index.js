import express from 'express';
import UserController from '../controller/UserController';
import BookController from '../controller/BookController';
import InputValidator from '../middleware/InputValidator';
import Authentication from '../middleware/Authentication';
import Helper from '../middleware/Helper';

const appRouter = express.Router();

/**
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
* @param  {string} '/api/v1/users/signup'
* @param  {method} signupValidator
* @param  {method} signup
*/
appRouter.post('/users/signup',
  InputValidator.signupValidator,
  UserController.signup);

/**
* @param  {string} '/api/v1/users/signin'
* @param  {method} loginValidator
* @param  {method} signin
*/
appRouter.post('/users/signin',
  InputValidator.loginValidator,
  UserController.signin);


/**
* @param  {string} '/api/v1/newcategory'
* @param  {method} checkCategoryPayload
* @param  {method} verifyAdmin
* @param  {method} addCategory
*/
appRouter.post('/newcategory',
  InputValidator.checkCategoryPayload,
  Authentication.verifyAdmin,
  BookController.addCategory);

/**
* @param  {string} '/api/v1/categories'
* @param  {method} verifyAdmin
* @param  {method} getCategories
*/
appRouter.get('/categories',
  Authentication.verifyAdmin,
  BookController.getCategories);

/**
* @param  {string} '/api/v1/resetpassword'
* @param  {method} resetPassEmailVerifer
* @param  {method} generateResetPassUrl
*/
appRouter.post('/resetpassword',
  InputValidator.resetPassEmailVerifer,
  UserController.generateResetPassUrl);

/**
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

  .post(InputValidator.bookPayloadChecker,
    Authentication.verifyAdmin,
    BookController.addBook);

/**
* @param  {string} '/api/v1/books/borrowedbooks'
* @param  {method} verifyAdmin
* @param  {method} getBorrowedBooks
*/
appRouter.get('/books/borrowedbooks',
  Authentication.verifyAdmin,
  BookController.getBorrowedBooks);

/**
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
* @param  {string} '/api/v1/trendingbooks'
* @param  {method} fetchTrendingBooks
*/ 
appRouter.get('/trendingbooks',
  BookController.fetchTrendingBooks
);

/**
* @param  {string} '/api/v1/googleuser'
* @param  {method} newGoogleAccess
*/ 
appRouter.post('/googleuser',
  InputValidator.signupValidator,
  UserController.newGoogleAccess);


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
