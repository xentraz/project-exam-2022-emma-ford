import React, { useState} from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
// Components
import Nav from '../components/Nav/Nav';
import Sidebar from '../components/Sidebar/Sidebar';
import OverviewTable from '../components/OverviewTable/OverviewTable';
import EnquiriesTable from '../components/EnquiriesTable/EnquiriesTable';
import MessagesTable from '../components/MessagesTable/MessagesTable';
import Footer from '../components/Footer/Footer';
// API
import { placesUrl, heroImagesUrl, enquiresUrl, messagesUrl } from '../lib/apiURL';
// Nookies
import nookies, { parseCookies, destroyCookie, setCookie } from 'nookies';
// Material UI Tabs
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled'
// Material UI Icons
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
// Axios
const axios = require('axios').default;

// Logout
const Admin = ({user, places, enquiries, messages, JWT, heroImages, jwt }) => {
  console.log(enquiries);

  const {
    id, 
    Name, 
    Price, 
    About, 
    Location, 
    ImgArray,
    Ratings,
    Size, 
    Amenities
  } = places;

    
  const newPlaces = places;
  console.log(newPlaces);

  // User info
  const { email, username } = user;
  
  // Tabs
  const Tab = styled(TabUnstyled)`
  width: 100%;
  font-family: $primary-font;
  cursor: pointer;
  font-size: 22px;
  background-color: transparent;
  padding: 0 3px;
  margin: 0 2px;
  border: none;
  display: flex;
  justify-content: center;
  border-radius: 0;
  border-bottom: 2px solid transparent;
  box-shadow: none;

    &:hover {
      border-bottom: 3px solid #547E77;
    }

    &:focus {
      border-bottom: 3px solid #547E77;
    }

    &.${tabUnstyledClasses.selected} {
      background-color: transparent !important;
      border-bottom: 3px solid #547E77;
    }

    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  // Tab Panel
  const TabPanel = styled(TabPanelUnstyled)`
    width: 100%;
    font-family: $secondary-font;
  `;

  // Tab List
  const TabsList = styled(TabsListUnstyled)`
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
  `;

  // Enquiries 
  console.log(enquiries);
  console.log(messages);


  return (
    <>
     <Head>
        <title>Holidaze Admin</title>
        <meta name="description" content="Holidaze admin; Get a full overview of places to stay, messages and enquiries. Add, edit and delete what you wish." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Nav heroImages={heroImages} />
        <Sidebar/>
      </header>
      <main>
        <div className="adminHeader">
          <h1>Admin</h1>
          <div>Username: {username}</div>
          <div>Email: {email}</div>
          <button className="button logout">Logout <LogoutIcon/></button>
        </div>
        <div className="adminTabs">
          <TabsUnstyled defaultValue={0}>
            <TabsList>
              <Tab className="tabTitle">Stays Overview</Tab>
              <Tab className="tabTitle">Enquries</Tab>
              <Tab className="tabTitle">Messages</Tab>
            </TabsList>
            <TabPanel value={0} className="tabContent-1">
              <div className="tabContent-1-heading">
                <h2>See, edit, add or delete places to stay</h2>
                <a href={`/Add`} className="button"><AddIcon/> Add a new place</a>
              </div>
              <div className="overviewTable">
                <table className="overviewTable-table">
                  <thead>
                      <tr>
                        <th><p className="flexCardtitle">ID</p></th>
                        <th><p className="flexCardtitle">Name</p></th>
                        <th><p className="flexCardtitle">Image</p></th>
                        <th><p className="flexCardtitle">Price</p></th>
                        <th><p className="flexCardtitle">Location</p></th>
                        <th><p className="flexCardtitle">Amenities</p></th>
                        <th><p className="flexCardtitle">Edit</p></th>
                        <th className="flexCardtitle noRightBorder"><p>Delete</p></th>
                      </tr>
                  </thead>
                    {newPlaces.map((
                    {
                      id, 
                      Name, 
                      Price, 
                      About, 
                      Location, 
                      Ratings,
                      ImgArray,
                      Size,
                      Amenities,
                    }
                  ) =>  {
                    return (
                    <OverviewTable 
                      id={id}
                      key={id}
                      Name={Name}
                      About={About}
                      Price={Price}
                      Location={Location}
                      Ratings={Ratings}
                      ImgArray={ImgArray}
                      Size={Size}
                      Amenities={Amenities}
                      JWT={JWT}
                    />
                    );
                    }
                  )}
                </table>
              </div>
            </TabPanel>
            <TabPanel value={1}>
              <div className="tabpanel">
                <h2>Enquries</h2>
                <div className="overviewTable">
                  <table className="overviewTable-table">
                    <thead>
                        <tr>
                          <th><p className="flexCardtitle">ID</p></th>
                          <th><p className="flexCardtitle">Name</p></th>
                          <th><p className="flexCardtitle">Surname</p></th>
                          <th><p className="flexCardtitle">Message</p></th>
                          <th><p className="flexCardtitle">Guests</p></th>
                          <th><p className="flexCardtitle">Phone number</p></th>
                          <th><p className="flexCardtitle">Date of Birth</p></th>
                          <th><p className="flexCardtitle">Delete</p></th>
                          <th><p className="flexCardtitle">Complete</p></th>
                        </tr>
                    </thead>
                      {enquiries.map((
                      {
                        id, 
                        firstName, 
                        Surname, 
                        Message, 
                        Guests, 
                        Number,
                        DOB,
                      }
                    ) =>  {
                      return (
                      <EnquiriesTable 
                        id={id}
                        key={id}
                        firstName={firstName}
                        Surname={Surname}
                        Message={Message}
                        Guests={Guests}
                        Number={Number}
                        DOB={DOB}
                        JWT={JWT}
                      />
                      );
                      }
                    )}
                  </table>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={2}>
            <div className="tabpanel">
                <h2>Messages</h2>
                <div className="overviewTable">
                  <table className="overviewTable-table">
                    <thead>
                        <tr>
                          <th><p className="flexCardtitle">ID</p></th>
                          <th><p className="flexCardtitle">Email</p></th>
                          <th><p className="flexCardtitle">Subject</p></th>
                          <th><p className="flexCardtitle">Message</p></th>
                          <th><p className="flexCardtitle">Delete</p></th>
                          <th><p className="flexCardtitle">Complete</p></th>
                        </tr>
                    </thead>
                      {messages.map((
                        {
                          id,
                          Email,
                          Subject,
                          Message,
                        }
                      ) => {
                        return (
                          <MessagesTable 
                          id={id}
                          key={id}
                          Email={Email}
                          Subject={Subject}
                          Message={Message}
                          JWT={JWT}
                        />
                        );
                       }
                      )}
                  </table>
                </div>
              </div>
            </TabPanel>
          </TabsUnstyled>
        </div>
      </main>
    <Footer heroImages={heroImages} />
  </>
  )
}

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  let user = null;
  let places = null;
  let messages = null;
  let enquiries = null;
  let heroImages = null;
  const JWT = parseCookies(ctx).jwt;

  if (cookies?.jwt) {
    try {
      const { data } = await axios.get('https://project-exam-2022.herokuapp.com/users/me', {
        headers: {
          Authorization:
            `Bearer ${cookies.jwt}`,
          },
      });
      const placesData = await axios.get(placesUrl);
      const heroImagesData = await axios.get(heroImagesUrl);
      const messagesData = await axios.get(messagesUrl);
      const enquiriesData = await axios.get(enquiresUrl);

      user = data;
      places = placesData.data;
      messages = messagesData.data;
      enquiries = enquiriesData.data;
      heroImages = heroImagesData.data;

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
      enquiries,
      JWT,
      heroImages,
      messages,
    }
  }
}

export default Admin;