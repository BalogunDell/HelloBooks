import model from '../models';
import errorMessages from '../middleware/errorMessages';
import paramValid from '../utils/paramValid';
import {
  findOneResource,
  findOneResourceById,
  findAllResources
} from '../utils/queryFinder';

const bookModel = model.Book;
const categoryModel = model.Category;
const borrowedBookModel = model.BorrowBook;

/**
 * @class Book
 * 
 * @classdesc Creates a Book class
 */
class BookController {
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
   * @returns {object} deleted book id and message
   */
  static deleteBook(req, res) {
    const bookId = parseInt(req.params.id, 10);
    if (paramValid(bookId)) {
      return res.status(400).json({
        message: 'You have provided an invalid id'
      });
    }
    findOneResource(borrowedBookModel,
      { where: {
        bookid: bookId, returnstatus: false } })
      .then((response) => {
        if (response !== null) {
          return res.status(422).json({
            message: 'This book has been borrowed and cannot be deleted'
          });
        }
        findOneResource(bookModel, { where: { id: bookId } })
          .then((reply) => {
            if (!reply) {
              return res.status(404).json({
                message: 'Book not found in the database'
              });
            }
            return bookModel.destroy({
              where: { id: bookId }
            })
              .then(() => {
                res.status(200).json({
                  message: 'Book has been successfully deleted',
                  bookId
                });
              })
              .catch(() => {
                res.status(500).json({
                  message: 'Internal server error'
                });
              });
          });
      });
  }


  /**
   * @param {object} req Request object
   * @param {object} res Response object
   * 
   * @returns {object} All books in the library
   */
  static getBooks(req, res) {
    findAllResources(bookModel, { include: {
      model: categoryModel
    }
    }).then((response) => {
      res.status(200).json({ books: response });
    }).catch(() => {
      res.status(500).json({ message: 'Internal server error' });
    });
  }

  /**
   * @param {object} req Request object
   * @param {object} res Response object
   * 
   * @returns {object} borrowedbooks
   */
  static getBorrowedBooks(req, res) {
    findAllResources({ include: { model: bookModel,
      include: { model: categoryModel } } })
      .then((response) => {
        res.status(200).json({ books: response });
      }).catch(() => {
        res.status(500).json({ message: 'Internal server error' });
      });
  }

  /**
   * @param {object} req Request object
   * @param {object} res  Response object
   * 
   * @returns {object} book payload
   */
  static getBookById(req, res) {
    const bookId = parseInt(req.params.id, 10);
    if (paramValid(bookId)) {
      return res.status(400).json({
        message: 'You have provided an invalid id'
      });
    }
    findOneResource(bookModel,
      { where: { id: bookId, visibility: true } })
      .then((book) => {
        if (!book) {
          return res.status(404).json({
            message: 'This books is not available in our database'
          });
        }
        return res.status(200).json({ payload: book });
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
    const bookId = parseInt(req.params.id, 10);
    if (paramValid(bookId)) {
      return res.status(400).json({
        message: 'You have provided an invalid id'
      });
    }
    const query = {
      where: {
        id: bookId,
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

    findOneResource(bookModel, query)
      .then((book) => {
        if (!book) return res.status(404).json({ message: 'Book not found' });
        book.update(bookData)
          .then((updated) => {
            if (updated) {
              return findOneResource(bookModel, {
                where: {
                  id: updated.id },
                include: { model: categoryModel }
              }).then((response) => {
                res.status(200).json({
                  message: 'Book modified successfully',
                  payload: response });
              })
                .catch(() => res.status(500).json({
                  message: 'Internal server error'
                }));
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
    borrowedBookModel.create(payload)
      .then((response) => {
        bookModel.update({ quantity: req.book.dataValues.quantity - 1 },
          { where: { id: response.dataValues.bookid } })
          .then((updateResponse) => {
            if (updateResponse) {
              res.status(201).json({
                message: 'You have successfully borrowed this book',
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
    const { userId, bookId } = parseInt(req.body, 10);
    findOneResource(borrowedBookModel, { where: {
      userId,
      bookId,
      returnstatus: false } })
      .then((response) => {
        if (response === null) {
          res.status(404).json({
            message: 'This book is not in your latest borrow history' });
        } else {
          borrowedBookModel.update({
            returnstatus: true },
          { where: { id: response.dataValues.id } })
            .then((feedback) => {
              if (feedback) {
                findOneResourceById(bookModel, bookId)
                  .then((foundBook) => {
                    bookModel.update({
                      quantity: foundBook.dataValues.quantity + 1 },
                    { where: {
                      id: bookId
                    }
                    }).then((updated) => {
                      if (updated) {
                        res.status(200).json({
                          message: 'Book has been returned'
                        });
                      }
                    }).catch(() => {
                      res.status(500).json({
                        errorMessage: 'Internal server error'
                      });
                    });
                  }).catch((error) => {
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
          findAllResources(categoryModel)
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
    findAllResources()
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
    findAllResources(bookModel,
      { limit: 4, order: [['createdAt', 'DESC']] })
      .then((response) => {
        res.status(200).json({ trendingBooks: response });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
}
export default BookController;
