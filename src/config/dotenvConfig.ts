import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5002;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ofir:ofir@ofirdb.nj9y0.mongodb.net/?retryWrites=true&w=majority&appName=OfirDB';
