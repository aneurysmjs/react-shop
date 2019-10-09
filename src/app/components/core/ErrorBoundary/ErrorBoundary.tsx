import React, { Component, ComponentType, ReactElement, ReactNode } from 'react';
import ErrorBoundaryFallbackComponent from './ErrorBoundaryFallbackComponent';

type PropsType = {
  children?: ReactElement | ComponentType;
  FallbackComponent: ComponentType;
  onError?: (error: Error, componentStack: string) => void;
};

type ErrorInfo = {
  componentStack: string;
};

type StateType = {
  error: Error | null;
  info: ErrorInfo | null;
};

class ErrorBoundary extends Component<PropsType, StateType> {
  static defaultProps = {
    FallbackComponent: ErrorBoundaryFallbackComponent,
  };

  state: StateType = {
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

  render(): ReactNode | null {
    const { children, FallbackComponent } = this.props;
    const { error, info } = this.state;

    if (error != null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore - I don't know what that fuck is going on :s
      return <FallbackComponent componentStack={info ? info.componentStack : ''} error={error} />;
    }

    return children || null;
  }
}

export type WithErrorBoundaryPropsType = {
  SomeComponent: ComponentType;
  FallbackComponent: ComponentType;
  onError: (error: Error) => void;
};

export function withErrorBoundary<P>({
  SomeComponent,
  FallbackComponent,
  onError,
}: WithErrorBoundaryPropsType): ComponentType<P> {
  const Wrapped = (props: P): JSX.Element => (
    <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
      <SomeComponent {...props} />
    </ErrorBoundary>
  );

  // Format for display in DevTools
  const name = SomeComponent.displayName || SomeComponent.name;

  Wrapped.displayName = name ? `WithErrorBoundary(${name})` : 'WithErrorBoundary';

  return Wrapped;
}

export default ErrorBoundary;
