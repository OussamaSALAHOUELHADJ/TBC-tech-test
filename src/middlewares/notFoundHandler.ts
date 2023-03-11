import { Response } from 'express';

export function notFoundHandler(res: Response) {
  res.status(404).json({ message: 'Not Found' });
}
