import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// API
import { getUser } from '../../lib/apiURL';
import { getAPI } from '../../lib/apiCall';
import { placesUrl } from '../../lib/apiURL';
// Nookies
import nookies from 'nookies';
// Axios
const axios = require('axios').default;
// Material UI
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Nav ({places, id, heroImages, jwt}) {
  // Hero Images
  const logoImage = heroImages.slice(3, 4);
  console.log(logoImage);

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
    if (jwt) {
      setUserLoggedIn(true);
    }
  }, [jwt]);

  useEffect(() => {
    if ((router.pathname === '/Admin') || (router.pathname === '/Add') || (router.pathname.includes(`/Edit`))) {
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
        <div 
        className="navigation-logo"
        style={{
          backgroundImage: `url(${logoImage[0].ImgUrl})`,
        }}
        alt={logoImage[0].ImgAlt}
        >
        </div>
        <div className={isOpen}>
          {userLoggedIn ? (
            <>
              <Link href='/'><a className={router.pathname == "/" ? "active" : ""}>Home</a></Link>
              <Link href='/Contact'><a className={router.pathname == "/Contact" ? "active" : ""}>Contact</a></Link>
              <Link href='/Admin'><a className={router.pathname == "/Admin" || router.pathname.includes('/Edit') ? "active" : ""}>Admin</a></Link>
              <Link href='/Add'><a className={router.pathname == "/Add" ? "active" : ""}>Add Places</a></Link>
              <Link href='/LoginPage'><a onClick={logout} className={router.pathname == "/LoginPage" ? "active" : "navBtn"}>Logout <LogoutIcon/></a></Link>
            </>
          ) : (
            <>
              <Link href='/'><a className={router.pathname == "/" ? "active" : ""}>Home</a></Link>
              <Link href='/Stays'><a className={router.pathname === "/Stays" || router.pathname.includes(`/StaysDetails`) || router.pathname.includes(`/StaysBooking/`) ? "active" : ""}>Places to stay</a></Link>
              <Link href='/'><a className={router.pathname == "/See" ? "active" : "" }>Places to see</a></Link>
              <Link href='/Contact'><a className={router.pathname == "/Contact" ? "active" : ""}>Contact</a></Link>
              <Link href='/LoginPage'><a className={router.pathname == "/LoginPage" ? "navBtn" : "navBtn"}>Login <AccountCircleIcon/></a></Link>
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
      const { data } = await axios.get('https://project-exam-2022.herokuapp.com/users/me', {
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