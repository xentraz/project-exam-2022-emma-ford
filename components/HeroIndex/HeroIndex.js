// React
import React, { useState, useRef, useEffect }  from 'react';
// Axios
import axios from 'axios';
// YUP 
import * as Yup from 'yup';
// Formik
import { Field, Form, Formik } from 'formik';
// Components
import Filter from '../Filter/Filter';

function HeroIndex({heroImages}) {
  // Hero Img
  console.log(heroImages);
  const heroImg = heroImages.slice(1, 2);
  console.log(heroImg);

  // Weather 
  const [value, setValue] = useState("");
  const [weather, setWeather] = useState('');

  // Date picker
  const [bookingInfo, setBookingInfo] = useState({});
  const datePickerSchema = Yup.object().shape({
    dateFrom: Yup.date().required('You must pick a date!'),
    dateTo: Yup.date().required('You must pick a date!'),
  });

  function onSubmit(val) {
    handleBooking(val);
  }

  // Multiple Select
  // Accessibility
  const [ariaFocusMessage, setAriaFocusMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onFocus = ({ focused, isDisabled }) => {
    const msg = `You are currently focused on option ${focused.label}${
      isDisabled ? ', disabled' : ''
    }`;
    setAriaFocusMessage(msg);
    return msg;
  };

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  return (
    <>
      <div 
        className="heroIndex"
        style={{
          backgroundImage: `url(${heroImg[0].ImgUrl})`,
        }}
        alt={heroImg[0].ImgAlt}
        >
        <div className="heroIndex-weather">
          <p>Current Weather:</p>
          <p>20 °C</p>
        </div>
        <div className="heroIndex-text">
          <div className="heroIndex-text-title">
            <h1>Explore Bergen</h1>
          </div>
          <p className="heroIndex-text-substrate">From all corners of the city and the comfort of our best stays</p>
        </div>
        <div className="heroIndex-content">
          <Formik
            initialValues={{
              dateFrom: '',
              dateTo: '',
            }}
            validationSchema={datePickerSchema}
            onSubmit={(values) => {
              onSubmit(values);
              closed(true);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className='bookingForm-wrapper'>
                  <div className='bookingForm-wrapper-dateFrom'>
                    <label htmlFor='dateFrom' className='sidebarTitle'>From:</label>
                    <Field
                      id='dateFrom'
                      name='dateFrom'
                      type='date'
                      className='bookingFormInput'
                    />
                    {errors.dateFrom && touched.dateFrom ? (
                    <p className="error">{errors.dateFrom}</p>
                    ) : <p className="filler"></p>}
                  </div>
                  <div  className='bookingForm-wrapper-dateTo'>
                    <label htmlFor='dateTo' className='sidebarTitle'>To:</label>
                      <Field
                        id='dateTo'
                        name='dateTo'
                        type='date'
                        className='bookingFormInput'
                      />
                      {errors.dateTo && touched.dateTo ? (
                      <p className="error">{errors.dateTo}</p>
                      ) : <p className="filler"></p>}
                  </div>
                  <div className='bookingForm-wrapper-guestSelect'>
                    <label className="sidebarTitle">Guests</label>
                    <p>{!!ariaFocusMessage && !!isMenuOpen && (
                      {ariaFocusMessage}
                    )}</p>
                    <Filter
                      className="my-react-select-container"
                      classNamePrefix="my-react-select"   
                      selectOptions={[
                        {value: 1, label: '1 Guest'},
                        {value: 2, label: '2 Guests'},
                        {value: 3, label: '3 Guests'},
                        {value: 4, label: '4 Guests'},
                        {value: 5, label: '5 Guests'},
                        {value: 6, label: '6 Guests'},
                        {value: 7, label: '7 Guests'},
                        {value: 8, label: '8 Guests'},
                        {value: 9, label: '9 Guests'},
                        {value: 10, label: '10 Guests'},
                      ]}
                      placeholderText={'Guests:'}
                      isMulti={false}
                      handleOnMessage={onFocus}
                      onMenuOpen={onMenuOpen}
                      onMenuClose={onMenuClose}
                    />
                  </div>
                  <div className='bookingForm-wrapper-roomSelect'>
                    <label className="sidebarTitle">Rooms</label>
                    <p>{!!ariaFocusMessage && !!isMenuOpen && (
                      {ariaFocusMessage}
                    )}</p>
                    <Filter
                      className="my-react-select-container"
                      classNamePrefix="my-react-select"               
                      selectOptions={[
                        {value: 1, label: '1 Room'},
                        {value: 2, label: '2 Rooms'},
                        {value: 3, label: '3 Rooms'},
                        {value: 4, label: '4 Rooms'},
                        {value: 5, label: '5 Rooms'},
                        {value: 6, label: '6 Rooms'},
                        {value: 7, label: '7 Rooms'},
                        {value: 8, label: '8 Rooms'},
                      ]}
                      placeholderText={'Rooms:'}
                      isMulti={false}
                      handleOnMessage={onFocus}
                      onMenuOpen={onMenuOpen}
                      onMenuClose={onMenuClose}
                    />
                  </div>
                  <div className='bookingForm-wrapper-button'>
                    <a href={`/Stays`} className='button' type='submit'>Find places</a>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default HeroIndex
