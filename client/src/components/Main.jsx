import React from 'react';
import { connect } from 'react-redux';
import * as bookActions from '../Actions/booksAction';

// import components
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import Home from './home/Home';
import Background from './Background/Background';
import Books from './books/Books';

/**
 * @class Main 
 * @classdesc returns the main wrapper of the app
 */
class Main extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      trendingBooks: [],
      loading: true,

    }
  }

  componentWillMount() {
    this.props.trendingBooks();
  }

  componentWillReceiveProps( nextProps) {
    if (nextProps.books.books_trending) {
      this.setState({
        trendingBooks: nextProps.books.books_trending,
        loading: false
      });
    } else {
      this.setState({ loading: true });
    }
  }

  render() {
    return (
      <div>
        <Background>
          <Navbar/>
          <Home/>
        </Background>
        <Books
          bookData = {this.state}
        />
        <Footer/>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.books.trendingBooks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    trendingBooks: () => dispatch(bookActions.trendingBooks())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
