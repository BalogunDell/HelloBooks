import React from 'react';

const borrowedBooksTable = ({books}) => {
    return (
        <div>
          <div>
            <table className="">
             <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Book Cover</th>
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
                      <td><img src={book.book.image}/></td>
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

export default borrowedBooksTable;