/**
 * @desc: conditionally append properties as they're defined
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const appendProps = (...args: Array<string>) => action =>
  args.reduce(
    (acc, arg) => ({
      ...acc,
      ...(action[arg] && { [arg]: action[arg] }),
    }),
    {},
  );

export default appendProps;
