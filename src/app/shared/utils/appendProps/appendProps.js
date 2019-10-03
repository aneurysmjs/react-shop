/**
 * @desc: conditionally append properties as they're defined
 */
const appendProps = (...args) => (action) => (
  args.reduce((acc, arg) => ({
    ...acc,
    ...action[arg] && { [arg]: action[arg] },
  }), {})
);

export default appendProps;
