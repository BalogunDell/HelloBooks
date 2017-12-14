import React from 'react';
import Book from './book';
/**
 * @class Books
 * @classdesc returns the Books component
 */
const Books = (bookData) => {
  return (
  <div className="container home-books">
      <Book
        bookData = {bookData}
      />
  </div>
  );
};

Books.proptypes = {
  bookData: React.PropTypes.object
}

  export default Books;