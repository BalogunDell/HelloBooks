import model from '../models';
import errorMessages from '../middleware/errorMessages';

const bookModel = model.book;
const borrowedBook = model.borrowedbook;
const categoryModel = model.category;


/**
 * @class Book
 * 
 * @classdesc creates a Book classs
 */
class Book {
  /**
   * @param {object} req 
   * @param {object} res
   * 
   * @returns {object} add book message and book as payload
   */
  static addBook(req, res) {
    bookModel.create(req.body).then((book) => {
      res.status(201).json({ message: 'Book created', payload: book });
    }).catch((error) => {
      // check if all fields are supplied.
      const messageObject = errorMessages(error);
      switch (messageObject.type) {
        case 'uniqueError':
          res.status(409).json({ errorMessage: messageObject.error });
          break;
        case 'validationError':
          res.status(400).json({ errorMessage: messageObject.error });
          break;
        default:
          res.status(500).json({ errorMessage: 'Internal server error' });
      }
    });
  }


  /**
   * @param {object} req request object
   * @param {object} res response object
   * 
   * @returns {object} updated books and message
   */
  static deleteBook(req, res) {
    const bookId = parseInt((req.params.id), 10);
    borrowedBook.findOne({ where: {
      bookid: bookId, returnstatus: false
    }
    })
      .then((response) => {
        if (response !== null) {
          return res.status(422).json({
            message: 'This book has been borrowed and cannot be deleted'
          });
        }
        bookModel.findOne({ where: { id: bookId, visibility: true } })
          .then((reply) => {
            if (reply === null) {
              res.status(404).json({
                message: 'Book not found in the database'
              });
            } else if (reply.dataValues.visibility === true) {
              bookModel.update({ visibility: false },
                { where: { id: bookId } })
                .then(() => {
                  bookModel.findAll().then((allbooks) => {
                    res.status(200).json({
                      message: 'Book has been successfully deleted',
                      updatedBooks: allbooks
                    });
                  });
                });
            }
          })
          .catch((error) => {
            res.status(501).json({ message: error });
          });
      }).catch((error) => {
        res.status(501).json({ message: error });
      });
  }

  /**
   * 
   * @param {object} req Request object
   * @param {object} res Response object
   * 
   * @returns {object} message
   */
  static enableBook(req, res) {
    const bookId = parseInt(req.params.id, 10);
    bookModel.findById(bookId)
      .then((response) => {
        if (response) {
          return bookModel.update({ visibility: true },
            {
              where: { id: bookId }
            })
            .then(() => {
              res.status(200).json({
                message: 'Book has been published'
              });
            })
            .catch((error) => {
              res.status(501).json({ error });
            });
        }
      })
      .catch((error) => {
        return error;
      });
  }

  /**
   * @param {object} req Request object
   * @param {object} res Response object
   * 
   * @returns {object} fetched book
   */
  static getBooks(req, res) {
    bookModel.findAll({ where: {
      visibility: true },
    include: {
      model: categoryModel
    }
    }).then((response) => {
      res.status(200).json({ books: response });
    }).catch((error) => {
      res.status(404).json({ message: error.message });
    });
  }

  /**
  * @param {object} req Request object
  * @param {object} res Response object

  * @returns {object} fetched books - published and unpublished
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
   * @param {object} req Request object
   * @param {object} res Response object
   * 
   * @returns {object} borrowedbooks
   */
  static getBorrowedBooks(req, res) {
    borrowedBook.findAll({ include: { model: bookModel,
      include: { model: categoryModel } } }).then((response) => {
      res.status(200).json({ books: response });
    }).catch((error) => {
      res.status(404).json({ message: error.message });
    });
  }

  /**
   * @param {object} req Request object
   * @param {object} res  Response object
   * 
   * @returns {object} book payload
   */
  static getBookById(req, res) {
    const bookid = parseInt(req.params.id, 10);
    bookModel.findOne({ where: { id: bookid, visibility: true } })
      .then((book) => {
        if (!book) {
          res.status(404).json({
            message: 'This books is not available in our database'
          });
        } else {
          res.status(200).json({ payload: book });
        }
      })
      .catch(() => {
        res.status(500).json({ message: 'Internal server error' });
      });
  }


