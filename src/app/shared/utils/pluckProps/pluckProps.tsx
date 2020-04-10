/**
 * @desc: conditionally pluck properties as they're declared
 */

type PluckProps = <T>(...args: Array<keyof T>) => (obj: T) => T | Partial<T>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const pluckProps: PluckProps = (...args) => (obj) =>
  args.reduce(
    (acc, arg) => ({
      ...acc,
      ...(obj[arg] && { [arg]: obj[arg] }),
    }),
    {},
  );

export default pluckProps;
