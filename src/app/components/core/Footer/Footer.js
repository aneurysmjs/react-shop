// @flow strict
import React from 'react';
// $FlowIgnore
import { useSelector } from 'react-redux';

import { getFooter } from '@/store/modules/footer/selectors';
import type { FooterType } from '@/shared/types/FooterType';

import Icon from '@/components/base/Icon/Icon';

import './Footer.scss';

const Footer = () => {
  const { social }: FooterType = useSelector(getFooter);

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
          <span data-testid="copyright">
            Copyright © {new Date().getFullYear()}. All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
