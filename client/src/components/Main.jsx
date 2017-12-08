import React from 'react';

// import components
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import Home from './home/Home';
import Background from './Background/Background';
import Books from './books/Books';

/**
 * @class Main 
 * @classdesc returns the main wrapper of the app
 */
const Main = () => {
  return (
    <div>
      <Background>
        <Navbar/>
        <Home/>
      </Background>
       <Books/>
       {/* Some other stuff here */}
      <Footer/>
    </div>
  );
};

export default Main;
