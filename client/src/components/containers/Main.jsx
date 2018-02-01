import React from 'react';
import { connect } from 'react-redux';
import { trendingBooks } from '../../Actions/booksAction';

// import components
import Navbar from '../presentational/Navbar/Navbar';
import Footer from '../presentational/Footer/Footer';
import Home from '../presentational/Home/Home';
import Background from '../presentational/Background/Background';
import Books from '../presentational/Books/Books';

/**
 * @class Main
 * 
 * @classdesc Main component 
 * 
 */
export class Main extends React.Component {
  /**	
	* @description constructor - class constructor
	*
	* @param  {object} props the properties of the class component
	*
	* @return {void} no return or void
	*
	*/
  constructor(props){
    super(props);

    this.state = {
      trendingBooks: [],
      loading: true,

    }
  }

  /**
  * React Lifecycle hook - componentDidMount
  *
  * @returns {object} - Updated state
  *
  */
  componentDidMount() {
    this.setState({
      loading: true
    })
    this.props.trendingBooks()
      .then(() => {
        this.setState({
          loading: false
        })
      })
  }

  /** 
  * React Lifecycle hook - componentWillReceiveProps
  * 
  * @param {object}      - nextProps
  *
  * @returns {object}    - Updated state
  *
  *@memberof Main
  */
  componentWillReceiveProps( nextProps) {
    if (nextProps.books) {
      this.setState({
        trendingBooks: nextProps.books,
        loading: false
      });
    } else {
      this.setState({ loading: true });
    }
  }

  /**
   * React method - render
   * 
   * @returns {JSX} JSX representation of DOM
   * 
   * @memberof Main
   */
  render() {
    return (
      <div>
        <Background>
          <Navbar/>
          <Home/>
        </Background>
        {this.state.loading
        ?
        <h4>Loading trending books...</h4>
        :
        <Books
          bookData = {this.state.trendingBooks}
        />
        }
        <Footer/>
      </div>
    );
  }
};


/**
 * Redux Connect parameter - mapStateToProps
 * 
 * @param {object} state - state of the store
 * 
 * @returns {object}  - mapped store to state
 */
export const mapStateToProps = (state) => {
  return {
    books: state.books
  }
}

/**
 * Redux Connect parameter  - mapDispatchToProps
 * 
 * @param {object} dispatch - dispatches actions
 * 
 * @returns {object} - functions to dispatch
 */
export const mapDispatchToProps = (dispatch) => {
  return {
    trendingBooks: () => dispatch(trendingBooks())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
