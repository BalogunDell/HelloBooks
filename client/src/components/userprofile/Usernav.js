import React from 'react';
import { NavLink , Link, Redirect} from 'react-router-dom';
import profileImage from '../../assets/images/abbey.jpg';
import backgroundImage from '../../assets/images/paperbg.jpg';





class UserNav extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);

    // console.log(this.props.currentLoc.match.url)
  }
  
  handleLogout() {
    localStorage.clear();
    <Redirect to="/login"/>
  }
render(){
  return(
    <div>
      <redirect/>
      <ul className="side-nav fixed" id="userprofile">
        <li>
          <div className="user-view">
            <div className="background user-view-bg">
            </div>
            <img src={profileImage} className="circle profilepix" alt=""/>
            <span className="white-text username">Username: Username1</span>
            <span className="white-text email">Email: delighteddell@gmail.com</span>
            <span className="white-text email">Membership:</span>
          </div>
        </li>
        {/* <li className="divider"></li> */}
        <li id="dashboard"><div className="black white-text">A HEADER TEXT HERE</div></li>
        {/* <li className="divider"></li> */}
        <li><NavLink className="active" to='user'>Dashboard <i className="material-icons white-text">dashboard</i></NavLink></li>
       <li><NavLink className="active" to='history'>History<i className="material-icons white-text">history</i></NavLink></li>
        <li><NavLink className="active" to='/users/:id/books'>Books in Library <i className="material-icons white-text">library_books</i></NavLink></li>
        <li><NavLink className="active" to='/users/:id/borrowedbooks'>Borrowed Books <i className="material-icons white-text">book</i></NavLink></li>
        <li><NavLink className="active" to='/users/:id/unreturnedbooks'>Unreturned Books<i className="material-icons white-text">book</i></NavLink></li>
        <li><NavLink className="active" to='/users/:id/notifications'>Notifications<i className="material-icons white-text">assistant_photo</i></NavLink></li>
        <li><Link to='/login' className="red-text" onClick={this.handleLogout}><i className="material-icons red-text">logout</i>Logout</Link></li>
      </ul>

      <a href="#!" data-activates="userprofile" className="button-collapse">Menu</a>
    </div>
  );
}
}

export default UserNav;