// @flow strict
import React, { Component } from 'react';
// $FlowIgnore
import { connect } from 'react-redux';

import { footerData } from '@/store/actions';
import type { FooterType } from '@/store/types/FooterType';

import Icon from '@/components/base/Icon/Icon';

import './Footer.scss';

type PropsType = {
  footer: FooterType
};

class Footer extends Component<PropsType> {
  render() {
    const {
      footer: {
        social,
      },
    } = this.props;

    return (
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div className="row">
              <div className="col">
                <div data-testid="social">
                  {social && social.map((s) => (
                    <Icon
                      key={s.id}
                      path={`social/${s.icon}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__copyright">
            <span data-testid="copyright">Copyright © {new Date().getFullYear()}. All Rights Reserved</span>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = (state) => ({
  footer: state.footer,
});

const mapDispatchToProps = {
  footerData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);
