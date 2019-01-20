import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header/Header';

import './About.scss';

class About extends Component {

  render() {
    return (
      <section className="rmAbout">
       
        <div className="rmAbout__wrapper">
          <Header
            heading="About"
            subHeading="React Movies"
          />
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

export default About;
