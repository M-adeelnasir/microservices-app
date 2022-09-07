import express from 'express';

const router = express.Router();

router.delete('/api/users/signout', () => {});

export { router as signoutRouter };
