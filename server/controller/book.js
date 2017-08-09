import model from '../models';

const bookModel = model.books;
const borrowedBooks = model.borrowedbooks;


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
    bookModel.create(req.body).then((book) => {
      res.status(201).json({ message: 'Book created', data: book });
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
    const query = {
      where: {
        id: parseInt(req.params.id, 10)
      }
    };
    const bookData = {
      pages: req.body.pages,
      author: req.body.author,
      year: req.body.year,
      title: req.body.title,
      description: req.body.description,
      quantity: req.body.quantity
    };

    bookModel.findOne(query)
      .then((book) => {
        if (!book) return res.status(404).send({ msg: 'Book not found' });
        book.update(bookData)
          .then((updated) => {
            if (updated) {
              res.status(200).json({ message: 'Book modified successfully', data: updated });
            }
          }).catch((error) => {
            res.status(404).json({ message: error.body });
          });
      })
      .catch(error => res.status(500).json({ msg: error }));
  }

  /**
   * @param { object } req
   * @param { object } res
   * @returns { void }
   */
  static borrowbook(req, res) {
    borrowedBooks.create(req.body)
      .then((response) => {
        res.status(201).json({ message: 'Book Added', data: response })
      })
      .catch((error) => {
        res.status(401).json({ message: error });
      });
  }// end of method
}


export default Book;
