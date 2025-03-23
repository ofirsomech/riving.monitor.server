import express from 'express';
import { averageScore, monitorBehavior } from '../controllers/driving-data.controller';
import authMiddleware from '../middlwares/auth.middleware';

const router = express.Router();

router.post('/monitor-behavior', authMiddleware, monitorBehavior);
router.post('/average-score', authMiddleware, averageScore);


export default router;
