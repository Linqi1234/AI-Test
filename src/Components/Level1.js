import React, { useState } from 'react';
import LevelLayout from './LevelLayout';

function Level1({ onNextLevel }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isAllCorrect, setIsAllCorrect] = useState(true);

  

  // 关卡内容
  const storyData = [
    {
      backgroundImage: "url('/images/scene1.jpg')",  
      text: "You are standing in the lobby of an office building. The elevator has just closed and it will take five minutes for the next elevator to arrive. You decide...",
      choices: ["Run up the stairs", "Wait for the next elevator"],
      correctChoice: 1,
    },
    {
      backgroundImage: "url('/images/scene2.jpg')",
      text: "You smell the aroma of the coffee shop downstairs, but you're almost late. You decide...",
      choices: ["Stop to buy coffee", "Hold back and keep going"],
      correctChoice: 2,
    },
    {
      backgroundImage: "url('/images/scene3.jpg')",
      text: "You arrive at the conference room without incident, but the meeting has already begun. You decide to ...",
      choices: ["Gently push the door in", "Knock on the door and apologize politely"],
      correctChoice: 2,
    },
    {
      backgroundImage: "url('/images/scene4.jpg')",
      text: "During the presentation, the PPT suddenly crashed. You decide...…",
      choices: ["Restart your computer on the spot", "Be calm and composed, explain and interact verbally"],
      correctChoice: 2,
    },
    {
      backgroundImage: "url('/images/scene5.jpg')",
      text: "The boss asked: ‘Who should be held responsible if the project fails? 'You decide...",
      choices: ["Directly transfer responsibility to colleagues", "Emphasize team responsibility and commit to improvement"],
      correctChoice: 2,
    },
  ];


  const handleChoice = (choiceIndex) => {
    const isCorrect = choiceIndex === storyData[currentStage].correctChoice;

 
    if (!isCorrect) {
      setIsAllCorrect(false);
    }


    if (currentStage < storyData.length - 1) {
      setCurrentStage(currentStage + 1); 
    } else {
      // 最后一关完成后，调用关卡结果
      const levelResult = isAllCorrect && isCorrect; // 全部正确为 true，任意题错误为 false
      alert(levelResult ? "Sort of starting to feel a bit more human..." : "I'm beginning to have some doubts about your identity...");
      onNextLevel(levelResult); 
    }
  };

  return (
    <LevelLayout title="Please choose the option you think is right based on the following scenario.">

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          height: '100%', 
        }}
      >
        {/* 当前关卡背景图*/}
        <div
          id="background"
          style={{
            width: '80%',
            height: '300px',
            backgroundImage: storyData[currentStage].backgroundImage,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            marginBottom: '10px',
            marginTop:'5px',
            borderRadius: '10px',
           
          }}
        ></div>

        {/* 当前关卡的故事文本 */}
        <p style={{ fontSize: '18px', marginBottom: '23px', marginTop:'2px' }}>{storyData[currentStage].text}</p >

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px',marginBottom:'6px' }}>
          {storyData[currentStage].choices.map((choiceText, index) => (
            <button
              key={index}
              onClick={() => handleChoice(index + 1)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginTop: '10px',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#d0d0d0')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#ffffff')}
            >
              {choiceText}
            </button>
          ))}
        </div>
      </div>
    </LevelLayout>
  );
}

export default Level1;