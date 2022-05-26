import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
// Formik
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const LoginComponent = ({heroImages}) => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    identifier: '',
    password: '',
  });

  // Formik Login Form
  const loginSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required'),
    identifier: Yup.string()
      .email('Invalid email')
      .required('Required')
  });

  const [error, setError] = useState();

  const handleSubmit = async (values) => {
    try {
      await axios.post('/api/login', { ...values});
      router.push('/Admin');
      setError(false);
    } catch (err) {
      console.log(err.response.data);
      setError(true);
    }
  }

    // Hero Images
    const heroImage = heroImages.slice(4, 5);
    console.log(heroImage);

  return (
    <>
      <div 
      className="loginHero"
      style={{
        backgroundImage: `url(${heroImage[0].ImgUrl})`
      }}
      alt={heroImage[0].ImgAlt}
      >
        <Formik
          initialValues={{
            identifier: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            handleSubmit(values);
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="loginHero-form">
              <p className="flexCardtitle">Login to see, add, edit or delete places to stay. Manage enquiries, contact messages and more.</p>
              <label htmlFor="identifier">Email:</label>
                <Field type="text" name="identifier" className="regularInput"/>
                {errors.identifier && touched.identifier ? (
                <p className="error">{errors.identifier}</p>
                ) : <p className="filler"></p>}
              <br />
              <label htmlFor="password">Password</label>
                <Field type="password" name="password"  className="regularInput"/>
                {errors.password && touched.password ? (
                <p className="error">{errors.password}</p>
                ) : <p className="filler"></p>}
              <br />
              {error ? (
                <p className="warning">
                  Invalid Email or Password
                </p>
              ) : (
                ''
              )}
              <button className='button' type='submit'>
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default LoginComponent;