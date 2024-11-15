import React, { useState } from 'react';
import './Counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div className="counter-container">
      <h1 className="counter-title">Counter App</h1>
      <div className="counter-display">
        <h2 className={`counter-number ${count >= 0 ? 'positive' : 'negative'}`}>
          {count}
        </h2>
      </div>
      <div className="button-group">
        <button onClick={increment} className="counter-btn increment">+</button>
        <button onClick={decrement} className="counter-btn decrement">-</button>
      </div>
    </div>
  );
};

export default Counter;