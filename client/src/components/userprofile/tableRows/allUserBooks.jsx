import React from 'react';
import { Link } from 'react-router-dom';
 
const allUserBooksComp = ({allUserBooks, getRowKey, tableHeader, handleReturn}) => {
	const books = allUserBooks.filter((book) => {
		return book.book.visibility === true
	});
	const bookLength = books.length;
    return (
			<div>

				<div>
					<h6 className="right custom-text">{`Currently showing: ${tableHeader}`}</h6>
				</div>


				<table className="highlight centered">
					<thead>
						<tr>
							<th>Book image</th>
							<th>Book title</th>
							<th>Author</th>
							<th>Date Borrowed</th>
							<th>Expected Return Date</th>
							<th>Action</th>

						</tr>
					</thead>
					<tbody>
						{
              bookLength == 0 
              ?
              <tr className="center">
                <td>You have no book pending return</td>
                </tr>
              :
							books.map((book, id) =>
						<tr key={id}>
							<td><img src={book.book.image} alt="Book cover"/></td>
							<td>{book.book.title}</td>
							<td>{book.book.author}</td>
							<td>{book.dateborrowed}</td>
							<td>{book.expectedreturndate}</td>
							{book.returnstatus 
								? 
							<td>
                <button className="btn waves-effect waves-teal custom" disabled={true}>Return</button>
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

export default allUserBooksComp;