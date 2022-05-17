import React, { useState } from 'react'
import Head from 'next/head'
// Components
import Nav from '../components/Nav/Nav';
import Sidebar from '../components/Sidebar/Sidebar';
import StaysHero from '../components/HeroStays/StaysHero';
import Search from '../components/Search/Search';
// Axios
const axios = require('axios').default;
// API
import { placesUrl } from '../lib/apiURL';
import { getPlaces } from '../lib/apiCall';
// Query String
import { stringify } from 'query-string';

// API
export const getStaticProps = async () => {
  const res = await fetch(placesUrl);
  const data = await res.json();

  return {
    props: { places: data },
  };
};

function Stay({places}) {
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
        <title>Holidaze</title>
        NEEDED
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        {/* <Nav
        id={id}
        /> */}
        <Nav/>
        <Sidebar/>
      </header>
      <main>
        <StaysHero/>
        <Search
         places={filteredPlaces}
         searchValue={searchValue}
         onChange={(val) => setSearchValue(val)}
         prompt='Select a place to stay...'
         handleOnSearch={handleOnSearch}
        />
      </main>

      <footer>
      </footer>
  </>
  )
}

export default Stay