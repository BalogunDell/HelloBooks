import React from 'react';
import { Route } from 'react-router-dom';
import { axios } from 'axios';
import $ from 'jquery';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'

import getUserDetails from '../../utils/getUserInfo';
import Allbooks from './Allbooks/Allbooks';
import UserDashboard from './Dashboard';
import UserHistory from './History';
import BookDetails from './bookDetails';
import Borrowedbooks from './Borrowedbooks';
import Profile from './profile';
import AdminDashboard from './admin/Dashboard';
import CreateBook from './admin/createBook';
import EditBook from './adminSubComponents/editBook';
import UnpublishedList from './adminSubComponents/unPublishedBooks';
import * as userNavLinks from './userNavLinks';
import Details from './Details';
import UserNav from './Usernav';

import * as UserActions from '../../Actions/userProfileAction';
import * as bookActions from '../../Actions/booksAction';



class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      redirect: false,
      userData: this.props.userData,
      dataReady: true,
    }

    this.readBtn = <button className="btn waves-effect">Read</button>
    this.returnBtn = <button className="btn waves-effect">Ready to return</button>

    // Set inital value for navigation links and icons 
    this.navLinks = [];
    this.linkIcons = [];
    this.linkTexts = [];

    // Set user id and type
    this.userID = '';
    this.userType='';


    // Bind logout method to this
    this.handleLogout = this.handleLogout.bind(this)
  }


//************************************************************//
//**DEFINE NECCESSARY METHODS FOR USER NAVIGATION COMPONENT**//
//***********************************************************//
  handleLogout() {
    localStorage.clear();
  }


// *********************************************************//
// PERFORM ALL NECESSARY OPERATIONS BEFORE COMPONENT MOUNTS //
// ********************************************************//

  componentWillMount(){
    // Get details from local storage
    if(localStorage.getItem('Access-Token') === null) {
      return this.setState({isAuthenticated: false})
    }


     // Get user profile before mount
    this.props.userProfile(this.userID).then(()=> {
      // Do some stuff
    })
      
    .catch(error =>{
      // Do some stuff is error
      error.response.status === 401 || 500 ? this.setState({isAuthenticated:false})
      :
      this.setState({isAuthenticated:false})
    })

    // Set all values needed
    this.setState({isAuthenticated: true})
    this.userID = getUserDetails().userId;
    this.userType = getUserDetails().userType;

    // Assign link values based on usertype
    this.navLinks = this.userType === 'user' ?  userNavLinks.userLinks: userNavLinks.adminLinks
    this.linkIcons = this.userType === 'user' ? userNavLinks.userLinkIcons: userNavLinks.adminLinkIcons
    this.linkTexts = this.userType === 'user' ? userNavLinks.userLinkText: userNavLinks.adminLinkText

  }

  componentWillReceiveProps(nextprops) {
     if(nextprops.userDetails) {
      this.setState({dataReady:true, profileData: nextprops.userDetails})
     }
     
  }

  componentDidMount() {
  $(document).ready(function(){
   $('.button-collapse').off('click').sideNav({
    closeOnclick:true,
    menuWidth: 260,
    });
  });
  }


//**************************************************************//
//CONDITIONAL RENDERING BASED ON THE ROUTE, SUPPLY REQUIRED DATA//
//**************************************************************//
  render() {
    return (
      !this.state.isAuthenticated
        ? <Redirect to="/login"/>
        : !this.state.dataReady
          ? <h2 className="center">loading dashboard</h2>
          : <div className="container">
            {this.element}
            <div className="row">
              <div className="col s12 m12 l12">
              <UserNav 
              navLinks = { this.navLinks }
              linkIcons = {this.linkIcons}
              linkTexts = {this.linkTexts}
              path = {this.props.url}
              userDetails = {this.props.userDetails}
              handleLogout = {this.handleLogout}
              userType={this.userType}
              /> 
              </div>
              
              <div className="col s12 m12 l12 offset-l1">
                {this.userType == 'user' ?
                  <div className="content-display">
                    <Route path="/user/dashboard" render={() => <UserDashboard/>}/> 
                    <Route path="/user/profile" render={() => <Profile/>}/>
                    <Route path="/user/books" render={() => <Allbooks 
                     books = {this.props.retrievedBooks} 
                     path = {this.props.url}
                     getBookId = {this.getBookId}/>}/>  
                    <Route path="/user/bookdetails" render={() => <BookDetails book_id = {this.state.book_id}/>}/>
                    <Route path="/user/history" render ={()=> <UserHistory userID = {this.userID}/>}/> 
                    <Route path="/user/borrowedbooks" render={() => <Borrowedbooks userID ={this.userID}/> }/>
                  </div>
                :
                  <div className="content-display">
                    {/* <h4>Welcome to Hello books</h4> */}
                    <Route path="/user/dashboard" render={() => <AdminDashboard/>}/> 
                    <Route path="/user/books" render={() => <Allbooks 
                     books = {this.props.retrievedBooks} 
                     path = {this.props.url}
                     getBookId = {this.getBookId}/>}/>
                    <Route path="/user/upload" render={() => <CreateBook/>}/> 
                    <Route path="/user/bookdetails" render={() => <BookDetails book_id = {this.state.book_id}/>}/>
                    <Route path="/user/borrowedbooks" render={() => <Borrowedbooks userID ={this.userID}/> }/>
                    <Route path="/user/editbook" render={() => <EditBook/>}/>
                    <Route path="/user/deletedbooks" render={() => <UnpublishedList/>}/>
                  </div>
                }
              </div>
            </div>
          </div>
    );
  }
}


// ******************************************************//
// DEFINE CONNECT PARAMETERS: **THEY ARE BOTH FUNCTIONS**//
// ******************************************************//

function mapStateToProps(state, ownProps) {
  return {
    isAuthenticated: state.userAccess.isAuthenticated,
    userDetails: state.userProfile,
    url: ownProps.match.path,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userProfile: (userID) => dispatch(UserActions.fetchUserTrigger(userID)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(User);