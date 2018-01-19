import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 * @class Home
 * @classdesc Returns the Home component
 */
class Background extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      redirect: false
    }
  }

  componentWillMount() {
    if(localStorage.getItem('Access-Token') != null) {
      return this.setState({ redirect: true });
    }
    return this.setState({ redirect: false });
  }
  render() {
    return (
    <div>
      { this.state.redirect 
      ?
        <Redirect to= "/user/books"/>
      :
        <div className="home-bg">
          {this.props.children}
        </div>
        }
    </div>
    );
  }
}
export default Background;