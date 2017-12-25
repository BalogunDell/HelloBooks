import React from 'react';
import { Link } from 'react-router-dom';

const publishedBooks = ({books, handleBookDelete, handleBookEdit}) => {
    return (
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
           books.map((book, id) => 
            <tr key={book.id}>
              <td>{book.isbn}</td>
              <td><img src={book.image}/></td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category.category}</td>
              <td>{book.quantity}</td>
              <td>{book.pages}</td>
              <td>
                <Link to ="/user/editbook">
                <button 
              value={book.id}
              data-index = {id}
              onClick={handleBookEdit}
              className="material-icons green-text">edit</button>
                </Link>
               <a href="#confirmationModal" className="modal-trigger"> 
                  <button value={book.id}
                  data-index = {id}
                  onClick={handleBookDelete} 
                  className="material-icons red-text">delete</button>
              </a>
              </td>
            </tr>
            )
          }
            </tbody>
        </table>
    </div>
    );
}

export default publishedBooks;