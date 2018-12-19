// @flow
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import Helmet from 'react-helmet';

type PropsT = {
  children: *,
  css: string[],
  scripts: string[],
};

export default class HTML extends Component<PropsT> {
  static defaultProps = {
    css: [],
    scripts: [],
  };

  render() {
    const head = Helmet.renderStatic();
    const { children, scripts, css, state } = this.props;
    
    return (
      <html lang="">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          {css.map((href) => {
            return <link key={href} rel="stylesheet" href={href} />;
          })}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          {scripts.map((src) => {
            return <script key={src} src={src} />;
          })}
        </body>
      </html>
    );
  }
}