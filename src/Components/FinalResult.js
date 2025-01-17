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
            height: 50vh;
            text-align: center;
            font-size: 10px;
            color: #595959;
            padding:27px;
          }
        `}
      </style>
      <h2>{resultMessage}</h2>
    </div>
  );
}

export default FinalResult;