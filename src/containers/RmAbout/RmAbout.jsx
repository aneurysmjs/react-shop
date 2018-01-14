import React, { Component } from 'react';
import { connect } from 'react-redux';
import RmHeader from '../../components/RmHeader/RmHeader';
import RmNav from '../../containers/RmNav/RmNav';

class RmAbout extends Component {

  render() {
    return (
      <section className="rmAbout">
        <RmNav showProfile />
        <div className="rmAbout__wrapper">
          <RmHeader
            heading="About"
            subHeading="React Movies"/>
          <div className="container pb-5">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <p>
                  This is just an app to save and share your favorite movies, because sometimes we need a recommendation
                  when we doesn't have anything to see, so this is the perfect place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
}

export default RmAbout;
