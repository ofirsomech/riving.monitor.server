import express from 'express';
import { monitorBehavior } from '../controllers/drivingDataController';
import authMiddleware from '../middlwares/authMiddleware';

const router = express.Router();

router.post('/monitor-behavior', authMiddleware, monitorBehavior);


export default router;
