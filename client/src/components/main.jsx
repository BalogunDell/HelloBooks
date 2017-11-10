import React from 'react';

// import components
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import Home from './home/Home';
import Background from './Background/Background';

/**
 * @class Main 
 * @classdesc returns the main wrapper of the app
 */
class Main extends React.Component {
  render() {
    return(
      <div>
        <Background>
          <Navbar/> 
          <Home/>
          <Footer/>
      </Background>
      </div>
    );
  }
}

export default Main;
