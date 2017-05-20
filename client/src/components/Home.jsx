import React from 'react';
import axios from 'axios';
import Survey from './Survey.jsx';
import Results from './Results.jsx';
import Nav from './Nav.jsx';
import About from './About.jsx';
import Banner from './Banner.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colleges: [],
      isLoggedIn: this.props.location.state.isLoggedIn
    },

    this.sendSurveyInfo = this.sendSurveyInfo.bind(this);
  }

  sendSurveyInfo(userData) {
    console.log('axios data:', userData);
    userData.size = userData.size.split('-');
    axios({
      url: '/api/colleges',
      method: 'POST',
      data: userData,
    })
      .then ((results) => {
        this.setState({
          colleges: results.data
        });
        console.log('axios results: ', results);
      })
      .catch ((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container-fluid-fullwidth">
        <Nav isLoggedIn={this.state.isLoggedIn}/>
        <Banner />
        <div className="container-fluid">
          <Survey sendSurveyInfo = {this.sendSurveyInfo}/>
        </div>
        <div className="container-fluid">
          <Results colleges = {this.state.colleges}/>
        </div>
        <About />
        <div className = "container-fluid-fullwidth">
          <div className="navbar-default navbar-fixed-bottom">Made by Farrah Bousetta, Arseniy Kotov, and Helen Tang</div>
        </div>
      </div>
    );
  }
}

export default Home;