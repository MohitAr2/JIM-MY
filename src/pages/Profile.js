import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles/components.css';
function Profile() {
  const location = useLocation();
  const { userInfo } = location.state;

  return (
    <div className="profile">
      <h1>User Profile</h1>
      <p><strong>Name:</strong> {userInfo.name}</p>
      <br></br>
      <p><strong>Age:</strong> {userInfo.age}</p>
      <br></br>
      <p><strong>Current Weight:</strong> {userInfo.currentWeight} kg</p>
      <br></br>
      <p><strong>Goal Weight:</strong> {userInfo.goalWeight} kg</p>
      <p><strong>Goal Type:</strong> {userInfo.goalType}</p>
    </div>
  );
}

export default Profile;