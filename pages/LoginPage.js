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

function LoginPage({heroImages, jwt}) {
  return (
    <>
     <Head>
        <title>Holidaze</title>
        <meta name="description" content="Login to Holidaze to see admin panel; add, edit and delete hotels and more" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Nav heroImages={heroImages} />
        <Sidebar/>
      </header>
      <main className="loginMain">
        <h1>Login</h1>
        <LoginComponent heroImages={heroImages} />
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
      const { data } = await axios.get('https://project-exam-2022.herokuapp.com/users/me', {
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