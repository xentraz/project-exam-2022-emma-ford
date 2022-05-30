import React, { useState, useReducer } from 'react'
import Head from 'next/head'
// Api
import { placesUrl, heroImagesUrl } from '../../lib/apiURL';
import { getAPI } from '../../lib/apiCall';
// Components
import Nav from '../../components/Nav/Nav';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
// Modal
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Box } from '@mui/system';
// Chips
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
// Checkbox
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// Icons
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import KingBedIcon from '@mui/icons-material/KingBed';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import HotelIcon from '@mui/icons-material/Hotel';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HouseIcon from '@mui/icons-material/House';
import CabinIcon from '@mui/icons-material/Cabin';
import DomainIcon from '@mui/icons-material/Domain';
import StarIcon from '@mui/icons-material/Star';
import CelebrationIcon from '@mui/icons-material/Celebration';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import PetsIcon from '@mui/icons-material/Pets';
import BlockIcon from '@mui/icons-material/Block';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShowerIcon from '@mui/icons-material/Shower';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';
import NoMealsIcon from '@mui/icons-material/NoMeals';
import SignalWifiOffIcon from '@mui/icons-material/SignalWifiOff';
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
import EventIcon from '@mui/icons-material/Event';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export const getStaticPaths = async () => {
  const placesArray = await getAPI(placesUrl);

  const paths = placesArray.map((places) => {
    return {
      params: { id: places.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const places = await getAPI(placesUrl + '/' + id);

  const res = await fetch(heroImagesUrl);
  const data = await res.json();
  const heroImages = data;

  return {
    props: { 
      places: places,
      heroImages, 
    },
  };
};

function StaysDetail(
  {heroImages,
    jwt,
    places: {
    id, 
    Name, 
    Price, 
    About, 
    Location, 
    Rooms,
    Beds,
    ImgArray,
    Type,
    Type: {Hotel, Hostel, Cabin, Apartment},
    ImgArray: {ImgAlt, ImgUrl},
    Ratings,
    Ratings: {Star, Date, RatingsName, Message},
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
  }
) 
{
  // Bookmark
  const [clicked, setClicked] = useState();
  const toggleClickIcon = () => setClicked(!clicked)

  // Modal 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalData, setModalData] = useState(null);

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
  
  // Room Details
  const newCheckIn = RoomDetails.CheckIn.slice(0, 5);
  const newCheckOut = RoomDetails.CheckOut.slice(0, 5);

  return (
    <>
      <Head>
        <title>{Name}</title>
        <meta name="description" content="See all the details for your chosen place to stay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header id={id}>
        <Nav heroImages={heroImages} />
        <Sidebar/>
      </header>
      <main>
        <div className="details">
          <div className="details-heading">
            <h1>{Name}</h1>
            <div className="details-heading-icons">
              <div className="details-heading-icons-1">
                <ShareIcon/>
              </div>
              <div className="details-heading-icons-2" onClick={toggleClickIcon}>
                {clicked ? <BookmarkIcon /> : <BookmarkBorderIcon /> }
              </div>
            </div>
          </div>
          <div className="details-images" onClick={handleOpen}>
            {ImgArray.map((elm) => {     
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
                      alt={elm.ImgAlt}
                      onClick={()=> {
                        setModalData(elm);
                      }}
                    />
                );
              })}
          </div>
          <ModalUnstyled
            open={open}
            onClose={(_, reason) => {
              if (reason !== "backdropClick") {
                handleClose();
              }
            }}
            aria-labelledby="modal-modal-title NEEDED"
            aria-describedby="modal-modal-description NEEDED"
            disableEnforceFocus
            className="details-modal"
          >
            <Box className="details-modal-content" id="modal-modal-description NEEDED">
            <CloseIcon className="details-modal-content-close" onClick={handleClose}/>
              <div
                key={modalData?.id}
                style={{
                  backgroundImage: `url(${modalData?.ImgUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  width: '100%',
                  height: '100%',
                  borderRadius: '$border-radius'
                }}
                alt={modalData?.ImgAlt}
              />
            </Box>
          </ModalUnstyled>
          <div className="details-placeInfo">
            <h2>Details</h2>
            <div className="details-placeInfo-container">
              <div className="details-placeInfo-container-info">
                <div className="details-placeInfo-container-info-icons">
                  <p className="box">
                    {Type.Hotel ? <span><HotelIcon/> Hotel</span> : ''}
                    {Type.Hostel ? <span><DomainIcon/> Hostel</span> : ''}
                    {Type.Apartment ? <span><ApartmentIcon/> Apartment</span> : ''}
                    {Type.House ? <span><HouseIcon/> House</span> : ''}
                    {Type.Cabin ? <span><CabinIcon/> Cabin</span> : ''}
                  </p>
                  <p className="box"><MeetingRoomIcon/> {Rooms} Bedroom(s)</p>
                  <p className="box"><SquareFootIcon/> {Size} m²</p>
                  <p className="box"><KingBedIcon/> {Beds} Bed(s)</p>
                </div>
                <div className="details-placeInfo-container-info-about">
                  <p>{About}</p>
                </div>
              </div>
              <div className="details-placeInfo-container-sidebar">
                <div className="details-placeInfo-container-sidebar-rating">
                  <p><StarIcon/> {ratingAverage}</p>
                </div>
                <div className="details-placeInfo-container-sidebar-heading">
                  <p><span>{Price}</span> / Night</p>
                </div>
                <div className="details-placeInfo-container-sidebar-date">
                  <div className="details-placeInfo-container-sidebar-date-box">
                    <CalendarTodayIcon/>
                    {/* {DATE FROM INOUT HERE} */}
                    <p>June 1. - April 5. 22 (4 Nights)</p>
                  </div>
                </div>
                <div className="details-placeInfo-container-sidebar-extras">
                  <p className="bold">Add extras</p>
                  <div className="details-placeInfo-container-sidebar-extras-checkboxes">
                    <FormGroup className="details-MUIForm">
                      <FormControlLabel control={<Checkbox className="details-MUICheckbox" />} label="Breakfast a day pp." />
                      <FormControlLabel control={<Checkbox className="details-MUICheckbox" />} label="Parking a day" />
                      <FormControlLabel control={<Checkbox className="details-MUICheckbox" />} label="Spa an hour per person" />
                      <FormControlLabel control={<Checkbox className="details-MUICheckbox" />} label="Iron and ironing board" />
                      <FormControlLabel control={<Checkbox className="details-MUICheckbox" />} label="Baby crib" />
                    </FormGroup>
                    <div className="formPrices">
                      <p>300kr</p>
                      <p>120kr</p>
                      <p>300kr</p>
                      <p className="grey">Free</p>
                      <p className="grey">Free</p>
                    </div>
                  </div>
                </div>
                <div className="details-placeInfo-container-sidebar-button">
                  <a href={`/StaysBooking/${id}`} className="button">Book now</a>
                  <p className="grey fine">You will not be charged yet</p>
                </div>
              </div>
            </div>
            </div>
            <div className="details-details">
              <h2>Room Details</h2>
              <div className="details-details-icons">
                <p><AccessAlarmIcon/>Check In: {newCheckIn}</p>
                <p><AlarmOffIcon/>Check Out: {newCheckOut}</p>
                <p>{Parties ? <span><CelebrationIcon/>Parties Allowed</span> : <span><BlockIcon/> No Parties</span>}</p>
                <p>{Pets ? <span><PetsIcon/>Pets Allowed</span> : <span><BlockIcon/> No Pets</span>}</p>
                <p>{Smoking ? <span><SmokingRoomsIcon/>Smoking Allowed</span> : <span><SmokeFreeIcon/> No Smoking</span>}</p>
                <p>{Rules ? <span>Rules: {Rules}</span> : ''}</p>
              </div>
              <div className="details-details-cancellation">
                <p className="flexCardtitle">Cancellation Policy</p>
                <p>Free cancellation up to 24h before arrival.</p>
                <p>If you cancel within 24 hours of your trip: Partial refund: Get back 50% of every night but the first one. No refund of the first night or the service fee.</p>
                <p>If you cancel within an hour of your trip, you will be charged 50% of your trip.</p>
              </div>
            </div>
            <div className="details-amenities">
              <div className="details-amenities-heading">
                <h2>Amenities</h2>
              </div>
              <div className="details-amenities-icons">
                <div>{Bathtub ? <span className="iconsBox"><BathtubIcon/> Bathtub</span> : ''}</div>
                <div>{Breakfast ? <span className="iconsBox"><RestaurantIcon/> Breakfast</span> : ''}</div>
                <div>{Cleaning ? <span className="iconsBox"><CleaningServicesIcon/> Cleaning</span> : ''}</div>
                <div>{CoffeeMachine ? <span className="iconsBox"><CoffeeMakerIcon/> Coffee Machine</span> : ''}</div>
                <div>{Dishwasher ? <span className="iconsBox"><WashIcon/> Dishwasher</span> : ''}</div>
                <div>{Dryer ? <span className="iconsBox"><LocalLaundryServiceIcon/> Dryer</span> : ''}</div>
                <div>{Fireplace ? <span className="iconsBox"><FireplaceIcon/> Fireplace</span> : ''}</div>
                <div>{Gym ? <span className="iconsBox"><FitnessCenterIcon/> Gym</span> : ''}</div>
                <div>{Heating ? <span className="iconsBox"><HvacIcon/> Heating</span> : ''}</div>
                <div>{Iron ? <span className="iconsBox"><IronIcon/> Iron</span> : ''}</div>
                <div>{Laundry ? <span className="iconsBox"><LocalLaundryServiceIcon/> Laundry</span> : ''}</div>
                <div>{Lift ? <span className="iconsBox"><ElevatorIcon/> Lift</span> : ''}</div>
                <div>{Microwave ? <span className="iconsBox"><MicrowaveIcon/> Microwave</span> : ''}</div>
                <div>{Parking ? <span className="iconsBox"><LocalParkingIcon/> Parking</span> : ''}</div>
                <div>{Pool ? <span className="iconsBox"><PoolIcon/> Pool</span> : ''}</div>
                <div>{Refrigerator ? <span className="iconsBox"><KitchenIcon/> Refrigerator</span> : ''}</div>
                <div>{Spa ? <span className="iconsBox"><SpaIcon/> Spa</span> : ''}</div>
                <div>{TV ? <span className="iconsBox"><ConnectedTvIcon/> TV</span> : ''}</div>
                <div>{Washer ? <span className="iconsBox"><LocalLaundryServiceIcon/> Washer</span> : ''}</div>
                <div>{Wifi ? <span className="iconsBox"><SignalWifiStatusbar4BarIcon/> Wifi</span> : ''}</div>
              </div>
            </div>
            <div className="details-reviews">
              <h2>Reviews <span>({ratingAverage}/5)</span></h2>
              <div className="details-reviews-content">
                {Ratings.map((elm) => {
                  const newName = elm.RatingsName;
                  console.log(newName);
                  const ratingsAvatar = newName.slice(0,1);
                  console.log(ratingsAvatar);
                    return (
                    <div key={id} className="details-reviews-content-info">
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
                      <Stack direction="row" spacing={1} className="avatarChip">
                        <Chip avatar={<Avatar>{ratingsAvatar}</Avatar>} label={elm.RatingsName} />
                      </Stack>
                      <p className="reviewMessage">{elm.Message}</p>
                    </div>
                    )
                  })}
              </div>
            </div>
          </div>
      </main> 
     <Footer heroImages={heroImages} />
    </>
  )
}

export default StaysDetail;
