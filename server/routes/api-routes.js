import express from 'express';
import userController from '../controller/user';
import bookController from '../controller/book';
import Auth from '../middleware/auth';

const Router = express.Router();

// Api home
Router.get('/user', (req, res) => {
  res.status(200).send('Welcome to library api');
});

// User Routes
Router.post('/users/signup', userController.signup);

Router.post('/users/signin', Auth.signin);

Router.route('/books')
  .get(bookController.addBook)
  .post(bookController.addBook);

Router.route('/users/:userId/books')
  .post(userController.Books)
  .get((req, res) => {
    if (req.query.returned === 'false') {
      return res.send(['book1', 'book2']);
    }
    res.send(['book1', 'book2', 'book3']);
  })
  .put((req, res) => {
    res.send('return books works');
  });

// Router.get('/users/:userId/books?returned=false', (req, res) => {
//   res.send(req.params);
// });

// Admin modify new book
Router.put('/books/:bookId', (req, res) => {
  res.send(req.body);
});

export default Router;
