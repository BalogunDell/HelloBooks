import React from 'react';

const BorrowedBooksTable = ({books}) => {
  return (
      <div>
        <div className = "styledUserBooksTable">
          <table>
            <thead>
              <tr>
                <th>ISBN</th>
                <th className="hide-on-small-only">Book Cover</th>
                <th>Book Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Pages</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, id) => 
                  <tr key={book.id}>
                    <td>{book.book.isbn}</td>
                    <td className ="hide-on-small-only">
                      <img src={book.book.image}/>
                    </td>
                    <td>{book.book.title}</td>
                    <td>{book.book.author}</td>
                    <td>{book.book.category.category}</td>
                    <td>{book.book.quantity}</td>
                    <td>{book.book.pages}</td>
                  </tr>
                )}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default BorrowedBooksTable;