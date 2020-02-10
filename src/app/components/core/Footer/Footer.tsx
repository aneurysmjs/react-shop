import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import Icon from '~/components/base/Icon';

import { State } from '~/store/State';
import { AlienResult } from '~/store/config/alienStore/useAlien';
import { FooterState } from '~/store/modules/footer/types';

import './Footer.scss';

type PropsType = {
  modules: Array<AlienResult<State>>;
};

const Footer: FunctionComponent<PropsType> = ({ modules }: PropsType) => {
  const [footerModule] = modules;

  const { selectors } = footerModule;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { social } = useSelector<State, FooterState>(selectors!.getFooter);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="row">
            <div className="col">
              <div data-testid="social">
                {social && social.map(s => <Icon key={s.id} path={`social/${s.icon}`} />)}
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
