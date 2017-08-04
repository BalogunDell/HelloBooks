import model from '../models';

const bookModel = model.books;


/**
 * @class Book
 * @classdesc creates a Book classs
 */
class Book {
  /**
   * @param {object} req 
   * @param {object} res
   * @returns {void}
   */
  static addBook(req, res) {
    bookModel.create(req.body).then(() => {
      res.send(201).json({ message: 'Book created' });
    }).catch((error) => {
      // check if all fields are supplied.
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ message: 'One or more fields are empty' });
        // check if a duplicate request was made.
      } else if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(409).json({ message: 'Two books cannot have the same ISBN number' });
      } else {
        res.send(error);
      }
    });
  }
  /**
   * @param {object} req 
   * @param {object} res
   * @returns { object } resposnse
   */
  static getBook(req, res) {
    bookModel.findAll().then((response) => {
      res.send(response);
    }).catch((error) => {
      res.send(404).json({ message: error.message });
    });
  }
  /**
 * @param {object} req 
 * @param {object} res
 * @returns { object } resposnse
 */
  static modifyBook(req, res) {
    bookModel.findOne({ where: { id: req.params.id } }).then((response) => {
      res.send(response);
    }).catch((error) => {
      res.send(404).json({ message: error.body });
    });
  }
}


export default Book;
