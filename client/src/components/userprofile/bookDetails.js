import React from 'react';

const bookDetails = ({ book }) => {

  return (
    
    <div>
      <div className="row">
        <div className="col s12 m12 l9 offset-l3">
          <h3>Book Details</h3>
        </div>

        <div className="row bookDetails">
          <div className="col s12 m6 offset-m3 l9 offset-l3">
            <img src= {`/images/books/${book.image}`} alt={book.title} className="responsive-img"/>
          </div>

        </div>
      </div> 
    </div>
  )
}


bookDetails.proType = {
  book: React.PropTypes.object.isRequired
}
export default bookDetails;