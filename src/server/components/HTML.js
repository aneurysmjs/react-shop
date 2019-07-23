// @flow strict
import React, { Component } from 'react';
import Helmet from 'react-helmet';

import type { State } from '@/store/types/State';

type PropsT = {
  children: *,
  css: Array<string>,
  scripts: Array<string>,
  state?: State
};

export default class HTML extends Component<PropsT> {
  static defaultProps = {
    css: [],
    scripts: [],
  };

  render() {
    const head = Helmet.renderStatic();
    // eslint-disable-next-line no-unused-vars, react/prop-types
    const {
      // eslint-disable-next-line no-unused-vars
      children, scripts, css, state,
    } = this.props;

    return (
      <html lang="en_US">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          {css.map(href => <link key={href} rel="stylesheet" href={href} />)}
        </head>
        <body>
          <div
            id="app"
            dangerouslySetInnerHTML={{ __html: children }}
          />
          {scripts.map(src => <script key={src} src={src} />)}
        </body>
      </html>
    );
  }
}
