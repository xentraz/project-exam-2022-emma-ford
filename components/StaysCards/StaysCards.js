// React
import React, { useState } from 'react';
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
import BathtubIcon from '@mui/icons-material/Bathtub';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import WashIcon from '@mui/icons-material/Wash';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import HvacIcon from '@mui/icons-material/Hvac';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import IronIcon from '@mui/icons-material/Iron';
import ElevatorIcon from '@mui/icons-material/Elevator';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PoolIcon from '@mui/icons-material/Pool';
import KitchenIcon from '@mui/icons-material/Kitchen';
import SpaIcon from '@mui/icons-material/Spa';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import CelebrationIcon from '@mui/icons-material/Celebration';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import PetsIcon from '@mui/icons-material/Pets';
import BlockIcon from '@mui/icons-material/Block';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
// Tabs
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled'

function StaysCards(
  {
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
  RoomDetails,
  RoomDetails: 
    {
      CheckIn, 
      CheckOut,
      Parties, 
      Pets,
      Rules,
      Smoking,
    }
  }
){
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

  function sumObjectsByKey(...slicedRatings) {
    return slicedRatings.reduce((a, b) => {
      for (let k in b) {
        if (b.hasOwnProperty(k))
          a[k] = (a[k] || 0) + b[k];
      }
      return a;
    }, {});
  }
  
  const newStars = sumObjectsByKey(slicedRatings[0], slicedRatings[1]);
  const ratingAverage = (newStars.Star / 2);
  // https://stackoverflow.com/questions/42488048/how-can-i-sum-properties-from-two-objects

  // About Info 
  const slicedAbout = About.slice(0, 250);

  // Room Details
  const newCheckIn = RoomDetails.CheckIn.slice(0, 5);
  const newCheckOut = RoomDetails.CheckOut.slice(0, 5);

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
            {Name}
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
                      height: '55px',
                      borderRadius: '$border-radius'
                    }}
                    alt={ImgAlt}
                  />
              );
            })}
          </div>
          <div className="staysContainer-modal-content-info">
            <TabsUnstyled defaultValue={0}>
              <TabsList>
                <Tab className="tabTitle">Overview</Tab>
                <Tab className="tabTitle">Amenities</Tab>
                <Tab className="tabTitle">Details</Tab>
                <Tab className="tabTitle">Reviews</Tab>
              </TabsList>
              <TabPanel value={0} className="tabContent-1">
                <div className="overviewContent">
                  <p className="smallText">{slicedAbout}... <a className="link">Read more →</a></p>
                  <p className="flexCardtitle">Location</p>
                  <p className="smallText"><LocationOnIcon/> {Location}</p>
                  <p className="flexCardtitle">Size</p>
                  <p className="smallText"><SquareFootIcon/> {Size} m²</p>
                </div>
              </TabPanel>
              <TabPanel value={1}>
                <div className="amenitiesContent">
                  <p className="flexCardtitle">Amenities</p>
                  <div className="amenitiesContent-left">
                    <p>{Bathtub ? <span><BathtubIcon/> Bathtub</span> : ''}</p>
                    <p>{Breakfast ? <span><RestaurantIcon/> Breakfast</span> : ''}</p>
                    <p>{Cleaning ? <span><CleaningServicesIcon/> Cleaning</span> : ''}</p>
                    <p>{CoffeeMachine ? <span><CoffeeMakerIcon/> Coffee Machine</span> : ''}</p>
                    <p>{Dishwasher ? <span><WashIcon/> Dishwasher</span> : ''}</p>
                    <p>{Dryer ? <span><LocalLaundryServiceIcon/> Dryer</span> : ''}</p>
                    <p>{Fireplace ? <span><FireplaceIcon/> Fireplace</span> : ''}</p>
                    <p>{Gym ? <span><FitnessCenterIcon/> Gym</span> : ''}</p>
                    <p>{Heating ? <span><HvacIcon/> Heating</span> : ''}</p>
                    <p>{Iron ? <span><IronIcon/> Iron</span> : ''}</p>
                  </div>
                  <div className="amenitiesContent-right">
                    <p>{Laundry ? <span><LocalLaundryServiceIcon/> Laundry</span> : ''}</p>
                    <p>{Lift ? <span><ElevatorIcon/> Lift</span> : ''}</p>
                    <p>{Microwave ? <span><MicrowaveIcon/> Microwave</span> : ''}</p>
                    <p>{Parking ? <span><LocalParkingIcon/> Parking</span> : ''}</p>
                    <p>{Pool ? <span><PoolIcon/> Pool</span> : ''}</p>
                    <p>{Refrigerator ? <span><KitchenIcon/> Refrigerator</span> : ''}</p>
                    <p>{Spa ? <span><SpaIcon/> Spa</span> : ''}</p>
                    <p>{TV ? <span><ConnectedTvIcon/> TV</span> : ''}</p>
                    <p>{Washer ? <span><LocalLaundryServiceIcon/> Washer</span> : ''}</p>
                    <p>{Wifi ? <span><SignalWifiStatusbar4BarIcon/> Wifi</span> : ''}</p>
                   </div>
                </div>
              </TabPanel>
              <TabPanel value={2}>
                <div className="detailsContent">
                  <p className="flexCardtitle">Room Details</p>
                  <div className="detailsContent-info">
                    <p><AccessAlarmIcon/>Check In: {newCheckIn}</p>
                    <p><AlarmOffIcon/>Check Out: {newCheckOut}</p>
                    <p>{Parties ? <span><CelebrationIcon/>Parties Allowed</span> : <span><BlockIcon/> No Parties</span>}</p>
                    <p>{Pets ? <span><PetsIcon/>Pets Allowed</span> : <span><BlockIcon/> No Pets</span>}</p>
                    <p>{Smoking ? <span><SmokingRoomsIcon/>Smoking Allowed</span> : <span><SmokeFreeIcon/> No Smoking</span>}</p>
                    <p>{Rules ? <span>Rules {Rules}</span> : ''}</p>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={3}>
                <div className="reviewsContent">
                  <p className="flexCardtitle">Reviews</p>
                  {Ratings.map((elm) => {
                    return (
                      <div key={id} className="reviewsContent-info">
                        <div className="reviewsContent-info-person">
                          <p>{elm.Name}: </p>
                          <p key={id} className="star">
                            {
                              elm.Star === 1 ? <span><StarIcon/></span> 
                              : elm.Star === 2 ? <span><StarIcon/><StarIcon/></span> 
                              : elm.Star === 3 ? <span><StarIcon/><StarIcon/><StarIcon/></span> 
                              : elm.Star === 4 ? <span><StarIcon/><StarIcon/><StarIcon/><StarIcon/></span> 
                              : elm.Star === 5 ? <span><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></span>
                              : ''
                            }
                          </p>
                        </div>
                        <div className="reviewsContent-info-message">
                          <p>{elm.Message}</p>
                          <p>Date: {elm.Date}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </TabPanel>
            </TabsUnstyled>
          </div>
          <div className="staysContainer-modal-content-button">
            <a className="button" href={`/StaysDetails/${id}`}><span>{Price} kr</span> / night</a>
          </div>
        </Box>
      </ModalUnstyled>
    </>
  )
}

export default StaysCards