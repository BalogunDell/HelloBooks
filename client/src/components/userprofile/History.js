import React from 'react';

/**
 * @class History
 * @classdesc returns the borrow history of the user
 */
class History extends React.Component {

  render() {

    return(
      <div>
        {/* Row for header  */}
        <div className="row">
          <div className="col s12 books-holder-title center">
            <h1>Borrow History</h1>
          </div>
        </div>
      
        {/* Row for books  */}
        
        <div className="row">
          <div className="col s12 m12 l11 offset-l1">
            <table className="responsive-table centered">
              <thead>
                <tr>
                  <th>Book image</th>
                  <th>Book title</th>
                  <th>Author</th>
                  <th>Date Borrowed</th>
                  <th>Action</th>
                </tr>
              </thead>
                {/* show all borrowed books  */}
              <tbody>
                {this.props.borrowedBooks.map((borrowedBook, id) =>
                <tr key={borrowedBook.id}>
                  <td>{borrowedBook.image}</td>
                  <td>{borrowedBook.title}</td>
                  <td>{borrowedBook.author}</td>
                  <td>{borrowedBook.dateBorrowed}</td>
                  <td>
                    <button className="">Read</button> | <button className="">Return</button>
                  </td>
                </tr>
                )}
                 </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default History;
