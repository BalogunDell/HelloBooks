import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../userprofile/adminSubComponents/loader';

const book = (bookData) => {
  const books = bookData.bookData.bookData.trendingBooks;
  const loading = bookData.bookData.bookData.loading;
  return (
    <div>
      <div className="row">
      <div className="col s12 books-holder-title">
        <h1 className="trending">Trending Books</h1>
      </div>
  </div>
  <div className="row">
    <div className="col s12 m12 l12">
      <div className="books-holder center">
        {books.map((book, id) => 
          <div className="trending-book-holder-prot" key= {book.id}>
            {/* Book title  */}
            <div className="item book-title center">
              <h6><strong>{book.title}</strong></h6>
            </div>

            {/* Book image  */}
            <div className="item img-holder center">
              <img src= {book.image} alt=""/>
              <div className="img-overlay">
                <p>{book.title} by <strong>{book.author}</strong></p>
              </div>
            </div>

            {/* Book details  */}
            <div className="dets">
              <Link to={`/login`} id="borrowBook">
                <button 
                  type="button"
                  value={book.id}
                  className="btn waves-effect waves-teal"
                >Borrow Book
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  </div>
  );
};

book.proptypes = {
  bookData: React.PropTypes.object
}

export default book;
