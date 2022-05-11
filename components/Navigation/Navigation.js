import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
// API
import { getUser } from '../../lib/apiURL';
import { getPlaces } from '../../lib/apiCall';
// Nookies
import nookies from 'nookies';
// Axios
const axios = require('axios').default;

function Navigation({id}) {
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

  // Stays Details
  const isActive = router.pathname;
  console.log(isActive);

  // Check to see if user is logged in
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    if (router.pathname === '/Admin') {
      setUserLoggedIn(true);
    } 
  }, [router.pathname]);

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
              <Link href='/Stays'><a className={router.pathname === "/Stays" || router.pathname === `/StaysDetails/[${id}]` || router.pathname === `/StaysBooking/[${id}]` ? "active" : ""}>Places to stay</a></Link>
              <Link href='/See'><a className={router.pathname == "/See" ? "active" : "" }>Places to see</a></Link>
              <Link href='/Contact'><a className={router.pathname == "/Contact" ? "active" : ""}>Contact</a></Link>
              <Link href='/Admin'><a className={router.pathname == "/Admin" ? "active" : ""}>Admin</a></Link>
              <Link href='/LoginPage'><a className={router.pathname == "/LoginPage" ? "active" : ""}>Login</a></Link>
            </>
          ) : (
            <>
              <Link href='/'><a className={router.pathname == "/" ? "active" : ""}>Home</a></Link>
              <Link href='/Stays'><a className={router.pathname == "/Stays" ? "active" : ""}>Places to stay</a></Link>
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
      props: { 
        user
      }
    }
  }
}

export default Navigation;