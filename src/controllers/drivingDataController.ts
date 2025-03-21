import { Request, Response } from 'express';
import { saveDrivingData } from '../services/drivingDataService';

export const monitorBehavior = async (req: Request, res: Response) => {
  try {
    const savedData = await saveDrivingData(req.body);
    res.status(201).json(savedData);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
