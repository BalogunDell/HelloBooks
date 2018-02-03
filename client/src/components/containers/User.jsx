import React from 'react';
import { Route } from 'react-router-dom';
import $ from 'jquery';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'

import getUserDetails from '../../utils/getUserInfo';
import Loader from '../presentational/Loader';
import Allbooks from '../containers/Allbooks/Allbooks';
import UserHistory from '../containers/History';
import BookDetails from '../containers/BookDetails';
import Borrowedbooks from '../containers/Borrowedbooks';
import Profile from '../containers/Profile';
import AdminDashboard from '../containers/Dashboard';
import CreateBook from '../containers/CreateBook';
import EditBook from '../containers/EditBook';
import {
  userLinks,
  userLinkIcons,
  userLinkText,
  adminLinks,
  adminLinkIcons,
  adminLinkText
} from '../presentational/UserNavLinks';
import UserNav from '../presentational/Usernav';
import authenticate from '../presentational/HOC/authenticate';
import { fetchUserTrigger, editPassword } from '../../Actions/userProfileAction';


/**
 * @class User
 * 
 * @description Render Uaer component
 * 
 * @export User
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
      showInput: false,
      passwordContainer: { ...this.props.initialData },
      loading: false
    }

    this.navLinks = [];
    this.linkIcons = [];
    this.linkTexts = [];
    this.userId = '';
    this.userType='';
    this.handleLogout = this.handleLogout.bind(this);
    this.handleShowVisibility = this.handleShowVisibility.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
    this.handleHideVisibility = this.handleHideVisibility.bind(this);
  }

/**
 * @description handles logout
 * 
 * handleLogout
 *
 * @returns {object} action creators
 */
  handleLogout() {
    localStorage.clear();
  }


/**
 * @description decides when to show the password edit form
 * 
 * @param {boolean} status of the form 
 *
 * @returns {object} action creators
 */
handleShowVisibility(event) {
  this.setState({
    showInput: true
  });
}

/**
 * @description decides when to show the password edit form
 * 
 * @param {boolean} status of the form 
 *
 * @returns {object} action creators
 */
handleHideVisibility(event) {
  this.setState({
    showInput: false,
    passwordContainer: {
      currentPassword: '',
      newPassword: ''
      }
  });
}


/**
 * @description handles inout change of the form
 * 
 * @param {boolean} event of the form 
 *
 * @returns {object} action creators
 */
handleChange(event) {
  event.preventDefault();
  const field = event.target.name;
  let temporaryPasswordContainer = { ...this.state.passwordContainer }
  temporaryPasswordContainer[field] = event.target.value;
  return this.setState({
    passwordContainer: temporaryPasswordContainer,
  });
}



/**
 * @description handles the password update
 * 
 * @param {boolean} event of the form 
 *
 * @returns {object} action creators
 */
handlePasswordUpdate(event) {
  event.preventDefault();
  this.setState({
    loading: true
  });
  this.props.editPassword(this.state.passwordContainer)
    .then(() => {
      this.setState({
        loading: false,
        showInput: false
      });
      Materialize.toast(
        'Password has been successfully changed',
        3000,
        'blue rounded');
        this.setState({
          passwordContainer: {
            currentPassword: '',
            newPassword: ''
          }
        });
    })
    .catch(() => {
    });
}
  


 /**
  * @description componentWillMount 
  *
  * @memberof User
  * 
  * @returns (object)
  *
  */
  componentWillMount(){
    if(localStorage.getItem('Token') === null) {
      return this.setState({isAuthenticated: false});
    }
    
    this.setState({isAuthenticated: true});

    this.userId = getUserDetails().userId;
    this.userType = getUserDetails().userType;

    this.navLinks = this.userType === 'user' ?  userLinks : adminLinks
    this.linkIcons = this.userType === 'user' ? userLinkIcons: adminLinkIcons
    this.linkTexts = this.userType === 'user' ? userLinkText: adminLinkText

  }

  /**
  * @description componentWillReceiveProps 
  *
  * @param {object} nextprops
  *
  * @memberof User
  * 
  * @returns (object)
  *
  */
  componentWillReceiveProps(nextprops) {
    
     if (nextprops.userDetails) {
      this.setState({
        dataReady:true,
        profileData: nextprops.userDetails});
     }
    }

 /**
  * @description componentDidMount
  *
  * @memberof User
  * 
  * @returns {object}
  *
  */
  componentDidMount() {
  $(document).ready(() => {
    
   $('.button-collapse').off('click').sideNav({
    closeOnClick: true,
    menuWidth: 260,
    });


       this.props.userProfile(this.userId).then(() => {
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
 * @description Render
 * 
 * @memberof User
 * 
 * @returns {JSX} JSX representation of DOM
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
              showInput = {this.state.showInput}
              handleShowVisibility={this.handleShowVisibility}
              handleHideVisibility={this.handleHideVisibility}
              passwordContainer = {this.state.passwordContainer}
              handleChange = {this.handleChange}
              handlePasswordUpdate = {this.handlePasswordUpdate}
              /> 
              </div>
              
            <div className="col s12 m12 l12 offset-l1">
              {this.userType == 'user' ?
                <div className="content-display">
                  <Route 
                    path="/user/profile"
                    component={authenticate(Profile)}
                  />
                  <Route
                    path="/user/books" render={() => (<Allbooks
                    getBookId = {this.getBookId}/>)}
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
                    component={AdminDashboard}
                  />
                  <Route
                    path="/user/books"
                    render={() => <Allbooks  
                      getBookId = {this.getBookId}/>}
                  />
                  <Route
                    path="/user/upload"
                    component={CreateBook}
                  /> 
                  <Route
                    path="/user/bookdetails"
                    render={() => <BookDetails book_id = {this.state.book_id}/>}
                  />
                  <Route
                    path="/user/editbook"
                    component={EditBook}
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
  let initialData = { currentPassword: '', newPassword: ''};
  return {
    isAuthenticated: state.userAccess.isAuthenticated,
    userDetails: state.userProfile,
    url: ownProps.match.path,
    currentToken: state.userAccess.userData,
    initialData
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
    userProfile: (userId) => dispatch(fetchUserTrigger(userId)),
    editPassword: (payload) => dispatch(editPassword(payload))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(User);