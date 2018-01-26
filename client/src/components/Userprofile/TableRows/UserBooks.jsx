import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders User books
 * 
 * @param {object} allUserBooks
 * @param {Function} handleReturn
 * 
 * @method UserBooks
 */
const UserBooks = ({
	allUserBooks,
  handleReturn
  }) => {
	const books = allUserBooks.filter((book) => {
		return book.book.visibility === true
	});
	const bookLength = books.length;
    return (
			<div className= "styledUserBooksTable">
				<table className="centered">
					<thead>
						<tr>
							<th>Book image</th>
							<th>Book title</th>
							<th>Author</th>
							<th>Date Borrowed</th>
							<th>Expected Return Date</th>
							{handleReturn === undefined ? null : <th>Action</th>}

						</tr>
					</thead>
					<tbody>
						{
              bookLength == 0 
              ?
              <tr className="center">
                <td>There are no books here</td>
                </tr>
              :
							books.map((book, id) =>
						<tr key={id}>
							<td>
								<img src={book.book.imageUrl} alt="Book cover"/></td>
							<td>{book.book.title}</td>
							<td>{book.book.author}</td>
							<td>{book.dateborrowed}</td>
							<td>{book.expectedreturndate}</td>
							{
              handleReturn === undefined 
              ?
              null
              :
                book.returnstatus 
								? 
							<td>
                <button
									className="btn waves-effect waves-teal custom"
									disabled={true}>Return
								</button>
              </td>          
                :
              <td>  
							  <button className="btn btn-small waves-effect waves-teal custom" 
							    value={book.bookid}
                  data-id={id}
							    onClick={handleReturn}>Return
							</button>
							</td>
              }
						</tr>)
					}
					</tbody>
				</table>
			</div>
	);
}

export default UserBooks;