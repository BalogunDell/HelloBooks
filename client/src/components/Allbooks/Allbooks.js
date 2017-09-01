import React from 'react';

import book1 from '../../assets/images/books/book1.png';
/**
 * @class Books
 * @classdesc returns the Books component
 */
export default class Allbooks extends React.Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return(
      
      <div>
        {/* Row for header  */}
        <div className="row">
          <div className="col s12 books-holder-title center">
            <h1>All Books</h1>
          </div>
        </div>
      
        {/* Row for books  */}
        
        <div className="row">
          <div className="col s12 m12 l11 offset-l1">
            <div className="books-holder center">
              {this.props.books.map((book, id) => 
                <div className="book-holder-prot" key= {book.id}>
                  {/* Book title  */}
                  <div className="item book-title center">
                    <h6><strong>{book.title}</strong></h6>
                  </div>

                  {/* Book image  */}
                  <div className="item img-holder center">
                    <img src= {book.image } alt=""/>
                    <div className="img-overlay">
                      <p>{book.title} by <strong>{book.author}</strong></p>
                    </div>
                  </div>

                  {/* Book details  */}
                  <div className="dets">
                    <a href="bookdetails.html"><button type="button" className="btn waves-effect waves-teal">Details</button></a>
                    <p>qty: {book.quantity}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}