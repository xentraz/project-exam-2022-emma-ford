import React, { useState, useReducer } from 'react'
import Head from 'next/head'
// Api
import { apiURL } from '../../lib/apiURL';
import { getPlaces } from '../../lib/apiCall';
// Components
import Navigation from '../../components/Navigation/Navigation';
import Sidebar from '../../components/Sidebar/Sidebar';
// Modal
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Box } from '@mui/system';
// Date Range Picker
// import { DateRange } from 'react-date-range';
// import { Calendar } from 'react-date-range';
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

export const getStaticPaths = async () => {
  const placesArray = await getPlaces(apiURL);

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
  const places = await getPlaces(apiURL + '/' + id);

  return {
    props: { places: places },
  };
};

function StaysDetail(
  {places: {
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

  // Icons 
  const hotelIcon = <HotelIcon/>;

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

  // Date Range Picker
  // const newDate = new window.Date();

  // const [state, setState] = useState([
  //   {
  //     startDate: newDate,
  //     endDate: null,
  //     key: 'selection'
  //   }
  // ]);
  // https://hypeserver.github.io/react-date-range/#daterange

  // Room Details
  const newCheckIn = RoomDetails.CheckIn.slice(0, 5);
  const newCheckOut = RoomDetails.CheckOut.slice(0, 5);

  return (
    <>
      <Head>
        <title>{Name}</title>
        NEEDED
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header id={id}>
        <Navigation id={id} />
        <Sidebar/>
      </header>
      <main>
        <div className="staysDetails">
          <div className="staysDetails-heading">
            <h1>{Name}</h1>
            <div className="staysDetails-heading-icons">
              <div className="staysDetails-heading-icons-1">
                <ShareIcon/>
              </div>
              <div className="staysDetails-heading-icons-2" onClick={toggleClickIcon}>
                {clicked ? <BookmarkIcon /> : <BookmarkBorderIcon /> }
              </div>
            </div>
          </div>
          <div className="staysDetails-images" onClick={handleOpen}>
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
            onClose={handleClose}
            aria-labelledby="modal-modal-title NEEDED"
            aria-describedby="modal-modal-description NEEDED"
            disableEnforceFocus
            className="staysDetails-modal"
          >
            <Box className="staysDetails-modal-content" id="modal-modal-description NEEDED">
            <CloseIcon className="staysDetails-modal-content-close" onClick={handleClose}/>
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
          <div className="staysDetails-details">
            <h2>Details</h2>
            <div className="staysDetails-details-container">
              <div className="staysDetails-details-container-info">
                <div className="staysDetails-details-container-info-icons">
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
                <div className="staysDetails-details-container-info-about">
                  <p>{About}</p>
                </div>
                <div className="staysDetails-details-container-info-details">
                  <h2>Room Details</h2>
                  <div className="staysDetails-details-container-info-details-icons">
                    <p><AccessAlarmIcon/>Check In: {newCheckIn}</p>
                    <p><AlarmOffIcon/>Check Out: {newCheckOut}</p>
                    <p>{Parties ? <span><CelebrationIcon/>Parties Allowed</span> : <span><BlockIcon/> No Parties</span>}</p>
                    <p>{Pets ? <span><PetsIcon/>Pets Allowed</span> : <span><BlockIcon/> No Pets</span>}</p>
                    <p>{Smoking ? <span><SmokingRoomsIcon/>Smoking Allowed</span> : <span><SmokeFreeIcon/> No Smoking</span>}</p>
                    <p>{Rules ? <span>Rules: {Rules}</span> : ''}</p>
                  </div>
                  <div className="staysDetails-details-container-info-details-cancellation">
                    <p className="flexCardtitle">Cancellation Policy</p>
                    <p>Free cancellation up to 24h before arrival.</p>
                    <p>If you cancel within 24 hours of your trip: Partial refund: Get back 50% of every night but the first one. No refund of the first night or the service fee.</p>
                    <p>If you cancel within an hour of your trip, you will be charged 50% of your trip.</p>
                  </div>
                </div>
              </div>
              <div className="staysDetails-details-container-sidebar">
                <div className="staysDetails-details-container-sidebar-rating">
                  <p><StarIcon/> {ratingAverage}</p>
                </div>
                <div className="staysDetails-details-container-sidebar-heading">
                  <p><span>{Price}</span> / Night</p>
                </div>
                <div className="staysDetails-details-container-sidebar-date">
                  <p>A date thing that works here</p>
                </div>
              </div>
            </div>
            <div className="staysDetails-details-amenities">
              <div className="staysDetails-details-amenities-heading">
                <h2>Amenities</h2>
              </div>
              <div className="staysDetails-details-amenities-icons">
                <p>{Bathtub ? <span className="iconsBox"><BathtubIcon/> Bathtub</span> : ''}</p>
                <p>{Breakfast ? <span className="iconsBox"><RestaurantIcon/> Breakfast</span> : ''}</p>
                <p>{Cleaning ? <span className="iconsBox"><CleaningServicesIcon/> Cleaning</span> : ''}</p>
                <p>{CoffeeMachine ? <span className="iconsBox"><CoffeeMakerIcon/> Coffee Machine</span> : ''}</p>
                <p>{Dishwasher ? <span className="iconsBox"><WashIcon/> Dishwasher</span> : ''}</p>
                <p>{Dryer ? <span className="iconsBox"><LocalLaundryServiceIcon/> Dryer</span> : ''}</p>
                <p>{Fireplace ? <span className="iconsBox"><FireplaceIcon/> Fireplace</span> : ''}</p>
                <p>{Gym ? <span className="iconsBox"><FitnessCenterIcon/> Gym</span> : ''}</p>
                <p>{Heating ? <span className="iconsBox"><HvacIcon/> Heating</span> : ''}</p>
                <p>{Iron ? <span className="iconsBox"><IronIcon/> Iron</span> : ''}</p>
                <p>{Laundry ? <span className="iconsBox"><LocalLaundryServiceIcon/> Laundry</span> : ''}</p>
                <p>{Lift ? <span className="iconsBox"><ElevatorIcon/> Lift</span> : ''}</p>
                <p>{Microwave ? <span className="iconsBox"><MicrowaveIcon/> Microwave</span> : ''}</p>
                <p>{Parking ? <span className="iconsBox"><LocalParkingIcon/> Parking</span> : ''}</p>
                <p>{Pool ? <span className="iconsBox"><PoolIcon/> Pool</span> : ''}</p>
                <p>{Refrigerator ? <span className="iconsBox"><KitchenIcon/> Refrigerator</span> : ''}</p>
                <p>{Spa ? <span className="iconsBox"><SpaIcon/> Spa</span> : ''}</p>
                <p>{TV ? <span className="iconsBox"><ConnectedTvIcon/> TV</span> : ''}</p>
                <p>{Washer ? <span className="iconsBox"><LocalLaundryServiceIcon/> Washer</span> : ''}</p>
                <p>{Wifi ? <span className="iconsBox"><SignalWifiStatusbar4BarIcon/> Wifi</span> : ''}</p>
              </div>
            </div>
            <div className="staysDetails-details-reviews">
              <h2>Reviews</h2>
            </div>
          </div>
        </div>
      </main> 
    </>
  )
}

export default StaysDetail;
