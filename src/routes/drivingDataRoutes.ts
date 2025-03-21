import express from 'express';
import { monitorBehavior } from '../controllers/drivingDataController';

const router = express.Router();

router.post('/monitor-behavior', monitorBehavior);


export default router;
