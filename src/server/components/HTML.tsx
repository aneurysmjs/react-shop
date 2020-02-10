import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { State } from '~/shared/types/State';

type PropsT = {
  children: JSX.Element | Array<JSX.Element> | string;
  css: Array<string>;
  scripts: Array<string>;
  state?: State;
};

export default class HTML extends Component<PropsT> {
  static defaultProps = {
    css: [],
    scripts: [],
  };

  render(): JSX.Element {
    const head = Helmet.renderStatic();
    // eslint-disable-next-line no-unused-vars, react/prop-types
    const {
      // eslint-disable-next-line no-unused-vars
      children,
      scripts,
      css,
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
          {css.map(href => (
            <link key={href} rel="stylesheet" href={href} />
          ))}
        </head>
        <body>
          {/*
            * @link https://stackoverflow.com/a/40245490/5378393
            // @ts-ignore */}
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          {scripts.map(src => (
            <script key={src} src={src} />
          ))}
        </body>
      </html>
    );
  }
}
