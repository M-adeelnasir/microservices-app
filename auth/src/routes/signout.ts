import express, { Response, Request } from 'express';

const router = express.Router();

router.delete('/api/users/signout', (req: Request, res: Response) => {});

export { router as signoutRouter };
