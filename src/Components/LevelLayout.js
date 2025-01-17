import React from 'react';

function LevelLayout({ title, children }) {
  return (
    <div className="level-layout">
      <style>
        {`
          .level-layout {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            // height: 100vh;
            // width:60vw;
            text-align: center;
          }

          .level-title {
            margin-bottom: 20px;
            font-size: 1.5rem;
            color: #333;
          }

          .game-frame {
            width: 80%;
            max-width: 600px;
            height: 350px;
            // border: 2px solid #000;
            // background-color: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            // box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
      <h2 className="level-title">{title}</h2>
      <div className="game-frame">
        {children}
      </div>
    </div>
  );
}

export default LevelLayout;
