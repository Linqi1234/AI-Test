// import React, { useState } from 'react';
// import LevelLayout from './LevelLayout';

// function Level2({ onNextLevel }) {
//   const [userInput, setUserInput] = useState("");

//   const handleSubmit = () => {
//     const isCorrect = userInput.trim() === "3"; // 正确答案为 "2"
//     onNextLevel(isCorrect);
//   };

//   return (
//     <LevelLayout title="What is 1 + 2?">
//     {/* 这里放置具体的游戏内容，例如输入框、选择按钮等 */}
//     <div>
//       <p>Game content for Level 1 goes here.</p>
//       <input type="text" value={userInput}   onChange={(e) => setUserInput(e.target.value)} 
//         placeholder="Enter your answer"  />
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   </LevelLayout>
//   );
// }

// export default Level2;


// import React, { useState } from 'react';
// import LevelLayout from './LevelLayout';

// function Level2({ onNextLevel }) {
//   const items = [
//     { id: 'sailboat', src: '/images/sailboat.jpg' },
//     { id: 'paddles', src: '/images/paddles.jpg' },
//     { id: 'snail', src: '/images/snail.jpg' },
//     { id: 'car', src: '/images/car.jpg' },
//     { id: 'doorknob', src: '/images/doorknob.jpg' },
//     { id: 'door', src: '/images/door.jpg' },
//     { id: 'shell', src: '/images/shell.jpg' },
//     { id: 'boot', src: '/images/boot.jpg' },
//   ];

//   const [selectedItems, setSelectedItems] = useState([]);

//   const handleSelect = (id) => {
//     // 更新选中的项目
//     if (selectedItems.includes(id)) {
//       setSelectedItems(selectedItems.filter(item => item !== id));
//     } else if (selectedItems.length < 2) {
//       setSelectedItems([...selectedItems, id]);
//     }

//     // 检查是否选中了正确的两个
//     if (selectedItems.length === 1 && (selectedItems.includes("doorknob") && id === "door" || selectedItems.includes("door") && id === "doorknob")) {
//       onNextLevel(true); // 通过本关
//     } else if (selectedItems.length === 1) {
//       onNextLevel(false); // 答错了
//     }
//   };

//   return (
//     <LevelLayout title="Level 2">
//       <div className="instruction">Based on the relationship between these two images, select two items that you think are correct.</div>
//       <div className="item-grid">
//         {items.map((item) => (
//           <div
//             key={item.id}
//             className={`item ${selectedItems.includes(item.id) ? 'selected' : ''}`}
//             onClick={() => handleSelect(item.id)}
//           >
//             <img src={item.src} alt={item.id} />
//             {selectedItems.includes(item.id) && <div className="overlay" />}
//           </div>
//         ))}
//       </div>
//     </LevelLayout>
//   );
// }

// export default Level2;




import React, { useState } from 'react';
import LevelLayout from './LevelLayout';

function Level2({ onNextLevel }) {
  const items = [
    { id: 'sailboat', src: `${process.env.PUBLIC_URL}/images/sailboat.jpg`, clickable: false },
    { id: 'paddles', src: `${process.env.PUBLIC_URL}/images/paddles.jpg`, clickable: false },
    { id: 'snail', src: `${process.env.PUBLIC_URL}/images/snail.jpg`, clickable: true },
    { id: 'car', src: `${process.env.PUBLIC_URL}/images/car.jpg`, clickable: true },
    { id: 'doorknob', src: `${process.env.PUBLIC_URL}/images/doorknob.jpg`, clickable: true },
    { id: 'door', src: `${process.env.PUBLIC_URL}/images/door.jpg`, clickable: true },
    { id: 'shell', src: `${process.env.PUBLIC_URL}/images/shell.jpg`, clickable: true },
    { id: 'boot', src: `${process.env.PUBLIC_URL}/images/boot.jpg`, clickable: true },
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (id) => {
    const item = items.find((item) => item.id === id);
    if (!item.clickable) return; 

    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else if (selectedItems.length < 2) {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleNextLevel = () => {
    onNextLevel(true); 
  };

  return (
    <LevelLayout title="Select Diagrams">
      <div style={styles.container}>
        {/* 第一行 */}
        <div style={styles.topRow}>
          {items.slice(0, 2).map((item) => (
            <div key={item.id} style={styles.topRowItem}>
              <img src={item.src} alt={item.id} style={styles.image} />
            </div>
          ))}
        </div>

        {/* 第二行*/}
        <div style={styles.instruction}>
          Based on the relationship between the two diagrams above, select the two that you think are correct.
        </div>

        {/* 第三行：可点击的图片 */}
        <div style={styles.bottomGrid}>
          {items.slice(2).map((item) => (
            <div
              key={item.id}
              style={{
                ...styles.item,
                ...(selectedItems.includes(item.id) ? styles.selected : {}),
              }}
              onClick={() => handleSelect(item.id)}
            >
              <img src={item.src} alt={item.id} style={styles.image} />
              {selectedItems.includes(item.id) && <div style={styles.overlay} />}
            </div>
          ))}
        </div>

        {/* 右下角的按钮 */}
        <button
          onClick={handleNextLevel}
          // style={styles.button}
          disabled={selectedItems.length !== 2} // 只有选中两个时按钮可用
        >
          Submit
        </button>
      </div>
    </LevelLayout>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    position: 'relative',
  },
  instruction: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#000',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '1px',
  },
  topRowItem: {
    position: 'relative',
    width: '60px', 
    height: '60px', 
    border: '2px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  bottomGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    justifyItems: 'center',
    marginBottom: '10px',
  },
  item: {
    position: 'relative',
    width: '70px',
    height: '70px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  selected: {
    borderColor: 'gray',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
  },
  button: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    padding: '8px 16px',
    fontSize: '14px',
    color: '#000',
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    opacity: '0.9',
  },
};

export default Level2;
