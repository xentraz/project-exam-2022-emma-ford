import React, { useState, useRef, forwardRef } from 'react';
// YUP 
import * as Yup from 'yup';
// Formik
import { Field, Form, Formik } from 'formik';
// Components
import Filter from '../Filter/Filter';

function StaysHero({heroImages}) {
  // Hero Img
  console.log(heroImages);
  const heroImg = heroImages.slice(2, 3);
  console.log(heroImg);

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
        style={{
          backgroundImage: `url(${heroImg[0].ImgUrl})`,
        }}
        alt={heroImg[0].ImgAlt}
        className="staysHero"
        >
        <div className="staysHero-heading">
          <h1>Welcome to Bergen</h1>
        </div>
        <div className="staysHero-bar">
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
                <div className="staysHero-bar-form">
                  <div className="staysHero-bar-form-date1">
                    <label htmlFor='dateFrom' className='sidebarTitle'>From:</label>
                      <Field
                        id='dateFrom'
                        name='dateFrom'
                        type='date'
                        className='bookingFormInput'
                        placeholder='forwardRef'
                      />
                      {errors.dateFrom && touched.dateFrom ? (
                      <p className="error">{errors.dateFrom}</p>
                      ) : <p className="filler"></p>}
                  </div>
                  <div className="staysHero-bar-form-date2">
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
                  <div className="staysHero-bar-form-guests">
                    <label className="sidebarTitle">Guests:</label>
                        {!!ariaFocusMessage && !!isMenuOpen && (
                          <p>{ariaFocusMessage}</p>
                        )}
                        <Filter
                          className="my-react-select-container"
                          classNamePrefix="my-react-select"               
                          // ref={ref}
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
                          placeholderText={'Guests'}
                          isMulti={false}
                          handleOnMessage={onFocus}
                          onMenuOpen={onMenuOpen}
                          onMenuClose={onMenuClose}
                          // styles={bookingBarStyles}
                        />
                        <p className="filler"></p>
                    </div>
                    <div className="staysHero-bar-form-rooms">
                      <label className="sidebarTitle">Rooms:</label>
                        {!!ariaFocusMessage && !!isMenuOpen && (
                          <p>{ariaFocusMessage}</p>
                        )}
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
                          placeholderText={'Rooms'}
                          isMulti={false}
                          handleOnMessage={onFocus}
                          onMenuOpen={onMenuOpen}
                          onMenuClose={onMenuClose}
                        />
                        <p className="filler"></p>
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

export default StaysHero