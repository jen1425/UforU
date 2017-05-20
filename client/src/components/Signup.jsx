import React from 'react';
import About from './About.jsx';
import Banner from './Banner.jsx';
import axios from 'axios';
import { Redirect } from 'react-router';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showError: false,
      showBlankError: false,
      isLoggedIn: this.props.location.state.isLoggedIn
    };
  }

  usernameHandler(e) {
    this.setState({
      username: e.target.value
    });
  }

  passwordHandler(e) {
    this.setState({
      password: e.target.value
    });
  }

  submitHandler() {

    this.setState({
      showBlankError: false,
      showError: false
    });

    console.log('sending ', this.state.username, this.state.password);
    var userData = {
      username: this.state.username,
      password: this.state.password
    };

    if(this.state.username == '' || this.state.password == '') {
      this.setState({
        showBlankError: true
      });
      return;
    }

    axios({
      url: '/signup',
      method: 'POST',
      data: userData,
    })
      .then ((results) => {
        this.setState({isLoggedIn: true});
      })
      .catch ((error) => {
        this.setState({
          showError: true
        });
      });
  }

  handleKeyPress(target) {
    if (target.charCode === 13) { 
      this.submitHandler();
    }
  }
  render() {

    if (this.state.isLoggedIn) {

      return <Redirect to={{pathname: '/home', state: {isLoggedIn: this.state.isLoggedIn}}} />;

    }
    return (
       <div className="container-fluid-fullwidth">
         <Banner />
      <div className = "signupContain">
        <p className = "loginText"> Create an account </p>
        <div className="row">
          <div className = "col-md-2 col-md-offset-5">
            <div className = "form-group">
              <input className = "form-control" type = "text" name = "username" placeholder = "Enter Username" onChange={this.usernameHandler.bind(this)}></input>
              <input className = "inputText" type = "password" name = "password" placeholder = "Enter Password" onChange={this.passwordHandler.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}></input>
            </div>
          </div>
        </div>
        <div className="row">
          <div className = "loginButton center-block">
            <button className = "btn btn-primary btn-lg" type = "submit" onClick = {this.submitHandler.bind(this)}>Signup</button>
          </div>
        </div>
        <div className="row">
          {
            this.state.showError ? <h6 className="text-center"><small>Username is already taken.</small></h6> : <div></div>
          }
        </div>
        <div className="row">
          {
            this.state.showBlankError ? <h6 className="text-center"><small>Please ensure that you enter both fields.</small></h6> : <div></div>
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

export default Signup;