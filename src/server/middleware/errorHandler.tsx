import path from 'path'; // eslint-disable-line import/no-extraneous-dependencies
import { compose, split, map } from 'ramda';
import { Request, Response, NextFunction } from 'express';

// print a nicer stack trace by splitting line breaks and making them array items
const printStackTrace = compose(
  map((line: string) => line.replace(process.cwd().split(path.sep).join('/'), '.')),
  map((line: string) => line.split(path.sep).join('/')),
  map((line: string) => line.trim()),
  split('\n'),
);

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
): Response =>
  res.status(404).json({
    status: 'error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' && printStackTrace(err.stack || ''),
  });
