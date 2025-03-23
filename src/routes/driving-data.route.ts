import express from 'express';
import authMiddleware from '../middlwares/auth.middleware';
import { averageScore, monitorBehavior } from '../controllers/driving-data.controller';

const router = express.Router();

router.post('/monitor-behavior', authMiddleware, monitorBehavior);
router.post('/average-score', authMiddleware, averageScore);


export default router;
