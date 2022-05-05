// React
import React, { useState } from 'react';
import Image from 'next/image';
// Material UI
// Modal
import Box from '@mui/material/Box';
import ModalUnstyled from '@mui/material/Modal';
// Material UI Icons
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import KingBedIcon from '@mui/icons-material/KingBed';
import ShowerIcon from '@mui/icons-material/Shower';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';
// Tabs
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled'
// API
import { apiURL } from '../../lib/apiURL';
import { apiCall } from '../../lib/apiCall';
import { getPlaces } from '../../lib/apiCall';

function StaysCards({
  id, 
  Name, 
  Price, 
  About, 
  Location, 
  ImgArray,
  ImgArray: {ImgAlt, ImgUrl},
  Size
}){
  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  // Bookmark
  const [clicked, setClicked] = useState();
  const toggleClickIcon = () => setClicked(!clicked)
  
  // Tabs
  const Tab = styled(TabUnstyled)`
  width: 100%;
  font-family: $primary-font;
  color: white;
  cursor: pointer;
  font-size: 14px;
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
      border-bottom: 2px solid #547E77;
    }

    &:focus {
      border-bottom: 2px solid #547E77;
    }

    &.${tabUnstyledClasses.selected} {
      background-color: transparent;
      color: $white;
      border-bottom: 2px solid #547E77;
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
    margin-bottom: 25px;
  `;

  // Tab List
  const TabsList = styled(TabsListUnstyled)`
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
  `;


// Image Array
  const slicedImgs = ImgArray.slice(0, 5);

  return (
    <>
      <div className="staysContainer-cards">
        <div className="staysContainer-cards-price">
          <p><span>{Price} kr </span>/ night</p>
        </div>
        <div className="staysContainer-cards-bookmark" onClick={toggleClickIcon}>
          {clicked ? <BookmarkIcon /> : <BookmarkBorderIcon /> }
        </div>
        <div className="staysContainer-cards-content" onClick={handleOpen}>
          <div className="staysContainer-cards-content-imgs">
            <div className="staysContainer-cards-content-imgs-1"></div>
            <div className="staysContainer-cards-content-imgs-2"></div>
            <div className="staysContainer-cards-content-imgs-3">
              <div className="staysContainer-cards-content-imgs-3-blur">
                <p>+5</p>
              </div>
            </div>
          </div>
          <div className="staysContainer-cards-content-info">
            <p className="flexCardtitle">{Name}</p>
            <p><LocationOnIcon/>{Location}</p>
            <p><StarIcon/><span> 4.5</span>(12 reviews)</p>
            <p><RestaurantIcon/> Breakfast Included</p>
            <div className="staysContainer-cards-content-info-icons">
              <KingBedIcon/> <p>1</p>
              <ShowerIcon/> <p> 1</p>
              <SignalWifiStatusbar4BarIcon/> <p> Free WiFi</p>
            </div>
          </div>
        </div>
      </div>
      <ModalUnstyled
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title NEEDED"
      aria-describedby="modal-modal-description NEEDED"
      disableEnforceFocus
      className="staysContainer-modal"
      >
        <Box className="staysContainer-modal-content" id="modal-modal-description NEEDED">
          <p className="flexCardtitle large staysContainer-modal-content-header" id="modal-modal-title NEEDED">
            Hotel Name
          </p>
          <div className="staysContainer-modal-content-images">
          {slicedImgs.map((elm) => {     
            console.log(slicedImgs)
            return (
              <div
                  key={elm.id}
                  style={{
                    backgroundImage: `url(${elm.ImgUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                    borderRadius: '$border-radius'
                  }}
                  alt={ImgAlt}
                  // onClick={() => {
                  //   imgSelect(elm.ImgUrl);
                  // }}
                />
            );
          })}
          </div>
          <div className="staysContainer-modal-content-info">
            <TabsUnstyled defaultValue={0}>
              <TabsList>
                <Tab>Overview</Tab>
                <Tab>Facilities</Tab>
                <Tab>Details</Tab>
                <Tab>Reviews</Tab>
              </TabsList>
              <TabPanel value={0} className="tabContent-1">
                <div className="tabContent">
                  <p className="smallText">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum morbi at mauris vitae in. Bibendum commodo cursus libero, maecenas. At et vel ornare posuere. Tellus habitasse habitasse donec ornare enim bibendum mauris pretium. <a className="link">Read more...</a>
                  </p>
                  <p className="flexCardtitle">Location</p>
                  <p><LocationOnIcon/> Location, Bergen</p>
                </div>
              </TabPanel>
              <TabPanel value={1}>Second page</TabPanel>
              <TabPanel value={2}>Third page</TabPanel>
              <TabPanel value={3}>Fourth page</TabPanel>
            </TabsUnstyled>
          </div>
          <div className="staysContainer-modal-content-button">
            <a className="button"><span>250 kr</span> / night</a>
          </div>
        </Box>
      </ModalUnstyled>
    </>
  )
}

export default StaysCards