import React, { useState } from 'react';
import LevelLayout from './LevelLayout';
import './Level4.css';
import bedroomBg from '../images/bedroom.png';
import weddingBg from '../images/wedding_background.png';

const options = {
  hair: {
    images: ['images/hair1.png', 'images/hair2.png'],
    wearImages: ['images/hair_wear1.png', 'images/hair_wear2.png'],
    comments: ['This hairstyle is sleek and perfect!', 'Bold choice! It’ll surely turn heads.']
  },
  dress: {
    images: ['images/dress1.png', 'images/dress2.png'],
    wearImages: ['images/dress_wear1.png', 'images/dress_wear2.png'],
    comments: ['You look amazing in this dress!', 'Aww, not a wise choice.']
  },
  shoes: {
    images: ['images/shoes1.png', 'images/shoes2.png'],
    wearImages: ['images/shoes_wear1.png', 'images/shoes_wear2.png'],
    comments: ['These shoes are killer! They totally complete the look!', "I don't think that's the right one."]
  }
};

function Level4({ onNextLevel }) {
  const [selectedOptions, setSelectedOptions] = useState({
    hair: null,
    dress: null,
    shoes: null
  });
  const [currentStep, setCurrentStep] = useState('hair');
  const [scene, setScene] = useState('bedroom');
  const [title, setTitle] = useState("How are you going to dress to make your ex-boyfriend regret attending his wedding?");

  const handleSelect = (type, index) => {
    const updatedOptions = {
      ...selectedOptions,
      [type]: index
    };

    setSelectedOptions(updatedOptions);
    setTitle(options[type].comments[index]);

    if (type === 'hair') {
      setCurrentStep('dress');
    } else if (type === 'dress') {
      setCurrentStep('shoes');
    } else if (type === 'shoes') {
      setTimeout(() => {
        setScene('wedding');
        checkResult(updatedOptions); 
      }, 1000);
    }
  };

  const checkResult = (options) => {
    const isCorrect = options.hair === 0 && options.dress === 0 && options.shoes === 0;

    if (isCorrect) {
      setTitle("You managed to get everyone's attention!");
    } else {
      setTitle("If you're human, you really have a terrible eye.");
    }

    // 延迟调用 onNextLevel
    setTimeout(() => {
      onNextLevel(isCorrect);
    }, 4000);
  };

  return (
    <LevelLayout title={title}>
      <div
        className="frame"
        style={{
          backgroundImage: `url(${scene === 'bedroom' ? bedroomBg : weddingBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >

        {scene === 'bedroom' && (
          <div className="options-left">
            {currentStep === 'hair' && options.hair.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Hair option ${index + 1}`}
                onClick={() => handleSelect('hair', index)}
                className={selectedOptions.hair === index ? 'selected' : ''}
              />
            ))}
            {currentStep === 'dress' && options.dress.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Dress option ${index + 1}`}
                onClick={() => handleSelect('dress', index)}
                className={selectedOptions.dress === index ? 'selected' : ''}
              />
            ))}
            {currentStep === 'shoes' && options.shoes.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Shoes option ${index + 1}`}
                onClick={() => handleSelect('shoes', index)}
                className={selectedOptions.shoes === index ? 'selected' : ''}
              />
            ))}
          </div>
        )}

        {/* 根据场景切换不同的女生样式 */}
        <div className={scene === 'wedding' ? 'wedding-character' : 'character'}>
          <img src="/images/girl_base.png" alt="Girl base" />
          {selectedOptions.hair !== null && <img src={options.hair.wearImages[selectedOptions.hair]} alt="Selected Hair" className="hair" />}
          {selectedOptions.dress !== null && <img src={options.dress.wearImages[selectedOptions.dress]} alt="Selected Dress" className="dress" />}
          {selectedOptions.shoes !== null && <img src={options.shoes.wearImages[selectedOptions.shoes]} alt="Selected Shoes" className="shoes" />}
        </div>
      </div>
    </LevelLayout>
  );
}

export default Level4;


