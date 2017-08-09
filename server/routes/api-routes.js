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

// get all users
//Router.get('/users/', userController.verifyAdmin, userController.getAllUsers);

Router.route('/books')
  .get(bookController.getBook)
  .post(Auth.verifyAdmin, bookController.addBook);

Router.put('/books/:id', Auth.verifyAdmin, bookController.modifyBook);

// Routes allow user borrow book, check for books not returned and return book
Router.route('/users/:userId/books')
  .post(Auth.verifyUser, helper.checkBook, helper.verify, bookController.borrowbook)
  .get(Auth.verifyUser, userController.booksNotReturned)
  .get(Auth.verifyUser, userController.booksReturned)
  .put(Auth.verifyUser, userController.returnBook);

// redirect every other address
Router.route('*')
  .post((req, res) => {
    res.send('This is an invalid route');
  })
  .get((req, res) => {
    res.send('This is an invalid route, does not exist');
  });

export default Router;
