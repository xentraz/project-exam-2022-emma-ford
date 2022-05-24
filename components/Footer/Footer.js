import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// YUP
import * as Yup from 'yup';
// Formik
import { Field, Form, Formik } from 'formik';
// Material UI
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Tooltip } from '@mui/material';

const newsletterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  subject: Yup.string()
    .min(2, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
});

function Footer({heroImages}) {
  // Hero Images
  const logoImage = heroImages.slice(3, 4);
  console.log(logoImage);

  // Newsletter
  const [isError, setIsError] = useState(false);

  // Links
  const router = useRouter();

  return (
    <footer className="footer">
      <div 
      className="footer-logo"
      style={{
        backgroundImage: `url(${logoImage[0].ImgUrl})`,
      }}
      alt={logoImage[0].ImgAlt}
      >
      </div>
      <div className="footer-links">
        <Link href='/Contact'><a className={router.pathname == "/Contact" ? "active" : ""}>Contact</a></Link>
        <Link href='/'><a className={router.pathname == "/About" ? "active" : ""}>About</a></Link>
        <Link href='/'><a className={router.pathname == "/Privacy" ? "active" : ""}>Privacy</a></Link>
        <Link href='/'><a className={router.pathname == "/Terms" ? "active" : ""}>Terms</a></Link>
      </div>
      <div className="footer-declaration">
        <p>© Holidaze 2022. All rights reserved.</p>
        <p className="grey">For Edicational Purposes only.</p>
      </div>
      <div className="footer-socials">
        <Tooltip title="facebook.com/holidaze" disableFocusListener placement="left">
            <FacebookIcon className="icon" icon="fa6-brands:twitter-square" color="black" />
        </Tooltip>
        <Tooltip title="@holidaze" disableFocusListener placement="left">
          <TwitterIcon className="icon" icon="fa6-brands:twitter-square" color="black" />
        </Tooltip>
        <Tooltip title="@holidaze" disableFocusListener placement="left">
            <InstagramIcon className="icon" icon="fa6-brands:twitter-square" color="black" />
        </Tooltip>
      </div>
      <div className="footer-newsletter">
        <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={newsletterSchema}
            >
            {({ errors, touched }) => (
              <Form  className="footer-newsletter-email">
                <label htmlFor='email'>Subscribe to our newsletter!</label>
                <div className="footer-newsletter-email-input">
                  <Field
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Email'
                  />
                  <button className='button' type='submit'>Subscribe</button>
                </div>
                {errors.email && touched.email ? (
                <p className="error">{errors.email}</p>
                ) : <p className="filler"></p>}
              </Form>
              )}
          </Formik>
       </div>
    </footer>
  )
}

export default Footer