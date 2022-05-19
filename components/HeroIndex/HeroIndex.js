// React
import React, { useState, useRef, useEffect }  from 'react';
// Next
import Image from 'next/image';
// Maetal UI
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// Weather
import { WeatherApiURL } from '../Weather/API/WeatherAPI';
// Axios
import axios from 'axios';
// YUP 
import * as Yup from 'yup';
// Formik
import { Field, Form, Formik } from 'formik';
// Components
import Filter from '../Filter/Filter';

function HeroIndex() {
  const [value, setValue] = useState("");
  const [weather, setWeather] = useState('');
  // const [data, setData] = useState({});

  // const WatherApiKey = `efcd48a6ebf30ba8437bc21079c510a6`;
  // // const WeatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=bergen&units=metric&appid=` + WatherApiKey;
  // console.log(WeatherApiURL);
  // // const cancelTokenSource = axios.CancelToken.source();

  // useEffect(() => {
  //   const cancelTokenSource = axios.CancelToken.source();
  //   async function fetchData() {
  //     try {
  //       const result = await axios(WeatherApiURL, {
  //         method: 'get',
  //         cancelToken: cancelTokenSource.token,
  //       });
  //       setWeather(result.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       cancelTokenSource.cancel();
  //     }
  //   }
  //   fetchData();
  // })

  // useEffect(() => {
  //   axios.get(WeatherApiURL)
  //   .then((response) => {
  //     setWeather(response.data);
  //     cancelToken: cancelTokenSource.token;
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  //   cancelTokenSource.cancel();
  // });

  // if (!weather) {
  //   return (
  //     <>
  //      {/* <div className="loading">
  //       <Image 
  //         src="/img/animation_640_l2kk0eiw.gif"
  //         alt="NEEDED"
  //         height="500"
  //         width="500"
  //       />
  //      </div> */}
  //      <div className="heroIndex">
  //       <div className="heroIndex-weather">
  //         <p>Current Weather:</p>
  //         <p>...°C</p>
  //       </div>
  //       <div className="heroIndex-text">
  //         <h1 className="heroIndex-text-title">Explore Bergen</h1>
  //         <p className="heroIndex-text-substrate">From all corners of the city and the comfort of our best stays</p>
  //       </div>
  //       <div className="heroIndex-content">
  //       <div className="heroIndex-content-guestSelect">
  //         <label>Dropdown label</label>
  //         {/* <MultiSelect
  //           className="multi-select"
  //           onChange={handleOnchange}
  //           options={options}
  //           customValue={true}
  //         /> */}
  //         <br />
  //         <p>{value}</p>
  //       </div>
  //       </div>
  //     </div>
  //     </>
  //   );
  // }

  // console.log(weather);

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

  // Multiple Select Filter
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);
  const [filters, setFilters] = useState({});

  
  return (
    <>
      <div className="heroIndex">
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
                    <label htmlFor='dateFrom' className='sidebarTitle'>
                      From:
                    </label>
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
                    <label htmlFor='dateTo' className='sidebarTitle'>
                      To:
                    </label>
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
                    <div>
                      <label className="sidebarTitle">Guests</label>
                      {!!ariaFocusMessage && !!isMenuOpen && (
                        <p>{ariaFocusMessage}</p>
                      )}
                      <Filter
                        className="my-react-select-container"
                        classNamePrefix="my-react-select"               
                        ref={ref}
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
                        // styles={bookingBarStyles}
                      />
                    </div>
                  </div>
                  <div className='bookingForm-wrapper-roomSelect'>
                    <div>
                      <label className="sidebarTitle">Guests</label>
                      {!!ariaFocusMessage && !!isMenuOpen && (
                        <p>{ariaFocusMessage}</p>
                      )}
                      <Filter
                        className="my-react-select-container"
                        classNamePrefix="my-react-select"               
                        ref={ref}
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
                        // styles={bookingBarStyles}
                      />
                    </div>
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
