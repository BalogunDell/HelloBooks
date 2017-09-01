import React from 'react';
import { axios } from 'axios';
import Details from './Details';
import UserNav from './Usernav';
import { Redirect, Link } from 'react-router-dom';

import Allbooks from '../Allbooks/Allbooks';
import UserDashboard from './Dashboard';
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
      isLoggedIn:false,
      redirect:false
    }

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
        image: book3
      },

     {
        id: 4,
        title: 'Sex for men',
        quantity: 3,
        author: 'Emmanuel Akpan',
        image: book4 
      },

      {
        id: 5,
        title: 'Success in business',
        quantity: 60,
        author: 'Stone Brianch',
        image: book5
      },

      {
        id: 6,
        title: 'who stole my cheese?',
        quantity: 25,
        author: 'Brian tracy',
        image: book6
      },
      {
        id: 7,
        title: 'A friend of God',
        quantity: 250,
        author: 'Andela tracy',
        image: book1
      },

      {
        id: 8,
        title: 'who stole my cheese?',
        quantity: 125,
        author: 'Brian tracy',
        image: book5
      }
    ]

  }

   Authenticate() {
    const token = localStorage.getItem('token');
    if(token === null) {
      this.setState({redirect: true});
    }
  }

  componentDidMount() {
    this.Authenticate();
  }

  render() {
    if(this.state.redirect) {
      <Redirect to="/login"/>
    }
    else {

    }
    return (
      <div className="container">
        {this.element}
        <div className="row">
          <div className="col s12 m1">
            <UserNav/>
          </div>
          
          <div className="col s12 m11 l12 offset-l1">
            <div className="content-display">
              {/* <UserDashboard/> */}
               <Allbooks books = {this.books}/> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;