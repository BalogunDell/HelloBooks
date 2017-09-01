import React from 'react';
import { render } from 'react-dom';
import 'jquery';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './assets/materialize/css/materialize.min.css'
import './assets/materialize/js/materialize.min.js'
import './assets/css/main.scss';
import './assets/main.js';

import Main from './components/Main';
import Home from './components/home/Home';
import Login from './components/useraccess/Login';
import Register from './components/useraccess/Register';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import User from './components/userprofile/User';
import Dashboard from './components/userprofile/Dashboard';

class App extends React.Component {
  render() {
    return (
      <div>
          <BrowserRouter>
            <Switch>
              <Route path='/' exact component={Main}/>
              <Route path='/register' component={Register}/>
              <Route path= '/login' component={Login}/>
              <Route path='/user' render={({path}) => (
                <div>
                  <Route exact path={path} component={User}/>
                  <Route path={path+'/:id'} component={Dashboard}/>
                </div>
                )}/>
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
