import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
// Formik
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const LoginComponent = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    identifier: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/login', { ...userData });
      router.push('/Admin');
    } catch (err) {
      console.log(err.response.data);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value })
  }

  return (
    <div>
      <Formik>
        {({errors, touched}) => (
          <Form 
          onSubmit={handleSubmit}>
            <label htmlFor="identifier">Email:</label>
              <Field type="text" name="identifier" onChange={e => handleChange(e)} />
            <br />
            <label htmlFor="password">Password</label>
              <Field type="password" name="password" onChange={e => handleChange(e)} />
            <br />
            <button>Login</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginComponent;

//  // Formik Contact Form
//  const loginSchema = Yup.object().shape({
//   password: Yup.string()
//     .min(2, 'Too Short!')
//     .max(25, 'Too Long!')
//     .required('Required'),
//   identifier: Yup.string()
//     .min(2, 'Too Short!')
//     .max(35, 'Too Long!')
//     .required('Required'),
// });

// function validateEmail(value) {
//   let error;
//   if (!value) {
//     error = 'Required';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//     error = 'Invalid email address';
//   }
//   return error;
// }

{/* {errors.identifier && touched.identifier ? (
<p className="error">{errors.identifier}</p>
) : <p className="filler"></p>} */}

 {/* {errors.password && touched.password ? (
  <p className="error">{errors.password}</p>
  ) : <p className="filler"></p>} */}