/**
 * @desc: conditionally append properties as they're defined
 */

type AppendProps = <T>(...args: Array<keyof T>) => (obj: T) => T | Partial<T>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const pluckProps: AppendProps = (...args) => obj =>
  args.reduce(
    (acc, arg) => ({
      ...acc,
      ...(obj[arg] && { [arg]: obj[arg] }),
    }),
    {},
  );

export default pluckProps;
