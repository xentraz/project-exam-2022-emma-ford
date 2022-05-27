import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
// Components
import Nav from '../components/Nav/Nav';
import Sidebar from '../components/Sidebar/Sidebar';
import PostCards from '../components/PostCards/PostCards';
import Footer from '../components/Footer/Footer';
// Axios
const axios = require('axios').default;
// API
import { placesUrl, heroImagesUrl } from '../lib/apiURL';
// Nookies
import nookies, { parseCookies, destroyCookie, setCookie } from 'nookies';
// YUP
import * as Yup from 'yup';
// Formik
import { Field, FieldArray, Form, Formik, getIn } from 'formik';

const AddPlacesSchema = Yup.object().shape({
  Name: Yup.string()
    .min(2, 'Name needs to be longer')
    .max(50, 'Name is too long')
    .required('You must have a name'),
  About: Yup.string()
    .min(20, 'Need a longer description!')
    .max(1000, 'Desciption is too long')
    .required('You must have a description'),
  Price: Yup.number()
    .min(1, 'Price needs to be higher than 1kr')
    .max(10000, 'Price is too high')
    .required('You must have a price'),
  Location: Yup.string()
    .min(2, 'Location needs to be longer')
    .max(50, 'Location is too long')
    .required('You must have a location'),
  Size: Yup.number()
    .min(1, 'Size needs to be higher than 1')
    .max(10000, 'Size is too high')
    .required('You must have a size'),
  Rooms: Yup.number()
    .min(1, 'Rooms needs to be higher than 1')
    .max(10, 'Rooms is too high')  
    .required('You must have a rooms'),
  Beds: Yup.number()
    .min(1, 'Beds needs to be higher than 1')
    .max(10000, 'Beds is too high')
    .required('You must have a beds'),
  Featured: Yup.boolean(),
  Type: Yup.object().shape({
    Hotel: Yup.boolean(),
    Hostel: Yup.boolean(),
    Cabin: Yup.boolean(),
    Apartment: Yup.boolean(),
  }),
  Amenities: Yup.object().shape({
    Refrigerator: Yup.boolean(),
    TV: Yup.boolean(),
    Dishwasher: Yup.boolean(),
    Iron: Yup.boolean(),
    Washer: Yup.boolean(),
    Bathtub: Yup.boolean(),
    Parking: Yup.boolean(),
    Fireplace: Yup.boolean(),
    Heating: Yup.boolean(),
    Wifi: Yup.boolean(),
    Dryer: Yup.boolean(),
    Gym: Yup.boolean(),
    CoffeeMachine: Yup.boolean(),
    Pool: Yup.boolean(),
    Microwave: Yup.boolean(),
    Spa: Yup.boolean(),
    Breakfast: Yup.boolean(),
    Lift: Yup.boolean(),
    Laundry: Yup.boolean(),
    Cleaning: Yup.boolean(),
  }),
  RoomDetails: Yup.object().shape({
    CheckIn: Yup.string()
      .min(5, 'CheckIn needs to be longer') 
      .max(11, 'CheckIn is too long')
      .required('You must have a CheckIn'),
    CheckOut: Yup.string()
      .min(5, 'CheckOut needs to be longer')
      .max(11, 'CheckOut is too long')
      .required('You must have a CheckOut'),
    Parties: Yup.boolean(),
    Pets: Yup.boolean(),
    Smoking: Yup.boolean(),
    Rules: Yup.string()
      .min(2, 'Rules needs to be longer')
      .max(1000, 'Rules is too long'), 
  }),
  ImgArray: Yup.array()
    .of(
      Yup.object().shape({
        ImgUrl: Yup.string()
          .min(5, 'Link must be longer')
          .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
          )
          .required('Required'),
        ImgAlt: Yup.string()
          .min(5, 'Description must be longer')
          .max(500, 'Dexcription is too long')
          .required('Required'),
      })
    )
    .required('You must have images')
    .min(5, 'Minimum of 3 Image urls'),
  Ratings: Yup.object().shape({
    Star: Yup.number()
      .min(1, 'Rating needs to be higher than 1')
      .max(5, 'Rating is too high')
      .required('You must have a rating'),
    Date: Yup.string()
      .min(5, 'Date needs to be longer')
      .max(11, 'Date is too long')
      .required('You must have a date'),
    RatingsName: Yup.string()
      .min(2, 'Name needs to be longer')
      .max(50, 'Name is too long')
      .required('You must have a name'),
    Message: Yup.string()
      .min(2, 'Message needs to be longer')
      .max(1000, 'Message is too long')
      .required('You must have a message'),
  }),
});

