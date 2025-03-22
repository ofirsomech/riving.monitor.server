import express from 'express';
import { averageScore, monitorBehavior } from '../controllers/drivingDataController';
import authMiddleware from '../middlwares/authMiddleware';

const router = express.Router();

router.post('/monitor-behavior', authMiddleware, monitorBehavior);
router.post('/average-score', authMiddleware, averageScore);


export default router;
