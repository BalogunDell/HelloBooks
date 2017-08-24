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

// user feedback route
Router.post('/users/category', Auth.verifyAdmin, bookController.addCategory);


// get all users - Admin action
Router.get('/users', Auth.verifyAdmin, userController.getAllUsers);


Router.route('/books')
  .get(bookController.getBook)
  .post(Auth.verifyAdmin, bookController.addBook)
  .delete(Auth.verifyAdmin, bookController.deleteBook);
Router.route('/books/:id')
  .put(Auth.verifyAdmin, bookController.modifyBook)
  .get(Auth.verifyAdmin, bookController.getBookById);

// Routes allow user borrow book, check for books not returned and return book
Router.route('/users/:userId/books')
  .post(Auth.verifyUser, helper.checkBook, helper.verify, bookController.borrowBook)
  .get(Auth.verifyUser, userController.getUserBooks)
  .put(Auth.verifyUser, bookController.returnBook);

// User profile page
Router.get('/users/:userId/', Auth.verifyUser, userController.profilePage);


// redirect every other address
Router.route('*')
  .post((req, res) => {
    res.send('This is an invalid route');
  })
  .get((req, res) => {
    res.send('This is an invalid route');
  });

export default Router;
