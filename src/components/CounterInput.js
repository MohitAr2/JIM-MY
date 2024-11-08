import React from 'react';

function CounterInput({ label, value, onChange }) {
  const handleIncrement = () => {
    onChange(value + 5);
  };

  const handleDecrement = () => {
    onChange(value - 5);
  };

  return (
    <div className="counter-input">
      <label>{label}</label>
      <button type="button" onClick={handleDecrement}>-5</button>
      <input id="small-input" type="number" value={value} readOnly />
      <button type="button" onClick={handleIncrement}>+5</button>
    </div>
  );
}

export default CounterInput;