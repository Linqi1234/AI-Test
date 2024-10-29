import React, { useState } from 'react';
import '../App.js';
import '../App.css';

function CheckBox({ onVerify }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(true);
    setTimeout(onVerify, 1000); // 模拟验证完成，1秒后进入游戏
  };

  return (
    <div className="Box">
      <style>
        {`
          .Box {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>
      <div className="checkBox">
        <div className="checkbox-container" onClick={handleCheck}>
          <input type="checkbox" checked={isChecked} readOnly />
          <span className="checkbox-label">
            {isChecked ? "Verified" : "I am not a robot"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CheckBox;