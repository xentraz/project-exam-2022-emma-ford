import React, { useState, useReducer } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
// Api
import { placesUrl, heroImagesUrl } from '../../lib/apiURL';
import { getAPI } from '../../lib/apiCall';
// Axios
const axios = require('axios').default;
// Components
import Nav from '../../components/Nav/Nav';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
// YUP
import * as Yup from 'yup';
// Formik
import { Field, FieldArray, Form, Formik, getIn } from 'formik';
// Nookies
import nookies, { parseCookies, destroyCookie, setCookie } from 'nookies';
// Material UI
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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

const EditPlacesSchema = Yup.object().shape({
  Name: Yup.string()
    .min(2, 'Name needs to be longer')
    .max(50, 'Name is too long')
    .required('You must have a name'),
  About: Yup.string()
    .min(20, 'Need a longer description!')
    .max(50000, 'Desciption is too long')
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
    House: Yup.boolean(),
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
      .min(12, 'CheckIn needs to be longer') 
      .max(12, 'CheckIn is too long')
      .required('You must have a CheckIn'),
    CheckOut: Yup.string()
      .min(12, 'CheckOut needs to be longer')
      .max(12, 'CheckOut is too long')
      .required('You must have a CheckOut'),
    Parties: Yup.boolean(),
    Pets: Yup.boolean(),
    Smoking: Yup.boolean(),
    Rules: Yup.string()
      .min(2, 'Rules needs to be longer')
      .max(1000, 'Rules is too long'), 
  }),
  ImgUrl: Yup.string()
    .min(25, 'Link must be longer')
    .required('Required'),
  ImgAlt: Yup.string()
    .min(5, 'Description must be longer')
    .max(10000, 'Description is too long')
    .required('Required'),
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
});

