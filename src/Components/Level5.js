import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LevelLayout from './LevelLayout';

// 定义拖放的类型
const ItemType = {
  ITEM: 'item',
};

// Item 组件：可拖拽的物品
function Item({ item, isDropped }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.ITEM,
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging || isDropped ? 0.5 : 1,
        padding: '3px',
        margin: '2px',
        cursor: 'move',
        fontSize: '1.5em',
        width: '45%',
      }}
    >
      <span>{item.src}</span>
    </div>
  );
}

// Category 组件：放置的目标区域
function Category({ category, onDrop, droppedItems }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.ITEM,
    drop: (item) => onDrop(item, category),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: 'rgba(255, 255, 255)', 
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        padding: '5px',
        minHeight: '60px',
        margin: '5px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '18px',
        border: isOver ? '2px solid lightgreen' : '2px solid lightgray',
      }}
    >
      <h3 style={{ fontSize: '0.9em', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        {category}
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {droppedItems.map((item) => (
          <span key={item.id} style={{ margin: '3px', fontSize: '1.2em' }}>
            {item.src}
          </span>
        ))}
      </div>
    </div>
  );
}

function Level5({ onNextLevel }) {
  const items = [
    { id: 10, src: '🪑' },
    { id: 2, src: '🍌' },
    { id: 4, src: '🍶' },
    { id: 5, src: '🔨' },
    { id: 9, src: '🖼️' },
    { id: 3, src: '🍞' },
    { id: 6, src: '🔧' },
    { id: 7, src: '🪛' },
    { id: 1, src: '🍎' },
    { id: 8, src: '🛋️' },
   
  ];

  const correctAnswers = {
    'Kitchen Items': ['🍎', '🍌', '🍞', '🍶'],
    Toolbox: ['🔨', '🔧', '🪛'],
    'Living Room Items': ['🛋️', '🖼️', '🪑'],
  };

  const [droppedItems, setDroppedItems] = useState({
    'Kitchen Items': [],
    Toolbox: [],
    'Living Room Items': [],
  });

  const handleDrop = (item, category) => {
    if (!droppedItems[category].some(droppedItem => droppedItem.id === item.id)) {
      setDroppedItems((prevDroppedItems) => ({
        ...prevDroppedItems,
        [category]: [...prevDroppedItems[category], item],
      }));
    }
  };

  const checkAnswers = () => {
    for (const category in correctAnswers) {
      const droppedInCategory = droppedItems[category].map(item => item.src);
      const correctInCategory = correctAnswers[category];

      if (droppedInCategory.length !== correctInCategory.length) return false;

      for (const emoji of correctInCategory) {
        if (!droppedInCategory.includes(emoji)) {
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = () => {
    const isCorrect = checkAnswers();
    onNextLevel(isCorrect);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <LevelLayout title="Drag and Drop Items into Categories">
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '10px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* 左侧的 emoji 列表 */}
            <div style={{ width: '45%', display: 'flex', flexWrap: 'wrap', padding: '5px' }}>
              {items.map((item) => (
                <Item key={item.id} item={item} isDropped={droppedItems['Kitchen Items'].concat(droppedItems['Toolbox'], droppedItems['Living Room Items']).some(droppedItem => droppedItem.id === item.id)} />
              ))}
            </div>

            {/* 右侧的分类框 */}
            <div style={{ width: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '5px' }}>
              {Object.keys(droppedItems).map((category) => (
                <Category key={category} category={category} onDrop={handleDrop} droppedItems={droppedItems[category]} />
              ))}
            </div>
          </div>

          {/* 底部的 Submit 按钮 */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <button onClick={handleSubmit} >Submit</button>
          </div>
        </div>
      </LevelLayout>
    </DndProvider>
  );
}

export default Level5;
