import React from 'react';
import { render } from 'react-dom';
import 'jquery';
import {BrowserRouter, Router, Route, Switch} from 'react-router-dom';

import './assets/materialize/css/materialize.min.css'
import './assets/materialize/js/materialize.min.js'
import './assets/font-awesome/css/font-awesome.min.css';
import './assets/css/main.scss';
import './assets/main.js';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Books from './components/books/Books';
import Register from './components/useraccess/Register'
import Login from './components/useraccess/Login';
import User from './components/userprofile/User';
import Allbooks from './components/Allbooks/Allbooks';

class App extends React.Component {
  render() {
    return (
      <div>
          <BrowserRouter>
            <Switch>
              <Route path='/' exact component={Home}/>
              <Route path='/register' component={Register}/>
              <Route path= '/login' component={Login}/>
              <Route path='/user' component={User}>
              </Route>
              <Route render= {() => {
                  return <p>Not found</p>
                }}/>
            </Switch>
          </BrowserRouter>
          <Footer/>  
      </div>
    );
  }
}

render(<App/>, document.getElementById('root'));
