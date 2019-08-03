// @flow strict
import React, { useState, useEffect } from 'react';
import type { Node } from 'react';

type PropsType = {
  loader?: *,
  getModule: () => Promise<*>,
  children: Node,
};

// type StateType = {
//   AsyncModule: *
// };

const Lazy = ({ loader, getModule, ...rest }: PropsType) => {
  // eslint-disable-next-line no-unused-vars
  const [AsyncModule, setAsyncModule] = useState(null);
  // eslint-disable-next-line no-console
  console.log('rest', rest);

  useEffect(() => {
    (async () => {
      try {
        const module = await getModule();
        // eslint-disable-next-line no-console
        // console.log('module', module);
        setAsyncModule(module.default);
      // eslint-disable-next-line no-empty
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('err', err);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loader) {
    return <div>...loading </div>;
  }

  if (AsyncModule) {
    // eslint-disable-next-line no-console
    console.log('AsyncModule', AsyncModule);
    return <AsyncModule {...rest} />;
  }

  return null;
};

// class Lazy extends Component<PropsType, StateType> {
//   state = {
//     AsyncModule: null,
//   };

//   async componentDidMount() {
//     // eslint-disable-next-line no-unused-vars
//     const { getModule, ...rest } = this.props;
//     try {
//       const module = await getModule();
//       this.setState({
//         AsyncModule: module.default,
//       });
//       return module;
//     } catch (err) {
//       return new Error(err);
//     }
//   }

//   render() {
//     const { loader, ...rest } = this.props;
//     if (loader) {
//       return <div>...loading </div>;
//     }
//     const { AsyncModule } = this.state;
//     // eslint-disable-next-line no-console
//     console.log('AsyncModule', AsyncModule);
//     if (AsyncModule) {
//       return (
//         <AsyncModule {...rest} />
//       );
//     }

//     return null;
//   }
// }

export default Lazy;
