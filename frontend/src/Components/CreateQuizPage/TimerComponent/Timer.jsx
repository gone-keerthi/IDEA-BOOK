import React, { useState } from 'react';
// import QAPage from '../QAPage/QA';
// import PollTypePage from '../PollTypePage/PollType';

const Timer = () => {
  const [timer, setTimer] = useState()
  setTimeout(() => {
    
  }, 5000);

  return (
    <div className='timer-container'>
        <div className='timer-component'>
            <p> Timer </p>
            <div className='timer-btn-container'>
                <button id='off-btn'> OFF </button>
                <button id=' 5Sec-btn'> 5 sec </button>
                <button id=' 10Sec-btn'> 10 sec</button>
            </div>
        </div>
    </div>
  )
}

export default Timer