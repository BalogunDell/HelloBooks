import express from 'express';
import UserController from '../controller/UserController';
import BookController from '../controller/BookController';
import helper from '../middleware/Helper';
import InputValidator from '../middleware/InputValidator';
import Authentication from '../middleware/Authentication';
import Helper from '../middleware/Helper';

const appRouter = express.Router();

/**
* @param  {} '/api/v1/users/signup'
*
* @param  {} checkUserInput
*
* @param  {} checkValidUserInput
*
* @param  {} checkUserInvalidInput
*
* @param  {} validateUsers
*
* @param  {} users.signup
*/
appRouter.get('/', (req, res) => {
  res.status(200)
    .json({
      message: 'Welcome to library api'
    });
});


// User Routes
appRouter.post('/users/signup',
  InputValidator.signupValidator,
  UserController.signup);

appRouter.post('/users/signin',
  InputValidator.loginValidator,
  UserController.signin);


// Add and fetch categories
appRouter.post('/newcategory',
  InputValidator.checkCategoryPayload,
  Authentication.verifyAdmin,
  BookController.addCategory);

appRouter.get('/categories',
  Authentication.verifyAdmin,
  BookController.getCategories);


// Generate uique url for password reset, Reset password
appRouter.post('/resetpassword',
  InputValidator.resetPassEmailVerifer,
  UserController.generateResetPassUrl);

appRouter.put('/resetpassword/:resetUrl',
  InputValidator.resetPassVerifier,
  Authentication.verifyUrl,
  UserController.resetPassword);


appRouter.route('/books')
  .get(Authentication.verifyAdmin,
    BookController.getBooks)

  .post(InputValidator.bookPayloadChecker,
    Authentication.verifyAdmin,
    BookController.addBook);

appRouter.get('/books/borrowedbooks',
  Authentication.verifyAdmin,
  BookController.getBorrowedBooks);

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

  .delete(Authentication.verifyAdmin,
    BookController.deleteBook);

appRouter.route('/users/:userId/books')
  .post(
    InputValidator.verifyBookId,
    Authentication.verifyUser,
    helper.checkBook,
    helper.verifyBookLimit,
    BookController.borrowBook)

  .get(Authentication.verifyUser,
    UserController.getUserBooks)

  .put(
    InputValidator.verifyBookId,
    Authentication.verifyUser,
    BookController.returnBook);

appRouter.route('/users/:userId/')
  .get(Authentication.verifyUser,
    UserController.profilePage)
  .put(Authentication.verifyUser,
    UserController.editProfile
  );

appRouter.get('/trendingbooks',
  BookController.fetchTrendingBooks
);

appRouter.post('/googleuser', UserController.newGoogleAccess);

// redirect every other address
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
