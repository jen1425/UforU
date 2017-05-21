import React from 'react';

class About extends React.Component {
  constructor(props) {
    super(props);
  }


  render () {
    return (
      <div className="card">
          <div className="row" className="bio">
            <h6><b><u>ABOUT THE CREATORS</u></b></h6>
            <div className="col-md-4">
              <img src="images/farrah.png" className="img-responsive bioImages" style={{ height: 500, width: 500 }} alt="FARRAH PHOTO HERE"/>
            </div>
            <div className="col-md-4">
              <img src="images/arseniy.png" className="img-responsive bioImages" style={{ height: 500, width: 500}} alt="ARSENIY PHOTO HERE"/>
            </div>
            <div className="col-md-4">
              <img src="images/hel.png" className="img-responsive bioImages" style={{ height: 500, width: 500 }} alt="HELEN PHOTO HERE"/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <p>Farrah - not the Fawcett kind. The kind who actually gets shit done</p>
            </div>
            <div className="col-md-4">
              <p>Myself Arseniy! I go hunting with Vodka drinking buddy Vlad!</p>
            </div>
            <div className="col-md-4">
              <p>Helen from Houston. WHO SAYS GIRLS CAN"T CODE???</p>
            </div>
          </div>
         </div>
    );
  }
}
export default About;