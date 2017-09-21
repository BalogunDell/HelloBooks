import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import * as bookActions from '../../Actions/booksAction';
import * as messages from './messages';


class bookDetails extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      book_id: this.props.book_id,
      books: this.props.books,
      book: [],
      dataReady: false,
      borrowError: '',
      borrowErrorStatus:false,
      disableBtn: false,
      processingRequest: false,
      borrowSuccessStatus: false
    }

    this.handleBorrow = this.handleBorrow.bind(this)

}


  handleBorrow(){
    this.setState({processingRequest: true})
    this.props.borrowBook({bookid:this.state.book_id})
    .then(() => {
      this.setState({
        borrowBookSuccess: true,
        borrowErrorStatus:false, 
        processingRequest: false, 
        borrowBookSuccessMessage: this.props.borrowBookSuccess
      })
    })
    .catch(error => {
      this.setState({
        processingRequest: false,
        borrowErrorStatus:true,
        borrowError: error.response.data.msg, disableBtn:true })
    })
  }

  componentWillMount() {
    this.setState({dataReady:true, borrowErrorStatus: false, disableBtn: false, borrowBookSuccess:false})
    let filteredBook = this.state.books.filter(book => book.id == this.state.book_id)
    this.setState({book: filteredBook[0], dataReady:false})
  }

  render() {
    const processing = <h6 className="center">Processing Request...</h6>
    const successMessage = messages.successMessage('You have successfully borrowed this book')
    const failureMessage = messages.failureMessage(this.state.borrowError);

    let showError = this.state.processingRequest ? processing : null
    let success = this.state.borrowBookSuccess ? successMessage : null
    let failure = this.state.borrowErrorStatus ? failureMessage : null

    return (
      this.state.dataReady 
      ? 
      <h4 className="center">Loading book details...</h4> 
      :
        <div className="row">
          <div className="row">
            <div className="col s12 m12 l6 offset-3 center">
              <h3>Book Details</h3>
            </div>
          </div>

          <div className="row">
            <div className="col s12 m12 l6 offset-4 center">
               <img src= {`/images/books/${this.state.book.image}`} alt={this.state.book.title} className="responsive-img"/>  
              {/* <ul><li>Helo</li></ul> */}
            </div>

            <div className="col s12 m12 l3 offset-9">
              <div className="bookInfo">
                <table>
                  <thead>
                    <tr>
                      <th>
                         {this.state.book.title} 
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Author</td>
                       <td>{this.state.book.author}</td> 
                    </tr>

                    <tr>
                      <td>Catergory</td>
                       <td>{this.state.book.category}</td> 
                    </tr>

                    <tr>
                      <td>ISBN</td>
                       <td>{this.state.book.isbn}</td> 
                    </tr>

                    <tr>
                      <td>Year</td>
                       <td>{this.state.book.year}</td> 
                    </tr>

                    <tr>
                      <td>Pages</td>
                       <td>{this.state.book.pages}</td> 
                    </tr>

                    <tr>
                      <td>Quantity Available</td>
                       <td>{this.state.book.quantity}</td> 
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr/>

                <div>
                   <p>{this.state.book.description}</p> 
                </div>

              <hr/>

                <div>
                  <table>
                    <tbody>
                      <tr>
                        <td><button className="btn waves-teal waves-effect" 
                        onClick={this.handleBorrow} disabled={this.state.disableBtn}>BORROW</button></td>
                      </tr>
                      {!this.state.borrowErrorStatus 
                      ? null 
                      : 
                        <tr>
                          <td><button className="btn waves-teal waves-effect" 
                          ><Link to="/user/books">Back to library</Link></button></td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
            </div>
          </div>

          {/* ERROR OR SUCCESS MESSAGE HERE */}
          {showError}
          {success}
          {failure}
        </div>
      )
  }
} 


function mapStateToProps (state, ownProps) {
  return {
    books: state.books.books

  }
}

function maptDispatchToProps(dispatch) {
  return {
    borrowBook: (bookDetails) => dispatch(bookActions.borrowBook(bookDetails))
  }
}

export default connect(mapStateToProps, maptDispatchToProps)(bookDetails);