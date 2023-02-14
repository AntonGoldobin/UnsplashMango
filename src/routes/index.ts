import express, { Request, Response, NextFunction } from 'express'

export const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile('../web/index.html');
});

