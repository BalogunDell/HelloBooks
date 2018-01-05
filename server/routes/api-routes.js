import express from 'express';
import userController from '../controller/user';
import bookController from '../controller/book';
import Auth from '../middleware/auth';
import helper from '../middleware/helper';

const Router = express.Router();

// Api home
Router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to library api' });
});


// User Routes
Router.post('/users/signup', userController.signup);
Router.post('/users/signin', userController.signin);

// Add and fetch categories
Router.post('/newcategory', Auth.verifyAdmin, bookController.addCategory);
Router.get('/categories', Auth.verifyAdmin, bookController.getCategories);


// Generate uique url for password reset, Reset password
Router.post('/resetpassword', userController.generateResetPassUrl);
Router.put('/resetpassword/:resetUrl', Auth.verifyUrl, userController.resetPassword);
// Router.post('/validateUrl/:resetUrl', Auth.verifyUrl);

Router.route('/books')
  .get(bookController.getBook)
  .post(Auth.verifyAdmin, bookController.addBook);

// Get all borrowed books for admin to display
Router.get('/books/borrowedbooks', Auth.verifyAdmin, bookController.getBorrowedBooks);

//  Get all books including published and unpublished
Router.get('/books/all', Auth.verifyAdmin, bookController.getAllBooks);

Router.route('/books/:id')
  .put(Auth.verifyAdmin, bookController.modifyBook)
  .post(Auth.verifyAdmin, bookController.enableBook)
  .get(Auth.verifyAdmin, bookController.getBookById)
  .delete(Auth.verifyAdmin, bookController.deleteBook);

// Routes allow user borrow book, check for books not returned and return book
Router.route('/users/:userId/books')
  .post(Auth.verifyUser, helper.checkBook, helper.verify, bookController.borrowBook)
  .get(Auth.verifyUser, userController.getUserBooks)
  .put(Auth.verifyUser, bookController.returnBook);

// User profile page
Router.route('/users/:userId/')
  .get(Auth.verifyUser, userController.profilePage)
  .put(Auth.verifyUser, userController.editProfile);

// Fetch trending books
Router.get('/trendingbooks', bookController.fetchTrendingBooks);

// redirect every other address
Router.route('*')
  .post((req, res) => {
    res.send('This is an invalid route');
  })
  .get((req, res) => {
    res.send('This is an invalid route');
  });

export default Router;
