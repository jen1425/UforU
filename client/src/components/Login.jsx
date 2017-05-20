import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Banner from './Banner.jsx';
import About from './About.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {username: '',
      password: '',
      isLoggedIn: this.props.location.state.isLoggedIn,
      showError: false
    };
  }

  onLoginSubmit () {
    let userInfo = {username: this.state.username, password: this.state.password};
    axios({
      url: '/login',
      method: 'POST',
      data: userInfo
    })
      .then ((results) => {
        this.setState({isLoggedIn: true});
      })
      .catch ((error) => {
        this.setState({showError: true});
      });
  }

  updateVal(name, event) {
    var updater = {};
    updater[name] = event.target.value;
    this.setState(updater);
  }

  handleKeyPress(target) {
    if (target.charCode === 13) { 
      this.onLoginSubmit();
    }
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <Redirect to={{pathname: '/home', state: {isLoggedIn: this.state.isLoggedIn}}} />
      );
    }

    return (
       <div className="container-fluid-fullwidth">
        <Banner />
        <div className = "signupContain">
        <p className = "loginText"> Please Login below </p>
        <div className="row">
          <div className="col-md-2 col-md-offset-5">
            <input className = "inputText" type = "text" name = "username" placeholder = "Enter Username" onChange={this.updateVal.bind(this, 'username')}></input>
            <input className = "inputText" type = "password" name = "password" placeholder = "Enter Password" onChange={this.updateVal.bind(this, 'password')} onKeyPress={this.handleKeyPress.bind(this)}></input>
          </div>
        </div>
        <div className="row">
          <div className="loginButton center-block">
            <button className = "btn btn-primary btn-lg" type = "submit" onClick = {this.onLoginSubmit.bind(this)}>Login</button>
          </div>
        </div>
        <div className="row">
          <div className="text-center">
            <h6>Don't have an account? <Link to={{pathname: '/signup', state: {isLoggedIn: this.state.isLoggedIn}}}>Sign Up!</Link></h6>
          </div>
        </div>
        <div className="row">
          {
            this.state.showError ? <h6 className="text-center"><small>Username or password is incorrect.</small></h6> : <div></div>
          }
        </div>
      </div>
        <About />
        <div className = "container-fluid-fullwidth">
          <div className="navbar-default navbar-fixed-bottom">Made by Farrah Bousetta, Arseniy Kotov, and Helen Tang</div>
        </div>
      </div>
    );
  }
}

export default Login;