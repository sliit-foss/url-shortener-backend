import express from 'express';
import linkRouter from './link.routes';

const router = express.Router();

router.use('/', linkRouter);

export default router;
