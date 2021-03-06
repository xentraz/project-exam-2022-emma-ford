import React, { useState } from 'react'
import Head from 'next/head'
// Components
import Nav from '../components/Nav/Nav';
import Sidebar from '../components/Sidebar/Sidebar';
import StaysHero from '../components/HeroStays/StaysHero';
import Search from '../components/Search/Search';
import Footer from '../components/Footer/Footer';
// Axios
const axios = require('axios').default;
// API
import { placesUrl, heroImagesUrl } from '../lib/apiURL';
// Query String
import { stringify } from 'query-string';

// API
export const getStaticProps = async () => {
  const res = await fetch(placesUrl);
  const data = await res.json();

  const res2 = await fetch(heroImagesUrl);
  const data2 = await res2.json();

  return {
    props: { 
      places: data,
      heroImages: data2, 
    },
  };
};

function Stay({places, heroImages, jwt}) {
  // Search 
  const [searchValue, setSearchValue] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState(places);

  function handleOnSearch(elm) {
    console.log('clicked', elm);

    let queryString = stringify(elm);

    console.log(queryString);

    getSortedPlaces(queryString);
  }

  async function getSortedPlaces(params) {
    const resultPlaces = await fetch(placesUrl + '?' + params);
    setFilteredPlaces(resultPlaces);
  }

  return (
    <>
     <Head>
        <title>Holidaze: See all out stays</title>
        <meta name="description" content="Holidaze: Browse all out different kinds of stays in Bergen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Nav heroImages={heroImages} />
        <Sidebar/>
      </header>
      <main>
        <StaysHero
        heroImages={heroImages}
        />
        <Search
         places={filteredPlaces}
         searchValue={searchValue}
         onChange={(val) => setSearchValue(val)}
         prompt='Select a place to stay...'
         handleOnSearch={handleOnSearch}
        />
      </main>
    <Footer heroImages={heroImages} />
  </>
  )
}

export default Stay