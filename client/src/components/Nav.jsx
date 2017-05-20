import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.isLoggedIn
    };
  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid" className="navigation">
          <div className="navbar-header">
            <Link to={{pathname: '/home', state: {isLoggedIn: this.state.isLoggedIn}}} className="navbar-brand">UforU</Link>
          </div>
          <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li><Link to={{pathname: '/favorites', state: {isLoggedIn: this.state.isLoggedIn}}}>Favorites</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right logout">
                  <li><Link to={{pathname: '/logout', state: {isLoggedIn: this.state.isLoggedIn}}}>Logout</Link></li>
              </ul>
              </div>
          </div>
        </nav>
    );
  }
}

export default Nav;