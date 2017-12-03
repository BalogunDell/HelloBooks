import model from '../models';
import errorMessages from '../middleware/errorMessages';

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
      // res.status(501).json({ message: error.errors[0].message });
      // check if all fields are supplied.
      const messageObject = errorMessages(error);
      switch (messageObject.type) {
        case 'uniqueError':
          res.status(409).json({ message: messageObject.error });
          break;
        case 'validationError':
          res.status(400).json({ message: messageObject.error });
          break;
        default:
          res.status(501).json({ message: messageObject.error });
      }
    });
  }


  /**
   * @param {object} req 
   * @param {object} res
   * @returns {void}
   */
  static deleteBook(req, res) {
    const bookId = parseInt((req.params.id), 10);
    borrowedBooks.findOne({ where: { bookid: bookId, returnstatus: false } })
      .then((response) => {
        if (response !== null) {
          res.status(501).json({ message: 'This book has been borrowed and cannot be deleted' });
        } else {
          bookModel.findOne({ where: { id: bookId, visibility: true } })
            .then((reply) => {
              if (reply === null) {
                res.status(404).json({ message: 'Book not found in the database' });
              } else if (reply.dataValues.visibility === true) {
                bookModel.update({ visibility: false }, { where: { id: bookId } })
                  .then(() => {
                    bookModel.findAll().then((allbooks) => {
                      res.status(201).json({ message: 'Book has been successfully deleted', updatedBooks: allbooks });
                    });
                  });
              }
            })
            .catch((error) => {
              res.status(501).json({ message: error });
            });
        }
      }).catch((error) => {
        res.status(501).json({ message: error });
      });
  }

  /**
   * 
   * @param { object } req 
   * @param { object } res 
   * @returns { object } response
   */
  static enableBook(req, res) {
    const bookId = parseInt(req.params.id, 10);
    bookModel.findById(bookId)
      .then((response) => {
        if (response) {
          bookModel.update({ visibility: true }, { where: { id: bookId } })
            .then(() => {
              res.status(201).json({ message: 'Book has been published' });
            })
            .catch((error) => {
              res.status(501).json({ error });
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * @param {object} req 
   * @param {object} res
   * @returns { object } resposnse
   */
  static getBook(req, res) {
    bookModel.findAll({ where: { visibility: true }, include: { model: categoryModel } }).then((response) => {
      res.status(200).json({ books: response });
    }).catch((error) => {
      res.status(404).json({ message: error.message });
    });
  }

  /**
  * @param {object} req 
  * @param {object} res
  * @returns { object } resposnse
  */
  static getAllBooks(req, res) {
    bookModel.findAll({ where: { visibility: false },
      include: { model: categoryModel } })
      .then((response) => {
        res.status(200).json({ books: response });
      }).catch((error) => {
        res.status(501).json({ message: error.message });
      });
  }

  /**
   * @param {object} req 
   * @param {object} res
   * @returns { object } resposnse
   */
  static getBorrowedBooks(req, res) {
    borrowedBooks.findAll({ include: { model: bookModel,
      include: { model: categoryModel } } }).then((response) => {
      res.status(200).json({ books: response });
    }).catch((error) => {
      res.status(404).json({ message: error.message });
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
    bookModel.findOne({ where: { id: bookid, visibility: true } })
      .then((book) => {
        if (!book) {
          res.status(404).json({ message: 'This books is not available in our database' });
        } else {
          res.status(200).json({ message: book });
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
        id: parseInt(req.params.id, 10),
        visibility: true
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
      image: req.body.image,
      pdf: req.body.pdf
    };

    bookModel.findOne(query)
      .then((book) => {
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        book.update(bookData)
          .then((updated) => {
            if (updated) {
              res.status(200).json({ message: 'Book modified successfully', data: updated });
            }
          }).catch((error) => {
            res.status(404).json({ message: error.body });
          })
          .catch(error => res.status(500).json({ msg: error }));
      });
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
            { where: { id: response.dataValues.id } })
            .then((feedback) => {
              if (feedback) {
                bookModel.findById(req.body.bookid)
                  .then((foundBook) => {
                    bookModel.update({ quantity: foundBook.dataValues.quantity + 1 },
                      { where: { id: req.body.bookid } })
                      .then((updated) => {
                        if (updated) {
                          res.status(201).json({ message: 'Book has been returned' });
                        }
                      })
                      .catch((error) => {
                        res.status(501).json({ error });
                      });
                  })
                  .catch((error) => {
                    res.status(501).json({ error });
                  });
              }
            });
        }
      });
  }

  /**
   * 
   * @param { object } req
   * @param { object } res
   * @return { object } object
   */
  static addCategory(req, res) {
    categoryModel.create(req.body)
      .then((category) => {
        if (category) {
          res.status(201).json({ message: 'Category created' });
        }
      })
      .catch((error) => {
        const messageObject = errorMessages(error);
        switch (messageObject.type) {
          case 'uniqueError':
            res.status(409).json({ error: messageObject.error });
            break;
          case 'validationError':
            res.status(400).json({ error: messageObject.error });
            break;
          default:
            res.status(501).json({ error: messageObject.error });
        }
      });
  }

  /**
   * 
   * @param { object } req
   * @param { object } res
   * @return { object } object
   */
  static getCategories(req, res) {
    categoryModel.findAll()
      .then((categories) => {
        if (categories) {
          res.status(200).json({ categories });
        }
      })
      .catch((error) => {
        res.status(409).json({ message: error.errors[0].message });
      });
  }

  /**
   * 
   * @param { object } req
   * @param { object } res
   * @return { object } object
   */
  static deleteCategory(req, res) {
    categoryModel.findById(req.body.id)
      .then((response) => {
        if (response) {
          categoryModel.destroy({ where: { id: req.body.id } }).then(() => {
            res.status(201).json({ message: 'Category deleted' });
          })
            .catch((error) => {
              res.status(501).json({ error: error.errors[0].mess });
            });
        } else {
          res.status(404).json({ message: 'Category does not exist' });
        }
      })
      .catch((error) => {
        res.status(501).json({ error: error.errors[0].message });
      });
  }
}

export default Book;
