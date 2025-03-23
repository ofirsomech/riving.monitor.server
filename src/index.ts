import cors from 'cors';
import express from 'express';
import routes from './routes/routes';
import bodyParser from 'body-parser';
import connectDB from './utils/db.utils';
import { PORT } from './config/dotenv.config';


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(routes);

// Start server and connect to DB
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
