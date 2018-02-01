import React from 'react';
import { render } from 'react-dom';
import 'jquery';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configStore from './store/configStore';

import './assets/materialize/css/materialize.min.css'
import './assets/materialize/js/materialize.min.js'
import './assets/css/main.scss';
import './assets/main.js';

import Main from './components/Main';
import Home from './components/Home/Home';
import Login from './components/Useraccess/Login';
import Register from './components/Useraccess/Register';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import User from './components/Userprofile/User';
import UserHistory from './components/Userprofile/History';
import Allbooks from './components/Userprofile/Allbooks/Allbooks';
import BookDetails from './components/Userprofile/BookDetails';
import ResetPassword from './components/Useraccess/ResetPassword';
import About from './components/About/About';
import NotFound from './components/NotFound/NotFound';

import { loadAllbooks } from './Actions/booksAction';
import authenticate from '../src/components/HOC/authenticate';


// Create an instance of the configStore 
 const store = configStore();

 
class App extends React.Component {
  
  render() {
    return (
      <div> 
          <BrowserRouter>
            <Switch>
              <Route path='/' exact component={Main}/>
              <Route path='/register' component={Register}/>
              <Route path= '/login' component={Login}/>
              <Route path='/about' component={About}/>
              <Route path='/user' component={authenticate(User)}/>
               <Route path="/user/bookdetails" 
                component={authenticate(BookDetails)}
                /> 
               <Route path="/resetpassword/:uniqueUrl" 
                exact component={ResetPassword}/>
              <Route path="*" component= {NotFound}/>
            </Switch>
          </BrowserRouter>
          <Footer/>  
      </div>
    );
  }
}

render(
  <Provider store = {store}>
    <App/>
  </Provider>, document.getElementById('root')
);
