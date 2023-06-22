import express from 'express';
import { getPoints, insertPoints } from '../controllers/pointsController';

const router = express.Router();

router.post('/insert', insertPoints);
router.post('/getAll', getPoints);


export default router;