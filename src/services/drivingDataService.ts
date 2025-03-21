import DrivingData from '../models/drivingDataModel';

export const calculateSustainabilityScore = (acceleration: number, braking: number, turn: number): number => {
  const maxValues = { acceleration: 3.0, braking: 4.0, turn: 2.5 };
  const avgNormalized = (acceleration / maxValues.acceleration + braking / maxValues.braking + turn / maxValues.turn) / 3;
  return Math.max(0, Math.min(1, 1 - avgNormalized));
};

export const saveDrivingData = async (data: any) => {
  const isFlagged = data.acceleration > 3.0 || data.braking > 4.0 || data.turn > 2.5;
  const sustainabilityScore = calculateSustainabilityScore(data.acceleration, data.braking, data.turn);

  const drivingData = new DrivingData({
    ...data,
    isFlagged,
    sustainabilityScore,
  });

  return await drivingData.save();
};
