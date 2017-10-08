import React from 'react';

const booksList = ({allbooks, handleBookDelete, handleBookEdit}) => {
  return(
      <div className="bookslist">
        <table className="">
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Book Cover</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Available Quantity</th>
              <th>Pages</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
           {allbooks.map((book, id) => 
            <tr key={book.id}>
              <td>{book.isbn}</td>
              <td><img src={book.image}/></td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category.category}</td>
              <td>{book.quantity}</td>
              <td>{book.pages}</td>
              <td><button value={book.id} onClick={handleBookEdit} className="material-icons green-text">edit</button>
              <button value={book.id} onClick={handleBookDelete} className="material-icons red-text">delete</button>
              <button value={book.id} onClick={handleBookDelete} className="material-icons green-text">zoom_in</button>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
  );
}

export default booksList;