import React from 'react';
import Navbar from '../../presentational/Navbar/Navbar';
import Background from '../../presentational/Background/Background';

/**
 * 
 * @description Renders the NotFound component
 * 
 * @returns {JSX} JSX representation of DOM
 */
const NotFound = () => {
  const notFoundImage = 'https://res.cloudinary.com/djvjxp2am/image/upload/v1513510837/404-error_tzmwfb.gif';
  return (
    <div>
      <Background>
        <Navbar/>
        <div className="notFoundContent">
        <h1>PAGE NOT FOUND</h1>
          <img src={notFoundImage} className="responsive-img"/><br/>
          <br/>
          <h5>We are sorry! The page you are looking for does not exist!</h5>
        </div>
      </Background>
    </div>
  );
}

export default NotFound;
