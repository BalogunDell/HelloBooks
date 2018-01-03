import React from 'react';

/**
 * @class Home
 * @classdesc Returns the Home component
 */
class Background extends React.Component {
  render() {
    return (
    <div>
      <div className="home-bg">
         {this.props.children}
      </div>
    </div>
    );
  }
}
export default Background;