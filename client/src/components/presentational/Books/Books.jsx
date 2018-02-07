import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

/**
 * 
 * @description Renders the Book component
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
  bookData: PropTypes.object
}

  export default Books;