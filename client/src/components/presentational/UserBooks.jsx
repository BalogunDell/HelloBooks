import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description Renders User books
 * 
 * @param {object} allUserBooks
 * @param {Function} handleReturn
 * @param {object} borrowedBooks
 * @param {object} allBooks
 * @param {function} handleBookDelete
 * @param {function} handleBookEdit
 * @method UserBooks
 */
const UserBooks = ({
	allUserBooks,
	handleReturn,
	borrowedBooks,
	allBooks,
	handleBookDelete,
	handleBookEdit
  }) => {
	let books = [];
		!borrowedBooks ? books = allUserBooks : books = borrowedBooks
		allUserBooks ? books = allUserBooks : books = borrowedBooks;
		allBooks ? books = allBooks : null;
  const bookLength = books.length;
	
  return (
    <div className= "styledUserBooksTable">
        <table className="centered">
        <thead>
          {
              allBooks 
            ?
              <tr>
                <th>ISBN</th>
                <th className="hide-on-small-only">Book Cover</th>
                <th>Book Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Pages</th>
                <th>Action</th>
              </tr>
            :
              <tr>
                <th>Book image</th>
                <th>Book title</th>
                <th>Author</th>
                <th>Date Borrowed</th>
                <th>Expected Return Date</th>
                {handleReturn === undefined ? null : <th>Action</th>}
              </tr>
            }
        </thead>
        <tbody>
          {
            bookLength == 0 
            ?
            <tr className="center">
              <td>There are no books here</td>
              </tr>
            :
            books.map((book, id) =>
              book.Book
              ?
                <tr 
                key={id}>
                  <td>
                    <img src={book.Book.imageUrl} alt="Book cover"/></td>
                  <td>{book.Book.title}</td>
                  <td>{book.Book.author}</td>
                  <td>{book.dateBorrowed}</td>
                  <td>{book.expectedReturnDate}</td>
                  {
                  handleReturn === undefined 
                  ?
                  null
                  :
                    book.returnStatus 
                    ? 
                  <td>
                    <button
                      className="btn waves-effect waves-teal custom"
                      disabled={true}>Return
                    </button>
                  </td>          
                    :
                  <td>  
                    <button className="btn btn-small waves-effect waves-teal custom" 
                      value={book.bookId}
                      data-id={id}
                      id="returnBook"
                      onClick={handleReturn}>Return
                  </button>
                  </td>
                  }
                </tr>
              :
                <tr key={id}>
                <td>{book.isbn}</td>
                  <td>
                    <img src={book.imageUrl} alt="Book cover"/></td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.Category.category}</td>
                  <td>{book.quantity}</td>
                  <td>{book.pages}</td>
                  <td>
                    <Link 
                      to ="/user/editbook">
                        <button 
                          value={book.id}
                          data-index = {id}
                          onClick={handleBookEdit}
                          className="material-icons green-text"
                          id="edit">edit
                        </button>
                    </Link>
                      <a
                        href="#confirmationModal"
                        className="modal-trigger">

                        <button
                          value={book.id}
                          data-index = {id}
                          onClick={handleBookDelete} 
                          className="material-icons red-text" >delete
                        </button>
                      </a>
                </td>
              </tr>
              )
            }
        </tbody>
      </table>
  </div>
	);
}

export default UserBooks;