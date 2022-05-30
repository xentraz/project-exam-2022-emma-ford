import React, { useState } from 'react'
import Head from 'next/head'
// Components
import Nav from '../components/Nav/Nav';
import Sidebar from '../components/Sidebar/Sidebar';
import ContactHero from '../components/ContactHero/ContactHero';
import Footer from '../components/Footer/Footer';
// Image
import { heroImagesUrl } from '../lib/apiURL';
// Axios
const axios = require('axios').default;

export const getStaticProps = async () => {
  const res = await fetch(heroImagesUrl);
  const data = await res.json();

  return {
    props: { heroImages: data },
  };
};

function Contact({heroImages, jwt}) {
  console.log(heroImages);
  
  return (
    <>
     <Head>
        <title>Contact Holidaze</title>
        NEEDED
        <meta name="description" content="Contact Holidaze: Have an issue? Need a question answered or just want to know more? Send us a message and we'll get back to you within 1-2 work days." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Nav heroImages={heroImages} />
        <Sidebar/>
      </header>
      <main>
        <ContactHero
        heroImages={heroImages}
        />
      </main>
      <Footer heroImages={heroImages} />
  </>
  )
}

export default Contact