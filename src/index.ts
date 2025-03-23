import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './utils/db.utils';
import { PORT } from './config/dotenv.config';
import routes from './routes/routes';


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(routes);
// app.use('/api/auth', authRoutes);
// app.use('/api', drivingRoutes);

// Start server and connect to DB
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
