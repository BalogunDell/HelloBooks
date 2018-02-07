import React from 'react';

import Navbar from '../../presentational/Navbar/Navbar';
import Background from '../../presentational/Background/Background';

/**
 * @description Renders about component
 * 
 * @returns {JSX} JSX representation of DOM
 */
const About = () => {
  const aboutUsImage = 'https://res.cloudinary.com/djvjxp2am/image/upload/v1513121270/about-us1_uzyeyu.png';
  const howItWorksImage = 'https://res.cloudinary.com/djvjxp2am/image/upload/v1513124725/how-it-works_unmsp2.png';
  return (
    <div>
      <Background>
      <Navbar />
      <div className="aboutUsHeader_Container">
        <h2 className="center">Hellobooks</h2>
        <div className="row">
          <div className="col s12 m12 l7">
            <p>
            Hellobooks is a simple application that helps manage a library and its processes like stocking, tracking and renting books. With this application users are able to find and rent books. The application also has an admin section where the admin can do things like add books, delete books, increase the quantity of a book etc.
            </p>
          </div>
          <div className="col s12 m12 l5 howItWorks">
            <img src={aboutUsImage}/>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m12 l5 howItWorks">
            <img src={howItWorksImage}/>
          </div>
          <div className="col s12 m12 l7">
            <ul>
              <li><i className="fa fa-arrow-right"></i>
                Create a new account or log in with an existing account</li>
              <li>Once you are logged in, you have access to our books</li>
              <li>Borrow any book of your choice from the libary for free</li>
              <li>READS</li>
              <li>Once you are done reading,
                all you need to do is just return the book back to the libary
              </li>
              <li>... and that's all. Simple!</li>
            </ul>
          </div>
        </div>
      </div>
      </Background>
    </div>
  );
};

export default About;
