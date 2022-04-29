import React, { useRef, useCallback } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper";
// Material UI
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
// Component: ThingsToDo
import ThingsToDoCards from '../ThingsToDoCards/ThingsToDoCards.js';

function ThingsToDo() {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <>
    <div className="thingsToDo">
      <div className="thingsToDo-header">
        <h2>Things to do</h2>
        <p>Lorem ipsum dolor sit amet, consectetur 
          adipiscing elit ut aliquam, purus sit 
          amet luctus venenatis, lectus magna 
          fringilla urna, porttitor rhoncus dolor 
          purus non enim
        </p>
      </div>
    </div>
    <div className="thingsToDo-slider">
      <div className="thingsToDo-slider-buttons">
        <div className="thingsToDo-slider-buttons-prev" onClick={handlePrev}>
          <ArrowCircleLeftIcon/>
        </div>
        <div className="thingsToDo-slider-buttons-next" onClick={handleNext}>
          <ArrowCircleRightIcon/>
        </div>
      </div>
      <Swiper 
        ref={sliderRef}
        slidesPerView={3}
        spaceBetween={20}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        updateOnWindowResize
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><ThingsToDoCards/></SwiperSlide>
        <SwiperSlide><ThingsToDoCards/></SwiperSlide>
        <SwiperSlide><ThingsToDoCards/></SwiperSlide>
        <SwiperSlide><ThingsToDoCards/></SwiperSlide>
        <SwiperSlide><ThingsToDoCards/></SwiperSlide>
        <SwiperSlide><ThingsToDoCards/></SwiperSlide>
        <SwiperSlide><ThingsToDoCards/></SwiperSlide>
        <SwiperSlide><ThingsToDoCards/></SwiperSlide>
        <SwiperSlide><ThingsToDoCards/></SwiperSlide>
      </Swiper>
      <button>Browse all</button>
    </div>
    </>
  );
}

export default ThingsToDo

// {images.map((image, index) => (
//   <SwiperSlide key={index}>
//     <img
//       height="200"
//       width="300"
//       alt="img"
//       className="image"
//       src={image.url}
//     />
//   </SwiperSlide>
// ))}

