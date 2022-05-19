import React, { useState } from 'react';
// Api
import { placesUrl } from '../../lib/apiURL';
import { getAPI } from '../../lib/apiCall';
// Axios
const axios = require('axios').default;
// Formik
// import { Formik, Form, Field, ErrorMessage, isObject } from 'formik';
// import * as Yup from "yup";

// Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostCards({places, headers}) {
  const [values, setValues] = useState({
    id: 12 + '',
    Name: '',
    Price: '',
    About: '',
    Location: '',
    Rooms: '',
    Beds: '',
    Featured: false,
    Type: {
      Hotel: false,
      Hostel: false,
      Cabin: false,
      Apartment: false,
    },
    ImgArray: {
      ImgAlt: '', 
      ImgUrl: '',
    },
    Ratings: {
      Star: '',
      Date: '',
      RatingsName: '',
      Message: '',
    },
    Size: '',
    Amenities: {
      Bathtub: false,
      Breakfast: false,
      Cleaning: false,
      CoffeeMachine: false,
      Dishwasher: false,
      Dryer: false,
      Fireplace: false,
      Gym: false,
      Heating: false,
      Iron: false,
      Laundry: false,
      Lift: false,
      Microwave: false,
      Parking: false,
      Pool: false,
      Refrigerator: false,
      Spa: false,
      TV: false,
      Washer: false,
      Wifi: false,
    },
    RoomDetails: {
      CheckIn: '',
      CheckOut: '',
      Parties: false,
      Pets: false,
      Rules: '',
      Smoking: false,
    }
  });

  const [errors, setErrors] = useState(null);

  const {Name, Price, About, Location, id, Hotel, Hostel, Cabin, Apartment} = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const target = e.target;

    if(isNaN(target.value)) {
      toast.error("All input fields must be filled out", {
        toastId: "toastId-error",
      });
    }

    try {
      const response = await axios.post(placesUrl, values, headers);
      console.log(response);
    } catch (error) {
      setErrors(error);
    }
    
    console.log('you clicked submit');
  };

  const handleInputChange= (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderCheckbox = checkedValue => {
    const { 
      Featured,
      Hotel, 
      Hostel, 
      Cabin, 
      Apartment, 
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
      Parties, 
      Pets,
      Smoking 
    } = values;

    const isChecked = checkedValue.checked;
 
    const handleCheckboxChange = () => {
      if (values !== isChecked) {
        handleInputChange({
          e: {
            Featured: false,
            Hotel: false,
          },
        });
      } else {
        handleInputChange({
          e: {
            Featured: true,
            Hotel: true,
          },
        });
      }

      // if(values.Hotel === isChecked) {
      //   values.Hostel && values.Apartment && values.Cabin !== isChecked;
      // } 
      // if(values.Hostel === isChecked) {
      //   values.Hotel && values.Apartment && values.Cabin !== isChecked;
      // }
      // if(values.Apartment === isChecked) {
      //   values.Hotel && values.Hostel && values.Cabin !== isChecked;
      // }
      // if(values.Cabin === isChecked) {
      //   values.Hotel && values.Hostel && values.Apartment !== isChecked;
      // }
    };

    return (
     <>
      <label htmlFor={checkedValue.Featured}>Featured</label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          name="Featured"
          id={checkedValue.id}
         />
        <label htmlFor={checkedValue.Hotel}>Hotel</label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          name="Hotel"
          id={checkedValue.id}
         />
        <label htmlFor={checkedValue.Hostel}>Hostel</label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          name="Hostel"
          id={checkedValue.id}
         />
      </>
    )
  };

  return (
    <>
      <ToastContainer />
      <form className="addForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Name">Name</label>
          <input 
          name="Name" 
          type="text"
          id={id}
          value={Name}
          placeholder="Name" 
          onChange={handleInputChange}
          className="regularInput"
            />
        </div>
        <div>
          <label htmlFor="Price">Price</label>
          <input 
          name="Price" 
          type="text"
          id={id}
          value={Price}
          placeholder="Price" 
          onChange={handleInputChange}
          className="regularInput"
          />
        </div>
        <div>
          <label htmlFor="About">About</label>
          <input 
          name="About" 
          type="text"
          id={id}
          value={About}
          placeholder="About" 
          onChange={handleInputChange}
          className="regularInput"
          />
        </div>
        <div>
          <label htmlFor="Location">Location</label>
          <input 
          name="Location" 
          type="text"
          id={id}
          value={Location}
          placeholder="Location" 
          onChange={handleInputChange}
          className="regularInput"
          />
        </div>
        {renderCheckbox(values)}
        <button type="submit" className="button" value="Add Place">Submit</button>
      </form>
    </>
  )
}


export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  let user = null;

  if (cookies?.jwt) {
    try {
      const { data } = await axios.get('http://localhost:1337/users/me', {
        headers: {
          Authorization:
            `Bearer ${cookies.jwt}`,
          },
      });
      user = data;
    } catch (e) {
      console.log(e);
    }
  }

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }
   
  const res = await getAPI(placesUrl);
  const data2 = await res.json();

  return {
    props: {
      user,
      places : data2,
      headers: {
        Authorization:
            `Bearer ${cookies.jwt}`,
      }
    }
  }
}

export default PostCards;







  // Formik Contact Form
  // const ContactSchema = Yup.object().shape({
  //   firstName: Yup.string()
  //     .min(2, 'Too Short!')
  //     .max(50, 'Too Long!')
  //     .required('Required'),
  //   lastName: Yup.string()
  //     .min(2, 'Too Short!')
  //     .max(50, 'Too Long!')
  //     .required('Required'),
  // });

   {/* {errors.firstName && touched.firstName ? (
    <p className="error">{errors.firstName}</p>
  ) : <p className="filler"></p>}

  <label htmlFor="lastName">Surname</label>
  <Field name="lastName" placeholder="Surname" />
  {errors.lastName && touched.lastName ? (
    <p className="error">{errors.lastName}</p>
    ) : <p className="filler"></p>} */}

{/* <Formik
        initialValues={{
          firstName: '',
          lastName: '',
        }}
        onSubmit={handleSubmit}
            // validationSchema={ContactSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="addForm">
                  <div>
                    <label htmlFor="Name">Name</label>
                    <Field 
                    name="Name" 
                    type="text"
                    id="Name"
                    value={Name}
                    placeholder="Name" 
                    onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="Price">Price</label>
                    <Field 
                    name="Price" 
                    type="text"
                    id="Price"
                    value={Price}
                    placeholder="Price" 
                    onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="About">About</label>
                    <Field 
                    name="About" 
                    type="text"
                    id="About"
                    value={About}
                    placeholder="About" 
                    onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="Location">Location</label>
                    <Field 
                    name="Location" 
                    type="text"
                    id="Location"
                    value={Location}
                    placeholder="Location" 
                    onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button type="submit" className="button">Submit</button>
              </Form>
            )}
        </Formik> */}

        // <ToastContainer 
        //   position="top-center"
        //   autoClose={3000}
        //   hideProgressBar={false}
        //   newestOnTop={false}
        //   closeOnClick
        //   rtl={false}
        //   pauseOnFocusLoss
        //   draggable
        //   pauseOnHover
        //   role="alert: your post has been submitted"
        // />