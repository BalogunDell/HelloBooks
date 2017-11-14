import React from 'react';
import { NavLink , Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import profileImage from '../../assets/images/abbey.jpg';
import logo from '../../assets/images/hb-logo.png';


const UserNav = ({ userType, navLinks, linkIcons, linkTexts, path, userDetails, handleLogout }) => {
  return(
    <div>

      <ul className="side-nav fixed" id="userprofile">
        {/* SHOW APP LOGO AND WELCOME MESSAGE  */}
        <li>
          <div className="user-view">
            <img src='https://res.cloudinary.com/djvjxp2am/image/upload/v1507971952/hellobooks/hb-logo.png' 
            className="responsive-img center" alt=""/>
          </div>
        </li>

        {/* SHOW NAVIGATION FOR USER/ADMIN */}
        <li id="dashboard"><div className="black white-text settings "><h5>HELLO BOOKS</h5></div></li>
        <li></li>
        <li><NavLink activeClassName="active" to={`${path}/${linkTexts[0]}`}>{navLinks[0]}<i className="material-icons white-text">{linkIcons[0]}</i></NavLink></li>
        <li><NavLink activeClassName="active" to={`${path}/${linkTexts[1]}`}>{navLinks[1]}<i className="material-icons white-text">{linkIcons[1]}</i></NavLink></li>
        <li><NavLink activeClassName="active" to={`${path}/${linkTexts[2]}`}>{navLinks[2]}<i className="material-icons white-text">{linkIcons[2]}</i></NavLink></li>
        <li><NavLink activeClassName="active" to={`${path}/${linkTexts[3]}`}>{navLinks[3]}<i className="material-icons white-text">{linkIcons[3]}</i></NavLink></li> 
        <li id="dashboard"><div className="settings white-text">SETTINGS</div></li>
        
        {/* SHOW USER IMAGE, USERNAME AND MEMBERSHIP LEVEL */}
        <li>
          <div className="user-view">
            <div className="background user-view-bg">
            </div>

            
              <span className="white-text username">Password:*****<i className="material-icons editPass">edit</i></span>
            <span className="white-text username">Username: {userDetails.username}</span>
            {userType === 'user'
            ?
              <span className="white-text email">Membership: {userDetails.membership}</span>
              :
              ''
            }
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