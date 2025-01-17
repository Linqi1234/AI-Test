// import './App.css';
// import Game from './Components/Game';

// function App() {
//   return (
//     <div className="App">
//       <Game />
//     </div>
//   );
// }

// export default App;

// App.js



import './App.css';
import Game from './Components/Game';



// function App() {
//   return (
//     <div className="App">
//       {/* <div className="title">Very Normal A CAPTCHA Game</div> */}
//       <div className="main-container">
//         <div className="subtitle">🤡 A Very Easy CAPTCHA For Human 🤖</div>
//         <div className="game-content">
//           <Game />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';

function App() {
  const [isExiting, setIsExiting] = useState(false);
  const [togetherMoving, setTogetherMoving] = useState(false);
  const [remainingMoving, setRemainingMoving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      const exitTimer = setTimeout(() => {
        setTogetherMoving(true); // 移动🤡和“A”
        const remainingTimer = setTimeout(() => {
          setRemainingMoving(true); // 移动剩余文本
        }, 500); // 0.5秒后开始移动剩余文本
        return () => clearTimeout(remainingTimer);
      }, 1000); // 等待退出动画结束后再移动
      return () => clearTimeout(exitTimer);
    }, 4000); // 4秒后开始退出动画

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <div className="main-container">
        <div className="subtitle">
          <span className={`moveTogether ${togetherMoving ? 'moveTogether' : ''}`}>
            <span className={`icon`}>🤡</span>
            <span>A</span>
          </span>
          <span className={`bounce1 exitable ${isExiting ? 'exit1' : ''}`}>Very</span> 
          <span className={`bounce2 exitable ${isExiting ? 'exit2' : ''}`}>Easy</span> 
          <span className={`moveRemaining ${remainingMoving ? 'moveRemaining' : ''}`}>
            Captcha Game for Human 🤖
          </span>
        </div>
        <div className="game-content">
          <Game />
        </div>
      </div>
    </div>
  );
}

export default App;






// App.js
// App.js

