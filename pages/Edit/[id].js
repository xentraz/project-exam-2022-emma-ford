import React, { useState, useReducer } from 'react'
import Head from 'next/head'
// Api
import { placesUrl, heroImagesUrl } from '../../lib/apiURL';
import { getAPI } from '../../lib/apiCall';
// Components
import Nav from '../../components/Nav/Nav';
import Sidebar from '../../components/Sidebar/Sidebar';
// Icons Material UI


export const getStaticPaths = async () => {
  const placesArray = await getAPI(placesUrl);

  const paths = placesArray.map((places) => {
    return {
      params: { id: places.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const places = await getAPI(placesUrl + '/' + id);

  const res = await fetch(heroImagesUrl);
  const data = await res.json();
  const heroImages = data;

  return {
    props: { 
      places: places,
      heroImages, 
    },
  };
};

function Edit(
  {heroImages,
    places: {
    id, 
    Name, 
    Price, 
    About, 
    Location, 
    Rooms,
    Beds,
    ImgArray,
    Type,
    Type: {Hotel, Hostel, Cabin, Apartment},
    ImgArray: {ImgAlt, ImgUrl},
    Ratings,
    Ratings: {Star, Date, RatingsName, Message},
    Size, 
    Amenities: {
      Bathtub,
      Breakfast,
      Cleaning,
      CoffeeMachine,
      Dishwasher,
      Dryer,
      Fireplace,
      Gym,
      Heating,
      Iron,
      Laundry,
      Lift,
      Microwave,
      Parking,
      Pool,
      Refrigerator,
      Spa,
      TV,
      Washer,
      Wifi,
      },
    RoomDetails,
    RoomDetails: 
      {
        CheckIn, 
        CheckOut,
        Parties, 
        Pets,
        Rules,
        Smoking,
      }
    }
  }
) 
{
  const [values, setValues] = useState({
    id: '',
    Name: '',
    Price: '',
    About: '',
    Location: '',
    Rooms: '',
    Beds: '',
    ImgArray: '',
    ImgAlt: '',
    ImgUrl: '',
    Type: '',
    Hotel: '',
    Hostel: '',
    Cabin: '',
    Apartment: '',
    Star: '',
    Date: '',
    RatingsName: '',
    Message: '',
    Size: '',
    Bathtub: '',
    Breakfast: '',
    Cleaning: '',
    CoffeeMachine: '',
    Dishwasher: '',
    Dryer: '',
    Fireplace: '',
    Gym: '',
    Heating: '',
    Iron: '',
    Laundry: '',
    Lift: '',
    Microwave: '',
    Parking: '',
    Pool: '',
    Refrigerator: '',
    Spa: '',
    TV: '',
    Washer: '',
    Wifi: '',
    CheckIn: '',
    CheckOut: '',
    Parties: '',
    Pets: '',
    Rules: '',
    Smoking: '',
  });


  return (
    <>
      <Head>
        <title>Edit {Name}</title>
        NEEDED
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header id={id}>
        {/* <Nav
        id={id}
        /> */}
        <Nav
        heroImages={heroImages}
        />
        <Sidebar/>
      </header>
      <main>
        <h1>Edit {Name}</h1>
      </main>
    </>
  )
}

export default Edit;