function Add ({heroImages, JWT, places}) {
  const Router = useRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  let initialValues = {
    Name: '',
    About: '',
    Price: '',
    Location: '',
    Size: '',
    Rooms: '',
    Beds: '',
    Featured: false,
    Type: {
      Hotel: false,
      Hostel: false,
      Cabin: false,
      Apartment: false,
    },
    Amenities: {
      Refrigerator: false,
      TV: false,
      Dishwasher: false,
      Iron: false,
      Washer: false,
      Bathtub: false,
      Parking: false,
      Fireplace: false,
      Heating: false,
      Wifi: false,
      Dryer: false,
      Gym: false,
      CoffeeMachine: false,
      Pool: false,
      Microwave: false,
      Spa: false,
      Breakfast: false,
      Lift: false,
      Laundry: false,
      Cleaning: false,
    },
    RoomDetails: {
      CheckIn: '',
      CheckOut: '',
      Parties: false,
      Pets: false,
      Smoking: false,
      Rules: '',
    },
    ImgArray: [
      {
        id: '',
        ImgAlt: '',
        ImgUrl: '',
      }
    ],
    Ratings: [
      {
        Star: '',
        Date: '',
        RatingsName: '',
        Message: '',
      }
    ],
  }

   // Add Places Form
   const [isError, setIsError] = useState(false);
   const [isSent, setIsSent] = useState(false);
 
  // Image array helper
  const ErrorMessage = ({ ImgUrl }) => (
    <Field name={ImgUrl}>
      {({ form }) => {
        const error = getIn(form.errors, ImgUrl);
        const touch = getIn(form.touched, ImgUrl);
        return touch || error ? (
          <p className="error">{error}</p>
        ) : null;
      }}
    </Field>
  );
  const ErrorMessage2 = ({ ImgAlt }) => (
    <Field name={ImgAlt}>
      {({ form }) => {
        const error = getIn(form.errors, ImgAlt);
        const touch = getIn(form.touched, ImgAlt);
        return touch || error ? (
          <p className="error">{error}</p>
        ) : null;
      }}
    </Field>
  );

  return (
    <>
     <Head>
        <title>Holidaze</title>
        NEEDED
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Nav heroImages={heroImages} />
        <Sidebar/>
      </header>
      <main>
       <h1>Add a new place to stay</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={AddPlacesSchema}
          onSubmit={(newPlace, {resetForm}) => {
            console.log(newPlace);
            async function postNewPlace() {
              let res = await axios.post(`${placesUrl}`, newPlace, {
                headers: {
                  Authorization: `Bearer ${JWT}`,
                },
              });
              alert("Congrats! You added a new place to stay!");
              Router.replace(Router.asPath);
              console.log(res);
            }
            postNewPlace();
          }}
          >
          {({ errors, touched, values }) => (
            <Form className="addPlaces">

              <div>
                <label htmlFor='Name'>Name:</label>
                <Field
                  id='Name'
                  name='Name'
                  type='text'
                  placeholder='Email'
                />
                {errors.Name && touched.Name ? (
                <p className="error">{errors.Name}</p>
                ) : <p className="filler"></p>}
              </div>

              <div>
                <label htmlFor='About'>About:</label>
                <Field
                  id='About'
                  name='About'
                  type='textarea'
                  placeholder='About'
                />
                {errors.About && touched.About ? (
                <p className="error">{errors.About}</p>
                ) : <p className="filler"></p>}
              </div>

              <div>
                <label htmlFor='Price'>Price:</label>
                <Field
                  id='Price'
                  name='Price'
                  type='text'
                  placeholder='Price'
                />
                {errors.Price && touched.Price ? (
                <p className="error">{errors.Price}</p>
                ) : <p className="filler"></p>}
              </div>

              <div>
                <label htmlFor='Location'>Location:</label>
                <Field
                  id='Location'
                  name='Location'
                  type='text'
                  placeholder='Location'
                />
                {errors.Location && touched.Location ? (
                <p className="error">{errors.Location}</p>
                ) : <p className="filler"></p>}
              </div>

              <div>
                <label htmlFor='Size'>Size:</label>
                <Field
                  id='Size'
                  name='Size'
                  type='text'
                  placeholder='Size'
                />
                {errors.Size && touched.Size ? (
                <p className="error">{errors.Size}</p>
                ) : <p className="filler"></p>}
              </div>

              <div>
                <label htmlFor='Rooms'>Rooms:</label>
                <Field
                  id='Rooms'
                  name='Rooms'
                  type='text'
                  placeholder='Rooms'
                />
                {errors.Rooms && touched.Rooms ? (
                <p className="error">{errors.Rooms}</p>
                ) : <p className="filler"></p>}
              </div>

              <div>
                <label htmlFor='Beds'>Beds:</label>
                <Field
                  id='Beds'
                  name='Beds'
                  type='text'
                  placeholder='Beds'
                />
                {errors.Beds && touched.Beds ? (
                <p className="error">{errors.Beds}</p>
                ) : <p className="filler"></p>}
              </div>

              <div>
                <label htmlFor='Featured'>Featured?</label>
                <Field
                  id='checkbox'
                  name='Featured'
                  type='checkbox'
                />
                {errors.Featured && touched.Featured ? (
                <p className="error">{errors.Featured}</p>
                ) : <p className="filler"></p>}
              </div>

              <div className="type">
                <p className="flexCardtitle">What type of stay is it?</p>
                <p className="flexCardtitle grey">Select the one that applies</p>

                <div className="type-checkbox">
                  <label htmlFor='Hotel'>Hotel</label>
                  <Field
                    id='checkbox'
                    name='Hotel'
                    type='checkbox'
                  />
                  {errors.Hotel && touched.Hotel ? (
                  <p className="error">{errors.Hotel}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="type-checkbox">
                  <label htmlFor='Hostel'>Hostel</label>
                  <Field
                    id='checkbox'
                    name='Hostel'
                    type='checkbox'
                  />
                  {errors.Hostel && touched.Hostel ? (
                  <p className="error">{errors.Hostel}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="type-checkbox">
                  <label htmlFor='Cabin'>Cabin</label>
                  <Field
                    id='checkbox'
                    name='Cabin'
                    type='checkbox'
                  />
                  {errors.Cabin && touched.Cabin ? (
                  <p className="error">{errors.Cabin}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="type-checkbox">
                  <label htmlFor='Apartment'>Apartment</label>
                  <Field
                    id='checkbox'
                    name='Apartment'
                    type='checkbox'
                  />
                  {errors.Apartment && touched.Apartment ? (
                  <p className="error">{errors.Apartment}</p>
                  ) : <p className="filler"></p>}
                </div>
              </div>

              <div className="amenities">
                <p className="flexCardtitle">What amenities does the place have?</p>
                <p className="flexCardtitle grey">Select all that apply</p>

                <div className="amenities-checkbox">
                  <label htmlFor='Refrigerator'>Refrigerator</label>
                  <Field
                    id='checkbox'
                    name='Refrigerator'
                    type='checkbox'
                  />
                  {errors.Refrigerator && touched.Refrigerator ? (
                  <p className="error">{errors.Refrigerator}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='TV'>TV</label>
                  <Field
                    id='checkbox'
                    name='TV'
                    type='checkbox'
                  />
                  {errors.TV && touched.TV ? (
                  <p className="error">{errors.TV}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Dishwasher'>Dishwasher</label>
                  <Field
                    id='checkbox'
                    name='Dishwasher'
                    type='checkbox'
                  />
                  {errors.Dishwasher && touched.Dishwasher ? (
                  <p className="error">{errors.Dishwasher}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Iron'>Iron</label>
                  <Field
                    id='checkbox'
                    name='Iron'
                    type='checkbox'
                  />
                  {errors.Iron && touched.Iron ? (
                  <p className="error">{errors.Iron}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Washer'>Washer</label>
                  <Field
                    id='checkbox'
                    name='Washer'
                    type='checkbox'
                  />
                  {errors.Washer && touched.Washer ? (
                  <p className="error">{errors.Washer}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Bathtub'>Bathtub</label>
                  <Field
                    id='checkbox'
                    name='Bathtub'
                    type='checkbox'
                  />
                  {errors.Bathtub && touched.Bathtub ? (
                  <p className="error">{errors.Bathtub}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Parking'>Parking</label>
                  <Field
                    id='checkbox'
                    name='Parking'
                    type='checkbox'
                  />
                  {errors.Parking && touched.Parking ? (
                  <p className="error">{errors.Parking}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Fireplace'>Fireplace</label>
                  <Field
                    id='checkbox'
                    name='Fireplace'
                    type='checkbox'
                  />
                  {errors.Fireplace && touched.Fireplace ? (
                  <p className="error">{errors.Fireplace}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Heating'>Heating</label>
                  <Field
                    id='checkbox'
                    name='Heating'
                    type='checkbox'
                  />
                  {errors.Heating && touched.Heating ? (
                  <p className="error">{errors.Heating}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Wifi'>Wifi</label>
                  <Field
                    id='checkbox'
                    name='Wifi'
                    type='checkbox'
                  />
                  {errors.Wifi && touched.Wifi ? (
                  <p className="error">{errors.Wifi}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Dryer'>Dryer</label>
                  <Field
                    id='checkbox'
                    name='Dryer'
                    type='checkbox'
                  />
                  {errors.Dryer && touched.Dryer ? (
                  <p className="error">{errors.Dryer}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Gym'>Gym</label>
                  <Field
                    id='checkbox'
                    name='Gym'
                    type='checkbox'
                  />
                  {errors.Gym && touched.Gym ? (
                  <p className="error">{errors.Gym}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='CoffeeMachine'>CoffeeMachine</label>
                  <Field
                    id='checkbox'
                    name='CoffeeMachine'
                    type='checkbox'
                  />
                  {errors.CoffeeMachine && touched.CoffeeMachine ? (
                  <p className="error">{errors.CoffeeMachine}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Pool'>Pool</label>
                  <Field
                    id='checkbox'
                    name='Pool'
                    type='checkbox'
                  />
                  {errors.Pool && touched.Pool ? (
                  <p className="error">{errors.Pool}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Microwave'>Microwave</label>
                  <Field
                    id='checkbox'
                    name='Microwave'
                    type='checkbox'
                  />
                  {errors.Microwave && touched.Microwave ? (
                  <p className="error">{errors.Microwave}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Spa'>Spa</label>
                  <Field
                    id='checkbox'
                    name='Spa'
                    type='checkbox'
                  />
                  {errors.Spa && touched.Spa ? (
                  <p className="error">{errors.Spa}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Spa'>Spa</label>
                  <Field
                    id='checkbox'
                    name='Spa'
                    type='checkbox'
                  />
                  {errors.Spa && touched.Spa ? (
                  <p className="error">{errors.Spa}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Breakfast'>Breakfast</label>
                  <Field
                    id='checkbox'
                    name='Breakfast'
                    type='checkbox'
                  />
                  {errors.Breakfast && touched.Breakfast ? (
                  <p className="error">{errors.Breakfast}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Lift'>Lift</label>
                  <Field
                    id='checkbox'
                    name='Lift'
                    type='checkbox'
                  />
                  {errors.Lift && touched.Lift ? (
                  <p className="error">{errors.Lift}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Laundry'>Laundry</label>
                  <Field
                    id='checkbox'
                    name='Laundry'
                    type='checkbox'
                  />
                  {errors.Laundry && touched.Laundry ? (
                  <p className="error">{errors.Laundry}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div className="amenities-checkbox">
                  <label htmlFor='Cleaning'>Cleaning</label>
                  <Field
                    id='checkbox'
                    name='Cleaning'
                    type='checkbox'
                  />
                  {errors.Cleaning && touched.Cleaning ? (
                  <p className="error">{errors.Cleaning}</p>
                  ) : <p className="filler"></p>}
                </div>
              </div>
              
              <div className="roomDetails">
                <div>
                  <label htmlFor='CheckIn'>CheckIn:</label>
                  <Field
                    id='CheckIn'
                    name='CheckIn'
                    type='time'
                  />
                  {errors.CheckIn && touched.CheckIn ? (
                  <p className="error">{errors.CheckIn}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div>
                  <label htmlFor='CheckOut'>CheckOut:</label>
                  <Field
                    id='CheckOut'
                    name='CheckOut'
                    type='time'
                  />
                  {errors.CheckOut && touched.CheckOut ? (
                  <p className="error">{errors.CheckOut}</p>
                  ) : <p className="filler"></p>}
                </div>
                  
                <div className="roomDetails-rules">
                  <p className="flexCardtitle">Please select relevant rules</p>
                  <p className="flexCardtitle grey">Select all that apply</p>
                  <div className="roomDetails-checkbox">
                    <label htmlFor='Parties'>Parties?</label>
                    <Field
                      id='checkbox'
                      name='Parties'
                      type='checkbox'
                    />
                    {errors.Parties && touched.Parties ? (
                    <p className="error">{errors.Parties}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="roomDetails-checkbox">
                    <label htmlFor='Pets'>Pets?</label>
                    <Field
                      id='checkbox'
                      name='Pets'
                      type='checkbox'
                    />
                    {errors.Pets && touched.Pets ? (
                    <p className="error">{errors.Pets}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="roomDetails-checkbox">
                    <label htmlFor='Smoking'>Smoking?</label>
                    <Field
                      id='checkbox'
                      name='Smoking'
                      type='checkbox'
                    />
                    {errors.Smoking && touched.Smoking ? (
                    <p className="error">{errors.Smoking}</p>
                    ) : <p className="filler"></p>}
                  </div>
                </div>

                <div>
                  <label htmlFor='Rules'>Rules:</label>
                  <Field
                    id='Rules'
                    name='Rules'
                    type='text'
                    placeholder='Rules'
                  />
                  {errors.Rules && touched.Rules ? (
                  <p className="error">{errors.Rules}</p>
                  ) : <p className="filler"></p>}
                </div>
              </div>

              <div className="imgArray">
                <FieldArray
                  name='ImgArray'
                  render={(arrayHelpers) => (
                    <div>
                      {values.ImgArray && values.ImgArray.length > 0 ? (
                        values.ImgArray.map((imgObj, index) => {(
                          <div key={index}>
                            <label htmlFor='ImgUrl'>ImgUrl:</label>
                            <Field
                              name={`ImgArray.[${index}].ImgUrl`}
                            />
                            <ErrorMessage
                              imgUrl={`ImgArray.[${index}].ImgUrl`}
                            />
                            <label htmlFor='ImgAlt'>ImgAlt:</label>
                            <Field
                              name={`ImgArray.[${index}].ImgAlt`}
                            />
                            <ErrorMessage2
                              imgUrl={`ImgArray.[${index}].ImgAlt`}
                            />
                            <Field
                              className='hidden'
                              name={`ImgArray.[${index}].id`}
                              value={index + 1}
                            />
                            <div>
                              <button
                                className="button"
                                type='button'
                                onClick={() => arrayHelpers.insert(index, '')}
                              >
                                + Add more
                              </button>
                              <button
                                className="button"
                                type='button'
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                - Remove
                              </button>
                            </div>
                          </div>
                        )})
                      ) : (
                        <button
                          className="button"
                          type='button'
                          onClick={() => arrayHelpers.push('')}
                        >
                          Add an Image
                        </button>
                      )}
                    </div>
                  )}
                />
                <div>
                {errors.ImgArray && touched.ImgArray ? (
                  <p className="error">{errors.ImgArray}</p>
                  ) : <p className="filler"></p>}
                </div>
              </div>

              <div className="addPlaces-response">
                {/* {isSent ? (
                  <p className="white">
                    Your message has been sent, please allow 2-4 business days for a response!
                  </p>
                ) : null}
                {isError ? (
                  <p className="white">
                    Something went wrong, please try again later.
                  </p>
                ) : null} */}
              </div>
              <div className="addPlaces-button">
                <button className='button' type='submit'>
                  Send message
                </button>
              </div>
            </Form>
            )}
          </Formik>
      </main>
    <Footer heroImages={heroImages} />
  </>
  )
}

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  let user = null;
  let places = null;
  let heroImages = null;
  const JWT = parseCookies(ctx).jwt;

  if (cookies?.jwt) {
    try {
      const { data } = await axios.get('http://localhost:1337/users/me', {
        headers: {
          Authorization:
            `Bearer ${cookies.jwt}`,
          },
      });
      const placesData = await axios.get(placesUrl);
      const heroImagesData = await axios.get(heroImagesUrl);

      user = data;
      places = placesData.data;
      heroImages = heroImagesData.data;

    } catch (e) {
      console.log(e);
    }
  }

  return {
    props: {
      user,
      places,
      JWT,
      heroImages,
    }
  }
}

export default Add;