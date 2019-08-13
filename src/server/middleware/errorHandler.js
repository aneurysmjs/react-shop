// @flow strict
// eslint-disable-next-line import/no-extraneous-dependencies
import path from 'path';
import { compose, split, map } from 'ramda';
import type {
  $Request,
  $Response,
  NextFunction,
} from 'express';

// print a nicer stack trace by splitting line breaks and making them array items
const printStackTrace = compose(
  map(line => line.replace(
    process
      .cwd()
      .split(path.sep)
      .join('/'),
    '.',
  )),
  map(line => line.split(path.sep).join('/')),
  map(line => line.trim()),
  split('\n'),
);

export default (
  err: Error,
  req: $Request,
  res: $Response,
  next: NextFunction, // eslint-disable-line no-unused-vars
): $Response => res.status(404).json({
  status: 'error',
  message: err.message,
  stack:
      process.env.NODE_ENV === 'development'
      && printStackTrace((err.stack || '')),
});
