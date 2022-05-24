import React, { useState } from 'react';
import { useRouter } from 'next/router';
// Material UI
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MapIcon from '@mui/icons-material/Map';
import Tooltip from '@mui/material/Tooltip';
// YUP
import * as Yup from 'yup';
// Formik
import { Field, Form, Formik } from 'formik';
// API
import { getAPI } from '../../lib/apiCall';
// Axios
import axios from 'axios';

const ContactSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  subject: Yup.string()
    .min(2, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  message: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});


function ContactHero({heroImages}) {
  // Hero Image
  console.log(heroImages);
  const heroImg = heroImages.slice(0, 1);
  console.log(heroImg);

  // Contact Form
  const [isError, setIsError] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      let response = await axios.post(
        'http://localhost:1337/contact',
        values
      );
      setIsError(false);
      setIsSent(true);
      console.log(response);
    } catch (err) {
      console.log(err.response.data.message);
      setIsError(true);
      setIsSent(false);
    }
  };

  return (
    <>
      <div 
      className="contactHero"
      style={{
        backgroundImage: `url(${heroImg[0].ImgUrl})`
      }}
      alt={heroImg[0].ImgAlt}
      >
        <div className="contactHero-icons">
          <div className="contactHero-icons-email">
            <Tooltip title="contact@holidaze.com" placement="bottom">
              <EmailIcon />
            </Tooltip>
          </div>
          <div className="contactHero-icons-phone">
            <Tooltip title="+47 12345678" placement="bottom">
              <PhoneIcon />
            </Tooltip>
          </div>
          <div className="contactHero-icons-map">
            <Tooltip title="Oslo Road 123, 0123 Oslo" placement="bottom">
              <MapIcon />
            </Tooltip>
          </div>
        </div>
        <div className="contactHero-wrapper">
          <div className="contactHero-wrapper-form">
            <Formik
            initialValues={{
              email: '',
              subject: '',
              message: '',
            }}
            validationSchema={ContactSchema}
            onSubmit={(values) => {
              // same shape as initial values
              handleSubmit(values);
            }}
            >
            {({ errors, touched }) => (
              <Form>
                <div className="contactHero-wrapper-form-email">
                  <label htmlFor='email' className="white">Email:</label>
                  <Field
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Email'
                    className="contactInput"
                  />
                  {errors.email && touched.email ? (
                  <p className="error">{errors.email}</p>
                  ) : <p className="filler"></p>}
                </div>
                <div className="contactHero-wrapper-form-subject">
                  <label htmlFor='subject' className="white">Subject:</label>
                  <Field
                    id='subject'
                    name='subject'
                    type='text'
                    placeholder='Subject'
                    className="contactInput"
                  />
                  {errors.subject && touched.subject ? (
                  <p className="error">{errors.subject}</p>
                  ) : <p className="filler"></p>}
                </div>
                <div className="contactHero-wrapper-form-message">
                  <label htmlFor='message' className="white">Message:</label>
                  <Field
                    id='message'
                    name='message'
                    component='textarea'
                    placeholder='Write us a message...'
                    className="contactInput"
                  />
                  {errors.message && touched.message ? (
                  <p className="error">{errors.message}</p>
                  ) : <p className="filler"></p>}
                </div>
                <div className="contactHero-wrapper-form-response">
                  {isSent ? (
                    <p className="white">
                      Your message has been sent, please allow 2-4 business days for a response!
                    </p>
                  ) : null}
                  {isError ? (
                    <p className="white">
                      Something went wrong, please try again later.
                    </p>
                  ) : null}
                </div>
                <div className="contactHero-wrapper-form-button">
                  <button className='button' type='submit'>
                    Send message
                  </button>
                </div>
              </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactHero