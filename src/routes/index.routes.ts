import { Router, Request, Response } from 'express';
import { dotenv } from '../config';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const PROJECT_WEBSITE = dotenv.PROJECT_WEBSITE;
  if (PROJECT_WEBSITE) {
    return res.redirect(PROJECT_WEBSITE);
  } else {
    return res.status(200).json({ message: 'Hello' });
  }
});

export { router as indexRoutes };
