import React from 'react';
import { render } from 'react-dom';
import 'jquery';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import configStore from './store/configStore';
import './assets/materialize/js/materialize.min.js'
import './assets/css/main.scss';
import './assets/main.js';
import Main from './components/containers/Main';
import Home from './components/presentational/Home/Home';
import Login from './components/userAccess/Login';
import Register from './components/userAccess/Register';
import Navbar from './components/presentational/Navbar/Navbar';
import Footer from './components/presentational/Footer/Footer';
import User from './components/containers/User';
import UserHistory from './components/containers/History';
import Allbooks from './components/containers/Allbooks/Allbooks';
import BookDetails from './components/containers/BookDetails';
import ResetPassword from './components/userAccess/ResetPassword';
import About from './components/presentational/About/About';
import NotFound from './components/presentational/NotFound/NotFound';
import { loadAllbooks } from './actions/booksAction';


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
               <Route path="/user/bookdetails" 
                component={BookDetails}
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
