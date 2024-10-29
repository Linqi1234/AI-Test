import React, { useState } from 'react';
import CheckBox from './CheckBox';
import Level1 from './Level1';
import Level2 from './Level2';
import Level3 from './Level3';
import Level4 from './Level4';
import Level5 from './Level5';
import Level6 from './Level6';
import '../App.css';
import FinalResult from './FinalResult';


function Game() {
  const [hasVerified, setHasVerified] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1); // 当前关卡
  const [isHuman, setIsHuman] = useState(true); // 是否通过验证（所有关卡都正确）
  const [gameOver, setGameOver] = useState(false); // 用于跟踪游戏是否结束
  const [resultMessage, setResultMessage] = useState(''); // 用于显示结果的消息
  const [showFinalResult, setShowFinalResult] = useState(false); //在新的页面显示最终结果



  const handleVerification = () => {
    setHasVerified(true); // 玩家完成了checkbox验证，现在开始游戏
  };

  const handleNextLevel = (isCorrect) => {
    if (!isCorrect) setIsHuman(false); // 如果有错误，标记为非人类
    if (currentLevel >= 6) {
      console.log("End Game triggered"); // 确认结束游戏被触发
      endGame();
    } else {
      setCurrentLevel(currentLevel + 1); // 进入下一个关卡
    }
  };

  /* // 函数：发送结果到Arduino
   async function sendResultToArduino(isHuman) {
  try {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });   //接收端口
    const writer = port.writable.getWriter();
    const result = isHuman ? "true" : "false";
    const data = new TextEncoder().encode(result + '\n'); // 记得加上换行符，以便Arduino正确解析
    await writer.write(data);
    writer.releaseLock();
    port.close();
  } catch (error) {
    console.error("Error sending result to Arduino:", error);
  }
}     */

  // 函数：处理游戏结束
  const endGame = () => {
    const message = isHuman ? "You are human!" : "You are not human!";
    setResultMessage(message); // 更新页面结果
    setGameOver(true); // 游戏结束
    //   sendResultToArduino(isHuman); // 调用函数发送结果   

    // 延迟1秒后显示最终结果页面
    setTimeout(() => {
      setShowFinalResult(true);
    }, 500);
  };


return (
  <div className="game-container">
    {showFinalResult ? (
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





/*   Arduino

void setup() {
  Serial.begin(9600);  // 初始化串口通讯
  pinMode(LED_BUILTIN, OUTPUT);  // 使用内置LED表示结果（或者连接外部LED）
}

void loop() {
  if (Serial.available() > 0) {
    String result = Serial.readStringUntil('\n');  // 读取一行数据

    // 将字符串解析为布尔值
    bool isHuman = (result == "true");

    // 根据布尔值进行操作
    if (isHuman) {
      Serial.println("Player is Human!");
      digitalWrite(LED_BUILTIN, HIGH);  // 打开LED，表示玩家是人类
    } else {
      Serial.println("Player is Not Human!");
      digitalWrite(LED_BUILTIN, LOW);   // 关闭LED，表示玩家是机器人
    }
  }
}
*/