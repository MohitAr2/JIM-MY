// src/pages/Leaderboard.js
import React, { useEffect, useState } from 'react';
import '../styles/components.css';
import Button from '../components/Button';
const workoutEmojiMap = {
    "push day": "🫸",
    "pull day": "🫷",
    "leg day": "🦵",
    "rest day": "🛌",
    "arm day": "💪",
    "chest day": "",
    "back day": "🔙",
    "abs": "🆎",
    "shoulders": "🤷",
    "upper body day": "🏋️‍♂️",
    "lower body day": "🧍",
    "cardio": "🏃‍♂️"
};
const handleAddFriend = (updatedFriends) => {
    return "";
    // setFriends(updatedFriends);
};
const difficultyRating = {
    "push day": 8,
    "pull day": 9,
    "leg day": 10,
    "rest day": 0,
    "arm day": 6,
    "chest day": 7,
    "back day": 8,
    "abs": 5,
    "shoulders": 6,
    "upper body day": 8,
    "lower body day": 9,
    "cardio": 8
};

const calculateScore = (user) => {
    const workoutScore = user.lastWorkouts.reduce((acc, workout) => acc + difficultyRating[workout], 0);
    return (workoutScore + user.dietMaintenance - user.restDays) * user.streak;
};

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [view, setView] = useState('top5');
  const currentUser = {
      id: 0,
      name: "Mohit [Current User]",
      restDays: 1,
      streak: 4,
      dietMaintenance: 18,
      lastWorkouts: ["chest day", "back day", "leg day", "rest day", "abs"],
      score: 0
  };
// after login refresh this so that instead of a static example make 
// a dymanic rule like where u are loggin your actual data 

  useEffect(() => {
      const importAll = (r) => r.keys().map(r);
      const userFiles = importAll(require.context('./jason/friends', false, /\.json$/));
      const users = userFiles.map((file, index) => ({ id: index + 1, ...file }));
      users.push(currentUser);
      users.forEach(user => {
          user.score = calculateScore(user);
      });
      users.sort((a, b) => b.score - a.score);
      setLeaderboardData(users);
  }, []);

  const getTopUsers = () => {
      let topUsers;
      if (view === 'top3') {
          topUsers = leaderboardData.slice(0, 3);
      } else if (view === 'top5') {
          topUsers = leaderboardData.slice(0, 5);
      } else {
          topUsers = leaderboardData;
      }
      return topUsers;
  };

  const currentUserRank = leaderboardData.findIndex(user => user.id === currentUser.id) + 1;

  return (
      <div className="leaderboard-container">
          <div className="leaderboard-header">
              <h2>Leaderboard</h2>
          </div>
          <div className="view-buttons">
              <button onClick={() => setView('top3')}>Top 3</button>
              <button onClick={() => setView('top5')}>Top 5</button>
              <button onClick={() => setView('all')}>All Friends</button>
          </div>
          <table className="leaderboard-table">
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Rest Days</th>
                      <th>Streak</th>
                      <th>Diet Maintenance</th>
                      <th>Last 5 Workouts</th>
                      <th>Score</th>
                  </tr>
              </thead>
              <tbody>
                  {getTopUsers().map((user, index) => (
                      <tr key={user.id} className={user.id === currentUser.id ? "current-user" : ""}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.restDays}</td>
                          <td>{user.streak}</td>
                          <td>{user.dietMaintenance}</td>
                          <td>
                              {user.lastWorkouts.map((workout, i) => (
                                  <span key={i}>{workoutEmojiMap[workout]} </span>
                              ))}
                          </td>
                          <td>{user.score}</td>
                      </tr>
                  ))}
                  {view !== 'all' && currentUserRank > (view === 'top3' ? 3 : view === 'top5' ? 5 : leaderboardData.length) && (
                      <tr className="current-user">
                          <td>{currentUserRank}</td>
                          <td>{currentUser.name}</td>
                          <td>{currentUser.restDays}</td>
                          <td>{currentUser.streak}</td>
                          <td>{currentUser.dietMaintenance}</td>
                          <td>
                              {currentUser.lastWorkouts.map((workout, i) => (
                                  <span key={i}>{workoutEmojiMap[workout]} </span>
                              ))}
                          </td>
                          <td>{calculateScore(currentUser)}</td>
                      </tr>
                  )}
              </tbody>
          </table>
          <Button onAddFriend={handleAddFriend} />
      </div>
  );
};

export default Leaderboard;