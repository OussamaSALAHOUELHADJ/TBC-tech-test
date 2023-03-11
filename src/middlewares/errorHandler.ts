import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  /*   // eslint-disable-next-line
  console.error(err); */

  if (err.name === 'CORS_ERORR') {
    res.status(403).json({ message: err.message });
    next(err);
  }

  res.status(500).json({ message: 'Internal Server Error' });
}
