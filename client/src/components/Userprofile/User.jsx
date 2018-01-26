import React from 'react';
import { Route } from 'react-router-dom';
import $ from 'jquery';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'

import getUserDetails from '../../utils/getUserInfo';
import Allbooks from './Allbooks/Allbooks';
import UserDashboard from './Dashboard';
import UserHistory from './History';
import BookDetails from './BookDetails';
import Borrowedbooks from './Borrowedbooks';
import Profile from './Profile';
import AdminDashboard from './Admin/Dashboard';
import CreateBook from './Admin/CreateBook';
import EditBook from './AdminSubComponents/EditBook';
import UnpublishedList from './AdminSubComponents/UnPublishedBooks';
import {
  userLinks,
  userLinkIcons,
  userLinkText,
  adminLinks,
  adminLinkIcons,
  adminLinkText
} from './UserNavLinks';
import UserNav from './Usernav';
import AuthenticateUser from '../HOC/authenticate';
import { fetchUserTrigger } from '../../Actions/userProfileAction';


/**
 * 
 * @export User
 * 
 * @class User
 * 
 * @extends {React.Component}
 */
export class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      redirect: false,
      userData: this.props.userData,
      dataReady: true,
    }

    this.navLinks = [];
    this.linkIcons = [];
    this.linkTexts = [];

    // Set user id and type
    this.userID = '';
    this.userType='';


    // Bind logout method to this
    this.handleLogout = this.handleLogout.bind(this);
  }

/**
 * 
 *handleLogout
 *
 * @returns {object} action creators
 */
  handleLogout() {
    localStorage.clear();
  }


  /**
  *  componentWillMount 
  * 
  *@returns (object)
  *
  */
  componentWillMount(){
    if(localStorage.getItem('Access-Token') === null) {
      return this.setState({isAuthenticated: false});
    }
    
    this.setState({isAuthenticated: true});

    this.userID = getUserDetails().userId;
    this.userType = getUserDetails().userType;

    this.navLinks = this.userType === 'user' ?  userLinks : adminLinks
    this.linkIcons = this.userType === 'user' ? userLinkIcons: adminLinkIcons
    this.linkTexts = this.userType === 'user' ? userLinkText: adminLinkText

  }

  /**
  *  componentWillReceiveProps 
  *
  * @param {object} nextprops
  * 
  *@returns (object)
  *
  */
  componentWillReceiveProps(nextprops) {
    
     if (nextprops.userDetails) {
      this.setState({dataReady:true, profileData: nextprops.userDetails});
     }
    }

  /**
  *  componentDidMount 
  * 
  *@returns {object}
  *
  */
  componentDidMount() {
  $(document).ready(() => {
   $('.button-collapse').off('click').sideNav({
    closeOnClick: true,
    menuWidth: 260,
    });

       this.props.userProfile(this.userID).then(() => {
      })
      .catch(error => {
        if(error) {
        error.response.status === 403 || 500 ? this.setState({
          isAuthenticated:false
        })
        :
        this.setState({
          isAuthenticated:false
        });
        }
      })
  });
  }

/**
 * Render 
 * 
 *@returns {JSX} JSX representation of DOM
 *
 */
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
                  <Route 
                    path="/user/dashboard"
                    component={AuthenticateUser(UserDashboard)}
                  /> 
                  <Route 
                    path="/user/profile"
                    component={AuthenticateUser(Profile)}
                  />
                  <Route
                    path="/user/books"
                    render={() =><Allbooks
                      getBookId = {this.getBookId}/>}
                    />  
                  <Route
                    path="/user/bookdetails"
                    render={() => <BookDetails book_id = {this.state.book_id}/>}
                  />
                  <Route
                    path="/user/history"
                    render ={()=> <UserHistory userID = {this.userID}/>}
                  /> 
                  <Route 
                    path="/user/borrowedbooks"
                    render={() => <Borrowedbooks userID ={this.userID}/> }
                  />
                </div>
              :
                <div className="content-display">
                  {/* <h4>Welcome to Hello books</h4> */}
                  <Route
                    path="/user/dashboard" 
                    component={AuthenticateUser(AdminDashboard)}
                  />
                  <Route
                    path="/user/books"
                    render={() => <Allbooks  
                      getBookId = {this.getBookId}/>}
                  />
                  <Route
                    path="/user/upload"
                    component={AuthenticateUser(CreateBook)}
                  /> 
                  <Route
                    path="/user/bookdetails"
                    render={() => <BookDetails book_id = {this.state.book_id}/>}
                  />
                  <Route
                    path="/user/editbook"
                    component={AuthenticateUser(EditBook)}
                  />
                  <Route
                    path="/user/deletedbooks"
                    component={AuthenticateUser(UnpublishedList)}
                  />
                </div>
                }
              </div>
            </div>
          </div>
    );
  }
}


/**
 *  HOC - Redux Connect method parameter
 *
 * @param {Object} state
 *
 * @param {Object} ownProps
 *
 * @returns {object} action creators
 */
const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.userAccess.isAuthenticated,
    userDetails: state.userProfile,
    url: ownProps.match.path,
    currentToken: state.userAccess.userData
  }
}


/**
 *  HOC - Redux Connect method parameter
 *
 * @param {Object} state
 *
 * @param {Object} ownProps
 *
 * @returns {object} action creators
 */
const mapDispatchToProps = (dispatch) => {
  return {
    userProfile: (userID) => dispatch(fetchUserTrigger(userID)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(User);