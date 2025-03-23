# Driving Behavior Monitoring System

## Overview
This application monitors driving behavior by analyzing acceleration, braking, and turning data to identify unsafe driving patterns and calculate sustainability scores. The system consists of a Node.js backend API with MongoDB integration and a React Native mobile frontend.

## Features
- Real-time monitoring of driving behavior metrics
- Automatic flagging of unsafe driving patterns
- Sustainability score calculation
- Data persistence using MongoDB
- Cross-platform mobile interface

## Technology Stack
### Backend
- Node.js
- Express
- MongoDB

### Frontend
- React Native

### Database
- MongoDB

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- React Native development environment
- npm or yarn

### Backend Setup
#### Clone the repository
```sh
git clone <repository-url>
cd driving-behavior-monitor/backend
```
#### Install dependencies
```sh
npm install
```
#### Configure environment variables
Create a `.env` file with the following variables:
```sh
PORT=5002
MONGODB_URI=mongodb://localhost:27017/drivingBehavior
```
#### Start the server
```sh
npm start
```
The server will run on `http://localhost:5002`

### Frontend Setup
#### Install dependencies
```sh
npm install
```
#### Configure the API endpoint
Open `src/config.js` and update the `API_URL` to match your backend server address.

#### Run the application
```sh
# For iOS
npx react-native run-ios

# For Android
npx react-native run-android
```

## API Documentation

### Monitor Driving Behavior
**Endpoint:** `POST /monitor-behavior`

#### Request Body:
```json
{
  "driverId": "string",
  "acceleration": "number",
  "braking": "number",
  "turn": "number",
  "timestamp": "string" (optional)
}
```

#### Response:
```json
{
  "driverId": "string",
  "acceleration": "number",
  "braking": "number",
  "turn": "number",
  "isFlag": "boolean",
  "sustainabilityScore": "number",
  "timestamp": "string"
}
```

## Technical Details

### Flagging Criteria
The system flags driving behavior as unsafe when any of the following thresholds are exceeded:
- **Acceleration** > 3.0 m/s²
- **Braking** > 4.0 m/s²
- **Turn** > 2.5 m/s²

### Sustainability Score Calculation
The sustainability score is calculated as follows:
1. Normalize each metric (acceleration, braking, turn) against its maximum threshold.
2. Calculate the average of these normalized values.
3. Subtract this average from 1 to get the sustainability score.
4. Round to 2 decimal places.

**Formula:**
```sh
Score = 1 - ((normalizedAcceleration + normalizedBraking + normalizedTurn) / 3)
```

## Usage Guide

### Mobile Application
1. Launch the React Native app on your device or emulator.
2. Start fake ride
3. Tap the "Stop ride" button to process the data.
4. View the results, including:
   - Whether the driving was flagged as unsafe.
   - The calculated sustainability score.
   - All input values for reference.

## Implementation Details

### Backend Architecture
- RESTful API design with Express
- MongoDB for data persistence
- Input validation and error handling
- Modular code structure for maintainability

### Frontend Design
- Clean, intuitive user interface
- Form validation
- Error handling for API communication
- Real-time feedback on submission

## Error Handling
The application includes comprehensive error handling:
- Input validation on both frontend and backend
- Appropriate HTTP status codes for different error scenarios
- User-friendly error messages
- Network error handling


## Troubleshooting

### Common Issues
#### MongoDB Connection Error
- Ensure MongoDB is running.
- Check the connection string in your `.env` file.

#### API Connection Failed
- Verify the API URL in the frontend configuration.
- Check that the backend server is running.

#### React Native Build Issues
- Ensure all dependencies are installed.
- Clear the cache:
  ```sh
  npx react-native start --reset-cache
  ```

## Future Improvements
- driver profiles
- Historical data visualization
- Real-time data collection from device sensors
- Trip-based analysis
- Notification system for unsafe driving patterns

## License
MIT License

## Contributors
- Ofir Somech

## Acknowledgments
This project was created as part of a coding assignment.
