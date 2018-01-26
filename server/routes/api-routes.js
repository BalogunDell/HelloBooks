import express from 'express';
import userController from '../controller/User';
import bookController from '../controller/Book';
import helper from '../middleware/Helper';
import PayloadValidator from '../middleware/PayloadValidator';
import Authentication from '../middleware/Authentication';

const Router = express.Router();

// Api home
Router.get('/', (req, res) => {
  res.status(200)
    .json({
      message: 'Welcome to library api'
    });
});


// User Routes
Router.post('/users/signup',
  PayloadValidator.signupValidator,
  userController.signup);
Router.post('/users/signin',
  PayloadValidator.loginValidator,
  userController.signin);

// Add and fetch categories
Router.post('/newcategory',
  Authentication.verifyAdmin,
  PayloadValidator.checkCategoryPayload,
  bookController.addCategory);
Router.get('/categories',
  Authentication.verifyAdmin,
  bookController.getCategories);


// Generate uique url for password reset, Reset password
Router.post('/resetpassword',
  PayloadValidator.resetPassEmailVerifer,
  userController.generateResetPassUrl);
Router.put('/resetpassword/:resetUrl',
  PayloadValidator.resetPassVerifier,
  Authentication.verifyUrl,
  userController.resetPassword);


Router.route('/books')
  .get(Authentication.verifyUser, bookController.getBooks)
  .post(PayloadValidator.bookPayloadVerifier,
    Authentication.verifyAdmin, bookController.addBook);

// Get all borrowed books for admin to display
Router.get('/books/borrowedbooks',
  Authentication.verifyAdmin,
  bookController.getBorrowedBooks);

//  Get all books including published and unpublished
Router.get('/books/all',
  Authentication.verifyAdmin,
  bookController.getAllBooks);

Router.route('/books/:id')
  .put(
    PayloadValidator.editBookVerifier,
    Authentication.verifyAdmin,
    bookController.modifyBook)
  .post(Authentication.verifyAdmin,
    bookController.enableBook)
  .get(Authentication.verifyAdmin,
    bookController.getBookById)
  .delete(Authentication.verifyAdmin,
    bookController.deleteBook);

// Routes allow user borrow book, check for books not returned and return book
Router.route('/users/:userId/books')
  .post(
    Authentication.verifyUser,
    PayloadValidator.verifyBorrowPayload,
    helper.checkBook,
    helper.verify,
    bookController.borrowBook)
  .get(Authentication.verifyUser,
    userController.getUserBooks)
  .put(Authentication.verifyUser,
    bookController.returnBook);

// User profile page
Router.route('/users/:userId/')
  .get(Authentication.verifyUser,
    userController.profilePage)
  .put(Authentication.verifyUser,
    userController.editProfile
  );

// Fetch trending books
Router.get('/trendingbooks',
  bookController.fetchTrendingBooks
);

// Google user
Router.post('/googleuser',
  PayloadValidator.signupValidator,
  userController.newGoogleAccess);

// redirect every other address
Router.route('*')
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

export default Router;
