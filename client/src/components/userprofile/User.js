import React from 'react';
import { axios } from 'axios';
import Details from './Details';
import UserNav from './Usernav';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'


import Allbooks from '../Allbooks/Allbooks';
import UserDashboard from './Dashboard';
import UserHistory from './History';
import book1 from '../../assets/images/books/book1.png';
import book2 from '../../assets/images/books/book2.jpg';
import book3 from '../../assets/images/books/book3.jpg';
import book4 from '../../assets/images/books/book4.jpg';
import book5 from '../../assets/images/books/book5.jpg';
import book6 from '../../assets/images/books/book8.jpg';



class User extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      isAuthenticated:this.props.isAuthenticated,
      redirect:false,
      userData: this.props.userData
    }

    this.readBtn = <button className="btn waves-effect">Read</button>
    this.returnBtn = <button className="btn waves-effect">Ready to return</button>

    // Mock data for book on
    this.books = [
      {
        id: 1,
        title: 'Learn angular 1',
        quantity: 3,
        author: 'Whoever',
        image: book1
      },
      {
        id: 2,
        title: 'Learn React',
        quantity: 30,
        author: 'Facebook',
        image: book2
      },

      {
        id: 3,
        title: 'Biblical Life',
        quantity: 1,
        author: 'Uncle Jay',
        image: book3,
        dateBorrowed: '16-12-2017',
        expectedReturnDate: '19-12-2017',
        returnStatus: false,
        borowed: true,
        status: this.readBtn
      },

     {
        id: 4,
        title: 'Sex for men',
        quantity: 3,
        author: 'Emmanuel Akpan',
        image: book4,
        dateBorrowed: '6-1-2017',
        expectedReturnDate: '1-1-2017',
        returnStatus: false,
        borowed: true,
        status: this.returnBtn
      },

      {
        id: 5,
        title: 'Success in business',
        quantity: 60,
        author: 'Stone Brianch',
        image: book5,
        dateBorrowed: '05-2-2017',
        expectedReturnDate: '08-2-2017',
        returnStatus: false,
        status: this.readBtn
      },

      {
        id: 6,
        title: 'who stole my cheese?',
        quantity: 25,
        author: 'Brian tracy',
        image: book6,
        dateBorrowed: '15-4-2001',
        expectedReturnDate: '20-9-2001',
        returnStatus: true,
        borowed: true,
        status: 'returned'
      },
      {
        id: 7,
        title: 'A friend of God',
        quantity: 250,
        author: 'Andela tracy',
        image: book1,
        dateBorrowed: '12-4-1767',
        expectedReturnDate: '17-4-1767',
        returnStatus: true,
        borowed: true,
        status: `${this.readBtn} | ${this.returnBtn}`
      },

      {
        id: 8,
        title: 'who stole my cheese?',
        quantity: 125,
        author: 'Brian tracy',
        image: book5,
        dateBorrowed: '01-4-2067',
        expectedReturnDate: '17-4-2067',
        returnStatus: false,
        borowed: true,
        status: 'returned'
      }
    ]

  }
  
  // componentDidMount(){
    
  // }

  render() {
    console.log(this.props.userData)
    return (
      this.props.isAuthenticated !== true ? <Redirect to="/login"/> :  
      <div className="container">
        {this.element}
        <div className="row">
          <div className="col s12 m1">
            {/* Pass the curret location to the usernav  */}
           <UserNav/> 
          </div>
          
          <div className="col s12 m11 l12 offset-l1">
            <div className="content-display">
              {/* <UserDashboard/> */}
                {/* <Allbooks books = {this.books}/>  */}
                <UserHistory borrowedBooks = {this.books}/> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isAuthenticated: state.userAccess.isAuthenticated,
    userData: state.userAccess.userData,
    books: state.books,
    ownProps: ownProps
  }
}

export default connect(mapStateToProps,null)(User);