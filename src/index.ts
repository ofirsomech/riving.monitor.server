import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './utils/db';
import drivingRoutes from './routes/drivingDataRoutes';
import { PORT } from './config/dotenvConfig';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', drivingRoutes);

// Start server and connect to DB
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
