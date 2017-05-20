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
              <img src="images/farrah_bousetta.png" className="img-responsive bioImages" style={{ height: 200, width: 200 }} alt="FARRAH PHOTO HERE"/>
            </div>
            <div className="col-md-4">
              <img src="images/arseniy_kotov.png" className="img-responsive bioImages" style={{ height: 200, width: 200}} alt="ARSENIY PHOTO HERE"/>
            </div>
            <div className="col-md-4">
              <img src="images/helen_tang.png" className="img-responsive bioImages" style={{ height: 200, width: 200 }} alt="HELEN PHOTO HERE"/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <p>Farrah Bousetta is an upcoming professional software engineer with previous experience at Facebook, Google and other prestegious tech companies. She gets stuff done. Her nickname is Feisty Farrah.</p>
            </div>
            <div className="col-md-4">
              <p>Arseniy Kotov is an all star programmer specializing in full stack developement.</p>
            </div>
            <div className="col-md-4">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
         </div>
    );
  }
}
export default About;