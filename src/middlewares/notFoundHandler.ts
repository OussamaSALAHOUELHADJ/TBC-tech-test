import { Response, Request } from 'express';

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ message: 'Not Found' });
}
