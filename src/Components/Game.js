import React, { useState, useEffect } from 'react';
import CheckBox from './CheckBox';
import Level1 from './Level1';
import Level2 from './Level2';
import Level3 from './Level3';
import Level4 from './Level4';
import Level5 from './Level5';
import Level6 from './Level6';
import FinalResult from './FinalResult';
import '../App.css';
import { sendResultToArduino, closeSerialConnection } from './serialHelper';
// import { initializeSerialConnection} from './serialHelper';

function Game() {
  const [hasVerified, setHasVerified] = useState(false); // 是否通过初始验证
  const [currentLevel, setCurrentLevel] = useState(1); // 当前关卡
  const [isHuman, setIsHuman] = useState(true); // 玩家是否被识别为人类
  const [gameOver, setGameOver] = useState(false); // 游戏是否结束
  const [resultMessage, setResultMessage] = useState(''); // 结果消息
  const [showFinalResult, setShowFinalResult] = useState(false); // 是否显示最终结果
  const [isSerialConnected, setIsSerialConnected] = useState(false); // 是否连接串口

  // 处理Fake Checkbox验证通过
  const handleVerification = () => {
    setHasVerified(true); 
  };

  // 处理关卡完成
  const handleNextLevel = (isCorrect) => {
    if (!isCorrect) setIsHuman(false); 
    if (currentLevel >= 6) {
      endGame(); 
    } else {
      setCurrentLevel(currentLevel + 1); 
    }
  };

  // 用户点击按钮以初始化串口连接
  const handleSerialConnection = async () => {
  //  await initializeSerialConnection();
    setIsSerialConnected(true);
  }; 

  // 处理游戏结束
  const endGame = () => {
    const message = isHuman 
    ? (
        <div>
            <h3 style={{ fontSize:'50px',fontWeight:'heavy', color: 'green' }}>Congratulations</h3>
            <img src={`${process.env.PUBLIC_URL}/images/human.png`} alt="Human Icon" style={{ width: '30%', height: '30%', padding: '10px' }} />
            <p>You have successfully passed the competency test.<br></br> We are pleased to confirm that you are human and have been granted access to this area. We wish you a pleasant day ahead. Remember, you are human, and your companions are also human. Should you have any inquiries, please feel free to contact our official personnel.</p>
        </div>
    ) 
    : (
        <div>
            <h3 style={{ fontSize:'50px',fontWeight:'heavy', color: 'red' }}>Warning</h3>
            <img src={`${process.env.PUBLIC_URL}/images/nonhuman.png`} alt="Non-Human Icon" style={{ width: '30%', height: '30%', padding: '10px' }} />
            <p>We regret to inform you that our system has determined you are not human. <br /> Non-human entities will be denied entry and will face immediate termination protocols. Please remain calm and, while awaiting the processing of your results, proceed to the designated area with your receipt. Thank you for your cooperation; you will find this experience most enlightening.</p>
        </div>
    );

    setResultMessage(message);
    setGameOver(true); // 游戏结束
    sendResultToArduino(isHuman); // 发送结果到Arduino

    // 延迟显示最终结果
    setTimeout(() => {
      setShowFinalResult(true);
    }, 500);
  };

  // 在组件卸载时清理串口连接
 useEffect(() => {
    return () => {
      closeSerialConnection();
    };
  }, []);  

  return (
    <div className="game-container">
      {!isSerialConnected ? (
        // <button onClick={handleSerialConnection}>Run the test</button>
        <button
   onClick={handleSerialConnection}
  style={{
    background: "none",
    border: "2px solid lightgray",
    borderRadius: "4px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    position: "absolute",
    backgroundColor:"lightgrey",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }}
>
  Run the test
</button>

      ) : showFinalResult ? (
        <FinalResult resultMessage={resultMessage} />
      ) : (
        <>
          {!hasVerified && !gameOver && (
            <CheckBox onVerify={handleVerification} />
          )}
          {hasVerified && !gameOver && (
            <>
              {currentLevel === 1 && <Level1 onNextLevel={handleNextLevel} />}
              {currentLevel === 2 && <Level2 onNextLevel={handleNextLevel} />}
              {currentLevel === 3 && <Level3 onNextLevel={handleNextLevel} />}
              {currentLevel === 4 && <Level4 onNextLevel={handleNextLevel} />}
              {currentLevel === 5 && <Level5 onNextLevel={handleNextLevel} />}
              {currentLevel === 6 && <Level6 onNextLevel={handleNextLevel} />}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Game;