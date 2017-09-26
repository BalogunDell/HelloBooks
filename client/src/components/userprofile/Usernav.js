import React from 'react';
import { NavLink , Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import profileImage from '../../assets/images/abbey.jpg';
import logo from '../../assets/images/hb-logo.png';





const UserNav = ({ navLinks, linkIcons, path, userDetails, handleLogout }) => {
  return(
    <div>

      <ul className="side-nav fixed" id="userprofile">
        {/* SHOW APP LOGO AND WELCOME MESSAGE  */}
        <li>
          <div className="user-view">
            <div className="background user-view-bg">
            </div>
            <img src={logo} className="responsive-img center" alt=""/>
            {/* <span className="white-text username">Hellobooks Library</span> */}
          </div>
        </li>

        {/* SHOW NAVIGATION FOR USER/ADMIN */}
        <li id="dashboard"><div className="black white-text">A HEADER TEXT HERE</div></li>
        {/* <li className="divider"></li> */}
        <li><NavLink className="active" to={`${path}/dashboard`}>{navLinks[0]}<i className="material-icons white-text">{linkIcons[0]}</i></NavLink></li>
       <li><NavLink className="active" to={`${path}/profile`}>{navLinks[1]}<i className="material-icons white-text">{linkIcons[1]}</i></NavLink></li>
        <li><NavLink className="active" to={`${path}/books`}>{navLinks[2]}<i className="material-icons white-text">{linkIcons[2]}</i></NavLink></li>
        <li><NavLink className="active" to={`${path}/history`}>{navLinks[3]}<i className="material-icons white-text">{linkIcons[3]}</i></NavLink></li>
        <li><NavLink className="active" to={`${path}/borrowedbooks`}>{navLinks[4]}<i className="material-icons white-text">{linkIcons[4]}</i></NavLink></li>
        <li><NavLink className="active" to={`${path}/notifications`}>{navLinks[5]}<i className="material-icons white-text">{linkIcons[5]}</i></NavLink></li>
        
        <li id="dashboard"><div className="black white-text">A HEADER TEXT HERE</div></li>
        {/* SHOW USER IMAGE, USERNAME AND MEMBERSHIP LEVEL */}
        <li>
          <div className="user-view">
            <div className="background user-view-bg">
            </div>
            <img src={profileImage} className="circle profilepix" alt=""/>
            <span className="white-text username">Username: {userDetails.username}</span>
            <span className="white-text email">Email: {userDetails.email}</span>
            <span className="white-text email">Membership: {userDetails.membership}</span>
          </div>
        </li>
        <li><Link to='/login' className="red-text" onClick={handleLogout}><i className="material-icons red-text">logout</i>Logout</Link></li>
      </ul>

      <button data-activates="userprofile" className="button-collapse toggle-nav"><i className="material-icons">menu</i></button>
    </div>
  );
}

UserNav.propTypes = {
  navLinks:React.PropTypes.array.isRequired,
  linkIcons:React.PropTypes.array.isRequired,
  path:React.PropTypes.string.isRequired,
  userDetails:React.PropTypes.object.isRequired
}
export default UserNav;