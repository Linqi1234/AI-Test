import React, { useState } from 'react';
import LevelLayout from './LevelLayout';

function Level3({ onNextLevel }) {
  const [userChoice, setUserChoice] = useState(null);

  const handleSubmit = () => {
    const isCorrect = userChoice === "B"; // 假设正确答案为 "B"
    onNextLevel(isCorrect);
  };

  return (
    <LevelLayout title="Choose the Right Music">
      
      <div style={{ fontSize:'18px',marginTop:'-20px', padding: '0 20px' }}>
        <p>
        You're hurrying to work when you accidentally step on a banana peel and fall in front of a crowd of onlookers. Which of the following songs would best fit the soundtrack for this awkward moment?
        </p>
        
        {/* 音乐选择部分 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop:'40px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="radio"
              name="music-choice"
              value="A"
              onChange={() => setUserChoice("A")}
            />
            <span>Music A：</span>
            <audio controls src = {`${process.env.PUBLIC_URL}/music/musicA.mp3`} style={{ flex: '1', maxWidth: '450px', maxHeight: '40px'}}>Your browser does not support the audio element.</audio>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="radio"
              name="music-choice"
              value="B"
              onChange={() => setUserChoice("B")}
            />
            <span>Music B：</span>
            <audio controls src={`${process.env.PUBLIC_URL}/music/musicB.mp3`} style={{ flex: '1', maxWidth: '450px',maxHeight: '40px'}}>Your browser does not support the audio element.</audio>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="radio"
              name="music-choice"
              value="C"
              onChange={() => setUserChoice("C")}
            />
            <span>Music C：</span>
            <audio controls src={`${process.env.PUBLIC_URL}/music/musicC.mp3`} style={{ flex: '1', maxWidth: '450px', maxHeight: '40px'}}>Your browser does not support the audio element.</audio>
          </label>
        </div>

        <div style={{ marginTop: '10px' }}>
          <button onClick={handleSubmit} disabled={userChoice === null}>Submit</button>
        </div>
      </div>
    </LevelLayout>
  );
}

export default Level3;

