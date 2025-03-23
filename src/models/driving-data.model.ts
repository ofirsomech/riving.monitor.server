import mongoose, { Schema, Document } from 'mongoose';

export interface DrivingData extends Document {
  driverId: string;
  acceleration: number;
  braking: number;
  turn: number;
  isFlagged: boolean;
  sustainabilityScore: number;
  timestamp: string;
}

const DrivingDataSchema = new Schema({
  driverId: { type: String, required: true },
  acceleration: { type: Number, required: true },
  braking: { type: Number, required: true },
  turn: { type: Number, required: true },
  isFlagged: { type: Boolean, required: true },
  sustainabilityScore: { type: Number, required: true },
  timestamp: { type: String, required: true },
});

export default mongoose.model<DrivingData>('DrivingData', DrivingDataSchema);
