const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const userProfilePath = 'C:\\Users\\91951\\Desktop\\SEM 5\\projs\\AI_AWS\\jim-ai\\src\\pages\\user-data\\all.json';

app.post('/saveUserProfile', (req, res) => {
  const userProfile = req.body;

  // Ensure the directory exists
  const dir = path.dirname(userProfilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log('Saving user profile data to:', userProfilePath);
  console.log('User profile data:', userProfile);

  fs.writeFile(userProfilePath, JSON.stringify(userProfile, null, 2), (err) => {
    if (err) {
      console.error('Error saving user profile data:', err);
      res.status(500).send('Error saving user profile data');
    } else {
      console.log('User profile data saved successfully.');
      res.status(200).send('User profile data saved successfully');
    }
  });
});

const logWorkoutData = () => {
  // Generate sample workout data for the past 7 days
  const past7DaysWorkouts = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    past7DaysWorkouts.push({
      date: date.toISOString(),
      day: date.getDate(),
      workoutPlan: 'bro',
      workouts: [
        { name: 'Bench Press', completed: Math.random() > 0.5 },
        { name: 'Bicep Curls', completed: Math.random() > 0.5 },
        { name: 'Tricep Extensions', completed: Math.random() > 0.5 },
      ],
    });
  }

  // Read the existing user profile data
  fs.readFile(userProfilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading user profile data:', err);
      return;
    }

    let userProfile = JSON.parse(data);
    if (!userProfile.workoutLogs) {
      userProfile.workoutLogs = [];
    }

    // Add the new workout data
    userProfile.workoutLogs.push(...past7DaysWorkouts);

    // Keep only the last 7 days of data
    userProfile.workoutLogs = userProfile.workoutLogs.filter(log => {
      const logDate = new Date(log.date);
      return (now - logDate) / (1000 * 60 * 60 * 24) <= 7;
    });

    // Save the updated user profile data
    fs.writeFile(userProfilePath, JSON.stringify(userProfile, null, 2), (err) => {
      if (err) {
        console.error('Error saving workout data:', err);
      } else {
        console.log('Workout data saved successfully.');
        console.log('Current workout logs:', userProfile.workoutLogs);
      }
    });
  });
};

// Set up a timer to log workout data every 10 seconds
setInterval(logWorkoutData, 10000);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});