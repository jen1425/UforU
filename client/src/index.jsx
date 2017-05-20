import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Favorites from './components/Favorites.jsx';
import Container from './container.jsx';
import Logout from './components/Logout.jsx';
import Home from './components/Home.jsx';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Container} />
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/logout" component={Logout} />
    </div>
  </Router>, document.getElementById('app'));