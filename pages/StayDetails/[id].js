import React from 'react'
import Head from 'next/head'
// Components
import Navigation from '../components/Navigation/Navigation';
import Sidebar from '../components/Sidebar/Sidebar';

export const getStaticPaths = async () => {
  const res = await fetch("http:localhost:1337/places");
  const data = await res.json();

  const paths = data.map(({ id }) => {
    return {
      params: { id: id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("http:localhost:1337/places/" + id);
  const data = await res.json();

  return {
    props: { PlacesDetails: data },
  };
};

function PlacesDetails(
  {PlacesDetails: {
    id, 
    Name, 
    Price, 
    About, 
    Location, 
    ImgArray,
    ImgArray: {ImgAlt, ImgUrl},
    Ratings,
    Ratings: {Star, Date, Message},
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
) {

  return (
    <>
      <Head>
        <title>{Name}</title>
        NEEDED
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navigation />
        <Sidebar/>
      </header>
      <main>
        <h1>{Name}</h1>
      </main>
      </>
  )
}

export default PlacesDetails;