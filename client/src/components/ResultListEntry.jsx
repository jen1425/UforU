import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class ResultListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false
    };
  }

  favoriteHandler(entry) {
    console.log('in handler for favorites');

    if (this.state.showMessage) { return; }

    axios({
      url: 'api/favorites',
      method: 'POST',
      data: {collegeId: entry.id}
    })
    .then((results) => {
      console.log('added to favorites - message received by client from server');
      $('.' + entry.id + '> .heart').toggleClass('special');
      this.setState({
        showMessage: true
      });
    })
    .catch((error) =>{
      console.log('error adding favorites');
    });
  }

  render () {
    const college = this.props.college;
    return (
      <div className = "card">
        <div className="row">
          <div className="col-md-3">
            <img className="img-responsive cardImages style_prevu_kit" src = {college.image_url}/>
          </div>
          <a className="college-name" href={'http://' + college.website_url}target="_blank"> {college.name}</a>
          <div className = {college.id}>
          <div className="heart" onClick={this.favoriteHandler.bind(this, college)}></div>
          </div>
          <p>{this.state.showMessage ? 'College added to your favorites!' : ''}</p>
          <p className="description">{college.description}</p>
        </div>
      </div>
    );
  }
}

export default ResultListEntry;