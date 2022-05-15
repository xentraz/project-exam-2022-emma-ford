import React, { useState } from 'react'
import Head from 'next/head'
import getConfig from 'next/config';
import Router from 'next/router';
import { useRouter } from 'next/router';
// Components
import Navigation from '../components/Navigation/Navigation';
import Sidebar from '../components/Sidebar/Sidebar';
import LoginComponent from '../components/LoginComponent/LoginComponent';
// Axios
const axios = require('axios').default;
// API
import { apiURL } from '../lib/apiURL';
// Nookies
import nookies from 'nookies';

function LoginPage() {
  return (
    <>
     <Head>
        <title>Holidaze</title>
        NEEDED
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        {/* <Navigation
        id={id}
        /> */}
        <Navigation/>
        <Sidebar/>
      </header>
      <main>
        <h1>Login</h1>
        <LoginComponent/>
      </main>

      <footer>
      </footer>
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

  return {
    props: {}
  }
}

export default LoginPage;