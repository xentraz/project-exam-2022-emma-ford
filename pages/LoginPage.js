import React, { useState } from 'react'
import Head from 'next/head'
import getConfig from 'next/config';
import Router from 'next/router';
import { useRouter } from 'next/router';
// Components
import Nav from '../components/Nav/Nav';
import Sidebar from '../components/Sidebar/Sidebar';
import LoginComponent from '../components/LoginComponent/LoginComponent';
import Footer from '../components/Footer/Footer';
// Axios
const axios = require('axios').default;
// API
import { placesUrl, heroImagesUrl } from '../lib/apiURL';
// Nookies
import nookies from 'nookies';

function LoginPage({heroImages}) {
  return (
    <>
     <Head>
        <title>Holidaze</title>
        NEEDED
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Nav heroImages={heroImages} />
        <Sidebar/>
      </header>
      <main className="loginMain">
        <h1>Login</h1>
        <p className="flexCardtitle">Login to see, add, edit or delete all places to stay. Manage enquiries and messages.</p>
        <LoginComponent/>
      </main>
    <Footer heroImages={heroImages} />
  </>
  )
}

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  let user = null;

  if (cookies?.jwt) {
    try {
      const { data } = await axios.get('http://localhost:1337/users/me', {
        headers: {
          Authorization:
            `Bearer ${cookies.jwt}`,
          },
      });
      user = data;
    } catch (e) {
      console.log(e);
    }
  }

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: '/Admin'
      }
    }
  }

  const res2 = await fetch(heroImagesUrl);
  const data2 = await res2.json();
  const heroImages = data2;

  return {
    props: {
      heroImages
    }
  }
}

export default LoginPage;