import React from 'react';
import Navbar from '../navbar/Navbar';
import LoginForm from './Forms/LoginForm';
import toastr from 'toastr';
import { Link, Redirect } from 'react-router-dom';
import Background from '../Background/Background';
import PasswordResetModal from './Forms/PasswordResetModal';
/**
 * @class Register
 * @classdesc returns the component for user signin
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectUser: false
    }

    this.handleInput = this.handleInput.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
}


 showModal() {
    console.log($('.forgotPass'));
    $('#modal-link').modal('open');
  }

  componentDidMount() {
     $('.modal').modal({
      dismissible: false
    }); 
  }

  handleInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }



  handleLogin(event) {
    event.preventDefault();
    // localStorage.setItem('token', this.state.username)
      this.setState({redirectUser: true})
  }

  render() {
     
    return(
      <div>
        {/* This div holds the navbar component  */}
          <Background>
          <Navbar/>
          {this.state.redirectUser? <Redirect to="/user"/>:

           <div className="user-login-form">
            <div className="col s12 m6 offset-m3 valing-wrapper">
              <div className="form-holder">

              {/* form headers  */}
                <div className="form-header">
                  <h2>Signin</h2>
                  <div>
                    <p>Not registered? <Link to="/register">Signup</Link></p>
                  </div>
                </div>

              {/* form header ends  */}
                <div>
                  <form className="user-form" onSubmit={this.handleLogin}>
                    {/* Username input  */}
                    <div className="row">
                      <div className="input-field s12">
                        <label>Username <span>*</span></label>
                        <input type="text" id="username" name="username" 
                        value={this.state.username} 
                        onChange={this.handleInput} />
                      </div>
                    </div>
                    

                    {/* Password input  */}
                    <div className="row">
                      <div className="input-field s12">
                        <label htmlFor="Password">Password<span>*</span></label>
                        <input type="password" id="password" name="password"/>
                      </div>  
                        <span className="button forgotPass modal-trigger" onClick={this.showModal}>Forgot password</span> 
                    </div>
                    
                    {/* Signin button  */}
                    <div className="row">
                      <div>
                        <input type="submit" className="btn waves-effect waves-teal" id="regBtn" value="Signin"/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <PasswordResetModal/>
          </div>
          }
</Background>
      </div>
    );
  }
}

export default Login;
