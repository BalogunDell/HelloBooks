import React from 'react';
import { Route } from 'react-router-dom';
import { axios } from 'axios';
import Details from './Details';
import UserNav from './Usernav';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'


import Allbooks from '../Allbooks/Allbooks';
import UserDashboard from './Dashboard';
import UserHistory from './History';
import * as userNavLinks from './userNavLinks';
import book1 from '../../assets/images/books/book1.jpg'
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
    this.books = this.props.retrievedBooks

    this.navLinks = []
    this.linkIcons = []

  }
  
  componentWillMount(){
    const userDetails = JSON.parse(localStorage.getItem('Access-Token'));
    this.navLinks = userDetails[2] === 'user' ?  userNavLinks.userLinks: userNavLinks.adminLinks
    this.linkIcons = userDetails[2] === 'user' ? userNavLinks.userLinkIcons: userNavLinks.adminLinkIcons
    console.log(this.props.retrievedBooks)
     
  }

  render() {
    return (
      this.props.isAuthenticated !== true ? <Redirect to="/login"/> :  
      <div className="container">
        {this.element}
        <div className="row">
          <div className="col s12 m1">
           <UserNav 
           navLinks = { this.navLinks }
           linkIcons = {this.linkIcons}
           path = {this.props.url}/> 
          </div>
          
          <div className="col s12 m11 l12 offset-l1">
            <div className="content-display">
               <Route path="/user/dashboard" render={() => <UserDashboard/>}/>
               <Route path="/user/books" render={() => <Allbooks books = {this.books}/>}/>
               {/* <Route path="/user/history" render ={()=> <UserHistory/>}/> */}
               <Route render= {() => {
                  return <p>Not found</p>
                }}/>
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
    books: state.books,
    url: ownProps.match.path,
    urlParam: ownProps.match,
    retrievedBooks: state.books.books
  }
}

export default connect(mapStateToProps,null)(User);