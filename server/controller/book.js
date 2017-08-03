import model from '../models';

const bookModel = model.books;


/**
 * @class Book
 * @classdesc creates a Book classs
 */
class Book {
  /*
   * @param {Object} req
   * @param {Object} res
   * @return null
   */
  static addBook(req, res) {
    bookModel.create(req.body).then(() => {
      res.send(200).json({ message: 'Book created' });
    }).catch((error) => {
      // check if all fields are supplied.
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ message: 'One or more fields are empty' });
        // check if a duplicate request was made.
      } else if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Two books cannot have the same ISBN number' });
      } else {
        res.send(error);
      }
    });
  }
}


export default Book;
