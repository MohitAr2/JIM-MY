// src/components/GoalTypeOverlay.js
import React from 'react';
import '../styles/components.css';
import leanImage from './assests/lean.png';
import fitImage from './assests/fit.png';
import bulkyImage from './assests/bulky.png';

function GoalTypeOverlay({ onClose, selectGoalType }) {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="goal-type-options">
          <div className="goal-type-option" onClick={() => selectGoalType('lean')}>
            <img src={leanImage} alt="Lean" />
            <p>Lean</p>
          </div>
          <div className="goal-type-option" onClick={() => selectGoalType('fit')}>
            <img src={fitImage} alt="Fit" />
            <p>Fit</p>
          </div>
          <div className="goal-type-option" onClick={() => selectGoalType('bulky')}>
            <img src={bulkyImage} alt="Bulky" />
            <p>Bulky</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalTypeOverlay;