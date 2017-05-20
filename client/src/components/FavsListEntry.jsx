import React from 'react';
import axios from 'axios';

class FavsListEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteHandler(entry) {
    console.log('delete handler called');
    this.props.deleteHandler(entry);
  }

  render () {
    const college = this.props.college;
    return (
      <div className = "card">
        <div className="row">
          <div className="col-md-3">
            <img className="img-responsive cardImages style_prevu_kit" src = {college.image_url}/>
          </div>
          <a className="college-name" href={'http://' + college.website_url} target="_blank"> {college.name}</a>
          <button className="deleteFavs" onClick={this.deleteHandler.bind(this, college)}>Remove from Favorites</button>
          <p className="description">{college.description}</p>
        </div>
      </div>
    );
  }
}

export default FavsListEntry;