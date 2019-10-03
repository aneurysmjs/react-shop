// @flow strict
import React, { Component } from 'react';
import type { ComponentType } from 'react';

import ErrorBoundaryFallbackComponent from './ErrorBoundaryFallbackComponent';

type Props = {
  children?: *,
  FallbackComponent: ComponentType<*>,
  onError?: (error: Error, componentStack: string) => void,
};

type ErrorInfo = {
  componentStack: string,
};

type State = {
  error: ?Error,
  info: ?ErrorInfo,
};

class ErrorBoundary extends Component<Props, State> {
  static defaultProps = {
    FallbackComponent: ErrorBoundaryFallbackComponent,
  };

  state = {
    error: null,
    info: null,
  };

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const { onError } = this.props;

    if (typeof onError === 'function') {
      try {
        onError.call(this, error, info ? info.componentStack : '');
      // eslint-disable-next-line no-empty
      } catch (ignoredError) {}
    }

    this.setState({ error, info });
  }

  render() {
    const { children, FallbackComponent } = this.props;
    const { error, info } = this.state;

    if (error != null) {
      return (
        <FallbackComponent
          componentStack={
            info ? info.componentStack : ''
          }
          error={error}
        />
      );
    }

    return children || null;
  }
}

export const withErrorBoundary = (
  SomeComponent: ComponentType<*>,
  FallbackComponent: ComponentType<*>,
  onError: (Error) => void,
): ComponentType<{}> => {
  const Wrapped = (props) => (
    <ErrorBoundary
      FallbackComponent={FallbackComponent} onError={onError}
    >
      <SomeComponent {...props} />
    </ErrorBoundary>
  );

  // Format for display in DevTools
  const name = SomeComponent.displayName || SomeComponent.name;

  Wrapped.displayName = name
    ? `WithErrorBoundary(${name})`
    : 'WithErrorBoundary';

  return Wrapped;
};

export default ErrorBoundary;
