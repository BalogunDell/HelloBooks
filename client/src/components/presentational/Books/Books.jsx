import React from 'react';
import Book from './Book';

/**
 * 
 * Renders the Book component
 * 
 * @returns {JSX} JSX representation of DOM
 */
const Books = (bookData, loading) => {
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