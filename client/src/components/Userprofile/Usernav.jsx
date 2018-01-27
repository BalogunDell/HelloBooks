import React from 'react';
import { Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

/**
 *  UserNav - renders use navigation
 *
 * @param {string} userType
 * @param {object} navLinks
 * @param {object} linkIcons
 * @param {string} userType
 * @param {object} linkTexts
 * @param {object} navLinks
 * @param {object} path
 * @param {string} path
 * @param {function} handleLogout
 *
 * @returns {object} action creators
 */
const UserNav = ({
  userType,
  navLinks,
  linkIcons,
  linkTexts,
  path,
  userDetails,
  handleLogout }) => {
  return(
    <div>

      <ul 
        className="side-nav fixed" 
        id="userprofile">
        <li>
          <div className="user-view">
              <img 
                src='https://res.cloudinary.com/djvjxp2am/image/upload/v1507971952/hellobooks/hb-logo.png' 
                className="responsive-img center" alt=""
              />
          </div>
        </li>

        {/* SHOW NAVIGATION FOR USER/ADMIN */}
        <li id="dashboard">
          <div className="black white-text settings ">
            <h5 id="hellobooksTitle">HELLO BOOKS</h5>
          </div>
        </li>
        <li></li>
        <li>
          <Link 
            to={`${path}/${linkTexts[0]}`} 
            id="firstLink">
            {navLinks[0]}
            <i 
              className="material-icons white-text">{linkIcons[0]}
            </i>
          </Link>
        </li>
        <li>
          <Link 
          to={`${path}/${linkTexts[1]}`} 
          id="secondLink">{navLinks[1]}
          <i 
            className="material-icons white-text">{linkIcons[1]}
          </i>
          </Link>
        </li>
        <li>
          <Link 
            to={`${path}/${linkTexts[2]}`}
            id="thirdLink">{navLinks[2]}
            <i className="material-icons white-text">
              {linkIcons[2]}
            </i>
          </Link>
        </li>
        <li>
          <Link
            to={`${path}/${linkTexts[3]}`}
            id="fourthLink">{navLinks[3]}
            <i className="material-icons white-text">{linkIcons[3]}
            </i>
          </Link>
        </li> 
        <li 
          id="dashboard">
          <div 
            className="settings white-text">BRIEF INFO
          </div>
        </li>
        
        {/* SHOW USER IMAGE, USERNAME AND MEMBERSHIP LEVEL */}
        <li>
          <div className="user-view">
            <div className="background user-view-bg">
            </div>

            
              <span 
                className="white-text username password">Password:*****
              </span>
            <span 
              className="white-text username">Username: {userDetails.username}
            </span>
            {userType === 'user'
            ?
            <span 
              className="white-text email">Membership: {userDetails.membership}
            </span>
            :
            ''
            }
          </div>
        </li>
        <li>
          <Link 
            to='/login'
            className="red-text"
            onClick={handleLogout}>
            <i className="material-icons red-text">logout
            </i>Logout
          </Link>
        </li>
      </ul>

      <button
        data-activates="userprofile"
        className="button-collapse toggle-nav">
        <i className="material-icons">menu</i>
      </button>
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