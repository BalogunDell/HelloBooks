import express from 'express';
import userController from '../controller/user';

const Router = express.Router();

// Api home
Router.get('/user', (req, res) => {
  res.status(200).send('Welcome to library api');
});

// User Routes
Router.post('/users/signup', userController.signup);

Router.post('/users/signin', (req, res) => {
  res.send(req.body);
});

Router.route('/books')
  .get((req, res) => {
    res.send('get books works');
  })
  .post((req, res) => {
    res.send('post books works');
  });

Router.route('/users/:userId/books')
  .post((req, res) => {
    res.send('borrow books works');
  })
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
