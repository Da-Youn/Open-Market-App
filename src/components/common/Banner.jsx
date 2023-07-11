import React, { useState } from 'react';
import styled from 'styled-components';
import LeftSwiper from '../../assets/icon-swiper-1.svg';
import RightSwiper from '../../assets/icon-swiper-2.svg';
import Banner2 from '../../assets/banner_2.jpg';
import Banner3 from '../../assets/banner_3.jpg';
import Banner1 from '../../assets/banner_1.jpg';

const EventBanner = () => {
  const images = [Banner1, Banner2, Banner3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleClickNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <BannerWrap className='event-banner'>
      <img src={images[currentIndex]} alt='Event Banner' />
      <button onClick={handleClickPrev}>
        <img src={LeftSwiper} alt='배너 다음 버튼' />
      </button>
      <button onClick={handleClickNext}>
        <img src={RightSwiper} alt='배너 다음 버튼' />
      </button>
      <IndexWrap className='navigation'>
        {images.map((_, index) => (
          <div
            key={index}
            className={`circle ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </IndexWrap>
    </BannerWrap>
  );
};

const BannerWrap = styled.div`
  width: 100%;
  height: 500px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    border-radius: 50%;
  }

  img + button {
    transform: scaleX(-1);
    left: 56px;
    transform: translateY(-50%);
  }
  button + button {
    right: 56px;
    transform: translateY(-50%);
  }

  button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const IndexWrap = styled.div`
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  & .circle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fff;
  }
  & .active {
    background-color: black;
  }
`;

export default EventBanner;
