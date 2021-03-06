// React 
import React, { useRef, useCallback, useState, useEffect } from "react";
// Headless
import Head from 'next/head'
// Components
import Nav from '../components/Nav/Nav';
import Sidebar from '../components/Sidebar/Sidebar';
import HeroIndex from '../components/HeroIndex/HeroIndex';
import PopularCards from '../components/PopularCards/PopularCards';
import ThingsToDoCards from '../components/ThingsToDoCards/ThingsToDoCards';
import Footer from '../components/Footer/Footer';
// API 
import { placesUrl, thingsToDoUrl, heroImagesUrl } from '../lib/apiURL';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper";
// Material UI
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

// API
export const getStaticProps = async () => {
  const res = await fetch(placesUrl);
  const data = await res.json();
  const places = data;

  const res2 = await fetch(thingsToDoUrl);
  const data2 = await res2.json();
  const thingsToDo = data2;

  const res3 = await fetch(heroImagesUrl);
  const data3 = await res3.json();
  const heroImages = data3;

  return {
    props: { 
      places,
      thingsToDo,
      heroImages,
     },
  };
};

export default function Home({places, thingsToDo, heroImages, jwt}) {
  // Featured Array 
  const featuredArray = [];
  let count = 0;

  for (let i = 0; i < places.length; i++) {
    const element = places[i];

    if (element.Featured) {
      featuredArray.push(element);
      count++;
    }
  }
  console.log(featuredArray);

  // Things to do 
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  console.log(thingsToDo);

  // Check to see if slider
  const [isContect, setIsContent] = useState(false);

  useEffect(() => {
    if (thingsToDo) setIsContent(true);
  }, [thingsToDo]);

  return (
    <>
      <Head>
        <title>Holidaze</title>
        <meta name="description" content="Welcome to holidaze! We are Bergen's nr. 1 place for hotel, cabin and apartment bookings." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Nav heroImages={heroImages} />
        <Sidebar/>
      </header>
      <main>
        <HeroIndex
          heroImages={heroImages}
        />
          <div className="popularStays">
          <h2>Popular Stays</h2>
          <p className="flexCardtitle">Have a loook at our most popular stays right now!</p>
          <div className="popularStays-cards">
          {featuredArray.map((
              {
                id, 
                Name, 
                Price, 
                Ratings,
                ImgArray,
                ImgAlt, 
                ImgUrl,
              }
            ) =>  {
              return (
              <PopularCards 
                id={id}
                key={id}
                Name={Name}
                Price={Price}
                Ratings={Ratings}
                ImgArray={ImgArray}
                ImgUrl={ImgUrl}
                ImgAlt={ImgAlt}  
              />
              );
              }
            )}
          </div>
          <a className="button" href={`/Stays`}>Browse All Stays</a>
        </div>
        <div className="thingsToDo">
          <div className="thingsToDo-header">
            <h2>Things to do</h2>
            <p className="flexCardtitle">Explore the different activities and events happening in and around Bergen for your stay!</p>
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
          {isContect ? (
          <Swiper 
            ref={sliderRef}
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              700: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              1000: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1100: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1400: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            modules={[Pagination, Navigation]}
            loop={true}
            className="mySwiper"
            >
              {thingsToDo.map((
                  {
                    id, 
                    Name, 
                    Price, 
                    ImgAlt, 
                    ImgUrl,
                  }
                ) =>  {
                  return (
                  <SwiperSlide key={id}>
                  <ThingsToDoCards 
                    id={id}
                    key={id}
                    Name={Name}
                    Price={Price}
                    ImgUrl={ImgUrl}
                    ImgAlt={ImgAlt}  
                  />
                  </SwiperSlide>
                  );
                  }
                )}  
            </Swiper>
          ) : ("")}
          <button className="button">Browse all</button>
        </div>
      </main>
      <Footer heroImages={heroImages} />
    </>
  )
}