function Edit(
  {
    jwt,
    heroImages,
    places: {
    Name, 
    Price, 
    About, 
    Location, 
    Rooms,
    Beds,
    Featured,
    ImgArray,
    Type,
    Type: {Hotel, Hostel, Cabin, Apartment, House},
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

  const router = useRouter();
  const { id } = router.query;

  const jwt2 = parseCookies().jwt;
  console.log(jwt);
  console.log(jwt2);

  let initialValues = {
    Name: Name,
    About: About,
    Price: Price,
    Location: Location,
    Size: Size,
    Rooms: Rooms,
    Beds: Beds,
    Featured: Featured,
    Type: {
      Hotel: Hotel,
      Hostel: Hostel,
      Cabin: Cabin,
      Apartment: Apartment,
      House: House,
    },
    Amenities: {
      Refrigerator: Refrigerator,
      TV: TV,
      Dishwasher: Dishwasher,
      Iron: Iron,
      Washer: Washer,
      Bathtub: Bathtub,
      Parking: Parking,
      Fireplace: Fireplace,
      Heating: Heating,
      Wifi:  Wifi,
      Dryer: Dryer,
      Gym: Gym,
      CoffeeMachine: CoffeeMachine,
      Pool: Pool,
      Microwave: Microwave,
      Spa: Spa,
      Breakfast: Breakfast,
      Lift: Lift,
      Laundry: Laundry,
      Cleaning: Cleaning,
    },
    RoomDetails: {
      CheckIn: CheckIn,
      CheckOut: CheckOut,
      Parties: Parties,
      Pets: Pets,
      Smoking: Smoking,
      Rules: Rules,
    },
    ImgArray: ImgArray,
    Ratings: Ratings,
  }

  // Add Places Form
  const [isError, setIsError] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const Router = useRouter();

  // Image array helper
  const ErrorMessage = ({ ImgUrl }) => (
    <Field name={ImgUrl}>
      {({ form }) => {
        const error = getIn(form.errors, ImgUrl);
        const touch = getIn(form.touched, ImgUrl);
        return touch || error ? (
          <div>{error}</div>
        ) : null; 
      }}
    </Field>
  );

  return (
    <>
      <Head>
        <title>Edit {Name}</title>
        <meta name="description" content={`Edit ${Name} here in order to update it everywhere.`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header id={id}>
        <Nav
        heroImages={heroImages}
        />
        <Sidebar/>
      </header>
      <main>
        <h1 className="editH1"><a href={`/Admin`}><ArrowBackIosIcon/> Edit {Name}</a></h1>
        <Formik
          initialValues={initialValues}
          // validationSchema={EditPlacesSchema}
          onSubmit={(newPlace) => {
            console.log(newPlace);
            console.log(jwt2);
            async function editPlace() {
              let res = await axios.put(`${placesUrl}/${id}`, newPlace, {
                headers: {
                  Authorization: `Bearer ${jwt2}`,
                },
              });
              alert("The place has now been updated");
              Router.replace(`/Admin`);
              console.log(res);
            }
            editPlace();
          }}
          >
          {({ errors, touched, values }) => (
            <Form className="addPlaces">

              <div className="addPlaces-general">
                <div>
                  <label htmlFor='Name'>Name:</label>
                  <Field
                    id='Name'
                    name='Name'
                    type='text'
                    placeholder='Name'
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

                <div className="addPlaces-general-checkboxes">
                  <div className="addPlaces-general-checkboxes-box">
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
                  </div>
              </div>

              <div className="addPlaces-type">
                <p className="flexCardtitle">What type of stay is it?</p>
                <p className="flexCardtitle grey">Select the one that applies</p>

                <div className="addPlaces-type-checkboxes">
                  <div className="addPlaces-type-checkboxes-box">
                    <label htmlFor='Type.Hotel'>Hotel</label>
                    <Field
                      id='checkbox'
                      name='Type.Hotel'
                      type='checkbox'
                    />
                    {errors.Hotel && touched.Hotel ? (
                    <p className="error">{errors.Hotel}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-type-checkboxes-box">
                    <label htmlFor='Type.Hostel'>Hostel</label>
                    <Field
                      id='checkbox'
                      name='Type.Hostel'
                      type='checkbox'
                    />
                    {errors.Hostel && touched.Hostel ? (
                    <p className="error">{errors.Hostel}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-type-checkboxes-box">
                    <label htmlFor='Type.Cabin'>Cabin</label>
                    <Field
                      id='checkbox'
                      name='Type.Cabin'
                      type='checkbox'
                    />
                    {errors.Cabin && touched.Cabin ? (
                    <p className="error">{errors.Cabin}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-type-checkboxes-box">
                    <label htmlFor='Type.Apartment'>Apartment</label>
                    <Field
                      id='checkbox'
                      name='Type.Apartment'
                      type='checkbox'
                    />
                    {errors.Apartment && touched.Apartment ? (
                    <p className="error">{errors.Apartment}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-type-checkboxes-box">
                    <label htmlFor='Type.House'>House</label>
                    <Field
                      id='checkbox'
                      name='Type.House'
                      type='checkbox'
                    />
                    {errors.House && touched.House ? (
                    <p className="error">{errors.House}</p>
                    ) : <p className="filler"></p>}
                  </div>
                </div>
              </div>

              <div className="addPlaces-amenities">
                <p className="flexCardtitle">What amenities does the place have?</p>
                <p className="flexCardtitle grey">Select all that apply</p>

                <div className="addPlaces-amenities-checkboxes">
                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Refrigerator'>Refrigerator</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Refrigerator'
                      type='checkbox'
                    />
                    {errors.Refrigerator && touched.Refrigerator ? (
                    <p className="error">{errors.Refrigerator}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.TV'>TV</label>
                    <Field
                      id='checkbox'
                      name='Amenities.TV'
                      type='checkbox'
                    />
                    {errors.TV && touched.TV ? (
                    <p className="error">{errors.TV}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Dishwasher'>Dishwasher</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Dishwasher'
                      type='checkbox'
                    />
                    {errors.Dishwasher && touched.Dishwasher ? (
                    <p className="error">{errors.Dishwasher}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Iron'>Iron</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Iron'
                      type='checkbox'
                    />
                    {errors.Iron && touched.Iron ? (
                    <p className="error">{errors.Iron}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Washer'>Washer</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Washer'
                      type='checkbox'
                    />
                    {errors.Washer && touched.Washer ? (
                    <p className="error">{errors.Washer}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Bathtub'>Bathtub</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Bathtub'
                      type='checkbox'
                    />
                    {errors.Bathtub && touched.Bathtub ? (
                    <p className="error">{errors.Bathtub}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Parking'>Parking</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Parking'
                      type='checkbox'
                    />
                    {errors.Parking && touched.Parking ? (
                    <p className="error">{errors.Parking}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Fireplace'>Fireplace</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Fireplace'
                      type='checkbox'
                    />
                    {errors.Fireplace && touched.Fireplace ? (
                    <p className="error">{errors.Fireplace}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Heating'>Heating</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Heating'
                      type='checkbox'
                    />
                    {errors.Heating && touched.Heating ? (
                    <p className="error">{errors.Heating}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Wifi'>Wifi</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Wifi'
                      type='checkbox'
                    />
                    {errors.Wifi && touched.Wifi ? (
                    <p className="error">{errors.Wifi}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Dryer'>Dryer</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Dryer'
                      type='checkbox'
                    />
                    {errors.Dryer && touched.Dryer ? (
                    <p className="error">{errors.Dryer}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Gym'>Gym</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Gym'
                      type='checkbox'
                    />
                    {errors.Gym && touched.Gym ? (
                    <p className="error">{errors.Gym}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.CoffeeMachine'>CoffeeMachine</label>
                    <Field
                      id='checkbox'
                      name='Amenities.CoffeeMachine'
                      type='checkbox'
                    />
                    {errors.CoffeeMachine && touched.CoffeeMachine ? (
                    <p className="error">{errors.CoffeeMachine}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Pool'>Pool</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Pool'
                      type='checkbox'
                    />
                    {errors.Pool && touched.Pool ? (
                    <p className="error">{errors.Pool}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Microwave'>Microwave</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Microwave'
                      type='checkbox'
                    />
                    {errors.Microwave && touched.Microwave ? (
                    <p className="error">{errors.Microwave}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Spa'>Spa</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Spa'
                      type='checkbox'
                    />
                    {errors.Spa && touched.Spa ? (
                    <p className="error">{errors.Spa}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Spa'>Spa</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Spa'
                      type='checkbox'
                    />
                    {errors.Spa && touched.Spa ? (
                    <p className="error">{errors.Spa}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Breakfast'>Breakfast</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Breakfast'
                      type='checkbox'
                    />
                    {errors.Breakfast && touched.Breakfast ? (
                    <p className="error">{errors.Breakfast}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Lift'>Lift</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Lift'
                      type='checkbox'
                    />
                    {errors.Lift && touched.Lift ? (
                    <p className="error">{errors.Lift}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Laundry'>Laundry</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Laundry'
                      type='checkbox'
                    />
                    {errors.Laundry && touched.Laundry ? (
                    <p className="error">{errors.Laundry}</p>
                    ) : <p className="filler"></p>}
                  </div>

                  <div className="addPlaces-amenities-checkboxes-box">
                    <label htmlFor='Amenities.Cleaning'>Cleaning</label>
                    <Field
                      id='checkbox'
                      name='Amenities.Cleaning'
                      type='checkbox'
                    />
                    {errors.Cleaning && touched.Cleaning ? (
                    <p className="error">{errors.Cleaning}</p>
                    ) : <p className="filler"></p>}
                  </div>
                </div>
              </div>
              
              <div className="addPlaces-roomDetails">
                <div>
                  <label htmlFor='RoomDetails.CheckIn'>CheckIn:</label>
                  <Field
                    id='CheckIn'
                    name='RoomDetails.CheckIn'
                    type='text'
                    disabled
                  />
                  {errors.CheckIn && touched.CheckIn ? (
                  <p className="error">{errors.CheckIn}</p>
                  ) : <p className="filler"></p>}
                </div>

                <div>
                  <label htmlFor='RoomDetails.CheckOut'>CheckOut:</label>
                  <Field
                    id='CheckOut'
                    name='RoomDetails.CheckOut'
                    type='text'
                    placeholder="15:00:00.000"
                    disabled
                  />
                  {errors.CheckOut && touched.CheckOut ? (
                  <p className="error">{errors.CheckOut}</p>
                  ) : <p className="filler"></p>}
                </div>
                  
                <div className="addPlaces-roomDetails-rules">
                  <p className="flexCardtitle">Please select relevant rules</p>
                  <p className="flexCardtitle grey">Select all that apply</p>
                  <div className="addPlaces-roomDetails-rules-checkboxes">
                    <div className="addPlaces-roomDetails-rules-checkboxes-box">
                      <label htmlFor='RoomDetails.Parties'>Parties?</label>
                      <Field
                        id='checkbox'
                        name='RoomDetails.Parties'
                        type='checkbox'
                      />
                      {errors.Parties && touched.Parties ? (
                      <p className="error">{errors.Parties}</p>
                      ) : <p className="filler"></p>}
                    </div>

                    <div className="addPlaces-roomDetails-rules-checkboxes-box">
                      <label htmlFor='RoomDetails.Pets'>Pets?</label>
                      <Field
                        id='checkbox'
                        name='RoomDetails.Pets'
                        type='checkbox'
                      />
                      {errors.Pets && touched.Pets ? (
                      <p className="error">{errors.Pets}</p>
                      ) : <p className="filler"></p>}
                    </div>

                    <div className="addPlaces-roomDetails-rules-checkboxes-box">
                      <label htmlFor='RoomDetails.Smoking'>Smoking?</label>
                      <Field
                        id='checkbox'
                        name='RoomDetails.Smoking'
                        type='checkbox'
                      />
                      {errors.Smoking && touched.Smoking ? (
                      <p className="error">{errors.Smoking}</p>
                      ) : <p className="filler"></p>}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor='RoomDetails.Rules'>Rules:</label>
                  <Field
                    id='Rules'
                    name='RoomDetails.Rules'
                    type='text'
                    placeholder='Rules'
                  />
                  {errors.Rules && touched.Rules ? (
                  <p className="error">{errors.Rules}</p>
                  ) : <p className="filler"></p>}
                </div>
              </div>

              <div className="addPlaces-imgArray">
                {values.ImgArray.map((img, index) => {
                  return (
                    <div key={index}>
                      <label htmlFor={`ImgArray.${index}.ImgUrl`}>ImgUrl:</label>
                      <Field
                        id='ImgUrl'
                        name={`ImgArray.${index}.ImgUrl`}
                        type='text'
                        placeholder='ImgUrl'
                      />
                      {errors.ImgUrl && touched.ImgUrl ? (
                      <p className="error">{errors.ImgUrl}</p>
                      ) : <p className="filler"></p>}

                      <label htmlFor={`ImgArray.${index}.ImgAlt`}>ImgAlt:</label>
                      <Field
                        id='ImgAlt'
                        name={`ImgArray.${index}.ImgAlt`}
                        type='text'
                        placeholder='ImgAlt'
                      />
                      {errors.ImgAlt && touched.ImgAlt ? (
                      <p className="error">{errors.ImgAlt}</p>
                      ) : <p className="filler"></p>}
                    </div>
                  )
                })}
              </div>

              <div className="addPlaces-ratings">
              {values.Ratings.map((elm, index) => {
                  return (
                    <div key={index}>
                      <label htmlFor={`Ratings.${index}.Star`}>Star:</label>
                      <Field
                        id='Star'
                        name={`Ratings.${index}.Star`}
                        type='text'
                        placeholder='Star'
                      />
                      {errors.Star && touched.Star ? (
                      <p className="error">{errors.Star}</p>
                      ) : <p className="filler"></p>}

                      <label htmlFor={`Ratings.${index}.Date`}>Date:</label>
                      <Field
                        id='Date'
                        name={`Ratings.${index}.Date`}
                        type='Date'
                        placeholder='Date'
                      />
                      {errors.Date && touched.Date ? (
                      <p className="error">{errors.Date}</p>
                      ) : <p className="filler"></p>}

                      <label htmlFor={`Ratings.${index}.RatingsName`}>Name:</label>
                      <Field
                        id='RatingsName'
                        name={`Ratings.${index}.RatingsName`}
                        type='text'
                        placeholder='Name'
                      />
                      {errors.RatingsName && touched.RatingsName ? (
                      <p className="error">{errors.RatingsName}</p>
                      ) : <p className="filler"></p>}

                      <label htmlFor={`Ratings.${index}.Message`}>Message:</label>
                      <Field
                        id='Message'
                        name={`Ratings.${index}.Message`}
                        type='text'
                        placeholder='Message'
                      />
                      {errors.Message && touched.Message ? (
                      <p className="error">{errors.Message}</p>
                      ) : <p className="filler"></p>}
                    </div>
                  )
                })}
              </div>

              <div className="addPlaces-response">
                {isSent ? (
                  <p className="white">
                    {Name} has been edited, to see it or edit it again, go back to the admin panel.
                  </p>
                ) : null}
                {isError ? (
                  <p className="white">
                    Something went wrong, please try again.
                  </p>
                ) : null}
              </div>
              <div className="addPlaces-button">
                <button className='button' type='submit'>
                  Edit Place
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

export default Edit;