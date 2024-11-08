import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalTypeOverlay from '../components/GoalTypeOverlay';
import ProfileOverlay from '../components/ProfileOverlay';
import '../styles/components.css';

function Login() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    age: '',
    currentWeight: '',
    goalWeight: '',
    currentHeight: '',
    goalType: ''
  });

  const [isGoalTypeOverlayOpen, setIsGoalTypeOverlayOpen] = useState(false);
  const [isProfileOverlayOpen, setIsProfileOverlayOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProfileOverlayOpen(true);
    saveUserProfile(userInfo);
  };

  const openGoalTypeOverlay = () => {
    setIsGoalTypeOverlayOpen(true);
  };

  const closeGoalTypeOverlay = () => {
    setIsGoalTypeOverlayOpen(false);
  };

  const selectGoalType = (goalType) => {
    setUserInfo({ ...userInfo, goalType });
    closeGoalTypeOverlay();
  };

  const saveUserProfile = (data) => {
    fetch('http://localhost:3001/saveUserProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={userInfo.age}
          onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Current Weight (kg)"
          value={userInfo.currentWeight}
          onChange={(e) => setUserInfo({ ...userInfo, currentWeight: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={userInfo.currentHeight}
          onChange={(e) => setUserInfo({ ...userInfo, currentHeight: e.target.value })}
          required
        />
        <div className="goal-type">
          <label>Goal Type:</label>
          <input
            type="text"
            value={userInfo.goalType}
            readOnly
            onClick={openGoalTypeOverlay}
            className="goal-type-input"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {isGoalTypeOverlayOpen && <GoalTypeOverlay onClose={closeGoalTypeOverlay} selectGoalType={selectGoalType} />}
      {isProfileOverlayOpen && <ProfileOverlay onClose={() => setIsProfileOverlayOpen(false)} userInfo={userInfo} />}
    </div>
  );
}

export default Login;