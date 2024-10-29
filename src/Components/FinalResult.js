import React from 'react';

function FinalResult({ resultMessage }) {
  return (
    <div className="final-result">
      <style>
        {`
          .final-result {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
            font-size: 24px;
            color: #333;
          }
        `}
      </style>
      <h2>{resultMessage}</h2>
    </div>
  );
}

export default FinalResult;