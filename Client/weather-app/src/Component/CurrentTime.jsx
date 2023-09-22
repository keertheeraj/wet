import React, { useState, useEffect } from 'react';
import './Currentime.css'
function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  return (
    <div className='Time'>
      <h4>Current Time</h4>
      <p>{formattedTime}</p>
    </div>
  );
}

export default Clock;