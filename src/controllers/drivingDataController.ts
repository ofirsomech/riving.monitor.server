import { Request, Response } from 'express';
import { saveDrivingData } from '../services/drivingDataService';
import DrivingData from '../models/drivingDataModel';

export const monitorBehavior = async (req: Request, res: Response) => {
  try {
    const savedData = await saveDrivingData(req.body);
    res.status(201).json(savedData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const averageScore = async (req: Request, res: Response) => {
  try {
    // Get user ID from the JWT token (which was added by authMiddleware)
    const userId = req.body.userId; // Assuming the user ID is stored in req.user.id

    // Calculate average sustainability score for this user
    const result = await DrivingData.aggregate([
      { $match: { driverId: userId } },
      {
        $group: {
          _id: null,
          averageScore: { $avg: '$sustainabilityScore' }
        }
      }
    ]);

    const averageScore = result.length > 0 ? result[0].averageScore : 0;
    res.json({ averageScore });
  } catch (error) {
    console.error('Error fetching average score:', error);
    res.status(500).json({ error: 'Failed to fetch average score' });
  }
};
