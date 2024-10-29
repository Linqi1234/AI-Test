import React, { useState } from 'react';
import LevelLayout from './LevelLayout';

function Level3({ onNextLevel }) {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = () => {
    const isCorrect = userInput.trim() === "4"; // 正确答案为 "2"
    onNextLevel(isCorrect);
  };

  return (
    <LevelLayout title="What is 1 + 3?">
    {/* 这里放置具体的游戏内容，例如输入框、选择按钮等 */}
    <div>
      <p>Game content for Level 1 goes here.</p>
      <input type="text" value={userInput}   onChange={(e) => setUserInput(e.target.value)} 
        placeholder="Enter your answer"  />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  </LevelLayout>
  );
}

export default Level3;