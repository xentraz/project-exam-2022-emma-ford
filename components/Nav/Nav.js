import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
// API
import { getUser } from '../../lib/apiURL';
import { getAPI } from '../../lib/apiCall';
import { placesUrl } from '../../lib/apiURL';
// Nookies
import nookies from 'nookies';
// Axios
const axios = require('axios').default;

function Nav ({places, id}) {
  // Responsive Navigation
  const router = useRouter();
  const [isOpen, setIsOpen] = useState('navigation-links');
  const [toggleIcon, setToggleIcon] = useState('navigation-toggler'); 

  const navToggle = () => {
    isOpen === 'navigation-links' 
    ? setIsOpen('navigation-links navigation-isOpen') 
    : setIsOpen('navigation-links');

    toggleIcon === 'navigation-toggler' 
    ? setToggleIcon('navigation-toggler toggle')
    : setToggleIcon('navigation-toggler');
  }

  // Check to see if user is logged in
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // const {id} = places;
  console.log(places);

  useEffect(() => {
    if ((router.pathname === '/Admin') || (router.pathname === '/Add') || (router.pathname === `/Edit/${id}`)) {
      setUserLoggedIn(true);
    }
  }, [router.pathname, id]);

   // Log Out
   const logout = async () => {
     try {
       await axios.get('/api/logout');
       router.push('/LoginPage');
     } catch (e) {
       console.log(e);
     }
   }

  return  (
    <>
      <div className="navigation">
        <div className="navigation-logo">
          <Image 
          src="/img/logo.png"
          alt="NEEDED"
          height="100"
          width="100" 
          />
        </div>
        <div className={isOpen}>
          {userLoggedIn ? (
            <>
              <Link href='/'><a className={router.pathname == "/" ? "active" : ""}>Home</a></Link>
              <Link href='/Contact'><a className={router.pathname == "/Contact" ? "active" : ""}>Contact</a></Link>
              <Link href='/Admin'><a className={router.pathname == "/Admin" ? "active" : ""}>Admin</a></Link>
              <Link href='/Add'><a className={router.pathname == "/Add" ? "active" : ""}>Add Places</a></Link>
              <Link href='/LoginPage'><a onClick={logout} className={router.pathname == "/LoginPage" ? "active" : ""}>Logout</a></Link>
            </>
          ) : (
            <>
              <Link href='/'><a className={router.pathname == "/" ? "active" : ""}>Home</a></Link>
              <Link href='/Stays'><a className={router.pathname === "/Stays" || router.pathname === `/StaysDetails/[${id}]` || router.pathname === `/StaysBooking/[${id}]` ? "active" : ""}>Places to stay</a></Link>
              <Link href='/See'><a className={router.pathname == "/See" ? "active" : "" }>Places to see</a></Link>
              <Link href='/Contact'><a className={router.pathname == "/Contact" ? "active" : ""}>Contact</a></Link>
              <Link href='/LoginPage'><a className={router.pathname == "/LoginPage" ? "active" : ""}>Login</a></Link>
            </>
          )}
        </div>
        <div onClick={navToggle} className={toggleIcon}>
          <div className="line_1"></div>
          <div className="line_2"></div>
          <div className="line_3"></div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  let user = null;
  let places = null;

  if (cookies?.jwt) {
    try {
      const { data } = await axios.get('http://localhost:1337/users/me', {
        headers: {
          Authorization:
            `Bearer ${cookies.jwt}`,
          },
      });
      const placesData = await axios.get(placesUrl);

      user = data;
      places = placesData.data;

    } catch (e) {
      console.log(e);
    }
  }

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  return {
    props: {
      user,
      places,
    }
  }
}

export default Nav;