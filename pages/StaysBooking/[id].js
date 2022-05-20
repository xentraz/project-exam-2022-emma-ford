import React, { useState, useReducer } from 'react'
import Head from 'next/head'
// Api
import { placesUrl } from '../../lib/apiURL';
import { getAPI } from '../../lib/apiCall';
// Components
import Nav from '../../components/Nav/Nav';
import Sidebar from '../../components/Sidebar/Sidebar';
// Icons Material UI
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
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
// Formik
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
// Icons Iconify
import { Icon } from '@iconify/react';


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

  return {
    props: { places: places },
  };
};

function StaysBooking(
  {places: {
    id, 
    Name, 
    Price, 
    About, 
    Location, 
    Featured,
    Rooms,
    Beds,
    Type,
    Type: {Hotel, Hostel, Cabin, Apartment},
    ImgArray,
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
  // Room Details
  const newCheckIn = RoomDetails.CheckIn.slice(0, 5);
  const newCheckOut = RoomDetails.CheckOut.slice(0, 5);

  // Formik Contact Form
  const ContactSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    dateofbirth: Yup.string()
      .min(6, 'Too Short!')
      .max(8, 'Too Long!')
      .required('Required (DD-MM-YY)'),
    phone: Yup.string()
      .min(8, 'Too Short!')
      .max(15, 'Too Long!')
      .required('Required'),
    message: Yup.string()
      .min(10, 'Too Short!')
      .max(500, 'Too Long!')
      .required('Required'),
  });

  function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }

  // Formik Payment Form
  const paymentSchema = Yup.object().shape({
    cardNumber: Yup.number()
      .min(16, 'Too Short!')
      .max(16, 'Too Long!')
      .required('Required'),
    nameOnCard: Yup.string()
      .min(5, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required'),
    expiry: Yup.number()
      .min(4, 'Too Short!')
      .max(4, 'Too Long!')
      .required('Required (MM-YY)'),
    cvc: Yup.number()
      .min(3, 'Too Short!')
      .max(3, 'Too Long!')
      .required('Required'),
    country: Yup.string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required'),
  });
 

  return (
    <>
      <Head>
        <title>{Name}</title>
        NEEDED
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header id={id}>
        {/* <Nav
        id={id}
        /> */}
        <Nav/>
        <Sidebar/>
      </header>
      <main>
        <h1><a href={`/StaysDetails/${id}`}><ArrowBackIosIcon/> Confirm & Pay</a></h1>
        <div className="bookingBoxes">
          <div className="bookingBoxes-summary">
            <h2>Your Summary</h2>
            <p className="flexCardtitle">Booking Dates</p>
            <p>NEEDED - DATES HERE</p>
            <p className="FlexCardtitle">Extras</p>
            <p>NEEDED - EXTRAS HERE (breakfast included)</p>
            <p className="FlexCardtitle">Guests</p>
            <p>NEEDED - GUESTS HERE</p>
            <p className="FlexCardtitle">Total</p>
            <p>NEEDED - TOTAL HERE</p>
          </div>
          <div className="bookingBoxes-info">
            <h2>Useful Information</h2>
            <p className="flexCardtitle">Check-in / Check-out Details</p>
            <p><AccessAlarmIcon/>Check In: {newCheckIn}</p>
            <p><AlarmOffIcon/>Check Out: {newCheckOut}</p>
            <p className="flexCardtitle">Room Details</p>
            <p>
              {Type.Hotel ? <span><HotelIcon/> Hotel</span> : ''}
              {Type.Hostel ? <span><DomainIcon/> Hostel</span> : ''}
              {Type.Apartment ? <span><ApartmentIcon/> Apartment</span> : ''}
              {Type.House ? <span><HouseIcon/> House</span> : ''}
              {Type.Cabin ? <span><CabinIcon/> Cabin</span> : ''}
            </p>
            <p><MeetingRoomIcon/> {Rooms} Bedroom(s)</p>
            <p><SquareFootIcon/> {Size} m²</p>
            <p><KingBedIcon/> {Beds} Bed(s)</p>
          </div>
        </div>
        <div className="bookingForm">
          <h2>Your Details</h2>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              dateofbirth: '',
              phone: '',
              message: '',
            }}
            validationSchema={ContactSchema}
            onSubmit={values => {
              // same shape as initial values
              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="formGroup">
                  <div className="formGroup-left">
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" placeholder="First name" className="regularInput" />
                    {errors.firstName && touched.firstName ? (
                      <p className="error">{errors.firstName}</p>
                    ) : <p className="filler"></p>}

                    <label htmlFor="lastName">Surname</label>
                    <Field name="lastName" placeholder="Surname"  className="regularInput" />
                    {errors.lastName && touched.lastName ? (
                      <p className="error">{errors.lastName}</p>
                    ) : <p className="filler"></p>}

                    <label htmlFor="dateofbirth">Date of Birth (DD-MM-YY)</label>
                    <Field name="dateofbirth" placeholder="DD-MM-YY" type="date" className="regularInput"  />
                    {errors.dateofbirth && touched.dateofbirth ? (
                      <p className="error">{errors.dateofbirth}</p>
                    ) : <p className="filler"></p>}
                  </div>
                  <div className="formGroup-right">
                    <label htmlFor="email">E-mail</label>
                    <Field name="email" placeholder="E-mail address"  className="regularInput"  validate={validateEmail} />
                    {errors.email && touched.email ? (
                      <p className="error">{errors.email}</p>
                    ) : <p className="filler"></p>}
                    
                    <label htmlFor="phone">Phone number</label>
                    <Field name="phone" placeholder="Phone number"  className="regularInput" />
                    {errors.phone && touched.phone ? (
                      <p className="error">{errors.phone}</p>
                    ) : <p className="filler"></p>} 

                    <label htmlFor="guests">Guests (amount)</label>
                    <Field as="select" name="guests">
                      <option value="1 guest">1 Guest</option>
                      <option value="2 guests">2 guests</option>
                      <option value="3 guests">3 guests</option>
                      <option value="4 guests">4 guests</option>
                      <option value="5 guests">5 guests</option>
                      <option value="6 guests">6 guests</option>
                      <option value="7 guests">7 guests</option>
                      <option value="8 guests">8 guests</option>
                      <option value="9 guests">9 guests</option>
                      <option value="10 guests">10 guests</option>
                    </Field>
                  </div>
                  <div className="formGroup-bottom">
                  <label htmlFor="message">Enquiry message</label>
                    <Field as="textarea" name="message" placeholder="Write us a message..."  className="regularInput" />
                    {errors.message && touched.message ? (
                      <p className="error">{errors.message}</p>
                    ) : <p className="filler"></p>} 
                  </div>
                </div>
                <button className="button" type="submit">Submit</button>
              </Form>
            )}
         </Formik>
        </div>
        <div className="paymentDetails">
          <h2>Payment Details</h2>
          <div className="paymentDetails-types">
            <div className="paymentDetails-types-1">
              <Icon icon="bi:credit-card-2-back-fill" />
              <p>Card</p>
            </div>
            <div className="paymentDetails-types-2">
              <Icon icon="cib:cc-paypal"/>
              <p>PayPal</p>
            </div>
            <div className="paymentDetails-types-3">
              <Icon icon="cib:cc-apple-pay"/>
              <p>Apple Pay</p>
            </div>
            <div className="paymentDetails-types-4">
              <Icon icon="simple-icons:klarna"/>
              <p>Klarna</p>
            </div>
          </div>
          <div className="paymentDetails-form">
            <h3>Card Details</h3>
            <Formik
              initialValues={{
                cardNumber: '',
                nameOnCard: '',
                expiry: '',
                cvc: '',
                country: '',
              }}
              validationSchema={paymentSchema}
              onSubmit={values => {
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="paymentGroup">
                    <div className="paymentGroup-left">

                      <label htmlFor="cardNumber">Card number</label>
                      <Field name="cardNumber" placeholder="Card number (16 digits)" className="regularInput"  />
                      {errors.cardNumber && touched.cardNumber ? (
                        <p className="error">{errors.cardNumber}</p>
                      ) : <p className="filler"></p>}

                    </div>

                    <div className="paymentGroup-bottomLeft">
                      <div className="paymentGroup-bottomLeft-1">
                        <label htmlFor="expiry">Expiry (MM-YY)</label>
                        <Field name="expiry" placeholder="MM-YY"  className="regularInput" />
                        {errors.expiry && touched.expiry ? (
                          <p className="error">{errors.expiry}</p>
                        ) : <p className="filler"></p>}
                      </div>

                      <div className="paymentGroup-bottomLeft-2">
                        <label htmlFor="cvc">CVC / CVV</label>
                        <Field name="cvc" placeholder="CVC" className="regularInput"  />
                        {errors.cvc && touched.cvc ? (
                          <p className="error">{errors.cvc}</p>
                        ) : <p className="filler"></p>}
                      </div>
                    </div>

                    <div className="paymentGroup-right">
                    <label htmlFor="nameOnCard">Name on card</label>
                      <Field name="nameOnCard" placeholder="Name on card"  className="regularInput" />
                      {errors.nameOnCard && touched.nameOnCard ? (
                        <p className="error">{errors.nameOnCard}</p>
                      ) : <p className="filler"></p>}
                      
                    </div>

                    <div className="paymentGroup-bottomRight">
                      <label htmlFor="country">Country</label>
                      <Field name="country" placeholder="Country" className="regularInput"  />
                      {errors.country && touched.country ? (
                        <p className="error">{errors.country}</p>
                      ) : <p className="filler"></p>} 

                    </div>

                    <div className="paymentGroup-invoice">
                        <p className="flexCardtitle">Invoice</p>
                        {/* NEEDED */}
                        <div className="paymentGroup-invoice-left">
                          <p>4 Nights</p>
                          <p>Breakfast a day</p>
                          <p>Booking fee</p>
                        </div>
                        <div className="paymentGroup-invoice-right">
                          <p>{Price} kr / night</p>
                          <p>100 kr / pp</p>
                          <p className="grey">Free</p>
                        </div>
                        <span></span>
                      <div className="paymentGroup-invoice-total">
                        <p className="green">Total Price:</p>
                        <p>**CALC PRICE**</p>
                      </div>
                    </div>

                  </div>
                  <button className="button" type="submit">Book & pay now</button>
                </Form>
              )}
          </Formik>
          </div>
        </div>
      </main>
    </>
  )
}

export default StaysBooking;
