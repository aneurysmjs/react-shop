import React, { ReactElement } from 'react';

type PropsType = {
  componentStack: string;
  error: Error;
};

const toTitle = (error: Error, componentStack: string): string =>
  `${error.toString()}\n\nThis is located at:${componentStack}`;

const style = {
  'align-ttems': 'center',
  'box-sizing': 'border-box',
  color: '#FFF',
  cursor: 'help',
  display: 'flex',
  'flex-direction': 'column',
  height: '100%',
  maxHeight: '100vh',
  maxWidth: '100vw',
  'text-align': 'center',
  width: '100%',
};

const ErrorBoundaryFallbackComponent = ({ componentStack, error }: PropsType): ReactElement => (
  <div style={style} title={toTitle(error, componentStack)}>
    <pre>{componentStack}</pre>
  </div>
);

export default ErrorBoundaryFallbackComponent;
