import model from '../models';

const bookModel = model.books;
const borrowedBooks = model.borrowedbooks;
const categoryModel = model.categories;


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
        res.status(409).json({ message: 'A book with is ISBN already exists' });
      } else {
        res.send(error);
      }
    });
  }


  /**
   * @param {object} req 
   * @param {object} res
   * @returns {void}
   */
  static deleteBook(req, res) {
    bookModel.destroy({ where: { id: req.body.id } }).then(() => {
      res.status(200).json({ message: 'Book deleted' });
    }).catch((error) => {
      res.status(500).json({ message: 'Book Cannot be deleted', data: error });
    });
  }

  /**
   * @param {object} req 
   * @param {object} res
   * @returns { object } resposnse
   */
  static getBook(req, res) {
    bookModel.findAll().then((response) => {
      res.status(200).json({ books: response });
    }).catch((error) => {
      res.send(404).json({ message: error.message });
    });
  }

  /**
   * @param { object } req 
   * @param { object} res 
   * @param { object } next
   * @returns { object } response
   */
  static getBookById(req, res) {
    const bookid = req.params.id;
    bookModel.findById(bookid)
      .then((book) => {
        if (!book) {
          res.status(404).json({ message: 'This books is not available in our database' });
        } else {
          res.status(201).json({ message: book });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error });
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
      category: req.body.category,
      description: req.body.description,
      quantity: req.body.quantity,
      image: req.body.image
    };

    bookModel.findOne(query)
      .then((book) => {
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        if (book.dataValues.isbn !== `#${req.body.isbn}`) {
          res.status(405).json({ message: 'ISBN number cannot be modified' });
        } else {
          book.update(bookData)
            .then((updated) => {
              if (updated) {
                res.status(200).json({ message: 'Book modified successfully', data: updated });
              }
            }).catch((error) => {
              res.status(404).json({ message: error.body });
            });
        }
      })
      .catch(error => res.status(500).json({ msg: error }));
  }


  /**
   * @param { object } req
   * @param { object } res
   * @returns { void }
   */
  static borrowBook(req, res) {
    borrowedBooks.create(req.body)
      .then((response) => {
        bookModel.update({ quantity: req.book.dataValues.quantity - 1 },
          { where: { id: response.dataValues.bookid } })
          .then((updateRes) => {
            if (updateRes) {
              res.status(201).json({ message: 'Book Added',
                returnDate: req.body.expectedreturndate });
            }
          })
          .catch((error) => {
            res.status(400).json({ message: 'Book not added', errors: error });
          })
          .catch();
      })
      .catch((error) => {
        res.status(401).json({ message: error });
      });
  }


  /**
   * @param { object } req 
   * @param { object } res
   * @returns { object } returns object
   */
  static returnBook(req, res) {
    borrowedBooks.findOne({ where: {
      userid: req.body.userid,
      bookid: req.body.bookid,
      returnstatus: false } })
      .then((response) => {
        if (response === null) {
          res.status(404).json({
            message: 'This book is not in your latest borrow history' });
        } else {
          borrowedBooks.update({ returnstatus: true },
            { where: { id: response.dataValues.id } }).then(() => {
            res.status(200).json({ message: 'Book has been returned' });
          });
        }
      });
  }

  /**
   * 
   * @param { object } req
   * @param { object } res
   * @return { object }
   */
  static addCategory(req, res) {
    categoryModel.create(req.body)
      .then((category) => {
        if (category) {
          res.status(201).json({ message: 'Category created' });
        }
      })
      .catch((error) => {
        res.status(409).json({ message: error.errors[0].message });
      });
  }
}

export default Book;