  /**
 * @param {object} req Request object
 * @param {object} res Response object
 * 
 * @returns {object} modified book payload
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
      categoryid: req.body.categoryid,
      description: req.body.description,
      quantity: req.body.quantity,
      imageUrl: req.body.imageUrl,
      pdfUrl: req.body.pdfUrl
    };

    bookModel.findOne(query)
      .then((book) => {
        if (!book) return res.status(404).json({ message: 'Book not found' });
        book.update(bookData)
          .then((updated) => {
            if (updated) {
              bookModel.findOne({
                where: {
                  id: updated.id },
                include: { model: categoryModel }
              })
                .then((response) => {
                  res.status(200).json({
                    message: 'Book modified successfully',
                    payload: response });
                })
                .catch(() => {
                  res.status(500).json({
                    message: 'Internal server error'
                  });
                });
            }
          }).catch((error) => {
            const messageObject = errorMessages(error);
            switch (messageObject.type) {
              case 'uniqueError':
                res.status(409).json({
                  errorMessage: messageObject.error
                });
                break;
              case 'validationError':
                res.status(400).json({
                  errorMessage: messageObject.error
                });
                break;
              default:
                res.status(500).json({
                  errorMessage: 'Internal server error'
                });
            }
          })
          .catch(() => res.status(500).json({
            errorMessage: 'Internal server error'
          }));
      });
  }

  /**
   * @param {object} req request object
   * @param {object} res response object
   * 
   * @returns {object} response payload
   */
  static borrowBook(req, res) {
    const { bookid, userid, expectedreturndate } = req.body;
    const payload = {
      bookid,
      userid,
      expectedreturndate
    };
    borrowedBook.create(payload)
      .then((response) => {
        bookModel.update({ quantity: req.book.dataValues.quantity - 1 },
          { where: { id: response.dataValues.bookid } })
          .then((updateRes) => {
            if (updateRes) {
              res.status(201).json({
                message: 'You have successfully borrowd this book',
                returnDate: req.body.expectedreturndate });
            }
          })
          .catch(() => {
            res.status(500).json({
              message:
              'Book not added',
              errorMessage: 'Internal server error'
            });
          });
      })
      .catch(() => {
        res.status(500).json({ errorMessage: 'Internal server error' });
      });
  }


  /**
   * 
   * @param { object } req Requst body
   * @param { object } res Response body
   * 
   * @returns { object } returns json object
   */
  static returnBook(req, res) {
    const userid = parseInt(req.body.userid, 10);
    const bookid = parseInt(req.body.bookid, 10);
    borrowedBook.findOne({ where: {
      userid,
      bookid,
      returnstatus: false } })
      .then((response) => {
        if (response === null) {
          res.status(404).json({
            message: 'This book is not in your latest borrow history' });
        } else {
          borrowedBook.update({ returnstatus: true },
            { where: { id: response.dataValues.id } })
            .then((feedback) => {
              if (feedback) {
                bookModel.findById(req.body.bookid)
                  .then((foundBook) => {
                    bookModel.update({
                      quantity: foundBook.dataValues.quantity + 1 },
                    { where: {
                      id: req.body.bookid
                    }
                    })
                      .then((updated) => {
                        if (updated) {
                          res.status(200).json({
                            message: 'Book has been returned'
                          });
                        }
                      })
                      .catch(() => {
                        res.status(500).json({
                          error: 'Internal server error'
                        });
                      });
                  })
                  .catch((error) => {
                    const messageObject = errorMessages(error);
                    switch (messageObject.type) {
                      case 'validationError':
                        res.status(400).json({
                          errorMessage: messageObject.error
                        });
                        break;
                      default:
                        res.status(500).json({
                          errorMessage: 'Internal server error'
                        });
                    }
                  });
              }
            })
            .catch(() => {
              res.status(500).json({ error: 'Internal server error'
              });
            });
        }
      });
  }

  /**
   * 
   * @param {object} req request body
   * @param {object} res response body
   * 
   * @return {object} response object as categories
   */
  static addCategory(req, res) {
    categoryModel.create(req.body)
      .then((category) => {
        if (category) {
          categoryModel.findAll()
            .then((response) => {
              res.status(201).json({
                message: 'Category created',
                payload: response
              });
            })
            .catch(() => {
              res.status(500).json({
                message: 'Category could not be created'
              });
            });
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
            res.status(500).json({ error: 'Internal server error' });
        }
      });
  }

  /**
   * 
   * @param { object } req request object
   * @param { object } res respones object
   * 
   * @return { object } categories as payload
   */
  static getCategories(req, res) {
    categoryModel.findAll()
      .then((categories) => {
        if (categories) {
          res.status(200).json({ categories });
        }
      })
      .catch(() => {
        res.status(500)
          .json({ message: 'Internal server error'
          });
      });
  }

  /**
   * 
   * @param { object } req request object
   * @param { object } res response object
   * 
   * @return { object } trending books 
   */
  static fetchTrendingBooks(req, res) {
    bookModel.findAll({ limit: 4, order: [['createdAt', 'DESC']] })
      .then((response) => {
        res.status(200).json({ trendingBooks: response });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
}
export default Book;
