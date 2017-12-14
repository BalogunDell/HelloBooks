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
import Home from './components/home/Home';
import Login from './components/useraccess/Login';
import Register from './components/useraccess/Register';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import User from './components/userprofile/User';
import Dashboard from './components/userprofile/Dashboard';
import UserHistory from './components/userprofile/History';
import Allbooks from './components/userprofile/Allbooks/Allbooks';
import BookDetails from './components/userprofile/bookDetails';
import ResetPassword from './components/useraccess/resetpassword';
import About from './components/about/about';

import { loadAllbooks } from './Actions/booksAction';


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
              <Route path='/user' component={User}/>
               <Route path="/user/bookdetails" component={BookDetails}/> 
               <Route path="/resetpassword/:uniqueUrl" exact component={ResetPassword}/>
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

render(
  <Provider store = {store}>
    <App/>
  </Provider>, document.getElementById('root')
);
