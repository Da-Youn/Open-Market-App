import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

import LeftSwiper from '../../assets/icon-swiper-1.svg';
import RightSwiper from '../../assets/icon-swiper-2.svg';
import images, { ImageSource } from '../../data/CarouselData'; // data.tsx에서 images 배열과 ImageSource 타입 가져오기

const EventBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <BannerWrap className='event-banner'>
      <Slider {...settings}>
        {images.map(
          (
            image: ImageSource,
            index: number, // 타입 명시
          ) => (
            <div key={index}>
              <img src={image.default} alt='' />
            </div>
          ),
        )}
      </Slider>
    </BannerWrap>
  );
};

const PrevArrow: React.FC<{
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => {
  return (
    <PrevArrowButton onClick={onClick} type='button'>
      <img src={LeftSwiper} alt='배너 이전 버튼' />
    </PrevArrowButton>
  );
};

const NextArrow: React.FC<{
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => {
  return (
    <NextArrowButton onClick={onClick} type='button'>
      <img src={RightSwiper} alt='배너 다음 버튼' />
    </NextArrowButton>
  );
};

const PrevArrowButton = styled.button`
  left: 56px;
`;

const NextArrowButton = styled.button`
  right: 56px;
`;

const BannerWrap = styled.div`
  width: 100%;
  height: 500px;
  position: relative;

  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }

  button {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    border-radius: 50%;
    transform: translateY(-50%);
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.2);
    img {
      width: 100%;
      height: 100%;
    }
  }

  button:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }

  .slick-dots {
    position: absolute;
    bottom: 20px;

    button::before {
      color: var(--white);
      opacity: 0.6;
    }
  }
`;

export default EventBanner;
