// React
import React, { useState } from 'react';
import Image from 'next/image';
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
import NoMealsIcon from '@mui/icons-material/NoMeals';
import SignalWifiOffIcon from '@mui/icons-material/SignalWifiOff';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
// Tabs
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled'

function StaysCards({
  id, 
  Name, 
  Price, 
  About, 
  Location, 
  ImgArray,
  ImgArray: {ImgAlt, ImgUrl},
  Ratings,
  Ratings: {Star, Date, Message},
  Size, 
  Amenities: {
    Bathtub,
    Breakfast,
    Cleaning,
    CoffeeMachine,
    Dishwasher,
    Dryer,
    Fireplace,
    Gym,
    Heating,
    Iron,
    Laundry,
    Lift,
    Microwave,
    Parking,
    Pool,
    Refrigerator,
    Spa,
    TV,
    Washer,
    Wifi,
    },
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
  `;

  // Tab List
  const TabsList = styled(TabsListUnstyled)`
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
  `;


  // Image Arrays
  const slicedImgs = ImgArray.slice(0, 5);
  const slicedImgs2 = ImgArray.slice(0, 3);

  //Reviews 
  const slicedRatings = Ratings.slice(0, 2);
  const starRatings = slicedRatings.Star;
  console.log(starRatings);

  function sumObjectsByKey(...slicedRatings) {
    return slicedRatings.reduce((a, b) => {
      for (let k in b) {
        if (b.hasOwnProperty(k))
          a[k] = (a[k] || 0) + b[k];
      }
      return a;
    }, {});
  }
  
  console.log(sumObjectsByKey(slicedRatings[0], slicedRatings[1]));
  const newStars = sumObjectsByKey(slicedRatings[0], slicedRatings[1]);
  const ratingAverage = (newStars.Star / 2);
  console.log(ratingAverage);
  // https://stackoverflow.com/questions/42488048/how-can-i-sum-properties-from-two-objects

  // About
  const slicedAbout = About.slice(0, 250);

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
          {slicedImgs2.map((elm) => {     
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
                  }}
                  alt={ImgAlt}
                  // onClick={() => {
                  //   imgSelect(elm.ImgUrl);
                  // }}
                />
            );
          })}
          </div>
          <div className="staysContainer-cards-content-info">
            <p className="flexCardtitle">{Name}</p>
            <p><LocationOnIcon/>{Location}</p>
            <p><StarIcon/>{ratingAverage}</p>
            <p>{Breakfast ? <span><RestaurantIcon/>Breakfast included</span> : <span><NoMealsIcon/>Breakfast not included</span>}</p>
            <div className="staysContainer-cards-content-info-icons">
              <KingBedIcon/> <p>1</p>
              <ShowerIcon/> <p> 1</p>
              <p>{Wifi ? <span><SignalWifiStatusbar4BarIcon/> WiFi</span> : <span><SignalWifiOffIcon/> No WiFi</span>}</p>
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
                <Tab className="tabTitle">Overview</Tab>
                <Tab className="tabTitle">Facilities</Tab>
                <Tab className="tabTitle">Details</Tab>
                <Tab className="tabTitle">Reviews</Tab>
              </TabsList>
              <TabPanel value={0} className="tabContent-1">
                <div className="tabContent">
                  <p className="smallText">{slicedAbout}... <a className="link">Read more →</a></p>
                  <p className="flexCardtitle">Location</p>
                  <p className="smallText"><LocationOnIcon/> {Location}</p>
                  <p className="flexCardtitle">Size</p>
                  <p className="smallText"><SquareFootIcon/> {Size} m²</p>
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