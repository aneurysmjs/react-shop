import Layout from '@/components/core/Layout/Layout';


function withSubscription(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}