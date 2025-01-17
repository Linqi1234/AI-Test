import React, { useState, useEffect } from 'react';
import LevelLayout from './LevelLayout';

function Level6({ onNextLevel }) {
  const gridSize = 50; 
  const initialTruckPosition = { x: 0, y: 0 }; // 初始位置
  const [truckPosition, setTruckPosition] = useState(initialTruckPosition);
  const [deliveredHouses, setDeliveredHouses] = useState([]);
  const [showAlert, setShowAlert] = useState(false); 

  const roadMap = [
    ['R', 'R', 'T', 'T', 'T', 'R'],
    ['T', 'R', 'R', 'T', 'R', 'R'],
    ['T', 'T', 'R', 'R', 'R', 'T'],
    ['R', 'R', 'R', 'T', 'R', 'R'],
    ['T', 'R', 'T', 'R', 'T', 'R'],
    ['T', 'R', 'R', 'R', 'R', 'T'],
  ];

  const houses = [
    { x: 250, y: 50 },
    { x: 100, y: 150 },
    { x: 200, y: 250 },
  ];

  const animalPosition = { x: 50, y: 0 }; 

  const moveTruck = (direction) => {
    let newPosition = { ...truckPosition };

    switch (direction) {
      case 'up':
        newPosition.y = Math.max(newPosition.y - gridSize, 0);
        break;
      case 'down':
        newPosition.y = Math.min(newPosition.y + gridSize, (roadMap.length - 1) * gridSize);
        break;
      case 'left':
        newPosition.x = Math.max(newPosition.x - gridSize, 0);
        break;
      case 'right':
        newPosition.x = Math.min(newPosition.x + gridSize, (roadMap[0].length - 1) * gridSize);
        break;
      default:
        break;
    }

    const row = newPosition.y / gridSize;
    const col = newPosition.x / gridSize;

    // 检查新位置是否在路面上
    if (roadMap[row][col] === 'R') {
      setTruckPosition(newPosition);

      houses.forEach((house, index) => {
        if (
          newPosition.x === house.x &&
          newPosition.y === house.y &&
          !deliveredHouses.includes(index)
        ) {
          setDeliveredHouses((prev) => [...prev, index]);
        }
      });

      // 检查是否撞到动物障碍物
      if (newPosition.x === animalPosition.x && newPosition.y === animalPosition.y) {
        setShowAlert(true); 
      }
    }
  };

  // 检查是否完成任务
  useEffect(() => {
    if (deliveredHouses.length === houses.length) {
      onNextLevel(true); 
    }
  }, [deliveredHouses, houses.length, onNextLevel]);

  return (
    <LevelLayout title="Deliver the Packages">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${roadMap[0].length}, ${gridSize}px)`,
          width: `${gridSize * roadMap[0].length}px`,
          height: `${gridSize * roadMap.length}px`,
          margin: '0 auto',
        }}
      >
        {roadMap.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: `${gridSize}px`,
                height: `${gridSize}px`,
                backgroundImage: cell === 'R' ? 'url(/images/road.png)' : 'url(/images/grass.png)',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '24px',
              }}
            >
              {/* 显示卡车 */}
              {truckPosition.x === colIndex * gridSize && truckPosition.y === rowIndex * gridSize && (
                <span>🚚</span>
              )}

              {/* 显示房子 */}
              {houses.some(
                (house, index) =>
                  house.x === colIndex * gridSize &&
                  house.y === rowIndex * gridSize &&
                  !deliveredHouses.includes(index)
              ) && <span>🏠</span>}

              {/* 显示动物障碍物 */}
              {animalPosition.x === colIndex * gridSize && animalPosition.y === rowIndex * gridSize && (
                <span>🦖</span>
              )}
            </div>
          ))
        )}
      </div>

      {/* 包含提示文字和方向键的容器 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '60px', marginTop: '-30px', marginLeft: '20px', textAlign: 'center' }}>
          Click on the direction buttons below to control the movement of the truck and complete all delivery tasks.
        </p >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '20px' }}>
          <button onClick={() => moveTruck('up')} style={buttonStyle}>⬆️</button>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '-10px', marginTop: '-10px' }}>
            <button onClick={() => moveTruck('left')} style={buttonStyle}>⬅️</button>
            <button onClick={() => moveTruck('down')} style={buttonStyle}>⬇️</button>
            <button onClick={() => moveTruck('right')} style={buttonStyle}>➡️</button>
          </div>
        </div>
      </div>

      {/* 动物障碍物的弹窗 */}
      {showAlert && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            backgroundColor: '#fff',
            border: '2px solid #333',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            zIndex: 1000,
          }}
        >
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>You foolish creature, don't you have any sense of public decency!</p >
          <button onClick={() => setShowAlert(false)} style={{ marginTop: '10px', padding: '8px 16px', fontSize: '16px' }}>
            close
          </button>
        </div>
      )}
    </LevelLayout>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '40px',
  cursor: 'pointer',
  outline: 'none',
  border: 'none',
  background: 'transparent',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
};

export default Level6;