import express from 'express';
import { Router } from 'express';
import authRoutes from './auth.route';
import drivingRoutes from './driving-data.route';

const router: Router = express.Router();

// Define routes
router.use('/api/auth', authRoutes);
router.use('/api', drivingRoutes);

export default router;