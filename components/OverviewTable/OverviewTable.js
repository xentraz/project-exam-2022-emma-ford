import React from 'react';
// Axios
const axios = require('axios').default;
// API
import { placesUrl } from '../../lib/apiURL';
// Material UI Icons
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

// API
export const getStaticProps = async () => {
  const res = await getAPI(placesUrl);
  const data = await res.json();

  return {
    props: { places: data },
  };
};

function OverviewTable(
  {
  id, 
  Name, 
  Price, 
  About, 
  Location, 
  ImgArray,
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
  }
  ) {
  // Img Array 
  const slicedImgs = ImgArray.slice(0, 1);

  const newAbout = About.slice(0, 50);

  return (
    <>
    <tbody>
      <tr>
        <td><p>{id}</p></td>
        <td><p>{Name}</p></td>
        <td>
          {slicedImgs.map((elm) => {     
            return (
              <div
                  className="tableImags"
                  key={elm.id}
                  style={{
                    backgroundImage: `url(${elm.ImgUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100px',
                    height: '100px',
                  }}
                  alt={elm.ImgAlt}
                />
            );
          })}
        </td>
        <td><p>{Price} kr / night</p></td>
        <td><p>{Location}</p></td>
        <td>
          <p>
          {Bathtub ? <span>Bathtub, </span> 
              : Breakfast ? <span>Breakfast, </span>
              : Cleaning ? <span>Cleaning, </span>
              : CoffeeMachine ? <span>Coffee Machine, </span>
              : Dishwasher ? <span>Dishwasher, </span>
              : Dryer ? <span>Dryer, </span>
              : Fireplace ? <span>Fireplace, </span>
              : Gym ? <span>Gym, </span>
              : Heating ? <span>Heating, </span>
              : Iron ? <span>Iron, </span>
              : Laundry ? <span>Laundry, </span>
              : Lift ? <span>Lift, </span>
              : Microwave ? <span>Microwave, </span>
              : Parking ? <span>Parking, </span>
              : Pool ? <span>Pool, </span>
              : Refrigerator ? <span>Refrigerator, </span>
              : Spa ? <span>Spa, </span>
              : TV ? <span>TV, </span>
              : Washer ? <span>Washer, </span>
              : Wifi ? <span>Wifi, </span>
              : ''
            }
           </p>
        </td>
        <td><a href={`/Edit/${id}`}><EditIcon/></a></td>
        <td><p><DeleteForeverIcon/></p></td>
      </tr>
    </tbody>
    </>
  )
}

export default OverviewTable;