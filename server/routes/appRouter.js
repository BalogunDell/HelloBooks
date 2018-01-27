import express from 'express';
import UserController from '../controller/UserController';
import BookController from '../controller/BookController';
import helper from '../middleware/Helper';
import PayloadValidator from '../middleware/PayloadValidator';
import Authentication from '../middleware/Authentication';

const appRouter = express.Router();

// Api home
appRouter.get('/', (req, res) => {
  res.status(200)
    .json({
      message: 'Welcome to library api'
    });
});


// User Routes
appRouter.post('/users/signup',
  PayloadValidator.signupValidator,
  UserController.signup);
appRouter.post('/users/signin',
  PayloadValidator.loginValidator,
  UserController.signin);

// Add and fetch categories
appRouter.post('/newcategory',
  Authentication.verifyAdmin,
  PayloadValidator.checkCategoryPayload,
  BookController.addCategory);
appRouter.get('/categories',
  Authentication.verifyAdmin,
  BookController.getCategories);


// Generate uique url for password reset, Reset password
appRouter.post('/resetpassword',
  PayloadValidator.resetPassEmailVerifer,
  UserController.generateResetPassUrl);
appRouter.put('/resetpassword/:resetUrl',
  PayloadValidator.resetPassVerifier,
  Authentication.verifyUrl,
  UserController.resetPassword);


appRouter.route('/books')
  .get(Authentication.verifyUser, BookController.getBooks)
  .post(PayloadValidator.bookPayloadVerifier,
    Authentication.verifyAdmin, BookController.addBook);

// Get all borrowed books for admin to display
appRouter.get('/books/borrowedbooks',
  Authentication.verifyAdmin,
  BookController.getBorrowedBooks);

appRouter.route('/books/:id')
  .put(
    PayloadValidator.editBookVerifier,
    Authentication.verifyAdmin,
    BookController.modifyBook)
  .get(Authentication.verifyAdmin,
    BookController.getBookById)
  .delete(Authentication.verifyAdmin,
    BookController.deleteBook);

appRouter.route('/users/:userId/books')
  .post(
    Authentication.verifyUser,
    PayloadValidator.verifyBorrowPayload,
    helper.checkBook,
    helper.verify,
    BookController.borrowBook)
  .get(Authentication.verifyUser,
    UserController.getUserBooks)
  .put(Authentication.verifyUser,
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

appRouter.post('/googleuser',
  PayloadValidator.signupValidator,
  UserController.newGoogleAccess);

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
